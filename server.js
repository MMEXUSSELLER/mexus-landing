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
  const esc = v => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
  const csv = [cols.join(','), ...filas.map(f => cols.map(c => esc(f[c])).join(','))].join('\n');
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="leads-hub-santo-domingo.csv"');
  res.send('﻿' + csv); // BOM para que Excel respete los acentos
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
