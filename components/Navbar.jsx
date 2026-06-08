/* global React */
const { useState: useNavS, useEffect: useNavE } = React;

function Navbar({ lang, onLang, theme }) {
  const [scrolled, setScrolled] = useNavS(false);
  const [open, setOpen] = useNavS(false);

  useNavE(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile drawer is open
  useNavE(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const t = (es, en) => (lang === "en" ? en : es);
  const links = [
    { href: "#servicios", es: "Qué hacemos", en: "Services" },
    { href: "#proceso", es: "Cómo trabajamos", en: "Process" },
    { href: "#casos", es: "Marcas", en: "Brands" },
    { href: "#equipo", es: "Equipo", en: "Team" },
    { href: "#plataforma", es: "Plataforma", en: "Platform" },
    { href: "#faq", es: "FAQ", en: "FAQ" },
    { href: "/mundial", es: "Mundial 2026", en: "World Cup 2026" },
  ];

  const logoSrc = "assets/logo-mexus-white.png";

  return (
    <nav style={{ ...nbS.bar, ...(scrolled ? nbS.scrolled : {}) }}>
      <div style={nbS.inner}>
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img className="mx-nav-logo" src={logoSrc} alt="MEXUS SELLER" style={{ height: 53 }} />
        </a>

        <div style={nbS.links} className="nav-links-desktop">
          {links.map(l => (
            <a key={l.href} href={l.href} style={nbS.link}
               onMouseEnter={e => e.target.style.color = "#F47920"}
               onMouseLeave={e => e.target.style.color = "rgba(255,255,255,.82)"}>
              {t(l.es, l.en)}
            </a>
          ))}
        </div>

        <div className="mx-nav-right" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Lang toggle — desktop only on mobile we expose it inside the drawer */}
          <button className="mx-nav-lang mx-desktop-only" onClick={() => onLang(lang === "es" ? "en" : "es")} style={nbS.langTog} title="Toggle language">
            <span style={{ color: lang === "es" ? "#F47920" : "rgba(255,255,255,.5)", fontWeight: 700 }}>ES</span>
            <span style={{ color: "rgba(255,255,255,.3)" }}>|</span>
            <span style={{ color: lang === "en" ? "#F47920" : "rgba(255,255,255,.5)", fontWeight: 700 }}>EN</span>
          </button>
          <a className="mx-nav-cta mx-desktop-only" href="https://calendar.app.google/H9ncvExjQw7nZu3o9" target="_blank" rel="noopener" style={nbS.cta}>{t("Agendar llamada", "Book a call")} →</a>
          <a className="mx-nav-signin mx-desktop-only" href="https://app.mexusseller.com" target="_blank" rel="noopener" style={nbS.ctaGhost}>{t("Iniciar sesión", "Sign in")}</a>

          {/* Hamburger — visible only on mobile via CSS */}
          <button
            className="mx-nav-burger"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            style={nbS.burger}
          >
            <span style={{...nbS.burgerLine, transform: open ? "translateY(6px) rotate(45deg)"  : "none"}} />
            <span style={{...nbS.burgerLine, opacity: open ? 0 : 1}} />
            <span style={{...nbS.burgerLine, transform: open ? "translateY(-6px) rotate(-45deg)" : "none"}} />
          </button>
        </div>
      </div>

      {/* Mobile drawer — only renders/visible on mobile via CSS */}
      <div className={"mx-nav-drawer" + (open ? " is-open" : "")} aria-hidden={!open}>
        <div className="mx-nav-drawer-inner">
          {links.map(l => (
            <a key={l.href} href={l.href} className="mx-nav-drawer-link" onClick={() => setOpen(false)}>
              {t(l.es, l.en)}
            </a>
          ))}
          <div className="mx-nav-drawer-lang">
            <span className="mx-nav-drawer-lang-label">{t("Idioma", "Language")}</span>
            <div className="mx-nav-drawer-lang-toggle" role="group">
              <button
                onClick={() => onLang("es")}
                className={lang === "es" ? "is-active" : ""}
                aria-pressed={lang === "es"}
              >ES</button>
              <button
                onClick={() => onLang("en")}
                className={lang === "en" ? "is-active" : ""}
                aria-pressed={lang === "en"}
              >EN</button>
            </div>
          </div>
          <div className="mx-nav-drawer-ctas">
            <a
              href="https://calendar.app.google/H9ncvExjQw7nZu3o9"
              target="_blank"
              rel="noopener"
              className="mx-nav-drawer-primary"
              onClick={() => setOpen(false)}
            >
              {t("Agendar llamada", "Book a call")} →
            </a>
            <a href="https://app.mexusseller.com" target="_blank" rel="noopener" className="mx-nav-drawer-ghost" onClick={() => setOpen(false)}>
              {t("Iniciar sesión", "Sign in")}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

const nbS = {
  bar: {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
    background: "transparent",
    transition: ".25s cubic-bezier(.4,0,.2,1)",
    fontFamily: "Inter, sans-serif",
  },
  scrolled: {
    background: "rgba(13,24,38,.85)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    borderBottom: "1px solid rgba(255,255,255,.08)",
  },
  inner: {
    maxWidth: 1280, margin: "0 auto",
    padding: "14px 28px",
    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
  },
  links: { display: "flex", gap: 26 },
  link: {
    color: "rgba(255,255,255,.82)",
    fontSize: 13.5, fontWeight: 500, cursor: "pointer",
    textDecoration: "none",
    transition: "color .2s",
  },
  langTog: {
    display: "inline-flex", gap: 6, padding: "6px 10px",
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.12)",
    borderRadius: 6, cursor: "pointer", fontSize: 12,
    fontFamily: "inherit",
  },
  cta: {
    background: "#F47920", color: "#fff",
    padding: "10px 18px", borderRadius: 8,
    fontWeight: 700, fontSize: 13, cursor: "pointer",
    fontFamily: "inherit", textDecoration: "none",
    boxShadow: "0 4px 14px rgba(244,121,32,.3)",
    whiteSpace: "nowrap",
  },
  ctaGhost: {
    background: "transparent", color: "rgba(255,255,255,.85)",
    padding: "10px 14px", borderRadius: 8,
    fontWeight: 600, fontSize: 13, cursor: "pointer",
    fontFamily: "inherit", textDecoration: "none",
    border: "1px solid rgba(255,255,255,.18)",
    whiteSpace: "nowrap",
    transition: "background .2s, border-color .2s",
  },
  burger: {
    display: "none", // CSS shows it on mobile
    width: 40, height: 40,
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.12)",
    borderRadius: 8,
    flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 4,
    cursor: "pointer", padding: 0,
  },
  burgerLine: {
    width: 18, height: 2, background: "#fff", borderRadius: 2,
    transition: "transform .25s cubic-bezier(.4,0,.2,1), opacity .2s",
    transformOrigin: "center",
  },
};

Object.assign(window, { Navbar });
