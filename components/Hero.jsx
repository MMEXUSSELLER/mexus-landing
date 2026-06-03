/* global React */
const { useState: useHS, useEffect: useHE } = React;

function Hero({ lang, variant }) {
  const t = (es, en) => (lang === "en" ? en : es);
  if (variant === "split") return <HeroSplit lang={lang} />;
  if (variant === "minimal") return <HeroMinimal lang={lang} />;
  return <HeroBold lang={lang} />;
}

/* ─── Variant 1: Bold center stage with mini dashboard ─── */
function HeroBold({ lang }) {
  const t = (es, en) => (lang === "en" ? en : es);
  return (
    <section style={hS.wrap} id="top">
      <div style={hS.grid} />
      <div style={hS.glow} />
      <div style={hS.inner}>
        <div className="mx-hero-eyebrow" style={hS.eyebrow}>
          {t("AGENCIA PARA VENDEDORES EN AMAZON · USA + MÉXICO", "AGENCY FOR AMAZON SELLERS · USA + MEXICO")}
        </div>
        <h1 style={hS.h1}>
          {t("LANZAMOS Y ESCALAMOS", "WE LAUNCH AND SCALE")}<br/>
          {t("MARCAS EN ", "BRANDS ON ")}<span style={{color:"#F47920"}}>AMAZON.</span>
        </h1>
        <p style={hS.sub}>
          {t(
            "Somos sellers en Amazon. Atención y estrategia directa con Patricio y Rodrigo — para que tu marca no pague el precio de aprender Amazon.",
            "We're sellers on Amazon. Direct strategy with Patricio and Rodrigo — so your brand doesn't pay the cost of learning Amazon."
          )}
        </p>
        <div className="mx-hero-ctas" style={hS.ctas}>
          <a href="https://calendar.app.google/H9ncvExjQw7nZu3o9" target="_blank" rel="noopener" style={hS.ctaPrimary}>{t("Agendar diagnóstico", "Book diagnosis")} →</a>
          <a href="#servicios" style={hS.ctaGhost}>{t("Ver qué hacemos", "See what we do")} →</a>
        </div>
        <div className="mx-hero-stats" style={hS.stats}>
          <Stat value="6+" label={t("AÑOS EN AMAZON", "YEARS ON AMAZON")} />
          <Stat value="20+" label={t("MARCAS ESCALADAS", "BRANDS SCALED")} />
          <Stat value="3" label={t("MERCADOS AMAZON", "AMAZON MARKETS")} />
          <Stat value="60d" label={t("A 1ER VENTA AMAZON USA", "TO 1ST AMAZON USA SALE")} />
        </div>
        <MiniDashboard />
      </div>
    </section>
  );
}

/* ─── Variant 2: Split — copy left, dashboard right ─── */
function HeroSplit({ lang }) {
  const t = (es, en) => (lang === "en" ? en : es);
  return (
    <section style={{...hS.wrap, padding: "140px 0 80px"}} id="top">
      <div style={hS.grid} />
      <div style={{...hS.inner, textAlign: "left"}}>
        <div style={hsplitS.grid}>
          <div>
            <div style={{...hS.badges, justifyContent: "flex-start"}}>
              <img src="assets/badge-amazon-spn.png" alt="Amazon SPN" style={hS.badgeImg} />
              <img src="assets/badge-amazon-global-selling.png" alt="Amazon Global Selling" style={hS.badgeImg} />
            </div>
            <h1 style={{...hS.h1, fontSize: "clamp(36px, 4.8vw, 64px)", textAlign: "left", lineHeight: 1.05}}>
              {t("DE MÉXICO", "FROM MEXICO")}<br/>
              <span style={{color:"#F47920"}}>{t("PARA AMAZON USA.", "TO AMAZON USA.")}</span><br/>
              {t("EN 60 DÍAS.", "IN 60 DAYS.")}
            </h1>
            <p style={{...hS.sub, margin: "24px 0 32px", maxWidth: 520}}>
              {t(
                "Agencia mexicana que opera tu marca en Amazon como propia. Sin intermediarios. Estrategia directa con los fundadores.",
                "Mexican agency that runs your brand on Amazon like ours. No middlemen. Direct strategy with the founders."
              )}
            </p>
            <div style={{...hS.ctas, justifyContent: "flex-start"}}>
              <a href="https://calendar.app.google/H9ncvExjQw7nZu3o9" target="_blank" rel="noopener" style={hS.ctaPrimary}>{t("Agendar llamada", "Book a call")} →</a>
              <a href="#servicios" style={hS.ctaGhost}>{t("Ver servicios", "See services")} →</a>
            </div>
            <div style={{...hS.stats, gridTemplateColumns: "repeat(3, auto)", justifyContent: "start", gap: 40, maxWidth: "none"}}>
              <Stat value="20+" label={t("MARCAS", "BRANDS")} />
              <Stat value="$12M+" label="GMV ANUAL" />
              <Stat value="6+" label={t("AÑOS", "YEARS")} />
            </div>
          </div>
          <div style={hsplitS.right}>
            <MiniDashboard inline />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Variant 3: Minimal editorial ─── */
function HeroMinimal({ lang }) {
  const t = (es, en) => (lang === "en" ? en : es);
  return (
    <section style={{...hS.wrap, padding: "180px 0 140px", background: "#0D1826"}} id="top">
      <div style={{...hS.grid, opacity: .5}} />
      <div style={hS.inner}>
        <div style={{display: "inline-flex", alignItems: "center", gap: 14, padding: "8px 18px", borderRadius: 999, border: "1px solid rgba(244,121,32,.4)", background: "rgba(244,121,32,.08)", marginBottom: 36}}>
          <span className="pulse-dot" style={{background:"#F47920", boxShadow:"0 0 0 4px rgba(244,121,32,.22)"}}></span>
          <span style={{fontSize: 12, fontWeight: 600, letterSpacing: 1.5, color: "#F47920", textTransform: "uppercase"}}>
            {t("Aceptando 3 marcas — Q3 2026", "Taking 3 brands — Q3 2026")}
          </span>
        </div>
        <h1 style={{...hS.h1, fontSize: "clamp(44px, 7vw, 96px)", lineHeight: 1.0, letterSpacing: "-.02em"}}>
          {t("BUILT BY SELLERS,", "BUILT BY SELLERS,")}<br/>
          <span style={{color:"#F47920"}}>{t("FOR SELLERS.", "FOR SELLERS.")}</span>
        </h1>
        <p style={{...hS.sub, fontSize: 19, marginTop: 32, maxWidth: 580}}>
          {t(
            "Operamos marcas mexicanas en Amazon USA y México. Sin templates. Sin promesas vacías. Solo el playbook que usamos para nuestras propias marcas.",
            "We operate Mexican brands on Amazon USA and Mexico. No templates. No empty promises. Just the playbook we use for our own brands."
          )}
        </p>
        <div style={{...hS.ctas, marginTop: 40}}>
          <a href="https://calendar.app.google/H9ncvExjQw7nZu3o9" target="_blank" rel="noopener" style={hS.ctaPrimary}>{t("Agendar diagnóstico gratis", "Book free diagnosis")} →</a>
          <a href="#proceso" style={{...hS.ctaGhost, border: "none", color: "rgba(255,255,255,.7)"}}>{t("Conoce el proceso", "Learn the process")} →</a>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div style={hS.stat}>
      <span style={hS.statVal}>{value}</span>
      <span style={hS.statLbl}>{label}</span>
    </div>
  );
}

function MiniDashboard({ inline }) {
  const ref = React.useRef(null);
  const [t, setT] = React.useState(0); // animation progress 0–1

  React.useEffect(() => {
    let raf, start;
    let played = false;
    const DURATION = 5000;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setT(1); return; }

    const animate = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / DURATION);
      setT(p);
      if (p < 1) raf = requestAnimationFrame(animate);
    };

    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !played) {
        played = true;
        start = null;
        raf = requestAnimationFrame(animate);
      }
    }, { threshold: 0.25 });

    if (ref.current) io.observe(ref.current);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, []);

  // Easing: gentle ease-out (smoother, less aggressive)
  const easeOutSine = (x) => Math.sin((x * Math.PI) / 2);
  const e = easeOutSine(t);

  // Per-bar growth, sequential left → right
  const bars = [42, 58, 51, 72, 65, 81, 68, 92, 84, 96, 88, 100];
  const barProgress = (i) => {
    const startAt = (i / bars.length) * 0.85; // sequential left → right
    const span = 0.18;
    const local = Math.max(0, Math.min(1, (t - startAt) / span));
    return easeOutSine(local);
  };

  // Counter values (start → end)
  const fmt$ = (n) => "$" + Math.round(n).toLocaleString("en-US");
  const fmtN = (n) => Math.round(n).toLocaleString("en-US");
  const fmtP = (n) => n.toFixed(1) + "%";

  const gmv      = 38000 + e * (184320 - 38000);
  const units    = 620 + e * (2847 - 620);
  const tacos    = 24.8 - e * (24.8 - 12.4); // decreases
  const conv     = 11.2 + e * (22.7 - 11.2);

  const deltaPct = (target, current, downGood) => {
    // show progressive delta
    const v = e * target;
    const sign = downGood ? "▼" : "▲";
    return `${sign} ${downGood ? "-" : "+"}${v.toFixed(1)}%`;
  };

  return (
    <div ref={ref} className="mx-hero-dash" style={{...hS.dash, ...(inline ? {marginTop: 0, transform: "rotate(-1deg)"} : {})}}>
      <div className="mx-hero-dash-head" style={hS.dashHead}>
        <div style={{display:"flex", gap: 6}}>
          <span style={{width: 10, height: 10, borderRadius: "50%", background: "#FF5F57"}} />
          <span style={{width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E"}} />
          <span style={{width: 10, height: 10, borderRadius: "50%", background: "#28C840"}} />
        </div>
        <div className="mx-hero-dash-title" style={{fontSize: 11, fontWeight: 600, letterSpacing: 1, color: "rgba(255,255,255,.5)", textTransform: "uppercase"}}>MEXUS · Brand Pulse · ARTISANS BAZAAR</div>
        <div className="pulse-dot" />
      </div>
      <div className="mx-hero-dash-kpis" style={hS.dashBody}>
        <DashKpi label="GMV (30d)"  value={fmt$(gmv)}    delta={deltaPct(24.3, gmv)}   up />
        <DashKpi label="UNIDADES"   value={fmtN(units)}  delta={deltaPct(18.1, units)} up />
        <DashKpi label="TACOS"      value={fmtP(tacos)}  delta={deltaPct(12.4, tacos, true)} />
        <DashKpi label="CONVERSION" value={fmtP(conv)}   delta={deltaPct(11.5, conv)}  up />
      </div>
      <div className="mx-hero-dash-chart" style={hS.dashChart}>
        {bars.map((h, i) => {
          const p = barProgress(i);
          return (
            <div key={i} style={{
              flex: 1, height: `${h * p}%`,
              background: "linear-gradient(180deg, #F47920, rgba(244,121,32,.2))",
              borderRadius: "4px 4px 0 0",
              transition: "height .25s cubic-bezier(.4,0,.2,1)",
            }} />
          );
        })}
      </div>
    </div>
  );
}

function DashKpi({ label, value, delta, up }) {
  return (
    <div style={hS.dashKpi}>
      <div style={{fontSize: 9.5, letterSpacing: 1.5, fontWeight: 700, color: "rgba(255,255,255,.55)", textTransform: "uppercase"}}>{label}</div>
      <div style={{fontFamily: "'Barlow Condensed',sans-serif", fontSize: 24, fontWeight: 800, color: "#fff", lineHeight: 1.1, fontVariantNumeric: "tabular-nums"}}>{value}</div>
      <div style={{fontSize: 11, fontWeight: 700, color: up ? "#7AD694" : "#7AD694", fontVariantNumeric: "tabular-nums"}}>{delta}</div>
    </div>
  );
}

const hS = {
  wrap: {
    position: "relative",
    background: "#152232", color: "#fff",
    fontFamily: "Inter, sans-serif",
    overflow: "hidden",
    padding: "140px 0 100px",
    isolation: "isolate",
  },
  grid: {
    position: "absolute", inset: 0,
    backgroundImage: "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
    maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
    WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
    pointerEvents: "none",
  },
  glow: {
    position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
    width: 800, height: 400,
    background: "radial-gradient(ellipse, rgba(244,121,32,.15) 0%, transparent 60%)",
    pointerEvents: "none", zIndex: 0,
  },
  inner: { position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 24px", textAlign: "center", zIndex: 1 },
  eyebrow: {
    color: "#F47920",
    fontSize: "clamp(14px, 1.45vw, 18px)",
    fontWeight: 600,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    marginBottom: 22,
  },
  badges: { display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 28, alignItems: "center" },
  badge: {
    display: "inline-flex", alignItems: "center", gap: 8,
    fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
    color: "rgba(255,255,255,.7)", textTransform: "uppercase",
    padding: "6px 14px", borderRadius: 999,
    background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.10)",
  },
  badgeImg: {
    height: 52,
    width: "auto",
    background: "#fff",
    borderRadius: 12,
    padding: "6px 14px",
    boxShadow: "0 8px 24px rgba(0,0,0,.25), 0 1px 0 rgba(255,255,255,.4) inset",
    border: "1px solid rgba(255,255,255,.12)",
    display: "block",
    objectFit: "contain",
  },
  h1: {
    fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800,
    fontSize: "clamp(40px, 5.5vw, 72px)", lineHeight: 1.05,
    letterSpacing: "-.015em", margin: "0 0 24px", color: "#fff",
  },
  sub: { fontSize: 18, color: "rgba(255,255,255,.75)", maxWidth: 620, margin: "0 auto 36px", lineHeight: 1.55 },
  ctas: { display: "inline-flex", gap: 12, flexWrap: "wrap", justifyContent: "center" },
  ctaPrimary: {
    background: "#F47920", color: "#fff",
    padding: "16px 28px", border: "none", borderRadius: 8,
    fontWeight: 700, fontSize: 14, cursor: "pointer",
    fontFamily: "inherit", textDecoration: "none",
    display: "inline-flex", alignItems: "center", gap: 8,
    boxShadow: "0 8px 26px rgba(244,121,32,.4)",
    transition: "transform .2s, box-shadow .25s",
  },
  ctaGhost: {
    background: "rgba(255,255,255,.05)", color: "#fff",
    padding: "16px 28px", border: "1.5px solid rgba(255,255,255,.25)", borderRadius: 8,
    fontWeight: 700, fontSize: 14, cursor: "pointer", textDecoration: "none",
    fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 8,
  },
  stats: { marginTop: 64, display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 24, maxWidth: 720, margin: "64px auto 0" },
  stat: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 0 },
  statVal: { fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 40, color: "#F47920", lineHeight: 1 },
  statLbl: { fontSize: 10, fontWeight: 700, letterSpacing: 1.6, color: "rgba(255,255,255,.55)" },

  dash: {
    marginTop: 80,
    background: "#0D1826",
    border: "1px solid rgba(255,255,255,.10)",
    borderRadius: 12,
    padding: 0,
    boxShadow: "0 30px 80px rgba(0,0,0,.5)",
    maxWidth: 920, marginLeft: "auto", marginRight: "auto",
    overflow: "hidden",
  },
  dashHead: {
    padding: "12px 18px",
    borderBottom: "1px solid rgba(255,255,255,.08)",
    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
  },
  dashBody: {
    display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1,
    background: "rgba(255,255,255,.06)",
  },
  dashKpi: {
    background: "#0D1826",
    padding: "16px 18px",
    borderTop: "3px solid #F47920",
    display: "flex", flexDirection: "column", gap: 4,
    textAlign: "left",
  },
  dashChart: {
    height: 80, padding: "8px 18px",
    display: "flex", alignItems: "flex-end", gap: 4,
    borderTop: "1px solid rgba(255,255,255,.08)",
  },
};

const hsplitS = {
  grid: {
    display: "grid",
    gridTemplateColumns: "1.1fr 1fr",
    gap: 60, alignItems: "center",
  },
  right: { position: "relative" },
};

Object.assign(window, { Hero });
