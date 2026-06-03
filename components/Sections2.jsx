/* global React */

/* ───────── Team / About ───────── */
function Team({ lang }) {
  const t = (es, en) => lang === "en" ? en : es;
  return (
    <section className="section alt" id="equipo">
      <div className="wrap">
        <div className="mx-team-grid" style={tmS.grid}>
          <div className="reveal">
            <div className="overline">{t("Sobre nosotros", "About us")}</div>
            <h2 className="section-title" style={{ textAlign: "left", marginBottom: 24 }}>
              {t("Consultoría de sellers,", "Consulting by sellers,")}<br />
              <span style={{ color: "#F47920" }}>{t("para sellers.", "for sellers.")}</span>
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--mx-fg-2)", marginBottom: 20 }}>
              {t(
                "Patricio y Rodrigo llevamos 6+ años exportando marcas mexicanas a Amazon USA. Aprendimos con nuestras propias marcas, perdiendo dinero en lanzamientos fallidos, optimizando PPC hasta las 2am, y peleando con freight forwarders.",
                "Patricio and Rodrigo have spent 6+ years exporting Mexican brands to Amazon USA. We learned with our own brands — losing money on failed launches, optimizing PPC until 2am, fighting with freight forwarders."
              )}
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--mx-fg-2)", marginBottom: 32 }}>
              {t(
                "Cuando contratas a MEXUS, hablas directo con nosotros. No hay account managers junior. No hay templates copy-paste. Cada estrategia es nuestra firma.",
                "When you hire MEXUS, you talk to us directly. No junior account managers. No copy-paste templates. Every strategy bears our signature."
              )}
            </p>
            <div className="mx-team-diff" style={tmS.diffGrid}>
              <Diff num="01" t={t("Sellers activos", "Active sellers")} d={t("Operamos 4 marcas propias", "We run 4 of our own brands")} />
              <Diff num="02" t={t("Atención directa", "Direct access")} d={t("Slack/WhatsApp con fundadores", "Slack/WhatsApp with founders")} />
              <Diff num="03" t={t("Amazon SPN", "Amazon SPN")} d={t("Parte del Service Provider Network", "Part of the Service Provider Network")} />
              <Diff num="04" t={t("Cross-border MX→US", "Cross-border MX→US")} d={t("Único playbook validado", "Only validated playbook")} />
            </div>
          </div>
          <div style={tmS.cards} className="reveal mx-team-cards">
            <FounderCard
              name="Rodrigo"
              role={t("Co-founder · Operaciones", "Co-founder · Operations")}
              bio={t("Logística, freight, taxes y exportación MX→USA. Habla con Aduanas.", "Logistics, freight, taxes and MX→USA export. Talks to Customs.")}
              tags={["LLC/EIN", "Logística", "Inventario"]}
              photo="assets/team/rodrigo.png" />
            
            <FounderCard
              name="Patricio"
              role={t("Co-founder · Estrategia", "Co-founder · Strategy")}
              bio={t("6+ años Amazon USA. Lead en lanzamientos cross-border y PPC.", "6+ years Amazon USA. Lead on cross-border launches and PPC.")}
              tags={["PPC", "Listings", "Cross-border"]}
              photo="assets/team/patricio.jpeg" />
            
            <FounderCard
              name="Ximena"
              role={t("Content & PPC", "Content & PPC")}
              bio={t("Listings, A+ Content, PPC, Brand Store y catálogo. Cuida la marca como propia.", "Listings, A+ Content, PPC, Brand Store and catalog. Treats your brand as her own.")}
              tags={["Listings", "A+ Content", "Brand Store"]}
              photo="assets/team/ximena.jpeg" />
            
            <FounderCard
              name="Yoshua"
              role={t("Catálogo & Analista", "Catalog & Analyst")}
              bio={t("Catálogo y reportes. ACOS bajo control, decisiones con datos.", "Catalog and reporting. ACOS under control, decisions made with data.")}
              tags={["PPC", "Analytics", "Reporting"]}
              photo="assets/team/yoshua.jpeg" />
            
          </div>
        </div>
      </div>
    </section>);

}

function Diff({ num, t, d }) {
  return (
    <div style={tmS.diff}>
      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 26, color: "#F47920", lineHeight: 1 }}>{num}</div>
      <div>
        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 16, textTransform: "uppercase", color: "var(--mx-navy)", letterSpacing: .5 }}>{t}</div>
        <div style={{ fontSize: 13, color: "var(--mx-fg-2)", lineHeight: 1.4, marginTop: 2 }}>{d}</div>
      </div>
    </div>);

}

function FounderCard({ name, role, bio, tags, photo }) {
  return (
    <div style={tmS.fc}>
      <div style={tmS.fcAvatar}>
        {photo ?
        <img src={photo} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> :

        <div style={tmS.fcPlaceholder}>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 56, fontWeight: 800, color: "#F47920", lineHeight: 1 }}>{name[0]}</span>
            <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1.6, color: "rgba(244,121,32,.65)", marginTop: 8, textTransform: "uppercase" }}>Foto pendiente</span>
          </div>
        }
      </div>
      <div style={{ padding: "20px 22px" }}>
        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 22, textTransform: "uppercase", color: "var(--mx-navy)", lineHeight: 1.05 }}>{name}</div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.2, color: "#F47920", textTransform: "uppercase", marginTop: 4 }}>{role}</div>
        <p style={{ fontSize: 13.5, color: "var(--mx-fg-2)", marginTop: 10, lineHeight: 1.5 }}>{bio}</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 12 }}>
          {tags.map((tg) =>
          <span key={tg} style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, padding: "3px 9px", borderRadius: 999, background: "rgba(244,121,32,.10)", color: "#F47920", textTransform: "uppercase" }}>{tg}</span>
          )}
        </div>
      </div>
    </div>);

}

const tmS = {
  grid: { display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 56, alignItems: "center" },
  diffGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginTop: 8 },
  diff: { display: "flex", gap: 14, alignItems: "flex-start" },
  cards: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
  fc: {
    background: "var(--mx-surface)",
    border: "1px solid var(--mx-border)",
    borderRadius: 14,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "transform .25s, box-shadow .25s"
  },
  fcAvatar: {
    aspectRatio: "1 / 1",
    background: "linear-gradient(135deg, #FFF5EC, #FFE5CC)",
    overflow: "hidden",
    borderBottom: "1px solid var(--mx-border)",
    position: "relative"
  },
  fcPlaceholder: {
    width: "100%", height: "100%",
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    background: "linear-gradient(135deg, #FFF5EC, #FFE5CC)"
  }
};

/* ───────── Platform Preview ───────── */
function Platform({ lang }) {
  const t = (es, en) => lang === "en" ? en : es;
  return (
    <section className="section dark" id="plataforma">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="overline" style={{ color: "#F47920", fontSize: "14px" }}>{t("Plataforma de desarrollo propio", "Proprietary platform")}</div>
          <h2 className="section-title" style={{ color: "rgb(255, 255, 255)" }}>{t("Data conectada con Amazon.", "Data connected to Amazon.")}<br />{t("Automatizada.", "Automated.")}</h2>
          <p className="section-sub">{t("Dashboard interno con todos los KPIs de tu marca. Brand Pulse, PPC, Stock, Reportes — todo lo que opera tu cuenta.", "Internal dashboard with all your brand's KPIs. Brand Pulse, PPC, Stock, Reports — everything your account runs on.")}</p>
        </div>
        <div style={pfS.frame} className="reveal mx-platform-frame">
          <div style={pfS.frameHead}>
            <div style={{ display: "flex", gap: 6 }}>
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57" }} />
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#FEBC2E" }} />
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840" }} />
            </div>
            <div className="mx-platform-url" style={pfS.urlBar}>app.mexusseller.com / brand-pulse / artisans-bazaar</div>
            <div style={{ width: 60 }} />
          </div>
          <div className="mx-platform-body" style={pfS.frameBody}>
            <div className="mx-platform-tabs" style={pfS.tabs}>
              {["Brand Pulse", "PPC", "Stock", "Reports", "Catalog"].map((tt, i) =>
              <span key={tt} style={{ ...pfS.tab, ...(i === 0 ? pfS.tabActive : {}) }}>{tt}</span>
              )}
            </div>
            <div className="mx-platform-kpis" style={pfS.kpiGrid}>
              {[
              { l: "GMV (30d)", v: "$184,320", d: "+24.3%" },
              { l: "Unidades", v: "2,847", d: "+18.1%" },
              { l: "ACOS", v: "14.2%", d: "-3.4%" },
              { l: "Sessions", v: "48.7K", d: "+11.6%" }].
              map((k, i) =>
              <div key={i} style={pfS.kpi}>
                  <div style={pfS.kpiLbl}>{k.l}</div>
                  <div style={pfS.kpiVal}>{k.v}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: k.d.startsWith("+") ? "#7AD694" : "#F87171" }}>
                    {k.d.startsWith("+") ? "▲" : "▼"} {k.d}
                  </div>
                </div>
              )}
            </div>
            <div style={pfS.chart}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 16, textTransform: "uppercase", letterSpacing: 1, color: "#fff" }}>{t("Ventas semanales · 12 sem", "Weekly sales · 12 weeks")}</div>
                <div style={{ display: "flex", gap: 14, fontSize: 11, color: "rgba(255,255,255,.6)" }}>
                  <span><span style={{ display: "inline-block", width: 10, height: 10, background: "#F47920", borderRadius: 2, marginRight: 6 }} />USA</span>
                  <span><span style={{ display: "inline-block", width: 10, height: 10, background: "#4D7DA8", borderRadius: 2, marginRight: 6 }} />MX</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 140 }}>
                {[40, 52, 48, 65, 58, 72, 68, 82, 76, 90, 88, 96].map((h, i) =>
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                    <div style={{ height: `${h}%`, background: "linear-gradient(180deg, #F47920, rgba(244,121,32,.4))", borderRadius: "3px 3px 0 0" }} />
                    <div style={{ height: `${h * 0.45}%`, background: "linear-gradient(180deg, #4D7DA8, rgba(77,125,168,.4))", borderRadius: "3px 3px 0 0" }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }} className="reveal">
          <a href="#contacto" className="btn btn-primary">{t("Acceso incluido en Full Management", "Access included in Full Management")} →</a>
        </div>
      </div>
    </section>);

}

const pfS = {
  frame: {
    background: "#0D1826",
    border: "1px solid rgba(255,255,255,.10)",
    borderRadius: 14,
    overflow: "hidden",
    boxShadow: "0 40px 100px rgba(0,0,0,.5)"
  },
  frameHead: {
    padding: "12px 18px",
    borderBottom: "1px solid rgba(255,255,255,.08)",
    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
    background: "rgba(255,255,255,.02)"
  },
  urlBar: {
    flex: 1, maxWidth: 480,
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: 6, padding: "5px 14px",
    fontSize: 11, color: "rgba(255,255,255,.55)",
    fontFamily: "JetBrains Mono, monospace",
    textAlign: "center"
  },
  frameBody: { padding: 24 },
  tabs: { display: "flex", gap: 4, borderBottom: "1px solid rgba(255,255,255,.08)", marginBottom: 22 },
  tab: { padding: "10px 16px", fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,.55)", cursor: "pointer", borderBottom: "2px solid transparent", marginBottom: -1 },
  tabActive: { color: "#F47920", borderBottomColor: "#F47920", fontWeight: 700 },
  kpiGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 22 },
  kpi: {
    background: "rgba(255,255,255,.03)",
    border: "1px solid rgba(255,255,255,.08)",
    borderTop: "3px solid #F47920",
    borderRadius: 9,
    padding: "14px 16px",
    display: "flex", flexDirection: "column", gap: 4
  },
  kpiLbl: { fontSize: 10, letterSpacing: 1.5, fontWeight: 700, color: "rgba(255,255,255,.5)", textTransform: "uppercase" },
  kpiVal: { fontFamily: "'Barlow Condensed',sans-serif", fontSize: 28, fontWeight: 800, color: "#fff", lineHeight: 1.05 },
  chart: { background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 9, padding: 20 }
};

Object.assign(window, { Team, Platform });