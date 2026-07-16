/* global window, module */
// ─── MEXUS — Calculadora de rentabilidad: motor de cálculo ───────────
// Módulo puro (sin estado, sin DOM). Corre en Node (tests) y en el
// navegador (window.MEXUS_CALC). Todas las funciones de fee reciben el
// objeto de marketplace (ej. schedule.US) — la fuente de verdad es
// fee-schedule.json. Unidades canónicas internas: pulgadas + libras.

(function () {
  'use strict';

  // ── Conversión de unidades ──────────────────────────────────────
  const LB_PER_KG = 2.2046226218;
  const CM_PER_IN = 2.54;
  const conv = {
    kgToLb: kg => kg * LB_PER_KG,
    lbToKg: lb => lb / LB_PER_KG,
    cmToIn: cm => cm / CM_PER_IN,
    inToCm: i => i * CM_PER_IN,
    ozToLb: oz => oz / 16,
    lbToOz: lb => lb * 16,
  };

  // Normaliza dims+peso a canónico (in, lb). dims:{l,w,h,unit:'in'|'cm'},
  // weight:{value, unit:'lb'|'kg'|'oz'}.
  function toCanonical(dims, weight) {
    const k = dims.unit === 'cm' ? 1 / CM_PER_IN : 1;
    let wlb;
    if (weight.unit === 'kg') wlb = conv.kgToLb(weight.value);
    else if (weight.unit === 'oz') wlb = conv.ozToLb(weight.value);
    else wlb = weight.value;
    return { l: dims.l * k, w: dims.w * k, h: dims.h * k, weightLb: wlb };
  }

  // ── Peso dimensional y peso facturable ──────────────────────────
  function dimWeightLb(lIn, wIn, hIn, divisor) {
    return (lIn * wIn * hIn) / divisor;
  }

  // ── Clasificación de size-tier (US 2026) ────────────────────────
  // Devuelve una key que existe en la tabla de fees.
  function classifyTier(US, c) {
    const sides = [c.l, c.w, c.h].sort((a, b) => b - a);
    const [longest, median, shortest] = sides;
    const oz = conv.lbToOz(c.weightLb);
    const girth = 2 * (median + shortest);
    const lengthGirth = longest + girth;

    if (oz <= 16 && longest <= 15 && median <= 12 && shortest <= 0.75)
      return 'small_standard';
    if (c.weightLb <= 20 && longest <= 18 && median <= 14 && shortest <= 8)
      return 'large_standard';
    if (c.weightLb <= 50 && longest <= 59 && lengthGirth <= 130)
      return 'large_bulky';
    if (c.weightLb <= 50) return 'extra_large_0_50';
    if (c.weightLb <= 70) return 'extra_large_50_70';
    if (c.weightLb <= 150) return 'extra_large_70_150';
    return 'extra_large_150_plus';
  }

  // Peso facturable: small standard usa peso real; el resto el mayor
  // entre peso real y peso dimensional.
  function billableWeightLb(US, tier, c) {
    if (tier === 'small_standard') return c.weightLb;
    const dw = dimWeightLb(c.l, c.w, c.h, US.dimWeightDivisor);
    return Math.max(c.weightLb, dw);
  }

  // ── Referral fee (depende SOLO de categoría + precio) ───────────
  function referralFee(US, categoryKey, price) {
    const cat = US.referral[categoryKey];
    if (!cat) throw new Error('Categoría desconocida: ' + categoryKey);
    let fee;
    if (cat.mode === 'flat') {
      fee = price * cat.pct;
    } else if (cat.mode === 'threshold') {
      const b = cat.brackets.find(x => x.upTo == null || price <= x.upTo);
      fee = price * b.pct;
    } else if (cat.mode === 'marginal') {
      let remaining = price, lower = 0, acc = 0;
      for (const b of cat.brackets) {
        const cap = b.upTo == null ? Infinity : b.upTo;
        const portion = Math.max(0, Math.min(price, cap) - lower);
        acc += portion * b.pct;
        lower = cap;
        if (price <= cap) break;
      }
      fee = acc;
    } else {
      throw new Error('Modo de referral inválido: ' + cat.mode);
    }
    return Math.max(fee, cat.min || 0);
  }

  // ── FBA fulfillment fee ─────────────────────────────────────────
  // Devuelve {tier, billableLb, base, surcharge, fuel, total}.
  function fbaFee(US, opts) {
    const { tier, billableLb, price, isApparel } = opts;
    const table = isApparel ? US.fbaFeesApparel : US.fbaFees;
    const rows = table.rows.filter(r => r.tier === tier);
    if (!rows.length) throw new Error('Sin filas FBA para tier ' + tier);

    // Encuentra la banda de peso (primera cuyo límite superior >= peso).
    const row = rows.find(r => {
      const boundLb = r.maxOz != null ? r.maxOz / 16 : (r.maxLb == null ? Infinity : r.maxLb);
      return billableLb <= boundLb;
    }) || rows[rows.length - 1];

    // Fee base: apparel = único; non-apparel = banda de precio.
    let base;
    if (isApparel) {
      base = row.fee;
    } else {
      const band = US.fbaFees.priceBands.find(b => b.maxPrice == null || price <= b.maxPrice);
      base = row.fee[band.key];
    }

    // Surcharge por encima de un umbral de peso.
    let surcharge = 0;
    if (row.surcharge) {
      const s = row.surcharge;
      const over = Math.max(0, billableLb - s.aboveLb);
      if (over > 0) {
        if (s.per === 'lb') surcharge = Math.ceil(over) * s.amount;
        else if (s.per === 'half_lb') surcharge = Math.ceil(over / 0.5) * s.amount;
        else if (s.per === '4oz') surcharge = Math.ceil(over / 0.25) * s.amount;
      }
    }

    const subtotal = base + surcharge;
    const fuel = subtotal * (US.fuelSurchargePct || 0);
    return {
      tier, billableLb, band: row.band,
      base: round2(base), surcharge: round2(surcharge),
      fuel: round2(fuel), total: round2(subtotal + fuel),
    };
  }

  // ── Almacenamiento mensual (por unidad) ─────────────────────────
  // months: meses de inventario promedio; period: 'jan_sep'|'oct_dec'.
  function storagePerUnit(US, c, tier, months, period) {
    const cubicFeet = (c.l * c.w * c.h) / 1728; // in³ → ft³
    const isOversize = tier !== 'small_standard' && tier !== 'large_standard';
    const rate = isOversize ? US.storage.oversize[period] : US.storage.standard[period];
    return round2(cubicFeet * rate * (months || 1));
  }

  // ── Empaque: unidades por caja master (estimación por ejes) ─────
  // Encaja la unidad en la caja en las 6 orientaciones ortogonales y
  // toma el mejor acomodo. Estimación, no bin-packing exacto.
  function unitsPerMasterBox(unitDims, boxDims) {
    const u = [unitDims.l, unitDims.w, unitDims.h];
    const b = [boxDims.l, boxDims.w, boxDims.h];
    const perms = [
      [0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0],
    ];
    let best = 0;
    for (const p of perms) {
      const fit = Math.floor(b[0] / u[p[0]]) * Math.floor(b[1] / u[p[1]]) * Math.floor(b[2] / u[p[2]]);
      if (fit > best) best = fit;
    }
    return best;
  }

  // ── Logística / landed cost por unidad ──────────────────────────
  // Suma: flete de importación + (opcional) AWD, repartido por unidad.
  // freight: {model:'per_box'|'per_unit'|'total', amount, totalUnits?}
  // awd: {enabled, boxDims(in), months, region:'west'|'other', plan:'smartStorage'|'amazonManaged'}
  function logisticsPerUnit(US, params) {
    const { unitsPerBox, freight, awd } = params;
    let importPerUnit = 0;
    if (freight) {
      if (freight.model === 'per_unit') importPerUnit = freight.amount;
      else if (freight.model === 'per_box') importPerUnit = freight.amount / unitsPerBox;
      else if (freight.model === 'total') importPerUnit = freight.amount / freight.totalUnits;
    }
    let awdPerUnit = 0;
    if (awd && awd.enabled) {
      const a = US.awd;
      const boxCuFt = (awd.boxDims.l * awd.boxDims.w * awd.boxDims.h) / 1728;
      const inbound = a.inboundProcessingPerBox / unitsPerBox;
      const outbound = a.outboundProcessingPerBox / unitsPerBox;
      const storeRate = a.storagePerCubicFootPerMonth[awd.region || 'other'];
      const store = (boxCuFt * storeRate * (awd.months || 1)) / unitsPerBox;
      const transRate = a.transportationPerCubicFoot[awd.plan || 'amazonManaged'];
      const trans = (boxCuFt * transRate) / unitsPerBox;
      awdPerUnit = inbound + outbound + store + trans;
    }
    return round2(importPerUnit + awdPerUnit);
  }

  // ── Amazon MX (unidades canónicas: cm + kg) ─────────────────────
  // Tarifas publicadas CON IVA; banda de precio y referral sobre el
  // precio al cliente (con IVA), que es lo que captura el usuario.
  function toCanonicalMetric(dims, weight) {
    const k = dims.unit === 'in' ? CM_PER_IN : 1;
    let wkg;
    if (weight.unit === 'lb') wkg = conv.lbToKg(weight.value);
    else if (weight.unit === 'oz') wkg = conv.lbToKg(conv.ozToLb(weight.value));
    else wkg = weight.value;
    return { l: dims.l * k, w: dims.w * k, h: dims.h * k, weightKg: wkg };
  }

  // Tier MX: el producto cabe (lados ordenados desc) en la caja del tier.
  function classifyTierMX(MX, c) {
    const sides = [c.l, c.w, c.h].sort((a, b) => b - a);
    for (const t of MX.sizeTiers.tiers) {
      if (t.maxLongCm == null) return t.key; // último tier = sin límite
      if (sides[0] <= t.maxLongCm && sides[1] <= t.maxMedianCm && sides[2] <= t.maxShortCm) return t.key;
    }
    return MX.sizeTiers.tiers[MX.sizeTiers.tiers.length - 1].key;
  }

  function priceBandMX(MX, price) {
    return MX.priceBands.find(b => b.maxPrice == null || price < b.maxPrice);
  }

  const SURCH_KG = { kg: 1, half_kg: 0.5, quarter_kg: 0.25 };

  // Banda de peso: límite superior EXCLUSIVO hacia abajo (peso = 0.10 kg
  // cae en 0.10-0.20 — observado en settlements de MIL FLORES MX).
  function fbaFeeMX(MX, opts) {
    const { tier, weightKg, price, isSpecial } = opts;
    const table = isSpecial ? MX.fbaFeesSpecial : MX.fbaFees;
    const rows = table.rows.filter(r => r.tier === tier);
    if (!rows.length) throw new Error('Sin filas FBA MX para tier ' + tier);
    const band = priceBandMX(MX, price);
    const row = rows.find(r => r.maxKg == null || weightKg < r.maxKg) || rows[rows.length - 1];
    const base = row.fee[band.key];
    let surcharge = 0;
    if (row.surcharge) {
      const s = row.surcharge;
      const over = Math.max(0, weightKg - s.aboveKg);
      if (over > 0) surcharge = Math.ceil(over / (SURCH_KG[s.per] || 1)) * s.amount[band.key];
    }
    return {
      tier, billableKg: weightKg, band: row.band + ' · ' + band.label,
      base: round2(base), surcharge: round2(surcharge), fuel: 0,
      total: round2(base + surcharge),
    };
  }

  // Almacenamiento MX: MXN por dm³ por mes.
  function storagePerUnitMX(MX, c, tier, months, period) {
    const dm3 = (c.l * c.w * c.h) / 1000; // cm³ → dm³
    const rate = tier === 'grande' ? MX.storage.oversize[period] : MX.storage.standard[period];
    return round2(dm3 * rate * (months || 1));
  }

  function computeMX(MX, input) {
    const c = toCanonicalMetric(input.dims, input.weight);
    const tier = classifyTierMX(MX, c);
    const isSpecial = (MX.specialFbaCategories || []).indexOf(input.categoryKey) !== -1;

    const referral = round2(referralFee(MX, input.categoryKey, input.price));
    const fba = fbaFeeMX(MX, { tier, weightKg: c.weightKg, price: input.price, isSpecial });

    const storage = input.storage
      ? storagePerUnitMX(MX, c, tier, input.storage.months, input.storage.period || 'jan_sep')
      : 0;

    let ads = 0;
    if (input.ads) ads = input.ads.model === 'acos' ? input.price * input.ads.amount : input.ads.amount;
    ads = round2(ads);

    let refunds = 0;
    if (input.refunds) refunds = input.refunds.model === 'pct' ? input.price * input.refunds.amount : input.refunds.amount;
    refunds = round2(refunds);

    let logistics = 0;
    if (input.logistics && input.logistics.freight) {
      const fr = input.logistics.freight;
      if (fr.model === 'per_unit') logistics = fr.amount;
      else if (fr.model === 'per_box') logistics = fr.amount / input.logistics.unitsPerBox;
      else if (fr.model === 'total') logistics = fr.amount / fr.totalUnits;
      logistics = round2(logistics);
    }
    const cogs = round2(input.cogs || 0);

    const cm1 = round2(input.price - referral - fba.total - storage);
    const cm2 = round2(cm1 - ads - refunds);
    const cm3 = round2(cm2 - cogs - logistics);

    return {
      input: { price: input.price, categoryKey: input.categoryKey, isSpecial },
      tier, billableKg: round2(c.weightKg),
      fees: { referral, fba: fba.total, fbaBreakdown: fba, storage, ads, refunds, cogs, logistics },
      margin: {
        cm1, cm1Pct: pct(cm1, input.price),
        cm2, cm2Pct: pct(cm2, input.price),
        cm3, cm3Pct: pct(cm3, input.price),
      },
      net: cm3,
      netPct: pct(cm3, input.price),
    };
  }

  // ── P&L completo por unidad ─────────────────────────────────────
  // input: {
  //   categoryKey, price, cogs, isApparel,
  //   dims:{l,w,h,unit}, weight:{value,unit},
  //   ads:{model:'per_unit'|'acos', amount},   // acos = fracción del precio
  //   storage:{months, period},
  //   logistics:{unitsPerBox, freight, awd}     // opcional
  // }
  // Si el schedule es MX (market:'MX'), delega al camino métrico.
  function compute(US, input) {
    if (US && US.market === 'MX') return computeMX(US, input);
    const c = toCanonical(input.dims, input.weight);
    const tier = classifyTier(US, c);
    const billableLb = billableWeightLb(US, tier, c);

    const referral = round2(referralFee(US, input.categoryKey, input.price));
    const fba = fbaFee(US, { tier, billableLb, price: input.price, isApparel: !!input.isApparel });

    const storage = input.storage
      ? storagePerUnit(US, c, tier, input.storage.months, input.storage.period || 'jan_sep')
      : 0;

    let ads = 0;
    if (input.ads) ads = input.ads.model === 'acos' ? input.price * input.ads.amount : input.ads.amount;
    ads = round2(ads);

    // Devoluciones: % del precio (model:'pct') o monto fijo por unidad. Es un
    // costo operativo — entra junto a ads en CM2.
    let refunds = 0;
    if (input.refunds) refunds = input.refunds.model === 'pct' ? input.price * input.refunds.amount : input.refunds.amount;
    refunds = round2(refunds);

    const logistics = input.logistics ? logisticsPerUnit(US, input.logistics) : 0;
    const cogs = round2(input.cogs || 0);

    const cm1 = round2(input.price - referral - fba.total - storage);
    const cm2 = round2(cm1 - ads - refunds);
    const cm3 = round2(cm2 - cogs - logistics);

    return {
      input: { price: input.price, categoryKey: input.categoryKey, isApparel: !!input.isApparel },
      tier, billableLb: round2(billableLb),
      fees: { referral, fba: fba.total, fbaBreakdown: fba, storage, ads, refunds, cogs, logistics },
      margin: {
        cm1, cm1Pct: pct(cm1, input.price),
        cm2, cm2Pct: pct(cm2, input.price),
        cm3, cm3Pct: pct(cm3, input.price),
      },
      net: cm3,
      netPct: pct(cm3, input.price),
    };
  }

  function round2(n) { return Math.round((n + Number.EPSILON) * 100) / 100; }
  function pct(n, base) { return base ? round2((n / base) * 100) : 0; }

  const API = {
    conv, toCanonical, dimWeightLb, classifyTier, billableWeightLb,
    referralFee, fbaFee, storagePerUnit, unitsPerMasterBox,
    logisticsPerUnit, compute, round2,
    toCanonicalMetric, classifyTierMX, priceBandMX, fbaFeeMX, storagePerUnitMX, computeMX,
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  if (typeof window !== 'undefined') window.MEXUS_CALC = API;
})();
