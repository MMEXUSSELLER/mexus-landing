/* global React */

/* ───────── Services ───────── */
function Services({ lang }) {
  const t = (es, en) => (lang === "en" ? en : es);
  const services = [
    {
      icon: "wrench",
      title: t("Full Management", "Full Management"),
      desc: t("Operación Amazon completa en Seller Central (3P) o Vendor Central (1P): listings, PPC, inventario y reportes mensuales.", "Full Amazon operation on Seller Central (3P) or Vendor Central (1P): listings, PPC, inventory and monthly reports."),
      price: "$8K – $25K MXN/mes",
      tag: t("Seller & Vendor", "Seller & Vendor"),
      highlighted: true,
    },
    {
      icon: "megaphone",
      title: t("PPC Management", "PPC Management"),
      desc: t("Sponsored Products, Brands y Display. Optimización semanal con métricas claras.", "Sponsored Products, Brands and Display. Weekly optimization with clear metrics."),
      price: t("$5K – $15K MXN · según ad spend", "$5K – $15K MXN · per ad spend"),
    },
    {
      icon: "search",
      title: t("Estudios de mercado", "Market studies"),
      desc: t("Demanda real, competencia, keywords, márgenes. Reporte ejecutable en 5 días.", "Real demand, competition, keywords, margins. Actionable report in 5 days."),
      price: "$1,200 MXN",
      tag: t("Básico para lanzamientos", "Launch essential"),
    },
    {
      icon: "chat",
      title: t("Asesoría 1:1", "1:1 Consulting"),
      desc: t("Sesión directa con Patricio o Rodrigo. 60 minutos, agenda abierta, recomendaciones específicas.", "Direct session with Patricio or Rodrigo. 60 minutes, open agenda, specific recommendations."),
      price: t("$2,000 MXN/hora", "$2,000 MXN/hour"),
    },
    {
      icon: "globe-arrow",
      title: t("Cross-border MX → US", "Cross-border MX → US"),
      desc: t("Sistema de seguimiento de exportación. LLC, EIN, logística, taxes. Custom según diagnóstico.", "Export tracking system. LLC, EIN, logistics, taxes. Custom based on diagnosis."),
      price: t("Custom · post-llamada", "Custom · post-call"),
      tag: t("Diferenciador único", "Unique differentiator"),
      highlighted: true,
    },
    {
      icon: "chart-up",
      title: t("Auditoría completa", "Full audit"),
      desc: t("Revisión profunda de cuenta, listings, PPC, márgenes. Plan de acción priorizado.", "Deep review of account, listings, PPC, margins. Prioritized action plan."),
      price: t("Incluida en diagnóstico", "Included in diagnosis"),
    },
  ];

  return (
    <section className="section" id="servicios">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="overline">{t("Lo que hacemos", "What we do")}</div>
          <h2 className="section-title">{t("Operación Amazon completa.", "Full Amazon operation.")}<br/>{t("Sin sorpresas.", "No surprises.")}</h2>
          <p className="section-sub">{t("Servicios pensados como sellers, no como agencia. Pricing transparente, scope claro, resultados medibles.", "Services built like sellers, not an agency. Transparent pricing, clear scope, measurable results.")}</p>
        </div>
        <div style={svS.grid}>
          {services.map((s, i) => (
            <div key={i} className="svc-card reveal" style={{ ...(s.highlighted ? svS.highlighted : {}) }}>
              {s.tag && (
                <span style={svS.tag}>
                  <Icon name="star" size={11} color="#fff" /> {s.tag}
                </span>
              )}
              <div className="svc-card-icon"><Icon name={s.icon} size={22} /></div>
              <div className="svc-card-title">{s.title}</div>
              <div className="svc-card-desc">{s.desc}</div>
              <div className="svc-card-price">{s.price}</div>
            </div>
          ))}
        </div>
        <div style={{textAlign: "center", marginTop: 48}} className="reveal">
          <a href="#contacto" className="btn btn-primary">{t("Diagnóstico gratis · 30 min", "Free diagnosis · 30 min")} →</a>
        </div>
      </div>
    </section>
  );
}

const svS = {
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 },
  highlighted: { borderColor: "#F47920" },
  tag: {
    position: "absolute", top: 16, right: 16,
    background: "#F47920", color: "#fff",
    fontSize: 10, fontWeight: 700, letterSpacing: 1,
    padding: "4px 10px", borderRadius: 999, textTransform: "uppercase",
  },
};

/* ───────── Process ───────── */
function Process({ lang }) {
  const t = (es, en) => (lang === "en" ? en : es);
  const steps = [
    { n: "01", icon: "search", title: t("Diagnóstico", "Diagnosis"), dur: "48h", desc: t("Llamada de 30 min. Revisamos cuenta, ASINs, mercado y oportunidades.", "30-min call. Review account, ASINs, market and opportunities."), active: true },
    { n: "02", icon: "list", title: t("Estrategia", "Strategy"), dur: "1 sem", desc: t("Plan personalizado. Objetivos a 30/60/90 días con KPIs claros.", "Custom plan. 30/60/90-day goals with clear KPIs.") },
    { n: "03", icon: "rocket", title: t("Lanzamiento", "Launch"), dur: "4–8 sem", desc: t("Listings, A+, PPC inicial, inventario y primera ola de ventas.", "Listings, A+, initial PPC, inventory and first sales wave.") },
    { n: "04", icon: "chart-up", title: t("Escala", "Scale"), dur: t("Continuo", "Ongoing"), desc: t("Optimización semanal, expansión de catálogo, nuevos mercados.", "Weekly optimization, catalog expansion, new markets.") },
  ];
  return (
    <section className="section dark" id="proceso">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="overline" style={{color:"#F47920"}}>{t("Cómo trabajamos", "How we work")}</div>
          <h2 className="section-title">{t("Sin sorpresas. Sin rollos.", "No surprises. No fluff.")}<br/>{t("Con resultados.", "Just results.")}</h2>
          <p className="section-sub">{t("Cuatro etapas con tiempos reales. Empezamos con un diagnóstico gratuito.", "Four stages with real timeframes. We start with a free diagnosis.")}</p>
        </div>
        <div className="mx-process-grid" style={pS.grid}>
          {steps.map((s, i) => (
            <React.Fragment key={i}>
              <div style={pS.stage} className="reveal">
                <div style={{...pS.num, ...(s.active ? {animation: "mx-pulse 2.4s infinite"} : {})}}>{s.n}</div>
                <div style={pS.icon}><Icon name={s.icon} size={33} color="#F47920" /></div>
                <div style={pS.title}>{s.title}</div>
                <span style={pS.dur}>{s.dur}</span>
                <div style={pS.desc}>{s.desc}</div>
              </div>
              {i < steps.length - 1 && <div style={pS.connector} className="conn-line" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

const pS = {
  grid: { display: "flex", gap: 8, alignItems: "stretch", flexWrap: "wrap", justifyContent: "center" },
  stage: {
    flex: "1 1 200px", maxWidth: 240,
    background: "rgba(255,255,255,.03)",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: 12,
    padding: "28px 18px 22px",
    display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10,
    position: "relative",
  },
  num: {
    width: 64, height: 64, borderRadius: "50%",
    background: "#F47920", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 24,
    boxShadow: "0 0 0 4px rgba(244,121,32,.22)",
    marginTop: -50, marginBottom: 4,
  },
  icon: { display: "inline-flex" },
  title: {
    color: "#fff", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700,
    fontSize: 18, textTransform: "uppercase", letterSpacing: 1,
  },
  dur: {
    background: "#F47920", color: "#fff",
    fontSize: 10, fontWeight: 700, letterSpacing: 1,
    padding: "3px 10px", borderRadius: 999, textTransform: "uppercase",
  },
  desc: { color: "rgba(255,255,255,.62)", fontSize: 13, lineHeight: 1.5, marginTop: 4 },
  connector: {
    flex: "0 0 24px", height: 2, background: "rgba(244,121,32,.4)",
    alignSelf: "center", borderRadius: 999, marginTop: 0,
  },
};

/* ───────── Brands marquee ───────── */
function Brands({ lang }) {
  const t = (es, en) => (lang === "en" ? en : es);
  const brands = [
    { name: "Artisans Bazaar", src: "assets/brands/artisans-bazaar.png" },
    { name: "Prisma",          src: "assets/brands/prisma.png" },
    { name: "Maja",            src: "assets/brands/maja.png" },
    { name: "Tía Ofilia",      src: "assets/brands/tia-ofilia.png" },
    { name: "Hauss",           src: "assets/brands/hauss.png" },
    { name: "Mil Flores",      src: "assets/brands/mil-flores.png" },
    { name: "Pronalux",        src: "assets/brands/pronalux.png" },
    { name: "Seima",           src: "assets/brands/seima.png" },
    { name: "Lyssette",        src: "assets/brands/lyssette.webp" },
    { name: "Habits",          src: "assets/brands/habits.webp" },
    { name: "Bio Maussan",     src: "assets/brands/bio-maussan.png" },
    { name: "Luxus",           src: "assets/brands/luxus.png" },
    { name: "Regina Romero",   src: "assets/brands/regina-romero.png" },
    { name: "Tamboreta",       src: "assets/brands/tamboreta.png" },
    { name: "Tramborneas",     src: "assets/brands/tramborneas.png" },
  ];
  const doubled = [...brands, ...brands];
  return (
    <section className="section dark" id="casos" style={{padding: "80px 0"}}>
      <div className="wrap">
        <div className="section-head reveal" style={{marginBottom: 40}}>
          <div className="overline" style={{color:"#F47920"}}>{t("Marcas que confían", "Brands that trust us")}</div>
          <h2 className="section-title" style={{fontSize: "clamp(28px, 4vw, 44px)"}}>
            {t("15+ marcas. 3 mercados.", "15+ brands. 3 markets.")}<br/>{t("Operación real.", "Real operation.")}
          </h2>
        </div>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {doubled.map((b, i) => (
            <div key={i} className="brand-logo-card" title={b.name}>
              <img src={b.src} alt={b.name} className="brand-logo-img" />
            </div>
          ))}
        </div>
      </div>
      <div className="wrap" style={{marginTop: 56}}>
        <div className="reveal" style={{display: "flex", gap: 18, flexWrap: "wrap", justifyContent: "center", alignItems: "center"}}>
          <img src="assets/badge-amazon-spn.png" alt="Amazon SPN Verified Service Provider" style={brS.partnerBadge} />
          <img src="assets/badge-amazon-global-selling.png" alt="Amazon Global Selling Partner" style={brS.partnerBadge} />
          <img src="assets/badge-amazon-ads.png" alt="Amazon Ads Advanced Partner" style={brS.partnerBadge} />
        </div>
      </div>
    </section>
  );
}

function CertBadge({ label, sub }) {
  return (
    <div style={{textAlign: "left", display: "flex", alignItems: "center", gap: 12}}>
      <div style={{width: 36, height: 36, borderRadius: 8, background: "rgba(244,121,32,.15)", color: "#F47920", display: "flex", alignItems: "center", justifyContent: "center"}}><Icon name="star" size={18} /></div>
      <div>
        <div style={{fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", textTransform: "uppercase", letterSpacing: 1}}>{label}</div>
        <div style={{fontSize: 11, color: "rgba(255,255,255,.55)", letterSpacing: 1, textTransform: "uppercase"}}>{sub}</div>
      </div>
    </div>
  );
}

const brS = {
  partnerBadge: {
    height: 64,
    width: "auto",
    background: "#fff",
    borderRadius: 14,
    padding: "8px 18px",
    boxShadow: "0 14px 40px rgba(0,0,0,.35), 0 1px 0 rgba(255,255,255,.5) inset",
    border: "1px solid rgba(255,255,255,.12)",
    objectFit: "contain",
    transition: "transform .25s var(--mx-ease)",
  },
};

Object.assign(window, { Services, Process, Brands });
