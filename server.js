const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Security: basic hardening
app.disable('x-powered-by');

// --- HUB Santo Domingo 2026 lead capture (/hub) ---
// Leads are appended as JSONL and ALSO written to stdout, because Railway's
// filesystem is ephemeral without a mounted volume: the log is the backup of
// record until LEADS_DIR points at one.
const LEADS_DIR = process.env.LEADS_DIR || path.join(__dirname, 'data');
const LEADS_FILE = path.join(LEADS_DIR, 'leads-hub-sd.jsonl');
const LEADS_TOKEN = process.env.LEADS_TOKEN || '';

const CAMPOS = ['vende_amazon', 'producto_listo', 'marca_registrada', 'categoria', 'cuando', 'ventas_mes'];
const LIMITE = new Map(); // ip -> [timestamps]

function limitado(ip) {
  const ahora = Date.now();
  const previos = (LIMITE.get(ip) || []).filter(t => ahora - t < 10 * 60 * 1000);
  previos.push(ahora);
  LIMITE.set(ip, previos);
  if (LIMITE.size > 5000) LIMITE.clear();
  return previos.length > 5;
}

// Hot leads first: ready to ship, launching soon, already selling.
function calificar(l) {
  let p = 0;
  if (l.vende_amazon === 'Sí, en Estados Unidos') p += 3;
  else if (l.vende_amazon === 'Sí, en RD u otro país') p += 2;
  if (l.producto_listo === 'Sí, con inventario disponible') p += 3;
  else if (l.producto_listo === 'En producción') p += 2;
  if (l.marca_registrada === 'Sí, en USPTO') p += 2;
  else if (l.marca_registrada === 'En trámite') p += 1;
  if (l.cuando === 'En los próximos 3 meses') p += 3;
  else if (l.cuando === 'De 3 a 6 meses') p += 2;
  else if (l.cuando === 'De 6 a 12 meses') p += 1;
  if (l.ventas_mes === 'Más de 50,000 USD') p += 3;
  else if (l.ventas_mes === 'De 10,000 a 50,000 USD') p += 2;
  else if (l.ventas_mes === 'Menos de 10,000 USD') p += 1;
  return p; // 0..14
}

app.post('/hub/api/lead', express.json({ limit: '8kb' }), (req, res) => {
  const b = req.body || {};
  const ip = (req.headers['x-forwarded-for'] || req.ip || '').split(',')[0].trim();

  if (b.empresa_web) return res.status(200).json({ ok: true, folio: 'HUB-0000' }); // bot
  if (limitado(ip)) return res.status(429).json({ ok: false, error: 'demasiados envíos' });

  const txt = (v, max) => String(v == null ? '' : v).trim().slice(0, max);
  const nombre = txt(b.nombre, 120), marca = txt(b.marca, 120), correo = txt(b.correo, 160);
  if (!nombre || !marca) return res.status(400).json({ ok: false, error: 'falta nombre o marca' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo)) return res.status(400).json({ ok: false, error: 'correo inválido' });
  for (const c of CAMPOS) if (!txt(b[c], 80)) return res.status(400).json({ ok: false, error: 'falta ' + c });

  const folio = 'HUB-' + crypto.randomBytes(3).toString('hex').toUpperCase();
  const lead = {
    folio,
    id: crypto.randomUUID(),
    ts: new Date().toISOString(),
    evento: 'HUB Santo Domingo 2026',
    origen: 'qr-lamina-24',
    nombre, marca, correo,
    whatsapp: txt(b.whatsapp, 40),
    ...Object.fromEntries(CAMPOS.map(c => [c, txt(b[c], 80)])),
    ip,
    ua: txt(req.headers['user-agent'], 300),
  };
  lead.puntaje = calificar(lead);

  // stdout first: this survives even with no volume mounted.
  console.log('[LEAD] ' + JSON.stringify(lead));
  try {
    fs.mkdirSync(LEADS_DIR, { recursive: true });
    fs.appendFileSync(LEADS_FILE, JSON.stringify(lead) + '\n');
  } catch (e) {
    console.error('[LEAD-WRITE-FAIL] ' + folio + ' ' + String(e));
  }
  res.json({ ok: true, folio });
});

// Trazabilidad: /hub/api/leads?token=... → CSV listo para Excel
app.get('/hub/api/leads', (req, res) => {
  if (!LEADS_TOKEN || req.query.token !== LEADS_TOKEN) return res.status(404).end();
  let filas = [];
  try {
    filas = fs.readFileSync(LEADS_FILE, 'utf8').split('\n').filter(Boolean).map(JSON.parse);
  } catch { /* sin archivo todavía */ }
  filas.sort((a, b) => (b.puntaje - a.puntaje) || String(a.ts).localeCompare(b.ts));
  const cols = ['folio', 'ts', 'puntaje', 'nombre', 'marca', 'correo', 'whatsapp', ...CAMPOS, 'evento', 'id'];
  // Excel and Sheets execute a cell that opens with = + - @ or a control char,
  // so a lead could put a formula in their own brand name. A leading apostrophe
  // forces text and stays invisible in the cell.
  const esc = v => {
    let s = String(v == null ? '' : v);
    if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
    return '"' + s.replace(/"/g, '""') + '"';
  };
  const csv = [cols.join(','), ...filas.map(f => cols.map(c => esc(f[c])).join(','))].join('\n');
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="leads-hub-santo-domingo.csv"');
  res.send('﻿' + csv); // BOM para que Excel respete los acentos
});

// --- Webinar HUB SD: confirmación de llamadas de 15 min (/confirmar-hub-rd) ---
// Each lead gets a personal link: /confirmar-hub-rd?t=<base64url payload>.<hmac>.
// The payload carries the lead's id, name, email and slot so no roster has to
// live in the repo; the HMAC (keyed with LEADS_TOKEN) stops anyone from forging
// a confirmation under someone else's name. Answers append to JSONL on the
// volume and go to stdout as well, same as /hub.
const CONFIRM_FILE = path.join(LEADS_DIR, 'webinar-confirmaciones.jsonl');
const ROSTER_FILE = path.join(LEADS_DIR, 'webinar-roster.json');

const C_RADIO = ['confirma', 'categoria', 'amazon', 'ventas', 'marca_registrada', 'plazo'];
const C_MULTI = ['canales', 'temas'];
const C_OPTS = {
  confirma: ['Sí, confirmo', 'Necesito otro horario', 'Ya no me interesa'],
  categoria: ['Belleza y cuidado personal', 'Alimentos y bebidas', 'Hogar y decoración', 'Moda, joyería y accesorios', 'Industrial o automotriz', 'Otro'],
  canales: ['Tienda física', 'Redes sociales', 'Tienda en línea propia', 'Marketplaces', 'Aún no vendo'],
  amazon: ['No, todavía', 'Sí, en Amazon US', 'Sí, en Amazon México', 'Sí, en otro país'],
  ventas: ['Menos de 2,000 USD', '2,000 a 10,000 USD', '10,000 a 50,000 USD', 'Más de 50,000 USD'],
  marca_registrada: ['Sí, en Estados Unidos', 'Sí, en República Dominicana', 'En proceso', 'No'],
  plazo: ['Ya tengo todo listo', 'En 1 a 3 meses', 'En 3 a 6 meses', 'Solo quiero explorar'],
  temas: ['Cómo abrir mi cuenta', 'Costos y rentabilidad', 'Logística y envíos a US', 'Registro de marca', 'Publicidad en Amazon', 'Ya vendo y quiero crecer', 'Otro'],
};
const C_OWNERS = { alto: ['Rodrigo', 'Patricio'], medio: ['Liza', 'Ximena'], bajo: ['Ximena'] };

function b64u(buf) { return Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
function firmar(payload) { return b64u(crypto.createHmac('sha256', LEADS_TOKEN).update(payload).digest()).slice(0, 22); }

// Returns the lead carried by the link, or null when the token is malformed or
// the signature does not match. Without LEADS_TOKEN (local dev) any payload passes.
function leerToken(t) {
  const [payload, sig] = String(t || '').split('.');
  if (!payload) return null;
  if (LEADS_TOKEN && sig !== firmar(payload)) return null;
  try {
    const l = JSON.parse(Buffer.from(payload.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'));
    if (!l.id || !l.n || !l.e || !l.d) return null;
    return { id: String(l.id).slice(0, 60), nombre: String(l.n).slice(0, 120), correo: String(l.e).slice(0, 160), slot: String(l.d).slice(0, 25) };
  } catch { return null; }
}

// 0..10: sales 0-3, timing 0-3, trademark 0-2, current channel 0-2.
function calificarConfirmacion(r) {
  let p = 0;
  p += Math.max(0, C_OPTS.ventas.indexOf(r.ventas));
  p += Math.max(0, 3 - C_OPTS.plazo.indexOf(r.plazo));
  p += r.marca_registrada === 'Sí, en Estados Unidos' ? 2 : (r.marca_registrada === 'No' ? 0 : 1);
  if (r.canales.includes('Marketplaces') || r.amazon !== 'No, todavía') p += 2;
  else if (r.canales.includes('Tienda en línea propia') || r.canales.includes('Tienda física') || r.canales.includes('Redes sociales')) p += 1;
  return p;
}
function nivelDe(p) { return p >= 7 ? 'alto' : (p >= 4 ? 'medio' : 'bajo'); }

function leerConfirmaciones() {
  try { return fs.readFileSync(CONFIRM_FILE, 'utf8').split('\n').filter(Boolean).map(JSON.parse); } catch { return []; }
}
// Latest answer per lead wins; a lead re-opening the link is a correction, not a duplicate.
function ultimasPorLead(filas) {
  const m = new Map();
  for (const f of filas) m.set(f.lead_id, f);
  return [...m.values()];
}

app.get('/confirmar-hub-rd/api/lead', (req, res) => {
  const l = leerToken(req.query.t);
  if (!l) return res.status(400).json({ ok: false, error: 'link inválido' });
  const previa = ultimasPorLead(leerConfirmaciones()).find(f => f.lead_id === l.id);
  res.json({ ok: true, lead: l, respondido: !!previa, confirma: previa ? previa.confirma : null });
});

app.post('/confirmar-hub-rd/api/respuesta', express.json({ limit: '8kb' }), (req, res) => {
  const b = req.body || {};
  const ip = (req.headers['x-forwarded-for'] || req.ip || '').split(',')[0].trim();
  if (b.empresa_web) return res.status(200).json({ ok: true }); // bot
  if (limitado(ip)) return res.status(429).json({ ok: false, error: 'demasiados envíos' });

  const lead = leerToken(b.t);
  if (!lead) return res.status(400).json({ ok: false, error: 'link inválido' });

  const txt = (v, max) => String(v == null ? '' : v).trim().slice(0, max);
  const r = { marca: txt(b.marca, 120) };
  if (!r.marca) return res.status(400).json({ ok: false, error: 'falta marca' });
  for (const k of C_RADIO) {
    r[k] = txt(b[k], 80);
    if (!C_OPTS[k].includes(r[k])) return res.status(400).json({ ok: false, error: 'falta ' + k });
  }
  for (const k of C_MULTI) {
    r[k] = (Array.isArray(b[k]) ? b[k] : []).map(v => txt(v, 80)).filter(v => C_OPTS[k].includes(v));
    if (!r[k].length) return res.status(400).json({ ok: false, error: 'falta ' + k });
  }
  r.categoria_otro = txt(b.categoria_otro, 160);
  r.temas_otro = txt(b.temas_otro, 240);
  if (r.categoria === 'Otro' && !r.categoria_otro) return res.status(400).json({ ok: false, error: 'especifica categoría' });
  if (r.temas.includes('Otro') && !r.temas_otro) return res.status(400).json({ ok: false, error: 'especifica tema' });

  const puntaje = calificarConfirmacion(r);
  const nivel = nivelDe(puntaje);
  // Round robin inside the tier, by order of arrival, so nobody ends up with all the calls.
  const previas = ultimasPorLead(leerConfirmaciones()).filter(f => f.nivel === nivel && f.lead_id !== lead.id);
  const owners = C_OWNERS[nivel];
  const fila = {
    id: crypto.randomUUID(),
    ts: new Date().toISOString(),
    lead_id: lead.id, nombre: lead.nombre, correo: lead.correo, slot: lead.slot,
    ...r,
    puntaje, nivel, toma_llamada: owners[previas.length % owners.length],
    ip, ua: txt(req.headers['user-agent'], 300),
  };
  console.log('[CONFIRM] ' + JSON.stringify(fila));
  try {
    fs.mkdirSync(LEADS_DIR, { recursive: true });
    fs.appendFileSync(CONFIRM_FILE, JSON.stringify(fila) + '\n');
  } catch (e) {
    console.error('[CONFIRM-WRITE-FAIL] ' + lead.id + ' ' + String(e));
  }
  res.json({ ok: true, confirma: fila.confirma });
});

// Internal: roster (who got a link) + answers. Same token as /hub/api/leads.
function conToken(req, res, next) {
  if (!LEADS_TOKEN || req.query.token !== LEADS_TOKEN) return res.status(404).end();
  next();
}
app.put('/confirmar-hub-rd/api/roster', conToken, express.json({ limit: '64kb' }), (req, res) => {
  const lista = Array.isArray(req.body) ? req.body : [];
  try {
    fs.mkdirSync(LEADS_DIR, { recursive: true });
    fs.writeFileSync(ROSTER_FILE, JSON.stringify(lista));
  } catch (e) { return res.status(500).json({ ok: false, error: String(e) }); }
  res.json({ ok: true, n: lista.length });
});
app.get('/confirmar-hub-rd/api/respuestas.json', conToken, (_req, res) => {
  let roster = [];
  try { roster = JSON.parse(fs.readFileSync(ROSTER_FILE, 'utf8')); } catch { /* sin roster */ }
  const filas = ultimasPorLead(leerConfirmaciones()).map(({ ip, ua, ...f }) => f);
  res.json({ roster, respuestas: filas });
});
app.get('/confirmar-hub-rd/api/respuestas', conToken, (_req, res) => {
  const filas = ultimasPorLead(leerConfirmaciones());
  filas.sort((a, b) => String(a.slot).localeCompare(b.slot));
  const cols = ['slot', 'nombre', 'correo', 'marca', 'confirma', 'puntaje', 'nivel', 'toma_llamada', ...C_RADIO.filter(c => c !== 'confirma'), 'categoria_otro', 'canales', 'temas', 'temas_otro', 'ts', 'lead_id'];
  const esc = v => {
    let s = Array.isArray(v) ? v.join(' | ') : String(v == null ? '' : v);
    if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
    return '"' + s.replace(/"/g, '""') + '"';
  };
  const csv = [cols.join(','), ...filas.map(f => cols.map(c => esc(f[c])).join(','))].join('\n');
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="confirmaciones-webinar.csv"');
  res.send('﻿' + csv);
});
// Explicit routes so the email link lands without the static 301 to /confirmar-hub-rd/.
app.get('/confirmar-hub-rd', (_req, res) => res.sendFile(path.join(__dirname, 'confirmar-hub-rd', 'index.html')));
app.get('/confirmar-hub-rd/interno', (_req, res) => res.sendFile(path.join(__dirname, 'confirmar-hub-rd', 'interno.html')));
// Short link for the email: /confirmar-hub-rd/<8-char code>. The code lives in
// the roster on the volume and is expanded here into the signed token, so the
// lead sees a short URL and the form still only trusts signed payloads.
app.get('/confirmar-hub-rd/:code([A-Za-z0-9]{8})', (req, res) => {
  let roster = [];
  try { roster = JSON.parse(fs.readFileSync(ROSTER_FILE, 'utf8')); } catch { /* sin roster */ }
  const l = roster.find(x => x.code === req.params.code);
  if (!l) return res.status(404).sendFile(path.join(__dirname, 'confirmar-hub-rd', 'index.html'));
  const payload = b64u(JSON.stringify({ id: l.id, n: l.n, e: l.e, d: l.d }));
  res.redirect(302, '/confirmar-hub-rd?t=' + payload + (LEADS_TOKEN ? '.' + firmar(payload) : ''));
});

// --- Cuestionario para estudios de mercado (/estudio) ---
// One signed link per brand (same HMAC scheme as /confirmar-hub-rd). The brand
// fills any number of products, each for Amazon MX, US or both. Every answer is
// a full snapshot of the brand's questionnaire; the latest one wins, so a brand
// re-opening its link edits rather than duplicates. Product fields mirror what
// the V3 research engine needs (marketplace, category, niche, keyword,
// benchmark ASIN) so a submission can go straight into a study.
const ESTUDIO_FILE = path.join(LEADS_DIR, 'estudio-respuestas.jsonl');
const ESTUDIO_ROSTER = path.join(LEADS_DIR, 'estudio-roster.json');

const E_MERCADOS = ['MX', 'US'];
const E_AMAZON_HOY = ['No, todavía', 'Sí, en Amazon México', 'Sí, en Amazon Estados Unidos', 'Sí, en los dos'];
const E_MONEDAS = ['MXN', 'USD', 'DOP', 'Otra'];
// Same list as AMAZON_CATEGORIES in operator-console/views-research.jsx.
const E_CATEGORIAS = [
  'Home & Kitchen', 'Beauty & Personal Care', 'Health & Household',
  'Grocery & Gourmet Food', 'Sports & Outdoors', 'Tools & Home Improvement',
  'Patio, Lawn & Garden', 'Toys & Games', 'Baby', 'Pet Supplies',
  'Clothing, Shoes & Jewelry', 'Electronics', 'Cell Phones & Accessories',
  'Office Products', 'Arts, Crafts & Sewing', 'Automotive',
  'Industrial & Scientific', 'Musical Instruments', 'Appliances',
  'Furniture', 'Kitchen & Dining', 'Books', 'Video Games', 'Handmade',
];
const E_MAX_PRODUCTOS = 40;

function leerTokenEstudio(t) {
  const [payload, sig] = String(t || '').split('.');
  if (!payload) return null;
  if (LEADS_TOKEN && sig !== firmar(payload)) return null;
  try {
    const l = JSON.parse(Buffer.from(payload.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'));
    if (!l.id || !l.m || !l.n || !l.e) return null;
    return { id: String(l.id).slice(0, 60), marca: String(l.m).slice(0, 120), nombre: String(l.n).slice(0, 120), correo: String(l.e).slice(0, 160) };
  } catch { return null; }
}
function leerEstudios() {
  try { return fs.readFileSync(ESTUDIO_FILE, 'utf8').split('\n').filter(Boolean).map(JSON.parse); } catch { return []; }
}
function ultimosPorMarca(filas) {
  const m = new Map();
  for (const f of filas) m.set(f.marca_id, f);
  return [...m.values()];
}
function esAmazon(url, mkt) {
  const host = mkt === 'MX' ? 'amazon.com.mx' : 'amazon.com';
  try { const u = new URL(url); return u.protocol === 'https:' && (u.hostname === host || u.hostname === 'www.' + host); } catch { return false; }
}
function asinDe(s) {
  const m = /(?:\/dp\/|\/gp\/product\/|\/product\/|^)(B0[A-Z0-9]{8})(?:[/?#]|$)/i.exec(String(s || '').trim());
  return m ? m[1].toUpperCase() : '';
}

app.get('/estudio/api/marca', (req, res) => {
  const l = leerTokenEstudio(req.query.t);
  if (!l) return res.status(400).json({ ok: false, error: 'link inválido' });
  const previa = ultimosPorMarca(leerEstudios()).find(f => f.marca_id === l.id);
  const { ip, ua, ...respuesta } = previa || {};
  res.json({ ok: true, marca: l, respuesta: previa ? respuesta : null });
});

app.post('/estudio/api/respuesta', express.json({ limit: '256kb' }), (req, res) => {
  const b = req.body || {};
  const ip = (req.headers['x-forwarded-for'] || req.ip || '').split(',')[0].trim();
  if (b.empresa_web) return res.status(200).json({ ok: true }); // bot
  if (limitado(ip)) return res.status(429).json({ ok: false, error: 'demasiados envíos' });

  const marca = leerTokenEstudio(b.t);
  if (!marca) return res.status(400).json({ ok: false, error: 'link inválido' });

  const txt = (v, max) => String(v == null ? '' : v).trim().slice(0, max);
  const num = v => { const n = Number(String(v == null ? '' : v).replace(/[,\s$]/g, '')); return Number.isFinite(n) && n > 0 ? n : null; };
  const lista = (v, n, max) => (Array.isArray(v) ? v : []).map(x => txt(x, max)).filter(Boolean).slice(0, n);

  const r = {
    marca: txt(b.marca, 120),
    web: txt(b.web, 200),
    contacto_nombre: txt(b.contacto_nombre, 120),
    contacto_correo: txt(b.contacto_correo, 160),
    amazon_hoy: txt(b.amazon_hoy, 60),
    amazon_link: txt(b.amazon_link, 300),
    productos: [],
  };
  if (!r.marca) return res.status(400).json({ ok: false, error: 'falta marca' });
  if (!r.contacto_nombre) return res.status(400).json({ ok: false, error: 'falta nombre' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(r.contacto_correo)) return res.status(400).json({ ok: false, error: 'correo inválido' });
  if (!E_AMAZON_HOY.includes(r.amazon_hoy)) return res.status(400).json({ ok: false, error: 'falta amazon_hoy' });

  const prods = Array.isArray(b.productos) ? b.productos.slice(0, E_MAX_PRODUCTOS) : [];
  if (!prods.length) return res.status(400).json({ ok: false, error: 'sin productos' });
  for (let i = 0; i < prods.length; i++) {
    const p = prods[i] || {};
    const q = {
      nombre: txt(p.nombre, 160),
      mercados: lista(p.mercados, 2, 2).filter(m => E_MERCADOS.includes(m)),
      categoria: txt(p.categoria, 60),
      nicho: txt(p.nicho, 240),
      keywords: lista(p.keywords, 5, 80),
      competidores: {},
      precio_actual: num(p.precio_actual),
      moneda: txt(p.moneda, 8),
      precio_objetivo: {},
      diferenciador: txt(p.diferenciador, 400),
      fotos: txt(p.fotos, 300),
      asin_propio: txt(p.asin_propio, 300),
    };
    const err = msg => res.status(400).json({ ok: false, error: `producto ${i + 1}: ${msg}`, producto: i });
    if (!q.nombre) return err('falta nombre');
    if (!q.mercados.length) return err('falta mercado');
    if (!E_CATEGORIAS.includes(q.categoria)) return err('falta categoría');
    if (!q.nicho) return err('falta descripción');
    if (!q.keywords.length) return err('falta palabra clave');
    for (const m of q.mercados) {
      const urls = lista(p.competidores && p.competidores[m], 5, 300).filter(u => esAmazon(u, m));
      if (!urls.length) return err('falta competidor ' + m);
      q.competidores[m] = urls.map(url => ({ url, asin: asinDe(url) }));
      const po = num(p.precio_objetivo && p.precio_objetivo[m]);
      if (po) q.precio_objetivo[m] = po;
    }
    if (q.precio_actual && !E_MONEDAS.includes(q.moneda)) return err('falta moneda');
    if (!q.precio_actual) q.moneda = '';
    if (q.asin_propio) q.asin_propio_asin = asinDe(q.asin_propio);
    r.productos.push(q);
  }

  const fila = {
    id: crypto.randomUUID(),
    ts: new Date().toISOString(),
    marca_id: marca.id,
    ...r,
    n_productos: r.productos.length,
    ip, ua: txt(req.headers['user-agent'], 300),
  };
  console.log('[ESTUDIO] ' + JSON.stringify({ ...fila, productos: undefined }));
  try {
    fs.mkdirSync(LEADS_DIR, { recursive: true });
    fs.appendFileSync(ESTUDIO_FILE, JSON.stringify(fila) + '\n');
  } catch (e) {
    console.error('[ESTUDIO-WRITE-FAIL] ' + marca.id + ' ' + String(e));
    return res.status(500).json({ ok: false, error: 'no se pudo guardar' });
  }
  res.json({ ok: true, n: fila.n_productos });
});

app.put('/estudio/api/roster', conToken, express.json({ limit: '64kb' }), (req, res) => {
  const lista = Array.isArray(req.body) ? req.body : [];
  try {
    fs.mkdirSync(LEADS_DIR, { recursive: true });
    fs.writeFileSync(ESTUDIO_ROSTER, JSON.stringify(lista));
  } catch (e) { return res.status(500).json({ ok: false, error: String(e) }); }
  res.json({ ok: true, n: lista.length });
});
app.get('/estudio/api/respuestas.json', conToken, (_req, res) => {
  let roster = [];
  try { roster = JSON.parse(fs.readFileSync(ESTUDIO_ROSTER, 'utf8')); } catch { /* sin roster */ }
  const filas = ultimosPorMarca(leerEstudios()).map(({ ip, ua, ...f }) => f);
  res.json({ roster, respuestas: filas });
});
// CSV with one row per product × marketplace: that is the unit of a study.
app.get('/estudio/api/respuestas', conToken, (_req, res) => {
  const filas = ultimosPorMarca(leerEstudios());
  const cols = ['marca', 'contacto_nombre', 'contacto_correo', 'web', 'amazon_hoy', 'amazon_link', 'producto', 'marketplace', 'categoria', 'nicho', 'keywords', 'competidores', 'asins_competidores', 'precio_actual', 'moneda', 'precio_objetivo', 'diferenciador', 'fotos', 'asin_propio', 'enviado', 'marca_id'];
  const rows = [];
  for (const f of filas) for (const p of f.productos) for (const m of p.mercados) {
    const comp = p.competidores[m] || [];
    rows.push({
      marca: f.marca, contacto_nombre: f.contacto_nombre, contacto_correo: f.contacto_correo, web: f.web, amazon_hoy: f.amazon_hoy, amazon_link: f.amazon_link,
      producto: p.nombre, marketplace: m, categoria: p.categoria, nicho: p.nicho, keywords: p.keywords,
      competidores: comp.map(c => c.url), asins_competidores: comp.map(c => c.asin).filter(Boolean),
      precio_actual: p.precio_actual, moneda: p.moneda, precio_objetivo: p.precio_objetivo[m] || '',
      diferenciador: p.diferenciador, fotos: p.fotos, asin_propio: p.asin_propio, enviado: f.ts, marca_id: f.marca_id,
    });
  }
  const esc = v => {
    let s = Array.isArray(v) ? v.join(' | ') : String(v == null ? '' : v);
    if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
    return '"' + s.replace(/"/g, '""') + '"';
  };
  const csv = [cols.join(','), ...rows.map(r => cols.map(c => esc(r[c])).join(','))].join('\n');
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="cuestionarios-estudio.csv"');
  res.send('﻿' + csv);
});
app.get('/estudio', (_req, res) => res.sendFile(path.join(__dirname, 'estudio', 'index.html')));
app.get('/estudio/interno', (_req, res) => res.sendFile(path.join(__dirname, 'estudio', 'interno.html')));
app.get('/estudio/:code([A-Za-z0-9]{8})', (req, res) => {
  let roster = [];
  try { roster = JSON.parse(fs.readFileSync(ESTUDIO_ROSTER, 'utf8')); } catch { /* sin roster */ }
  const l = roster.find(x => x.code === req.params.code);
  if (!l) return res.status(404).sendFile(path.join(__dirname, 'estudio', 'index.html'));
  const payload = b64u(JSON.stringify({ id: l.id, m: l.m, n: l.n, e: l.e }));
  res.redirect(302, '/estudio?t=' + payload + (LEADS_TOKEN ? '.' + firmar(payload) : ''));
});

// --- World Cup 2026 results proxy (football-data.org) ---
// Hides the API token and caches upstream so the free tier (10 req/min) is hit
// at most once per cache window regardless of how many visitors are on the page.
// 2 min keeps us at ~30 calls/hour (well under the limit) while surfacing a
// finished score within ~2 min — and live/in-play scores too if the free tier
// exposes them.
const WC_CACHE_MS = 2 * 60 * 1000;
const WC_CACHE = { at: 0, data: null };
app.get('/mundial/api/results', async (_req, res) => {
  const token = process.env.FOOTBALL_DATA_TOKEN;
  if (!token) return res.json({ matches: [], note: 'no token configured' });
  const now = Date.now();
  if (WC_CACHE.data && now - WC_CACHE.at < WC_CACHE_MS) return res.json(WC_CACHE.data);
  try {
    const r = await fetch('https://api.football-data.org/v4/competitions/WC/matches', {
      headers: { 'X-Auth-Token': token },
    });
    if (!r.ok) throw new Error('upstream ' + r.status);
    const j = await r.json();
    const matches = (j.matches || []).map(m => ({
      group: m.group,
      stage: m.stage,
      status: m.status,
      utcDate: m.utcDate,
      venue: m.venue || null,
      homeTeam: { name: m.homeTeam && m.homeTeam.name },
      awayTeam: { name: m.awayTeam && m.awayTeam.name },
      // winner + penalties are needed for knockout rounds (a tie in fullTime can
      // still have a winner via extra time / shootout).
      score: {
        winner: m.score?.winner ?? null,
        duration: m.score?.duration ?? null,
        fullTime: { home: m.score?.fullTime?.home ?? null, away: m.score?.fullTime?.away ?? null },
        penalties: { home: m.score?.penalties?.home ?? null, away: m.score?.penalties?.away ?? null },
      },
    }));
    if (matches.length > 0) { // empty almost always means rate-limited — don't poison cache
      WC_CACHE.data = { matches };
      WC_CACHE.at = now;
    }
    res.json(WC_CACHE.data || { matches });
  } catch (e) {
    if (WC_CACHE.data) return res.json(WC_CACHE.data); // serve stale on upstream error
    res.json({ matches: [], error: String(e) });
  }
});

// Note: apex → www redirect is handled by GoDaddy's domain forwarding feature,
// so the Express app only ever sees www.mexusseller.com requests. No app-level
// redirect needed.

app.use(express.static(__dirname, {
  extensions: ['html'],
  maxAge: '1h',
  setHeaders: (res, filePath) => {
    // Long cache for immutable assets
    if (/\.(png|jpe?g|svg|webp|ico|woff2?)$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=2592000, immutable');
    }
  },
}));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Simple 200 OK for Railway/Render health probes
app.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`MEXUS Landing running on port ${PORT}`);
});
