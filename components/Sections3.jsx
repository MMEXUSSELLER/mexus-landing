/* global React */
const { useState: useFS } = React;

/* ───────── FAQ ───────── */
function FAQ({ lang }) {
  const t = (es, en) => lang === "en" ? en : es;
  const items = [
  {
    q: t("¿Qué incluye el diagnóstico gratuito?", "What does the free diagnosis include?"),
    a: t("Llamada de 30 min con Patricio o Rodrigo. Revisamos tu cuenta (si la tienes), tu producto, tu mercado objetivo y te damos un plan inicial honesto. Si no eres un buen fit, te lo decimos.", "30-min call with Patricio or Rodrigo. We review your account (if any), product, target market and give you an honest initial plan. If you're not a good fit, we tell you.")
  },
  {
    q: t("¿Cuánto cuesta Full Management?", "How much is Full Management?"),
    a: t("$8,000 a $25,000 MXN/mes. El precio depende del estado de la cuenta, número de ASINs y la etapa del seller. Lo definimos después del diagnóstico — sin sorpresas.", "$8,000 to $25,000 MXN/month. Price depends on account stage, number of ASINs and seller maturity. We define it after the diagnosis — no surprises.")
  },
  {
    q: t("¿Manejan cuentas Vendor (1P) además de Seller (3P)?", "Do you handle Vendor (1P) accounts in addition to Seller (3P)?"),
    a: t("Sí. Operamos tanto Seller Central (3P) como Vendor Central (1P). Te ayudamos a decidir cuál modelo conviene a tu marca según margen, control de precios, volumen y operación logística — y operamos el que elijas (o ambos en paralelo si tu portafolio lo requiere).", "Yes. We operate both Seller Central (3P) and Vendor Central (1P). We help you decide which model fits your brand based on margin, price control, volume and logistics — and we run the one you choose (or both in parallel if your portfolio needs it).")
  },
  {
    q: t("¿Cómo manejan el cross-border MX → USA?", "How do you handle cross-border MX → USA?"),
    a: t("Implementamos un sistema completo: LLC en EE.UU., EIN, freight forwarders validados, taxes, FBA Inbound y seguimiento de exportación. Custom según tu producto y volumen — definido en llamada de diagnóstico.", "We set up a complete system: US LLC, EIN, validated freight forwarders, taxes, FBA Inbound and export tracking. Custom by product and volume — defined in the diagnosis call.")
  },
  {
    q: t("¿Trabajan con marcas que ya tienen agencia?", "Do you work with brands that already have an agency?"),
    a: t("Sí. Hacemos auditorías de cuenta y muchas marcas migran después. No hay contrato anual obligatorio: si no entregamos, te vas.", "Yes. We do account audits and many brands migrate afterward. No mandatory annual contract: if we don't deliver, you leave.")
  },
  {
    q: t("¿En cuánto tiempo veo resultados?", "How fast do I see results?"),
    a: t("Garantizamos primera venta en USA en 60 días desde el lanzamiento. La escala real (ROI positivo recurrente) toma 4-6 meses dependiendo de la categoría y el ad spend.", "We guarantee a first USA sale within 60 days of launch. Real scale (recurring positive ROI) takes 4-6 months depending on category and ad spend.")
  },
  {
    q: t("¿Hablo directo con los fundadores?", "Do I talk directly with the founders?"),
    a: t("Sí — siempre. Patricio y Rodrigo lideran cada cuenta. No hay account managers junior. Slack o WhatsApp para comunicación diaria.", "Yes — always. Patricio and Rodrigo lead every account. No junior account managers. Slack or WhatsApp for daily communication.")
  }];

  const [open, setOpen] = useFS(0);
  return (
    <section className="section alt" id="faq">
      <div className="wrap" style={{ maxWidth: 880 }}>
        <div className="section-head reveal">
          <div className="overline">{t("Preguntas frecuentes", "FAQ")}</div>
          <h2 className="section-title">{t("Lo que más nos preguntan.", "What we get asked most.")}</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((it, i) =>
          <div key={i} className="reveal" style={fS.item} onClick={() => setOpen(open === i ? -1 : i)}>
              <div style={fS.q}>
                <span style={{ flex: 1 }}>{it.q}</span>
                <span style={{ ...fS.toggle, transform: open === i ? "rotate(45deg)" : "none" }}>
                  <Icon name="plus" size={22} color="#F47920" />
                </span>
              </div>
              <div style={{ ...fS.a, ...(open === i ? fS.aOpen : {}) }}>{it.a}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

const fS = {
  item: {
    background: "var(--mx-surface)",
    border: "1px solid var(--mx-border)",
    borderRadius: 12, padding: "18px 22px",
    cursor: "pointer", transition: "border-color .2s"
  },
  q: {
    display: "flex", alignItems: "center", gap: 16,
    fontFamily: "'Barlow Condensed',sans-serif",
    fontWeight: 700, fontSize: 18, textTransform: "uppercase", letterSpacing: .5,
    color: "var(--mx-navy)"
  },
  toggle: {
    display: "inline-flex",
    transition: "transform .25s",
    flex: "0 0 24px", justifyContent: "center"
  },
  a: {
    maxHeight: 0, overflow: "hidden", opacity: 0,
    transition: "max-height .35s ease, opacity .25s, padding .25s",
    fontSize: 14.5, lineHeight: 1.6, color: "var(--mx-fg-2)"
  },
  aOpen: { maxHeight: 240, opacity: 1, paddingTop: 14 }
};

/* ───────── Contact (CTA only — no form) ───────── */
function Contact({ lang }) {
  const t = (es, en) => lang === "en" ? en : es;
  const wa = "https://wa.me/13473873386?text=" + encodeURIComponent(t(
    "Hola MEXUS, me gustaría agendar un diagnóstico gratis para mi marca.",
    "Hi MEXUS, I'd like to book a free diagnosis for my brand."
  ));
  const calLink = "https://calendar.app.google/H9ncvExjQw7nZu3o9";
  return (
    <section className="section dark" id="contacto" style={{ padding: "120px 0" }}>
      <div className="wrap" style={{ maxWidth: 980 }}>
        <div style={cS.card} className="reveal mx-contact-card">
          <div style={cS.bg} />
          <div style={cS.inner}>
            <div className="overline" style={{ color: "#F47920" }}>{t("Agendar diagnóstico", "Book diagnosis")}</div>
            <h2 className="section-title" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 20px" }}>
              {t("30 MINUTOS.", "30 MINUTES.")}{" "}
              <span style={{ color: "#F47920" }}>{t("CERO COMPROMISO.", "ZERO COMMITMENT.")}</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,.78)", fontSize: 18, lineHeight: 1.55, textAlign: "center", maxWidth: 620, margin: "0 auto 40px" }}>
              {t(
                "Llamada directa con Patricio o Rodrigo. Revisamos tu marca, tu meta, y te decimos exactamente cómo lo haríamos — o si no somos un buen fit.",
                "Direct call with Patricio or Rodrigo. We review your brand, your goal, and tell you exactly how we'd do it — or if we're not a good fit."
              )}
            </p>
            <div style={cS.ctas}>
              <a href={calLink} target="_blank" rel="noopener" className="btn btn-primary" style={{ padding: "18px 32px", fontSize: 16 }}>
                {t("Agendar diagnóstico gratis", "Book free diagnosis")} →
              </a>
            </div>
            <div className="mx-contact-row" style={cS.row}>
              <a href="mailto:hola@mexusseller.com" style={cS.linkItem}>
                <span style={cS.contactIco}><Icon name="mail" size={18} /></span>
                <div>
                  <div style={cS.contactLbl}>{t("Email directo", "Direct email")}</div>
                  <div style={cS.contactVal}>hola@mexusseller.com</div>
                </div>
              </a>
              <a href={wa} target="_blank" rel="noopener" style={cS.linkItem}>
                <span style={{ ...cS.contactIco, background: "rgba(37,211,102,.15)", color: "#25D366" }}>
                  <Icon name="whatsapp" size={18} color="#25D366" />
                </span>
                <div>
                  <div style={cS.contactLbl}>WhatsApp</div>
                  <div style={cS.contactVal}>+1 347 387 3386</div>
                </div>
              </a>
              <div style={cS.linkItem}>
                <span style={cS.contactIco}><Icon name="pin" size={18} /></span>
                <div>
                  <div style={cS.contactLbl}>{t("Oficinas", "Offices")}</div>
                  <div style={cS.contactVal}>MX / Ciudad de México
USA / Nueva York 
</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);}

const cS = {
  card: {
    position: "relative",
    background: "linear-gradient(135deg, #152232 0%, #0D1826 100%)",
    border: "1px solid rgba(244,121,32,.18)",
    borderRadius: 20,
    padding: "72px 32px",
    overflow: "hidden"
  },
  bg: {
    position: "absolute", inset: 0,
    backgroundImage: "radial-gradient(ellipse at top, rgba(244,121,32,.18), transparent 60%)",
    pointerEvents: "none"
  },
  inner: { position: "relative", zIndex: 1 },
  ctas: { display: "flex", justifyContent: "center", marginBottom: 56 },
  row: {
    display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))",
    gap: 12, paddingTop: 36, borderTop: "1px solid rgba(255,255,255,.08)",
    flexWrap: "wrap"
  },
  linkItem: {
    display: "flex", alignItems: "center", gap: 14,
    padding: "8px 4px",
    textDecoration: "none", color: "inherit",
    transition: "transform .2s"
  },
  contactIco: {
    width: 40, height: 40, borderRadius: 10,
    background: "rgba(244,121,32,.15)", color: "#F47920",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0
  },
  contactLbl: { fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "rgba(255,255,255,.5)", textTransform: "uppercase" },
  contactVal: { fontSize: 15, color: "#fff", marginTop: 2, fontWeight: 500 }
};

/* ───────── Footer ───────── */
function Footer({ lang }) {
  const t = (es, en) => lang === "en" ? en : es;
  return (
    <footer style={ftS.wrap}>
      <div style={ftS.inner}>
        <div style={ftS.head}>
          <img src="assets/logo-mexus-white.png" alt="MEXUS" style={{ height: 48 }} />
          <div style={{ ...ftS.tag, fontSize: "30px" }}>{t("Built by sellers, for sellers.", "Built by sellers, for sellers.")}</div>
        </div>
        <div style={ftS.grid}>
          <div>
            <div style={ftS.col}>{t("Contacto", "Contact")}</div>
            <div style={ftS.line}>hola@mexusseller.com</div>
            <div style={ftS.line}>+52 55 1234 5678</div>
            <div style={ftS.line}>CDMX, México</div>
          </div>
          <div>
            <div style={ftS.col}>{t("Servicios", "Services")}</div>
            <div style={ftS.line}>Full Management</div>
            <div style={ftS.line}>PPC Management</div>
            <div style={ftS.line}>Cross-border MX→US</div>
            <div style={ftS.line}>{t("Asesoría 1:1", "1:1 Consulting")}</div>
          </div>
          <div>
            <div style={ftS.col}>{t("Certificaciones", "Certifications")}</div>
            <div style={ftS.line}>Amazon SPN</div>
            <div style={ftS.line}>Global Selling Partner</div>
            <div style={ftS.line}>Amazon Ads Verified</div>
          </div>
          <div>
            <div style={ftS.col}>{t("Empresa", "Company")}</div>
            <div style={ftS.line}>{t("Sobre nosotros", "About")}</div>
            <div style={ftS.line}>{t("Marcas", "Brands")}</div>
            <div style={ftS.line}>{t("Plataforma", "Platform")}</div>
          </div>
        </div>
        <div style={ftS.foot}>
          © 2026 MEXUS SELLER · {t("Todos los derechos reservados", "All rights reserved")}
        </div>
      </div>
    </footer>);

}

const ftS = {
  wrap: { background: "#0D1826", color: "#fff", fontFamily: "Inter, sans-serif", borderTop: "1px solid rgba(255,255,255,.06)" },
  inner: { maxWidth: 1200, margin: "0 auto", padding: "56px 24px 24px" },
  head: { display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 28, borderBottom: "1px solid rgba(255,255,255,.08)", flexWrap: "wrap", gap: 12 },
  tag: { fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 14, textTransform: "uppercase", letterSpacing: 1.5, color: "#F47920" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 32, padding: "32px 0" },
  col: { fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#9CA3AF", marginBottom: 14, textTransform: "uppercase" },
  line: { fontSize: 13.5, color: "rgba(255,255,255,.78)", padding: "4px 0" },
  foot: { paddingTop: 20, borderTop: "1px solid rgba(255,255,255,.08)", fontSize: 12, color: "rgba(255,255,255,.45)" }
};

/* ───────── WhatsApp floating button (official logo) ───────── */
function WhatsApp({ lang }) {
  const t = (es, en) => lang === "en" ? en : es;
  const [hover, setHover] = useFS(false);
  const wa = "https://wa.me/13473873386?text=" + encodeURIComponent(t(
    "Hola MEXUS, me gustaría agendar un diagnóstico gratis para mi marca.",
    "Hi MEXUS, I'd like to book a free diagnosis for my brand."
  ));
  return (
    <a href={wa} target="_blank" rel="noopener"
    style={{ ...waS.btn, transform: hover ? "scale(1.08)" : "none" }}
    onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    aria-label="WhatsApp">
      <Icon name="whatsapp" size={32} color="#fff" />
      <span style={{ ...waS.tip, opacity: hover ? 1 : 0, transform: hover ? "translateX(0)" : "translateX(8px)" }}>
        {t("Chatea con nosotros", "Chat with us")}
      </span>
      <span style={waS.pulse} />
    </a>);

}

const waS = {
  btn: {
    position: "fixed", right: 24, bottom: 24, width: 64, height: 64,
    borderRadius: "50%", background: "#25D366", color: "#fff",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 10px 28px rgba(37,211,102,.5)",
    cursor: "pointer", zIndex: 100,
    transition: "transform .25s", textDecoration: "none"
  },
  tip: {
    position: "absolute", right: 76, top: "50%", transform: "translateY(-50%)",
    background: "#0D1826", color: "#fff", padding: "8px 14px", borderRadius: 8,
    fontSize: 13, fontWeight: 600, whiteSpace: "nowrap",
    boxShadow: "0 4px 14px rgba(0,0,0,.3)",
    transition: "opacity .2s, transform .2s", pointerEvents: "none"
  },
  pulse: {
    position: "absolute", inset: -2, borderRadius: "50%",
    background: "#25D366", opacity: .35,
    animation: "wa-pulse 2.4s ease-out infinite",
    pointerEvents: "none", zIndex: -1
  }
};

Object.assign(window, { FAQ, Contact, Footer, WhatsApp });