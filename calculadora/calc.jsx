/* global React, ReactDOM, window */
// MEXUS — Calculadora de rentabilidad PÚBLICA (mexusseller.com/calculadora).
// Copia adaptada de operator-console/views-calculator.jsx — al actualizar
// tarifas o motor allá, copiar engine.js + fee-schedule.json + este view acá
// (mismo flujo: marketplace → cuestionario → sliders; sin login, nada se
// guarda en servidor; el visitante exporta su estudio en HTML/Excel).

const { useState: useCS, useEffect: useCE, useMemo: useCM } = React;
const CIcon = window.Icon || (() => null);

const CM_PER_INCH = 2.54;
const FLOOR = 15;

const money = (n) => (n == null || isNaN(n)) ? '—' : '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const money0 = (n) => (n == null || isNaN(n)) ? '—' : '$' + Math.round(Number(n)).toLocaleString('en-US');
const pct0 = (n) => (n == null || isNaN(n)) ? '—' : Math.round(n) + '%';
const clampRound = (v, d) => Math.round((v + Number.EPSILON) * 10 ** d) / 10 ** d;

// Producto en blanco para el cuestionario (hereda el marketplace elegido).
function blankProduct(market) {
  const m = market || 'US';
  return {
    name: '', market: m, categoryKey: MARKET_DEFAULT_CAT[m], isApparel: false,
    dimUnit: 'cm', L: '', W: '', H: '', wUnit: 'kg', weight: '',
    price: '', cogs: '', logistics: m === 'MX' ? '6' : '1.05',
    tacos: '7', refunds: '8',
    extras: [],   // rubros personalizados {id,label,amount} — costos extra que restan
    base: null,
  };
}
const MARKET_DEFAULT_CAT = { US: 'footwear', MX: 'todo_lo_demas' };
const MARKET_CURRENCY = { US: 'USD', MX: 'MXN' };
const MARKET_META = {
  US: { flag: '🇺🇸', label: 'Amazon US', cur: 'USD', sub: 'Tarifas oficiales 2026 en USD · incluye combustible 3.5%' },
  MX: { flag: '🇲🇽', label: 'Amazon México', cur: 'MXN', sub: 'Tarifas oficiales 2026 en MXN, IVA incluido · tabla especial Salud/Alimentos' },
};
// Producto demo por marketplace: la sección siempre abre con un caso vivo
// para poder demostrarla a un cliente.
function demoProduct(market) {
  if (market === 'MX') {
    return { ...blankProduct('MX'), name: 'Demo · Gel corporal', categoryKey: 'todo_lo_demas', price: '219', cogs: '45', L: '13', W: '5', H: '5', weight: '0.15' };
  }
  return { ...blankProduct('US'), name: 'Freeland · Bota', categoryKey: 'footwear', price: '119', cogs: '47', L: '34.4', W: '25', H: '13', weight: '1.3' };
}

const FONT_DISP = 'var(--mx-font-display, "Barlow Condensed", sans-serif)';
const FONT_MONO = 'var(--mx-font-mono, "JetBrains Mono", monospace)';
const ORANGE = '#F47920', NAVY = '#152232', NAVY_DK = '#0D1826';

// Inputs oscuros (cuestionario navy, mismo lenguaje que el resto).
const darkInput = { width: '100%', fontFamily: FONT_MONO, fontSize: 14, fontWeight: 700, color: '#fff', border: '1.5px solid rgba(255,255,255,.18)', borderRadius: 8, padding: '8px 10px', background: 'rgba(0,0,0,.22)' };
const darkSelect = { ...darkInput, fontFamily: 'inherit', fontWeight: 600 };

function CalculatorView() {
  const [sched, setSched] = useCS(null);
  const [err, setErr] = useCS(null);
  const [step, setStep] = useCS('market');         // 'market' | 'form' | 'calc'
  const [products, setProducts] = useCS([demoProduct('US')]);
  const [active, setActive] = useCS(0);

  // Elegir país resetea los productos al demo de ese marketplace, para que
  // nunca se mezclen tarifas de US y MX en una misma corrida.
  const chooseMarket = (m) => { setProducts([demoProduct(m)]); setActive(0); setStep('form'); };

  useCE(() => {
    fetch('fee-schedule.json?v=1').then(r => r.json()).then(j => setSched(j))
      .catch(e => setErr('No cargó fee-schedule.json: ' + e.message));
  }, []);

  const setP = (i, patch) => setProducts(ps => ps.map((p, k) => k === i ? { ...p, ...patch } : p));
  const schedFor = (p) => sched ? (sched[p.market] || sched.US) : null;
  const catsFor = (p) => { const s = schedFor(p); return s ? Object.keys(s.referral).filter(k => !k.startsWith('_')) : []; };

  // Construye el input del motor para un producto (con overrides vivos).
  function inputFor(p) {
    return {
      name: p.name, categoryKey: p.categoryKey, isApparel: !!p.isApparel,
      price: +p.price || 0, cogs: +p.cogs || 0,
      dims: { l: +p.L || 0, w: +p.W || 0, h: +p.H || 0, unit: p.dimUnit },
      weight: { value: +p.weight || 0, unit: p.wUnit },
      ads: { model: 'acos', amount: (+p.tacos || 0) / 100 },
      refunds: { model: 'pct', amount: (+p.refunds || 0) / 100 },
      logistics: { unitsPerBox: 1, freight: { model: 'per_unit', amount: +p.logistics || 0 } },
    };
  }
  function computeFor(p) {
    const s = schedFor(p);
    if (!s || !window.MEXUS_CALC) return null;
    try { return window.MEXUS_CALC.compute(s, inputFor(p)); } catch (e) { return { error: e.message }; }
  }

  if (err) return <div style={{ padding: 24, color: '#f87171' }}>{err}</div>;
  if (!sched) return <div style={{ padding: 40, textAlign: 'center', color: '#9AA3AD', fontSize: 14 }}>Cargando tarifas…</div>;

  return (
    <div className="mexus-calc" style={{ padding: '6px 20px 40px', maxWidth: 1120, margin: '0 auto' }}>
      <style>{`
        .calc-range{width:100%;-webkit-appearance:none;height:5px;border-radius:3px;background:${NAVY_DK};outline:none;}
        .calc-range::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:${ORANGE};cursor:pointer;border:3px solid ${NAVY};box-shadow:0 0 0 1px rgba(255,255,255,.18);}
        .calc-range::-moz-range-thumb{width:14px;height:14px;border-radius:50%;background:${ORANGE};cursor:pointer;border:3px solid ${NAVY};}
        .mexus-calc input[type=number]::-webkit-inner-spin-button,.mexus-calc input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0;}
        .mexus-calc input[type=number]{-moz-appearance:textfield;}
      `}</style>
      {step === 'market'
        ? <MarketPicker onChoose={chooseMarket} />
        : step === 'form'
          ? <Questionnaire {...{ products, setProducts, setP, catsFor, schedFor, setStep, setActive }} />
          : <Interactive {...{ products, active, setActive, setP, sched, schedFor, computeFor, inputFor, setStep }} />}
    </div>
  );
}

// ─────────── PASO 0 · Elegir marketplace ───────────
// Primero el país, para no confundir tarifas: todo lo que sigue (categorías,
// moneda, tablas FBA) queda amarrado al marketplace elegido.
function MarketPicker({ onChoose }) {
  return (
    <div style={{ maxWidth: 780, margin: '30px auto 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 22 }}>
        <div style={{ color: 'var(--app-fg-3,#9aa)', fontSize: 14.5, marginTop: 4 }}>¿En qué marketplace vas a calcular? Las comisiones, tarifas FBA y moneda cambian por país.</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {['US', 'MX'].map(m => {
          const meta = MARKET_META[m];
          return (
            <button key={m} onClick={() => onChoose(m)}
              style={{ background: NAVY, border: '1.5px solid rgba(255,255,255,.12)', borderRadius: 14, padding: '30px 22px 26px', cursor: 'pointer', textAlign: 'center', position: 'relative', overflow: 'hidden', transition: 'transform .12s ease, border-color .12s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = ORANGE; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)'; e.currentTarget.style.transform = 'none'; }}>
              <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: 6, background: ORANGE }} />
              <div style={{ fontSize: 44, lineHeight: 1 }}>{meta.flag}</div>
              <div style={{ fontFamily: FONT_DISP, fontWeight: 800, fontSize: 21, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', marginTop: 10 }}>{meta.label}</div>
              <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 13, color: ORANGE, marginTop: 4 }}>{meta.cur}</div>
              <div style={{ fontSize: 11.5, color: '#9AA3AD', marginTop: 8, lineHeight: 1.45 }}>{meta.sub}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────── PASO 1 · Cuestionario ───────────
function Questionnaire({ products, setProducts, setP, catsFor, schedFor, setStep, setActive }) {
  const market = (products[0] && products[0].market) || 'US';
  const meta = MARKET_META[market];
  const add = () => setProducts(ps => [...ps, blankProduct(market)]);
  const remove = (i) => setProducts(ps => ps.length > 1 ? ps.filter((_, k) => k !== i) : ps);
  const ready = products.every(p => (+p.price > 0) && (+p.L > 0) && (+p.W > 0) && (+p.H > 0) && (+p.weight > 0));
  const next = () => { setProducts(ps => ps.map(p => ({ ...p, base: { price: p.price, cogs: p.cogs, tacos: p.tacos, refunds: p.refunds } }))); setActive(0); setStep('calc'); };

  const lab = { fontSize: 11, fontWeight: 700, letterSpacing: '.04em', color: '#9AA3AD', textTransform: 'uppercase', display: 'block', marginBottom: 4 };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: FONT_DISP, fontWeight: 800, fontSize: 26, color: 'var(--app-fg-1,#eee)', textTransform: 'uppercase', letterSpacing: '.5px' }}>Calculadora de rentabilidad</div>
          <div style={{ color: 'var(--app-fg-3,#9aa)', fontSize: 13, marginTop: 2 }}>Paso 1 · Captura lo necesario de cada producto: <b>nombre, dimensiones y peso</b> (eso fija el envío de Amazon). Luego le das <b>Siguiente</b> y ajustas todo con sliders.</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: `1.5px solid ${ORANGE}`, background: 'rgba(244,121,32,.12)', color: ORANGE, borderRadius: 999, padding: '6px 14px', fontWeight: 800, fontSize: 12.5 }}>{meta.flag} {meta.label} · {meta.cur}</span>
          <button onClick={() => setStep('market')} title="Regresar a elegir marketplace (reinicia los productos)"
            style={{ border: '1px solid var(--app-tint-4,rgba(255,255,255,.2))', background: 'transparent', color: 'var(--app-fg-2,#bcc)', borderRadius: 9, padding: '6px 11px', cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>Cambiar</button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {products.map((p, i) => (
          <div key={i} style={{ background: NAVY, borderRadius: 12, padding: '18px 18px 18px 22px', color: '#fff', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 18px rgba(0,0,0,.25)' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, width: 8, height: '100%', background: ORANGE }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontFamily: FONT_DISP, fontWeight: 800, fontSize: 15, textTransform: 'uppercase', letterSpacing: '1px', color: '#fff' }}>Producto {i + 1} <span style={{ fontSize: 11, color: '#9AA3AD', letterSpacing: '.5px' }}>· {meta.flag} {meta.cur}</span></span>
              {products.length > 1 && <button onClick={() => remove(i)} style={{ border: 0, background: 'none', color: '#E8857C', cursor: 'pointer', fontWeight: 700, fontSize: 12 }}>✕ Quitar</button>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 12, marginBottom: 12 }}>
              <div><label style={lab}>Nombre / SKU</label><input style={darkInput} value={p.name} onChange={e => setP(i, { name: e.target.value })} placeholder="Ej. Freeland · Bota" /></div>
              <div><label style={lab}>Categoría (comisión)</label>
                <select style={darkSelect} value={p.categoryKey} onChange={e => setP(i, { categoryKey: e.target.value })}>{catsFor(p).map(k => <option key={k} value={k}>{schedFor(p).referral[k].label}</option>)}</select>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,.04)', borderRadius: 9, padding: 12, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#C7CED6' }}>Caja del producto</span>
                <div style={{ display: 'flex', gap: 5 }}>
                  {['in', 'cm'].map(u => <button key={u} onClick={() => changeUnit(p, i, setP, 'dim', u)} style={{ border: '1.5px solid rgba(255,255,255,.18)', borderRadius: 7, padding: '3px 10px', cursor: 'pointer', fontWeight: 700, fontSize: 12, background: p.dimUnit === u ? ORANGE : 'transparent', color: p.dimUnit === u ? '#1a120a' : '#C7CED6' }}>{u}</button>)}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.2fr', gap: 8 }}>
                <div><label style={lab}>Largo</label><input style={darkInput} type="number" value={p.L} onChange={e => setP(i, { L: e.target.value })} /></div>
                <div><label style={lab}>Ancho</label><input style={darkInput} type="number" value={p.W} onChange={e => setP(i, { W: e.target.value })} /></div>
                <div><label style={lab}>Alto</label><input style={darkInput} type="number" value={p.H} onChange={e => setP(i, { H: e.target.value })} /></div>
                <div><label style={lab}>Peso</label>
                  <div style={{ display: 'flex', gap: 5 }}>
                    <input style={darkInput} type="number" value={p.weight} onChange={e => setP(i, { weight: e.target.value })} />
                    <select style={{ ...darkSelect, width: 'auto' }} value={p.wUnit} onChange={e => changeUnit(p, i, setP, 'wt', e.target.value)}><option value="oz">oz</option><option value="lb">lb</option><option value="kg">kg</option></select>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div><label style={lab}>Precio de venta ({MARKET_CURRENCY[p.market || 'US']})</label><input style={darkInput} type="number" value={p.price} onChange={e => setP(i, { price: e.target.value })} /></div>
              <div><label style={lab}>Costo del producto ({MARKET_CURRENCY[p.market || 'US']})</label><input style={darkInput} type="number" value={p.cogs} onChange={e => setP(i, { cogs: e.target.value })} /></div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
        <button onClick={add} style={{ border: '1.5px dashed var(--app-tint-4,rgba(255,255,255,.25))', background: 'transparent', color: 'var(--app-fg-2,#bcc)', borderRadius: 10, padding: '11px 16px', cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>+ Agregar producto</button>
        <button onClick={next} disabled={!ready} title={ready ? '' : 'Captura dimensiones, peso y precio de cada producto'}
          style={{ marginLeft: 'auto', border: 0, background: ready ? ORANGE : 'rgba(244,121,32,.4)', color: '#1a120a', borderRadius: 10, padding: '11px 28px', cursor: ready ? 'pointer' : 'not-allowed', fontWeight: 800, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>Siguiente →</button>
      </div>
    </div>
  );
}

// Conversión de unidad conservando el valor (cm↔in, peso↔).
function changeUnit(p, i, setP, kind, next) {
  if (kind === 'dim') {
    if (next === p.dimUnit) return;
    const f = next === 'cm' ? CM_PER_INCH : 1 / CM_PER_INCH;
    const cv = v => (v === '' || v == null) ? '' : String(clampRound(parseFloat(v) * f, 3));
    setP(i, { dimUnit: next, L: cv(p.L), W: cv(p.W), H: cv(p.H) });
  } else {
    if (next === p.wUnit) return;
    const TO_OZ = { oz: 1, lb: 16, kg: 35.27396195 };
    const cv = v => { if (v === '' || v == null) return ''; const oz = parseFloat(v) * TO_OZ[p.wUnit]; return String(clampRound(oz / TO_OZ[next], next === 'oz' ? 1 : 3)); };
    setP(i, { wUnit: next, weight: cv(p.weight) });
  }
}

// Slider a nivel de módulo (NO dentro del render, para no remontar el input y
// perder el arrastre).
function Slider({ label, value, min, max, stp, onChange, hint, prefix, suffix }) {
  // value es el valor crudo (string) para que el campo se pueda editar libre;
  // el range usa el número. type=text + inputMode evita las flechitas (spinner)
  // y las trabas del input numérico.
  const num = (value === '' || value == null) ? 0 : (+value || 0);
  return (
    <div style={{ marginBottom: 13 }}>
      <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: 13, color: '#C7CED6', fontWeight: 600, marginBottom: 6 }}>
        <span>{label}</span>
        <span style={{ fontFamily: FONT_MONO, fontWeight: 700, color: ORANGE, fontSize: 15, display: 'inline-flex', alignItems: 'baseline' }}>
          {prefix}<input type="text" inputMode="decimal" value={value}
            onChange={e => onChange(e.target.value.replace(/[^0-9.]/g, ''))}
            style={{ width: 56, textAlign: 'right', fontFamily: FONT_MONO, fontWeight: 700, color: ORANGE, fontSize: 15, background: 'transparent', border: 0, borderBottom: '1px dashed rgba(244,121,32,.45)', outline: 'none', padding: '0 0 1px' }} />{suffix}
        </span>
      </label>
      <input className="calc-range" type="range" min={min} max={max} step={stp} value={num} onChange={e => onChange(e.target.value)} />
      {hint && <div style={{ fontSize: 11, color: '#9AA3AD', marginTop: 4, lineHeight: 1.35 }}>{hint}</div>}
    </div>
  );
}
function BRow({ label, value, sign = '−', total, net: isNet }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', fontSize: 12.5, padding: '3px 0', color: isNet || total ? '#fff' : '#C7CED6', fontWeight: total || isNet ? 700 : 400, borderTop: total ? '1px solid rgba(255,255,255,.12)' : 'none', marginTop: total ? 5 : 0, paddingTop: total ? 7 : 3 }}>
      <span>{label}</span>
      <span style={{ flex: 1, margin: '0 8px', borderBottom: isNet || total ? 'none' : '1px dotted rgba(255,255,255,.20)' }} />
      <span style={{ fontFamily: FONT_MONO, color: isNet ? '#7AD694' : 'inherit', whiteSpace: 'nowrap' }}>{value != null ? `${sign} ${money(value)}` : value}</span>
    </div>
  );
}
// Rubro personalizado: concepto + monto editables, con botón de quitar.
function ExtraRow({ label, amount, onLabel, onAmount, onRemove }) {
  const tIn = { background: 'transparent', border: 0, borderBottom: '1px dashed rgba(255,255,255,.28)', outline: 'none', color: '#C7CED6', fontSize: 12.5, padding: '0 0 1px' };
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', fontSize: 12.5, padding: '3px 0', color: '#C7CED6' }}>
      <input value={label} onChange={e => onLabel(e.target.value)} placeholder="Concepto" style={{ ...tIn, width: 130 }} />
      <span style={{ flex: 1, margin: '0 8px', borderBottom: '1px dotted rgba(255,255,255,.20)' }} />
      <span style={{ fontFamily: FONT_MONO, whiteSpace: 'nowrap' }}>− $<input value={amount} onChange={e => onAmount(e.target.value.replace(/[^0-9.]/g, ''))} placeholder="0.00" style={{ ...tIn, fontFamily: FONT_MONO, width: 52, textAlign: 'right' }} /></span>
      <button onClick={onRemove} title="Quitar rubro" style={{ marginLeft: 8, border: 0, background: 'none', color: 'rgba(255,255,255,.4)', cursor: 'pointer', fontSize: 12 }}>✕</button>
    </div>
  );
}

// ─────────── PASO 2 · Calculadora interactiva (sliders) ───────────
function Interactive({ products, active, setActive, setP, sched, schedFor, computeFor, inputFor, setStep }) {
  const p = products[active];
  const S = schedFor(p);
  const cur = MARKET_CURRENCY[p.market || 'US'];
  const [exporting, setExporting] = React.useState(false);
  const exportHTML = () => {
    if (!window.MEXUS_CALC_HTML) { alert('Export HTML no cargó.'); return; }
    window.MEXUS_CALC_HTML.download(products, sched, 'calculadora-' + (p.name || 'mexus').replace(/[^\w-]+/g, '-').toLowerCase());
  };
  const exportExcel = async () => {
    if (!window.MEXUS_CALC_EXCEL || !window.ExcelJS) { alert('ExcelJS no cargó (revisa conexión).'); return; }
    setExporting(true);
    try {
      const input = { ...inputFor(p), extras: (p.extras || []).map(e => ({ label: e.label || 'Extra', amount: +e.amount || 0 })) };
      await window.MEXUS_CALC_EXCEL.downloadExcel(S, input, 'calculadora-' + (p.name || 'producto').replace(/[^\w-]+/g, '-').toLowerCase() + '.xlsx');
    }
    catch (e) { alert('Error al exportar: ' + e.message); }
    setExporting(false);
  };
  const r = computeFor(p);
  const ok = r && !r.error;

  // Rubros personalizados (costos extra) restan al neto.
  const sumExtras = (p.extras || []).reduce((s, e) => s + (+e.amount || 0), 0);
  const PX = +p.price || 0;
  const net = (ok ? r.net : 0) - sumExtras;
  const netPct = PX ? clampRound((net / PX) * 100, 2) : 0;
  const roi = (ok && +p.cogs > 0) ? (net / +p.cogs) * 100 : null;
  const refRate = (ok && PX) ? r.fees.referral / PX : 0;
  const varRate = refRate + (+p.tacos || 0) / 100 + (+p.refunds || 0) / 100;
  const fixed = ok ? (r.fees.fba + r.fees.logistics + r.fees.storage + r.fees.cogs + sumExtras) : 0;
  const be = (ok && varRate < 1) ? fixed / (1 - varRate) : null;
  const addExtra = () => setP(active, { extras: [...(p.extras || []), { id: 'x' + Date.now() + Math.round(Math.random() * 999), label: '', amount: '' }] });
  const updateExtra = (i, patch) => setP(active, { extras: (p.extras || []).map((e, k) => k === i ? { ...e, ...patch } : e) });
  const removeExtra = (i) => setP(active, { extras: (p.extras || []).filter((_, k) => k !== i) });

  const verdict = netPct >= FLOOR ? { c: '#7AD694', bg: 'rgba(46,158,91,.18)', bd: 'rgba(46,158,91,.4)', t: 'SÓLIDO' }
    : netPct >= 8 ? { c: '#F0A83A', bg: 'rgba(199,120,0,.18)', bd: 'rgba(199,120,0,.4)', t: 'AJUSTADO' }
    : { c: '#E8857C', bg: 'rgba(192,57,43,.18)', bd: 'rgba(192,57,43,.4)', t: 'EN RIESGO' };
  const BAR_MAX = 40;
  const fillPct = Math.max(0, Math.min(100, (netPct / BAR_MAX) * 100));
  const threshPct = (FLOOR / BAR_MAX) * 100;
  const fillColor = netPct >= FLOOR ? '#2E9E5B' : netPct >= 8 ? '#C77800' : '#C0392B';

  const reset = () => p.base && setP(active, { ...p.base });
  // Precio/Costo: slider de ⅓ a 3× del valor BASE; el campo se puede editar a
  // mano (si escribes fuera del rango, el slider se extiende a ese valor).
  const b = p.base || { price: p.price, cogs: p.cogs, tacos: p.tacos, refunds: p.refunds };
  const rng$ = (v, lo) => { const x = +v || 0; return { min: Math.max(lo, Math.round(x / 3)), max: Math.max(lo + 1, Math.round(x * 3)) }; };
  const rPrice = rng$(b.price, 1), rCogs = rng$(b.cogs, 0);
  const ePrice = { min: Math.min(rPrice.min, Math.floor(+p.price || 0)), max: Math.max(rPrice.max, Math.ceil(+p.price || 0)) };
  const eCogs = { min: Math.min(rCogs.min, Math.floor(+p.cogs || 0)), max: Math.max(rCogs.max, Math.ceil(+p.cogs || 0)) };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <button onClick={() => setStep('form')} style={{ border: '1px solid var(--app-tint-4,rgba(255,255,255,.2))', background: 'transparent', color: 'var(--app-fg-2,#bcc)', borderRadius: 9, padding: '7px 12px', cursor: 'pointer', fontWeight: 600, fontSize: 12.5 }}>← Editar productos</button>
        {products.length > 1 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {products.map((pp, i) => (
              <button key={i} onClick={() => setActive(i)} style={{ border: `1.5px solid ${i === active ? ORANGE : 'var(--app-tint-4,rgba(255,255,255,.18))'}`, background: i === active ? 'rgba(244,121,32,.14)' : 'transparent', color: i === active ? ORANGE : 'var(--app-fg-2,#bcc)', borderRadius: 999, padding: '6px 14px', cursor: 'pointer', fontWeight: 700, fontSize: 12.5 }}>{pp.name || `Producto ${i + 1}`}</button>
            ))}
          </div>
        )}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button onClick={exportHTML} title="Calculadora interactiva en HTML para compartir con el cliente"
            style={{ border: '1px solid rgba(244,121,32,.5)', background: 'rgba(244,121,32,.12)', color: ORANGE, borderRadius: 9, padding: '7px 13px', cursor: 'pointer', fontWeight: 700, fontSize: 12.5, display: 'flex', alignItems: 'center', gap: 6 }}><CIcon name="file" size={13} /> Exportar HTML</button>
          <button onClick={exportExcel} disabled={exporting}
            style={{ border: '1px solid #1D7044', background: 'linear-gradient(180deg,#21845166,#1D704433)', color: '#34d399', borderRadius: 9, padding: '7px 13px', cursor: exporting ? 'wait' : 'pointer', fontWeight: 700, fontSize: 12.5, display: 'flex', alignItems: 'center', gap: 6 }}><CIcon name="file" size={13} /> {exporting ? 'Generando…' : 'Excel'}</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,340px) minmax(0,1fr)', gap: 20, alignItems: 'start' }}>
        {/* Panel de parámetros (sliders) — mismo estilo navy + borde naranja */}
        <div style={{ background: NAVY, borderRadius: 14, padding: '22px 22px 22px 26px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, width: 8, height: '100%', background: ORANGE }} />
          <div style={{ fontFamily: FONT_DISP, fontWeight: 800, fontSize: 18, textTransform: 'uppercase', letterSpacing: '1px', color: '#fff' }}>Parámetros</div>
          <div style={{ fontSize: 12, color: '#9AA3AD', marginBottom: 18 }}>Mueve para ver el margen en vivo</div>
          <Slider label={`Precio de venta (${cur})`} value={p.price} min={ePrice.min} max={ePrice.max} stp={1} onChange={v => setP(active, { price: v })} prefix="$" hint={(p.market === 'MX' ? 'Precio al cliente, IVA incluido. ' : '') + 'Slider ⅓–3× · o escribe el valor.'} />
          <Slider label="Costo del producto" value={p.cogs} min={eCogs.min} max={eCogs.max} stp={1} onChange={v => setP(active, { cogs: v })} prefix="$" />
          <Slider label="Publicidad" value={p.tacos} min={0} max={100} stp={1} onChange={v => setP(active, { tacos: v })} suffix="%" hint="TACOS · marca conocida gasta menos. Base 7%." />
          <Slider label="Devoluciones" value={p.refunds} min={0} max={100} stp={1} onChange={v => setP(active, { refunds: v })} suffix="%" hint="Previsión conservadora. Base 8%." />
          <button onClick={reset} style={{ width: '100%', marginTop: 4, padding: 10, border: '1.5px solid rgba(255,255,255,.18)', borderRadius: 9, background: 'transparent', color: '#9AA3AD', fontFamily: FONT_DISP, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.5px', fontSize: 12, cursor: 'pointer' }}>Restaurar valores base</button>
        </div>

        {/* Resultado navy */}
        <div style={{ background: NAVY, borderRadius: 14, padding: '18px 20px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, width: 8, height: '100%', background: ORANGE }} />
          {r && r.error && <div style={{ color: '#E8857C' }}>Error: {r.error}</div>}
          {ok && (
            <>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, paddingBottom: 13, borderBottom: '1px solid rgba(255,255,255,.12)' }}>
                <div>
                  <div style={{ fontFamily: FONT_DISP, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: ORANGE, fontSize: 12.5 }}>Margen neto</div>
                  <div style={{ fontSize: 13.5, color: '#C7CED6', marginTop: 3 }}>{p.name || 'Producto'} · {(S.referral[p.categoryKey] || {}).label || '—'} · Amazon {p.market || 'US'} ({cur})</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 46, lineHeight: .9, color: verdict.c }}>{netPct}%</div>
                  <div style={{ display: 'inline-block', marginTop: 6, fontFamily: FONT_DISP, fontWeight: 700, textTransform: 'uppercase', fontSize: 12, letterSpacing: '1px', padding: '4px 13px', borderRadius: 20, color: verdict.c, background: verdict.bg, border: `1px solid ${verdict.bd}` }}>{verdict.t}</div>
                </div>
              </div>

              {/* Barra vs piso 15% */}
              <div style={{ marginTop: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: '#9AA3AD', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 5 }}>
                  <span>0%</span><span>Margen vs. piso 15%</span><span>{BAR_MAX}%</span>
                </div>
                <div style={{ height: 26, background: NAVY_DK, borderRadius: 8, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: fillPct + '%', background: fillColor, borderRadius: 8, transition: 'width .35s ease, background .35s' }} />
                  <div style={{ position: 'absolute', top: -4, bottom: -4, left: threshPct + '%', width: 2, background: '#fff', opacity: .55 }} />
                </div>
              </div>

              {/* KPIs */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginTop: 14 }}>
                {[{ k: money0(net), l: 'Ganancia / par' }, { k: pct0(roi), l: 'Retorno s/inversión' }, { k: money0(be), l: 'Precio mínimo' }].map(x => (
                  <div key={x.l} style={{ background: NAVY_DK, borderRadius: 10, padding: '11px 13px' }}>
                    <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 21, color: '#fff' }}>{x.k}</div>
                    <div style={{ fontSize: 9.5, color: '#9AA3AD', textTransform: 'uppercase', letterSpacing: '1px', marginTop: 3 }}>{x.l}</div>
                  </div>
                ))}
              </div>

              {/* Desglose */}
              <div style={{ marginTop: 14, background: 'rgba(255,255,255,.04)', borderRadius: 10, padding: '12px 16px' }}>
                <div style={{ fontFamily: FONT_DISP, fontWeight: 700, textTransform: 'uppercase', fontSize: 11.5, letterSpacing: '1px', color: ORANGE, marginBottom: 7 }}>Desglose por par</div>
                <BRow label="Precio de venta" value={+p.price || 0} sign="" />
                <BRow label="Comisión por venta" value={r.fees.referral} />
                <BRow label="Envío y manejo (FBA)" value={r.fees.fba} />
                {r.fees.storage > 0 && <BRow label="Almacenamiento" value={r.fees.storage} />}
                <BRow label="Publicidad" value={r.fees.ads} />
                <BRow label="Devoluciones" value={r.fees.refunds} />
                <BRow label="Costo del producto" value={r.fees.cogs} />
                {(p.extras || []).map((ex, i) => (
                  <ExtraRow key={ex.id} label={ex.label} amount={ex.amount}
                    onLabel={v => updateExtra(i, { label: v })} onAmount={v => updateExtra(i, { amount: v })} onRemove={() => removeExtra(i)} />
                ))}
                <button onClick={addExtra} style={{ marginTop: 5, border: '1px dashed rgba(255,255,255,.22)', background: 'transparent', color: '#9AA3AD', borderRadius: 7, padding: '5px 10px', cursor: 'pointer', fontSize: 11.5, fontWeight: 600 }}>+ Agregar rubro</button>
                {/* Logística: siempre al fondo y editable (cambia por marca). */}
                <div style={{ display: 'flex', alignItems: 'baseline', fontSize: 12.5, padding: '3px 0', color: '#C7CED6', marginTop: 4 }}>
                  <span>Logística <span style={{ fontSize: 9.5, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '.5px' }}>· editable</span></span>
                  <span style={{ flex: 1, margin: '0 8px', borderBottom: '1px dotted rgba(255,255,255,.20)' }} />
                  <span style={{ fontFamily: FONT_MONO, whiteSpace: 'nowrap' }}>− $<input type="text" inputMode="decimal" value={p.logistics} onChange={e => setP(active, { logistics: e.target.value.replace(/[^0-9.]/g, '') })} style={{ width: 52, textAlign: 'right', fontFamily: FONT_MONO, fontWeight: 700, color: ORANGE, fontSize: 13, background: 'transparent', border: 0, borderBottom: '1px dashed rgba(244,121,32,.45)', outline: 'none', padding: '0 0 1px' }} /></span>
                </div>
                <BRow label="Ganancia neta" value={net} sign="=" net />
              </div>

              <div style={{ marginTop: 10, fontSize: 10, color: '#6B7280', lineHeight: 1.5, textAlign: 'center' }}>
                {p.market === 'MX'
                  ? <><b style={{ color: '#C7CED6' }}>Tarifas oficiales Amazon MX 2026 (MXN, IVA incluido)</b> · comisión {(S.referral[p.categoryKey] || {}).label} · FBA {r.fees.fbaBreakdown.band}{r.input.isSpecial ? ' · tarifa especial (Salud/Alimentos/Bebidas)' : ''}</>
                  : <><b style={{ color: '#C7CED6' }}>Tarifas oficiales Amazon US 2026 (USD)</b> · comisión {(S.referral[p.categoryKey] || {}).label} · FBA {r.fees.fbaBreakdown.band} + combustible 3.5%</>}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('calc-root')).render(<CalculatorView />);
