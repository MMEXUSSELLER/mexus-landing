/* global window, module */
// ─── MEXUS — Exportador de la calculadora a Excel con fórmulas vivas ──
// Genera un .xlsx con branding MEXUS: la hoja "Calculadora" (visible) trae
// inputs editables + P&L con FÓRMULAS — el cliente mueve un input y el Excel
// recalcula solo. La hoja "Tarifas" (OCULTA) contiene las tablas de lookup y
// las celdas de cálculo intermedias. Soporta Amazon US (imperial, 3 bandas de
// precio, apparel, fuel) y Amazon MX (métrico, 4 bandas, tabla especial de
// Salud/Alimentos/Bebidas, IVA incluido).
//
// Lookup de FBA: tabla única ordenada por CLAVE numérica compuesta =
// flag*100000 + tierRank*1000 + límiteInferior, y MATCH aproximado. El flag es
// apparel (US) o tarifa especial (MX). Robusto en Excel y Google Sheets.

(function () {
  'use strict';

  const NAVY = 'FF152232', NAVY_DK = 'FF0D1826', ORANGE = 'FFF47920';
  const INK = 'FF152232', GRAY = 'FF6B7280', WHITE = 'FFFFFFFF';
  const INPUT_BG = 'FFFFF3E8', LINE = 'FFD8DEE6';

  const TIER_RANK_US = {
    small_standard: 1, large_standard: 2, large_bulky: 3,
    extra_large_0_50: 4, extra_large_50_70: 5, extra_large_70_150: 6, extra_large_150_plus: 7,
  };
  const TIER_RANK_MX = { sobre: 1, estandar: 2, grande: 3 };
  const SURCH_INT = { lb: 1, half_lb: 0.5, '4oz': 0.25, kg: 1, half_kg: 0.5, quarter_kg: 0.25 };

  function isMX(S) { return S.market === 'MX'; }

  // ── Filas de la tabla FBA unificada (4 columnas de banda; US duplica la 3ª) ──
  function rowUpperUS(r) { if (r.maxOz != null) return r.maxOz / 16; if (r.maxLb != null) return r.maxLb; return 99999; }

  function buildFbaRows(S) {
    const out = [];
    if (isMX(S)) {
      const add = (rows, flag) => {
        const byTier = {};
        rows.forEach(r => { (byTier[r.tier] = byTier[r.tier] || []).push(r); });
        Object.keys(byTier).forEach(tier => {
          const rank = TIER_RANK_MX[tier];
          let lower = 0;
          byTier[tier].forEach(r => {
            // Límite inferior INCLUSIVO (peso = 0.10 kg cae en la banda 0.10-0.20,
            // observado en settlements MX) — la clave usa el límite sin epsilon.
            const s = r.surcharge;
            out.push({
              key: flag * 100000 + rank * 1000 + lower,
              b1: r.fee.lt150, b2: r.fee.p150to299, b3: r.fee.p299to499, b4: r.fee.gte499,
              surchAbove: s ? s.aboveKg : 99999,
              surchInterval: s ? (SURCH_INT[s.per] || 1) : 1,
              sa1: s ? s.amount.lt150 : 0, sa2: s ? s.amount.p150to299 : 0,
              sa3: s ? s.amount.p299to499 : 0, sa4: s ? s.amount.gte499 : 0,
              label: (flag ? 'especial ' : '') + tier + ' ' + r.band,
            });
            lower = r.maxKg == null ? 99999 : r.maxKg;
          });
        });
      };
      add(S.fbaFees.rows, 0);
      add(S.fbaFeesSpecial.rows, 1);
    } else {
      const add = (rows, flag) => {
        const byTier = {};
        rows.forEach(r => { if (r.tier === 'small_bulky') return; (byTier[r.tier] = byTier[r.tier] || []).push(r); });
        Object.keys(byTier).forEach(tier => {
          const rank = TIER_RANK_US[tier];
          const sorted = byTier[tier].slice().sort((a, b) => rowUpperUS(a) - rowUpperUS(b));
          let lower = 0;
          sorted.forEach(r => {
            // +1e-4: límite inferior EXCLUSIVO en US (peso = límite cae en la
            // banda de abajo, como Amazon "4+ a 8oz").
            const lt10 = flag ? r.fee : r.fee.lt10;
            const p1050 = flag ? r.fee : r.fee.p10to50;
            const gt50 = flag ? r.fee : r.fee.gt50;
            const s = r.surcharge;
            const amt = s ? s.amount : 0;
            out.push({
              key: flag * 100000 + rank * 1000 + (lower + 1e-4),
              b1: lt10, b2: p1050, b3: gt50, b4: gt50,
              surchAbove: s ? s.aboveLb : 99999,
              surchInterval: s ? (SURCH_INT[s.per] || 1) : 1,
              sa1: amt, sa2: amt, sa3: amt, sa4: amt,
              label: (flag ? 'apparel ' : '') + tier + ' ' + r.band,
            });
            lower = rowUpperUS(r);
          });
        });
      };
      add(S.fbaFees.rows, 0);
      add(S.fbaFeesApparel.rows, 1);
    }
    return out.sort((a, b) => a.key - b.key);
  }

  // ── Filas de referral con hasta 4 brackets + flag de tabla especial (MX) ──
  function buildReferralRows(S) {
    const BIG = 1e12;
    const special = S.specialFbaCategories || [];
    const keys = Object.keys(S.referral).filter(k => !k.startsWith('_'));
    return keys.map(k => {
      const c = S.referral[k];
      const mode = c.mode === 'flat' ? 1 : c.mode === 'threshold' ? 2 : 3;
      const b = (c.brackets || []).map(x => ({ upto: x.upTo == null ? BIG : x.upTo, pct: x.pct }));
      const flatPct = c.mode === 'flat' ? c.pct : (b[0] ? b[0].pct : 0);
      const g = i => b[i] || { upto: BIG, pct: b.length ? b[b.length - 1].pct : flatPct };
      return {
        label: c.label, mode,
        u1: c.mode === 'flat' ? BIG : g(0).upto, p1: c.mode === 'flat' ? flatPct : g(0).pct,
        u2: g(1).upto, p2: g(1).pct, u3: g(2).upto, p3: g(2).pct, u4: g(3).upto, p4: g(3).pct,
        min: c.min || 0,
        esp: special.indexOf(k) !== -1 ? 1 : 0,
      };
    });
  }

  // ── Construye el workbook ───────────────────────────────────────
  // opts.logoBuffer: ArrayBuffer/Buffer PNG del logo (opcional).
  function buildWorkbook(ExcelJS, S, input, opts) {
    opts = opts || {};
    const mx = isMX(S);
    const cur = S.currency || (mx ? 'MXN' : 'USD');
    const FMT_MONEY = '$#,##0.00 "' + cur + '"';
    const wb = new ExcelJS.Workbook();
    wb.calcProperties.fullCalcOnLoad = true; // recalcular al abrir
    const C = wb.addWorksheet('Calculadora', { views: [{ showGridLines: false }] });
    const T = wb.addWorksheet('Tarifas');

    const f = (formula) => ({ formula });

    // ════ Hoja Tarifas (se oculta al final) ════
    // —— Referral ——
    const refRows = buildReferralRows(S);
    const setRow = (rowNum, vals) => vals.forEach((v, ci) => { T.getCell(rowNum, ci + 1).value = v; });
    setRow(1, ['Referral (categoría)', 'mode', 'u1', 'p1', 'u2', 'p2', 'u3', 'p3', 'u4', 'p4', 'min', 'esp']);
    refRows.forEach((r, i) => {
      setRow(2 + i, [r.label, r.mode, r.u1, r.p1, r.u2, r.p2, r.u3, r.p3, r.u4, r.p4, r.min, r.esp]);
    });
    const refEnd = 1 + refRows.length;
    const REF = {
      LABELS: `Tarifas!$A$2:$A$${refEnd}`, MODE: `Tarifas!$B$2:$B$${refEnd}`,
      U1: `Tarifas!$C$2:$C$${refEnd}`, P1: `Tarifas!$D$2:$D$${refEnd}`,
      U2: `Tarifas!$E$2:$E$${refEnd}`, P2: `Tarifas!$F$2:$F$${refEnd}`,
      U3: `Tarifas!$G$2:$G$${refEnd}`, P3: `Tarifas!$H$2:$H$${refEnd}`,
      U4: `Tarifas!$I$2:$I$${refEnd}`, P4: `Tarifas!$J$2:$J$${refEnd}`,
      MIN: `Tarifas!$K$2:$K$${refEnd}`, ESP: `Tarifas!$L$2:$L$${refEnd}`,
    };

    // —— FBA (clave compuesta, 4 columnas de banda) ——
    const fbaHeadRow = refEnd + 3;
    const fbaRows = buildFbaRows(S);
    setRow(fbaHeadRow, ['FBA key', 'fee b1', 'fee b2', 'fee b3', 'fee b4', 'surchAbove', 'surchInt', 'sa b1', 'sa b2', 'sa b3', 'sa b4', 'descripción']);
    fbaRows.forEach((r, i) => {
      setRow(fbaHeadRow + 1 + i, [r.key, r.b1, r.b2, r.b3, r.b4, r.surchAbove, r.surchInterval, r.sa1, r.sa2, r.sa3, r.sa4, r.label]);
    });
    const fbaStart = fbaHeadRow + 1, fbaEnd = fbaHeadRow + fbaRows.length;
    const FBA = {
      KEY: `Tarifas!$A$${fbaStart}:$A$${fbaEnd}`,
      FEES: `Tarifas!$B$${fbaStart}:$E$${fbaEnd}`,   // INDEX 2D por banda
      SA: `Tarifas!$F$${fbaStart}:$F$${fbaEnd}`, SI: `Tarifas!$G$${fbaStart}:$G$${fbaEnd}`,
      SAMTS: `Tarifas!$H$${fbaStart}:$K$${fbaEnd}`, // INDEX 2D por banda
    };

    // —— Constantes (storage + fuel) ——
    const cRow = fbaEnd + 3;
    const st = S.storage;
    T.getCell(`A${cRow}`).value = 'storage std ene-sep'; T.getCell(`B${cRow}`).value = st.standard.jan_sep;
    T.getCell(`A${cRow + 1}`).value = 'storage std oct-dic'; T.getCell(`B${cRow + 1}`).value = st.standard.oct_dec;
    T.getCell(`A${cRow + 2}`).value = 'storage ovz ene-sep'; T.getCell(`B${cRow + 2}`).value = st.oversize.jan_sep;
    T.getCell(`A${cRow + 3}`).value = 'storage ovz oct-dic'; T.getCell(`B${cRow + 3}`).value = st.oversize.oct_dec;
    T.getCell(`A${cRow + 4}`).value = 'fuel surcharge'; T.getCell(`B${cRow + 4}`).value = S.fuelSurchargePct || 0;
    const ST = { STD_JS: `Tarifas!$B$${cRow}`, STD_OD: `Tarifas!$B$${cRow + 1}`, OVZ_JS: `Tarifas!$B$${cRow + 2}`, OVZ_OD: `Tarifas!$B$${cRow + 3}`, FUEL: `Tarifas!$B$${cRow + 4}` };

    // ════ Hoja Calculadora: layout con branding ════
    ['A', 'B', 'C', 'D', 'E', 'F'].forEach((col, i) => { C.getColumn(col).width = [32, 20, 24, 6, 6, 6][i]; });

    // —— Banner navy (filas 1-4) ——
    C.mergeCells('A1:F4');
    const banner = C.getCell('A1');
    banner.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
    banner.value = 'CALCULADORA DE RENTABILIDAD — AMAZON ' + (mx ? 'MÉXICO' : 'US');
    banner.font = { name: 'Arial Black', size: 16, bold: true, color: { argb: WHITE } };
    banner.alignment = { vertical: 'middle', horizontal: 'center' };
    if (opts.logoBuffer) {
      try {
        const imgId = wb.addImage({ buffer: opts.logoBuffer, extension: 'png' });
        C.addImage(imgId, { tl: { col: 0.15, row: 0.55 }, ext: { width: 132, height: 33 } });
        banner.alignment = { vertical: 'middle', horizontal: 'center', indent: 4 };
      } catch (e) { /* sin logo no pasa nada */ }
    }
    C.mergeCells('A5:F5');
    const sub = C.getCell('A5');
    sub.value = 'MEXUS Seller · Tarifas oficiales Amazon ' + (mx ? 'MX' : 'US') + ' 2026' + (mx ? ' · MXN, IVA incluido' : ' · USD') + ' · mueve cualquier celda naranja y el P&L recalcula solo';
    sub.font = { size: 9, italic: true, color: { argb: GRAY } };
    sub.alignment = { horizontal: 'center' };

    const sectionHeader = (row, text) => {
      C.mergeCells(`A${row}:C${row}`);
      const cell = C.getCell(`A${row}`);
      cell.value = text;
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: ORANGE } };
      cell.font = { size: 11, bold: true, color: { argb: WHITE } };
      cell.alignment = { vertical: 'middle', indent: 1 };
      C.getRow(row).height = 20;
    };

    const inputCell = (addr) => {
      const cell = C.getCell(addr);
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: INPUT_BG } };
      cell.font = { bold: true, color: { argb: INK } };
      cell.border = { top: { style: 'thin', color: { argb: LINE } }, bottom: { style: 'thin', color: { argb: LINE } }, left: { style: 'thin', color: { argb: LINE } }, right: { style: 'thin', color: { argb: LINE } } };
      return cell;
    };
    const labelCell = (addr, text) => {
      const cell = C.getCell(addr);
      cell.value = text;
      cell.font = { size: 10, color: { argb: INK } };
      cell.alignment = { vertical: 'middle' };
      return cell;
    };
    const hintCell = (addr, text) => {
      const cell = C.getCell(addr);
      cell.value = text;
      cell.font = { size: 8.5, italic: true, color: { argb: GRAY } };
      return cell;
    };

    // —— Parámetros ——
    sectionHeader(7, 'PARÁMETROS DEL PRODUCTO');
    const inp = input || {};
    const defCat = inp.categoryKey && S.referral[inp.categoryKey] ? inp.categoryKey : (mx ? 'todo_lo_demas' : 'everything_else');
    const rows = [
      ['Producto', inp.name || '', ''],
      ['Categoría (comisión)', S.referral[defCat].label, 'define el % de comisión'],
    ];
    if (!mx) rows.push(['¿Apparel?', inp.isApparel ? 'Sí' : 'No', 'ropa usa tabla FBA propia']);
    rows.push(
      ['Precio de venta (' + cur + ')', inp.price != null ? +inp.price : (mx ? 299 : 24.99), mx ? 'precio al cliente, IVA incluido' : ''],
      ['Costo del producto (' + cur + ')', inp.cogs != null ? +inp.cogs : 0, 'COGS por unidad'],
      ['Unidad de dimensiones', (inp.dims && inp.dims.unit) || (mx ? 'cm' : 'in'), 'in o cm'],
      ['Largo', inp.dims ? +inp.dims.l : 0, ''],
      ['Ancho', inp.dims ? +inp.dims.w : 0, ''],
      ['Alto', inp.dims ? +inp.dims.h : 0, ''],
      ['Unidad de peso', (inp.weight && inp.weight.unit) || (mx ? 'kg' : 'oz'), 'oz, lb o kg'],
      ['Peso', inp.weight ? +inp.weight.value : 0, ''],
      ['Publicidad — TACOS %', inp.ads ? (inp.ads.model === 'acos' ? +inp.ads.amount * 100 : 0) : 7, '% del precio invertido en ads'],
      ['Devoluciones %', inp.refunds ? (inp.refunds.model === 'pct' ? +inp.refunds.amount * 100 : 0) : 8, 'previsión sobre el precio'],
      ['Meses de almacenamiento', inp.storage ? +inp.storage.months : 0, 'meses promedio en FBA'],
      ['Periodo de almacenamiento', inp.storage && inp.storage.period === 'oct_dec' ? 'oct-dic' : 'ene-sep', ''],
      ['Logística por unidad (' + cur + ')', inp.logistics && inp.logistics.freight ? +inp.logistics.freight.amount : 0, 'flete/importación por unidad'],
    );
    const r0 = 8;
    rows.forEach((rw, i) => {
      labelCell(`A${r0 + i}`, rw[0]);
      inputCell(`B${r0 + i}`).value = rw[1];
      if (rw[2]) hintCell(`C${r0 + i}`, rw[2]);
    });
    const keys = mx
      ? ['producto', 'categoria', 'precio', 'cogs', 'dimUnit', 'L', 'W', 'H', 'wUnit', 'peso', 'tacos', 'devol', 'stMonths', 'stPeriod', 'logistica']
      : ['producto', 'categoria', 'apparel', 'precio', 'cogs', 'dimUnit', 'L', 'W', 'H', 'wUnit', 'peso', 'tacos', 'devol', 'stMonths', 'stPeriod', 'logistica'];
    const R = {};
    keys.forEach((k, i) => { R[k] = `'Calculadora'!$B$${r0 + i}`; });
    ['precio', 'cogs', 'logistica'].forEach(k => { C.getCell(R[k].replace(/'Calculadora'!\$B\$/, 'B')).numFmt = FMT_MONEY; });
    ['tacos', 'devol'].forEach(k => { C.getCell(R[k].replace(/'Calculadora'!\$B\$/, 'B')).numFmt = '0"%"'; });

    // —— Rubros adicionales (editables; entran al P&L) ——
    const extrasHead = r0 + rows.length + 1;
    sectionHeader(extrasHead, 'RUBROS ADICIONALES (opcional)');
    const extras = (inp.extras || []).slice(0, 6);
    const EXTRA_SLOTS = Math.max(3, extras.length);
    for (let i = 0; i < EXTRA_SLOTS; i++) {
      const rr = extrasHead + 1 + i;
      const ex = extras[i];
      inputCell(`A${rr}`).value = ex ? (ex.label || 'Extra') : '';
      C.getCell(`A${rr}`).font = { size: 10, color: { argb: INK } };
      inputCell(`B${rr}`).value = ex ? +ex.amount || 0 : 0;
      C.getCell(`B${rr}`).numFmt = FMT_MONEY;
    }
    hintCell(`C${extrasHead + 1}`, 'costos extra por unidad (empaque, comisiones, etc.)');
    const EXTRAS_RANGE = `'Calculadora'!$B$${extrasHead + 1}:$B$${extrasHead + EXTRA_SLOTS}`;

    // ════ Cálculos intermedios (en Tarifas, quedan ocultos) ════
    const X = cRow + 7; // fila base del bloque de cálculo
    const put = (off, label, formula) => {
      T.getCell(`D${X + off}`).value = label;
      T.getCell(`E${X + off}`).value = f(formula);
      return `Tarifas!$E$${X + off}`;
    };
    let D = {};
    if (mx) {
      // Canónico: cm + kg
      D.L = put(0, 'cm L', `IF(${R.dimUnit}="in",${R.L}*2.54,${R.L})`);
      D.W = put(1, 'cm W', `IF(${R.dimUnit}="in",${R.W}*2.54,${R.W})`);
      D.H = put(2, 'cm H', `IF(${R.dimUnit}="in",${R.H}*2.54,${R.H})`);
      D.kg = put(3, 'peso kg', `IF(${R.wUnit}="oz",${R.peso}/35.27396195,IF(${R.wUnit}="lb",${R.peso}/2.2046226,${R.peso}))`);
      D.longest = put(4, 'longest', `MAX(${D.L},${D.W},${D.H})`);
      D.shortest = put(5, 'shortest', `MIN(${D.L},${D.W},${D.H})`);
      D.median = put(6, 'median', `${D.L}+${D.W}+${D.H}-${D.longest}-${D.shortest}`);
      D.tier = put(7, 'tierRank', `IF(AND(${D.longest}<=38,${D.median}<=27,${D.shortest}<=2),1,IF(AND(${D.longest}<=45,${D.median}<=35,${D.shortest}<=20),2,3))`);
      D.billable = D.kg;
      D.flag = put(8, 'especialFlag', `INDEX(${REF.ESP},MATCH(${R.categoria},${REF.LABELS},0))`);
      D.band = put(9, 'bandIdx', `IF(${R.precio}<150,1,IF(${R.precio}<299,2,IF(${R.precio}<499,3,4)))`);
    } else {
      D.L = put(0, 'in L', `IF(${R.dimUnit}="cm",${R.L}/2.54,${R.L})`);
      D.W = put(1, 'in W', `IF(${R.dimUnit}="cm",${R.W}/2.54,${R.W})`);
      D.H = put(2, 'in H', `IF(${R.dimUnit}="cm",${R.H}/2.54,${R.H})`);
      D.wlb = put(3, 'peso lb', `IF(${R.wUnit}="oz",${R.peso}/16,IF(${R.wUnit}="kg",${R.peso}*2.2046226,${R.peso}))`);
      D.longest = put(4, 'longest', `MAX(${D.L},${D.W},${D.H})`);
      D.shortest = put(5, 'shortest', `MIN(${D.L},${D.W},${D.H})`);
      D.median = put(6, 'median', `${D.L}+${D.W}+${D.H}-${D.longest}-${D.shortest}`);
      D.oz = put(7, 'oz', `${D.wlb}*16`);
      D.dimW = put(8, 'dimWeight', `(${D.L}*${D.W}*${D.H})/${S.dimWeightDivisor}`);
      D.lenGirth = put(9, 'lengthGirth', `${D.longest}+2*(${D.median}+${D.shortest})`);
      D.tier = put(10, 'tierRank',
        `IF(AND(${D.oz}<=16,${D.longest}<=15,${D.median}<=12,${D.shortest}<=0.75),1,` +
        `IF(AND(${D.wlb}<=20,${D.longest}<=18,${D.median}<=14,${D.shortest}<=8),2,` +
        `IF(AND(${D.wlb}<=50,${D.longest}<=59,${D.lenGirth}<=130),3,` +
        `IF(${D.wlb}<=50,4,IF(${D.wlb}<=70,5,IF(${D.wlb}<=150,6,7))))))`);
      D.billable = put(11, 'billable lb', `IF(${D.tier}=1,${D.wlb},MAX(${D.wlb},${D.dimW}))`);
      D.flag = put(12, 'apparelFlag', `IF(${R.apparel}="Sí",1,0)`);
      D.band = put(13, 'bandIdx', `IF(${R.precio}<=10,1,IF(${R.precio}<=50,2,3))`);
    }
    const XO = mx ? 10 : 14; // siguiente offset libre

    // FBA: clave compuesta → MATCH aproximado → INDEX 2D por banda de precio.
    D.key = put(XO, 'lookupKey', `${D.flag}*100000+${D.tier}*1000+${D.billable}`);
    const MK = `MATCH(${D.key},${FBA.KEY},1)`;
    D.fbaBase = put(XO + 1, 'FBA base', `INDEX(${FBA.FEES},${MK},${D.band})`);
    D.surch = put(XO + 2, 'FBA surcharge',
      `IF(${D.billable}>INDEX(${FBA.SA},${MK}),` +
      `CEILING((${D.billable}-INDEX(${FBA.SA},${MK}))/INDEX(${FBA.SI},${MK}),1)*INDEX(${FBA.SAMTS},${MK},${D.band}),0)`);
    D.fbaTotal = put(XO + 3, 'FBA total', `(${D.fbaBase}+${D.surch})*(1+${ST.FUEL})`);

    // Referral: idx → params → fórmula por modo (flat/threshold/marginal) + mínimo.
    const RIDX = put(XO + 4, 'ref idx', `MATCH(${R.categoria},${REF.LABELS},0)`);
    const RP = {};
    [['mode', REF.MODE], ['u1', REF.U1], ['p1', REF.P1], ['u2', REF.U2], ['p2', REF.P2],
     ['u3', REF.U3], ['p3', REF.P3], ['u4', REF.U4], ['p4', REF.P4], ['min', REF.MIN]].forEach((rp, i) => {
      RP[rp[0]] = put(XO + 5 + i, 'ref ' + rp[0], `INDEX(${rp[1]},${RIDX})`);
    });
    D.referral = put(XO + 15, 'referral',
      `MAX(${RP.min},IF(${RP.mode}=1,${R.precio}*${RP.p1},` +
      `IF(${RP.mode}=2,IF(${R.precio}<=${RP.u1},${R.precio}*${RP.p1},IF(${R.precio}<=${RP.u2},${R.precio}*${RP.p2},IF(${R.precio}<=${RP.u3},${R.precio}*${RP.p3},${R.precio}*${RP.p4}))),` +
      `${RP.p1}*MIN(${R.precio},${RP.u1})+${RP.p2}*MAX(0,MIN(${R.precio},${RP.u2})-${RP.u1})+${RP.p3}*MAX(0,MIN(${R.precio},${RP.u3})-${RP.u2})+${RP.p4}*MAX(0,${R.precio}-${RP.u3}))))`);

    // Almacenamiento: US ft³ · MX dm³. Oversize = tiers arriba del estándar.
    const volExpr = mx ? `(${D.L}*${D.W}*${D.H})/1000` : `(${D.L}*${D.W}*${D.H})/1728`;
    const isOvz = mx ? `${D.tier}>2` : `${D.tier}>2`;
    D.storage = put(XO + 16, 'storage/u',
      `${volExpr}*IF(${isOvz},IF(${R.stPeriod}="oct-dic",${ST.OVZ_OD},${ST.OVZ_JS}),IF(${R.stPeriod}="oct-dic",${ST.STD_OD},${ST.STD_JS}))*${R.stMonths}`);

    // ════ Resultado (P&L) en Calculadora ════
    const o0 = extrasHead + EXTRA_SLOTS + 2;
    sectionHeader(o0, 'RESULTADO POR UNIDAD');
    let rw = o0 + 1;
    const plRow = (label, formula, o) => {
      o = o || {};
      labelCell(`A${rw}`, label);
      const cell = C.getCell(`B${rw}`);
      cell.value = f(formula);
      cell.numFmt = o.fmt || FMT_MONEY;
      cell.font = { bold: !!o.bold, color: { argb: o.color || INK } };
      if (o.bold) {
        C.getCell(`A${rw}`).font = { size: 10, bold: true, color: { argb: INK } };
        ['A', 'B', 'C'].forEach(col => { C.getCell(`${col}${rw}`).border = { top: { style: 'thin', color: { argb: NAVY } } }; });
      }
      if (o.pct) {
        const pcell = C.getCell(`C${rw}`);
        pcell.value = f(`IF(${R.precio}=0,0,B${rw}/${R.precio})`);
        pcell.numFmt = '0.0%'; pcell.font = { size: 9, color: { argb: GRAY } };
      }
      return rw++;
    };
    plRow('Precio de venta', `${R.precio}`);
    plRow('(−) Comisión por venta', `-${D.referral}`);
    plRow('(−) Envío y manejo FBA', `-${D.fbaTotal}`);
    plRow('(−) Almacenamiento', `-${D.storage}`);
    const cm1Row = plRow('CM1 — después de Amazon', `${R.precio}-${D.referral}-${D.fbaTotal}-${D.storage}`, { bold: true, pct: true });
    plRow('(−) Publicidad', `-${R.precio}*${R.tacos}/100`);
    plRow('(−) Devoluciones', `-${R.precio}*${R.devol}/100`);
    const cm2Row = plRow('CM2 — después de ads', `B${cm1Row}-${R.precio}*${R.tacos}/100-${R.precio}*${R.devol}/100`, { bold: true, pct: true });
    plRow('(−) Costo del producto', `-${R.cogs}`);
    plRow('(−) Logística por unidad', `-${R.logistica}`);
    plRow('(−) Rubros adicionales', `-SUM(${EXTRAS_RANGE})`);
    const cm3Row = plRow('CM3 — UTILIDAD NETA', `B${cm2Row}-${R.cogs}-${R.logistica}-SUM(${EXTRAS_RANGE})`, { bold: true, pct: true });

    // Margen neto grande + semáforo (verde ≥15%, ámbar 8-15%, rojo <8%).
    rw++;
    const mRow = rw;
    C.mergeCells(`A${mRow}:A${mRow + 1}`);
    labelCell(`A${mRow}`, 'MARGEN NETO');
    C.getCell(`A${mRow}`).font = { size: 12, bold: true, color: { argb: INK } };
    C.mergeCells(`B${mRow}:C${mRow + 1}`);
    const mCell = C.getCell(`B${mRow}`);
    mCell.value = f(`IF(${R.precio}=0,0,B${cm3Row}/${R.precio})`);
    mCell.numFmt = '0.0%';
    mCell.font = { size: 20, bold: true, color: { argb: WHITE } };
    mCell.alignment = { vertical: 'middle', horizontal: 'center' };
    C.addConditionalFormatting({
      ref: `B${mRow}`,
      rules: [
        { type: 'expression', formulae: [`B${mRow}>=0.15`], style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FF2E9E5B' } } }, priority: 1 },
        { type: 'expression', formulae: [`AND(B${mRow}>=0.08,B${mRow}<0.15)`], style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFC77800' } } }, priority: 2 },
        { type: 'expression', formulae: [`B${mRow}<0.08`], style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFC0392B' } } }, priority: 3 },
      ],
    });
    mCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY_DK } };
    rw += 2;

    // KPIs: ROI y precio mínimo (break-even con el mix actual de % variables).
    rw++;
    labelCell(`A${rw}`, 'Retorno sobre inversión (CM3 / COGS)');
    C.getCell(`B${rw}`).value = f(`IF(${R.cogs}=0,0,B${cm3Row}/${R.cogs})`);
    C.getCell(`B${rw}`).numFmt = '0.0%';
    rw++;
    labelCell(`A${rw}`, 'Precio mínimo (margen 0)');
    C.getCell(`B${rw}`).value = f(
      `IF(${R.precio}=0,0,(${D.fbaTotal}+${D.storage}+${R.cogs}+${R.logistica}+SUM(${EXTRAS_RANGE}))/(1-(${D.referral}/${R.precio})-${R.tacos}/100-${R.devol}/100))`);
    C.getCell(`B${rw}`).numFmt = FMT_MONEY;
    hintCell(`C${rw}`, 'con el mix actual de % variables');
    rw += 2;

    // Nota de pie.
    C.mergeCells(`A${rw}:F${rw}`);
    const note = C.getCell(`A${rw}`);
    note.value = mx
      ? 'Tarifas oficiales Amazon MX 2026 (vender.amazon.com.mx/precios) · MXN con IVA incluido · Salud/Alimentos/Bebidas usan tarifa FBA especial según la categoría elegida · MEXUS Seller'
      : 'Tarifas oficiales Amazon US 2026 (sell.amazon.com/pricing) · USD · incluye recargo de combustible 3.5% · MEXUS Seller';
    note.font = { size: 8.5, italic: true, color: { argb: GRAY } };
    note.alignment = { horizontal: 'center' };

    // Dropdowns (validación de datos).
    const B = (ref) => ref.replace(/'Calculadora'!\$B\$/, 'B');
    try {
      C.getCell(B(R.categoria)).dataValidation = { type: 'list', allowBlank: false, formulae: [`${REF.LABELS}`] };
      if (!mx) C.getCell(B(R.apparel)).dataValidation = { type: 'list', allowBlank: false, formulae: ['"Sí,No"'] };
      C.getCell(B(R.dimUnit)).dataValidation = { type: 'list', allowBlank: false, formulae: ['"in,cm"'] };
      C.getCell(B(R.wUnit)).dataValidation = { type: 'list', allowBlank: false, formulae: ['"oz,lb,kg"'] };
      C.getCell(B(R.stPeriod)).dataValidation = { type: 'list', allowBlank: false, formulae: ['"ene-sep,oct-dic"'] };
    } catch (e) { /* no crítico */ }

    // La hoja de tarifas queda oculta; se abre en Calculadora.
    T.state = 'hidden';
    wb.views = [{ activeTab: 0 }];

    return { wb, cells: { R, D, cm3: `B${cm3Row}`, margin: `B${mRow}` } };
  }

  // Navegador: genera (con logo si está disponible) y descarga.
  async function downloadExcel(S, input, filename) {
    const ExcelJS = window.ExcelJS;
    if (!ExcelJS) throw new Error('ExcelJS no cargó (CDN).');
    let logoBuffer = null;
    try {
      const resp = await fetch('assets/logo-white.png');
      if (resp.ok) logoBuffer = await resp.arrayBuffer();
    } catch (e) { /* sin logo */ }
    const { wb } = buildWorkbook(ExcelJS, S, input, { logoBuffer });
    const buf = await wb.xlsx.writeBuffer();
    const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename || 'calculadora-rentabilidad.xlsx';
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }

  const API = { buildWorkbook, downloadExcel, buildFbaRows, buildReferralRows };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  if (typeof window !== 'undefined') window.MEXUS_CALC_EXCEL = API;
})();
