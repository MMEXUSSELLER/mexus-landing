/* global window, document */
// Exporta la calculadora a un HTML STANDALONE e interactivo para compartir con
// el cliente: trae los sliders (precio/costo/publicidad/devoluciones) y recalcula
// en vivo, sin depender de la plataforma. El FBA se fija al valor calculado por
// el motor (no cambia dentro del rango de precio típico); el referral se recalcula
// como % del precio. Diseño MEXUS (navy + naranja).
(function () {
  'use strict';

  // Escapa texto del usuario (nombre, categoría, rubros) antes de inyectarlo en
  // el innerHTML del HTML exportado.
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

  // Pre-cálculo por producto (usa el motor real una vez para fijar FBA/referral).
  // `sched` puede ser el JSON completo ({US, MX}) o un bloque suelto (legacy).
  function pre(schedAll, p) {
    const sched = schedAll && schedAll.US ? (schedAll[p.market] || schedAll.US) : schedAll;
    const inp = {
      categoryKey: p.categoryKey, isApparel: !!p.isApparel, price: +p.price || 0, cogs: +p.cogs || 0,
      dims: { l: +p.L || 0, w: +p.W || 0, h: +p.H || 0, unit: p.dimUnit }, weight: { value: +p.weight || 0, unit: p.wUnit },
      ads: { model: 'acos', amount: (+p.tacos || 0) / 100 }, refunds: { model: 'pct', amount: (+p.refunds || 0) / 100 },
      logistics: { unitsPerBox: 1, freight: { model: 'per_unit', amount: +p.logistics || 0 } },
    };
    const r = window.MEXUS_CALC.compute(sched, inp);
    const price = +p.price || 0;
    return {
      name: esc(p.name || 'Producto'), category: esc(sched.referral[p.categoryKey].label + (sched.market === 'MX' ? ' · Amazon MX (MXN)' : ' · Amazon US (USD)')),
      price, cogs: +p.cogs || 0, fba: r.fees.fba, logistics: +p.logistics || 0,
      refRate: price ? r.fees.referral / price : 0, tacos: +p.tacos || 0, refunds: +p.refunds || 0,
      extras: (p.extras || []).map(e => ({ label: esc(e.label || 'Extra'), amount: +e.amount || 0 })),
      fbaBand: esc(r.fees.fbaBreakdown.band),
    };
  }

  function template(data, title) {
    return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Montserrat:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
<style>
:root{--or:#F47920;--navy:#152232;--navydk:#0D1826;--gray:#9AA3AD;--disp:'Barlow Condensed',Impact,sans-serif;--sans:'Montserrat',system-ui,sans-serif;--mono:'JetBrains Mono',monospace;}
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#0b1119;color:#fff;font-family:var(--sans);font-size:14px;-webkit-font-smoothing:antialiased;padding:28px 18px 60px;}
.wrap{max-width:1080px;margin:0 auto;}
header{margin-bottom:18px;}
.kick{font-family:var(--mono);font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--or);}
h1{font-family:var(--disp);font-weight:800;font-size:30px;text-transform:uppercase;letter-spacing:.5px;margin-top:3px;}
header p{color:var(--gray);font-size:13px;margin-top:6px;max-width:620px;line-height:1.5;}
.tabs{display:flex;gap:7px;flex-wrap:wrap;margin:16px 0;}
.tab{border:1.5px solid rgba(255,255,255,.18);background:transparent;color:var(--gray);border-radius:999px;padding:6px 14px;cursor:pointer;font-weight:700;font-size:12.5px;}
.tab.on{border-color:var(--or);background:rgba(244,121,32,.14);color:var(--or);}
.layout{display:grid;grid-template-columns:minmax(0,330px) minmax(0,1fr);gap:18px;align-items:start;}
.panel{position:relative;overflow:hidden;background:var(--navy);border-radius:14px;padding:20px 20px 20px 24px;}
.panel::before{content:"";position:absolute;left:0;top:0;width:8px;height:100%;background:var(--or);}
.panel h2{font-family:var(--disp);font-weight:800;font-size:18px;text-transform:uppercase;letter-spacing:1px;}
.panel .sub{font-size:12px;color:var(--gray);margin-bottom:16px;}
.field{margin-bottom:13px;}
.field label{display:flex;justify-content:space-between;align-items:baseline;font-size:13px;color:#C7CED6;font-weight:600;margin-bottom:6px;}
.field .val{font-family:var(--mono);font-weight:700;color:var(--or);font-size:15px;}
.field .val input{width:56px;text-align:right;font-family:var(--mono);font-weight:700;color:var(--or);font-size:15px;background:transparent;border:0;border-bottom:1px dashed rgba(244,121,32,.45);outline:none;padding:0 0 1px;}
input[type=range]{width:100%;-webkit-appearance:none;height:5px;border-radius:3px;background:var(--navydk);outline:none;}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:var(--or);cursor:pointer;border:3px solid var(--navy);box-shadow:0 0 0 1px rgba(255,255,255,.18);}
.hint{font-size:11px;color:var(--gray);margin-top:4px;}
.reset{width:100%;margin-top:4px;padding:9px;border:1.5px solid rgba(255,255,255,.18);border-radius:9px;background:transparent;color:var(--gray);font-family:var(--disp);font-weight:700;text-transform:uppercase;letter-spacing:.5px;font-size:12px;cursor:pointer;}
.result{position:relative;overflow:hidden;background:var(--navy);border-radius:14px;padding:20px;}
.result::before{content:"";position:absolute;left:0;top:0;width:8px;height:100%;background:var(--or);}
.hero{display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:14px;padding-bottom:13px;border-bottom:1px solid rgba(255,255,255,.12);}
.hero .lbl{font-family:var(--disp);font-weight:700;text-transform:uppercase;letter-spacing:2px;color:var(--or);font-size:12.5px;}
.hero .nm{font-size:13.5px;color:#C7CED6;margin-top:3px;}
.big{font-family:var(--mono);font-weight:700;font-size:46px;line-height:.9;}
.verd{display:inline-block;margin-top:6px;font-family:var(--disp);font-weight:700;text-transform:uppercase;font-size:12px;letter-spacing:1px;padding:4px 13px;border-radius:20px;}
.barwrap{margin-top:13px;}
.bartop{display:flex;justify-content:space-between;font-size:10.5px;color:var(--gray);text-transform:uppercase;letter-spacing:1px;margin-bottom:5px;}
.bar{height:26px;background:var(--navydk);border-radius:8px;position:relative;overflow:hidden;}
.bar .fill{position:absolute;left:0;top:0;height:100%;border-radius:8px;transition:width .3s,background .3s;}
.bar .th{position:absolute;top:-4px;bottom:-4px;width:2px;background:#fff;opacity:.55;}
.kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:14px;}
.kpi{background:var(--navydk);border-radius:10px;padding:11px 13px;}
.kpi .k{font-family:var(--mono);font-weight:700;font-size:21px;}
.kpi .l{font-size:9.5px;color:var(--gray);text-transform:uppercase;letter-spacing:1px;margin-top:3px;}
.brk{margin-top:14px;background:rgba(255,255,255,.04);border-radius:10px;padding:12px 16px;}
.brk h3{font-family:var(--disp);font-weight:700;text-transform:uppercase;font-size:11.5px;letter-spacing:1px;color:var(--or);margin-bottom:7px;}
.row{display:flex;align-items:baseline;font-size:12.5px;padding:3px 0;color:#C7CED6;}
.row .dots{flex:1;margin:0 8px;border-bottom:1px dotted rgba(255,255,255,.2);}
.row .n{font-family:var(--mono);white-space:nowrap;}
.row.tot{border-top:1px solid rgba(255,255,255,.12);margin-top:5px;padding-top:7px;color:#fff;font-weight:700;}
.row.tot .n{color:#7AD694;}
footer{margin-top:18px;text-align:center;color:#6B7280;font-size:11px;line-height:1.6;}
footer b{color:#C7CED6;}
@media(max-width:760px){.layout{grid-template-columns:1fr;}}
</style></head><body><div class="wrap">
<header><div class="kick">MEXUS · Amazon Global Selling</div><h1>Calculadora de Rentabilidad</h1>
<p>Mueve precio, costo y supuestos para ver el margen neto por unidad en tiempo real. Tarifas oficiales de Amazon US 2026.</p></header>
<div class="tabs" id="tabs"></div>
<div class="layout">
  <div class="panel"><h2>Parámetros</h2><div class="sub">Mueve para ver el margen en vivo</div>
    <div class="field"><label>Precio de venta (USD) <span class="val">$<input id="i_price"></span></label><input type="range" id="r_price"><div class="hint">Slider ⅓–3× · o escribe el valor.</div></div>
    <div class="field"><label>Costo del producto <span class="val">$<input id="i_cogs"></span></label><input type="range" id="r_cogs"></div>
    <div class="field"><label>Publicidad <span class="val"><input id="i_tacos">%</span></label><input type="range" id="r_tacos" min="0" max="100" step="1"><div class="hint">TACOS. Base del producto.</div></div>
    <div class="field"><label>Devoluciones <span class="val"><input id="i_ref">%</span></label><input type="range" id="r_ref" min="0" max="100" step="1"></div>
    <button class="reset" id="reset">Restaurar valores base</button>
  </div>
  <div class="result"><div class="hero"><div><div class="lbl">Margen neto</div><div class="nm" id="nm"></div></div>
    <div style="text-align:right"><div class="big" id="big">0%</div><div class="verd" id="verd"></div></div></div>
    <div class="barwrap"><div class="bartop"><span>0%</span><span>Margen vs. piso 15%</span><span>40%</span></div>
      <div class="bar"><div class="fill" id="fill"></div><div class="th" id="th"></div></div></div>
    <div class="kpis"><div class="kpi"><div class="k" id="k_net">$0</div><div class="l">Ganancia / unidad</div></div>
      <div class="kpi"><div class="k" id="k_roi">0%</div><div class="l">Retorno s/inversión</div></div>
      <div class="kpi"><div class="k" id="k_be">$0</div><div class="l">Precio mínimo</div></div></div>
    <div class="brk"><h3>Desglose por unidad</h3><div id="rows"></div></div>
    <footer><b>Tarifas oficiales Amazon US 2026</b> · comisión + FBA <span id="fband"></span> + combustible 3.5% · <span id="ftcat"></span></footer>
  </div>
</div></div>
<script>
const DATA=${JSON.stringify(data)};
let A=0; const live=DATA.map(d=>({price:d.price,cogs:d.cogs,tacos:d.tacos,refunds:d.refunds}));
const $=id=>document.getElementById(id);
const m=n=>'$'+Math.round(n).toLocaleString('en-US'), m2=n=>'$'+Number(n).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const FLOOR=15,BMAX=40;
function calc(d,s){const ref=s.price*d.refRate,adv=s.price*s.tacos/100,rf=s.price*s.refunds/100,ex=d.extras.reduce((a,e)=>a+e.amount,0);
  const total=ref+d.fba+d.logistics+adv+rf+s.cogs+ex,net=s.price-total,margin=s.price?net/s.price*100:0,roi=s.cogs?net/s.cogs*100:0;
  const vr=d.refRate+s.tacos/100+s.refunds/100,be=vr<1?(s.cogs+d.fba+d.logistics+ex)/(1-vr):null;
  return {ref,adv,rf,ex,net,margin,roi,be};}
function tabs(){$('tabs').innerHTML=DATA.length<2?'':DATA.map((d,i)=>'<button class="tab '+(i===A?'on':'')+'" data-i="'+i+'">'+d.name+'</button>').join('');
  [...document.querySelectorAll('.tab')].forEach(b=>b.onclick=()=>{A=+b.dataset.i;sync();render();});}
function rng(base){return {min:Math.max(1,Math.round(base/3)),max:Math.round(base*3)};}
function sync(){const d=DATA[A],s=live[A];const rp=rng(DATA[A].price),rc=rng(DATA[A].cogs);
  $('r_price').min=Math.min(rp.min,Math.floor(s.price));$('r_price').max=Math.max(rp.max,Math.ceil(s.price));$('r_price').value=s.price;
  $('r_cogs').min=Math.min(rc.min,Math.floor(s.cogs));$('r_cogs').max=Math.max(rc.max,Math.ceil(s.cogs));$('r_cogs').value=s.cogs;
  $('r_tacos').value=s.tacos;$('r_ref').value=s.refunds;
  $('i_price').value=s.price;$('i_cogs').value=s.cogs;$('i_tacos').value=s.tacos;$('i_ref').value=s.refunds;}
function render(){const d=DATA[A],s=live[A],c=calc(d,s);
  const pct=Math.round(c.margin*100)/100;
  const vc=pct>=FLOOR?'#7AD694':pct>=8?'#F0A83A':'#E8857C',vb=pct>=FLOOR?'rgba(46,158,91,.18)':pct>=8?'rgba(199,120,0,.18)':'rgba(192,57,43,.18)';
  const vt=pct>=FLOOR?'SÓLIDO':pct>=8?'AJUSTADO':'EN RIESGO',fc=pct>=FLOOR?'#2E9E5B':pct>=8?'#C77800':'#C0392B';
  $('nm').textContent=d.name+' · '+d.category;$('big').textContent=pct+'%';$('big').style.color=vc;
  $('verd').textContent=vt;$('verd').style.color=vc;$('verd').style.background=vb;$('verd').style.border='1px solid '+vc;
  $('fill').style.width=Math.max(0,Math.min(100,pct/BMAX*100))+'%';$('fill').style.background=fc;$('th').style.left=(FLOOR/BMAX*100)+'%';
  $('k_net').textContent=m(c.net);$('k_roi').textContent=Math.round(c.roi)+'%';$('k_be').textContent=c.be==null?'—':m(c.be);
  let rows='<div class="row"><span>Precio de venta</span><span class="dots"></span><span class="n">'+m2(s.price)+'</span></div>';
  const line=(l,v)=>'<div class="row"><span>'+l+'</span><span class="dots"></span><span class="n">− '+m2(v)+'</span></div>';
  rows+=line('Comisión por venta',c.ref)+line('Envío y manejo (FBA)',d.fba)+line('Publicidad',c.adv)+line('Devoluciones',c.rf)+line('Costo del producto',s.cogs);
  d.extras.forEach(e=>rows+=line(e.label,e.amount));
  rows+=line('Logística',d.logistics);
  rows+='<div class="row tot"><span>Ganancia neta</span><span class="dots"></span><span class="n">= '+m2(c.net)+'</span></div>';
  $('rows').innerHTML=rows;$('fband').textContent=d.fbaBand;$('ftcat').textContent='comisión '+d.category;}
function bind(id,key,parse){const r=$('r_'+id),i=$('i_'+id);
  r.oninput=()=>{live[A][key]=parse(r.value);i.value=r.value;render();};
  i.oninput=()=>{const v=i.value.replace(/[^0-9.]/g,'');i.value=v;live[A][key]=parse(v||0);r.value=parse(v||0);render();};}
bind('price','price',Number);bind('cogs','cogs',Number);bind('tacos','tacos',Number);bind('ref','refunds',Number);
$('reset').onclick=()=>{live[A]={price:DATA[A].price,cogs:DATA[A].cogs,tacos:DATA[A].tacos,refunds:DATA[A].refunds};sync();render();};
tabs();sync();render();
</script></body></html>`;
  }

  window.MEXUS_CALC_HTML = {
    build(products, sched, title) {
      const data = products.filter(p => +p.price > 0).map(p => pre(sched, p));
      return template(data, title || 'Calculadora de Rentabilidad · MEXUS');
    },
    download(products, sched, fname) {
      const html = this.build(products, sched);
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = (fname || 'calculadora-mexus') + '.html';
      document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    },
  };
})();
