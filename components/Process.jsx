/* global React */
/* Process v2 — interactive stepper.
   Desktop ≥1024px: tab-based stepper with 5s auto-play, hover/click pause.
   Mobile  <1024px: vertical timeline driven by IntersectionObserver. */

const { useState: useP2S, useEffect: useP2E, useRef: useP2R, useMemo: useP2M } = React;

const PROCESS_BOOKING_URL = "https://calendar.app.google/H9ncvExjQw7nZu3o9";

// Icons — local stroke-style SVG. Stays under 1KB total.
function ProcessIcon({ name, size = 22, stroke = "#F47920", strokeWidth = 2 }) {
  const props = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke, strokeWidth,
    strokeLinecap: "round", strokeLinejoin: "round",
  };
  switch (name) {
    case "search":
      return (<svg {...props}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>);
    case "list":
      return (<svg {...props}><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>);
    case "rocket":
      return (<svg {...props}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /></svg>);
    case "trending":
      return (<svg {...props}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>);
    case "check":
      return (<svg {...props}><polyline points="20 6 9 17 4 12" /></svg>);
    default:
      return null;
  }
}

// Match a media query reactively.
function useMediaQueryP2(query) {
  const [matches, setMatches] = useP2S(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );
  useP2E(() => {
    const mql = window.matchMedia(query);
    const onChange = e => setMatches(e.matches);
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, [query]);
  return matches;
}

function buildStages(lang) {
  const t = (es, en) => (lang === "en" ? en : es);
  return [
    {
      id: "diagnostico",
      icon: "search",
      title: t("Diagnóstico", "Diagnosis"),
      tag: t("48H", "48H"),
      eyebrow: t("ETAPA 1 · 48H", "STAGE 1 · 48H"),
      tagline: t(
        "Llamada de 30 min sin compromiso. Salimos con plan claro.",
        "30-min call, no commitment. You walk away with a clear plan."
      ),
      deliverables: [
        t("Auditoría de cuenta Seller/Vendor Central", "Seller/Vendor Central account audit"),
        t("Análisis de tus ASINs activos y oportunidades", "Active ASIN analysis and opportunity scan"),
        t("Benchmarking vs competidores en tu nicho", "Benchmark vs competitors in your niche"),
        t("Identificación de gaps de catálogo y PPC", "Identification of catalog and PPC gaps"),
      ],
      stats: [
        { label: t("COSTO", "COST"), value: t("Gratis · sin compromiso", "Free · no commitment") },
        { label: t("DURACIÓN", "DURATION"), value: t("Llamada 30 min", "30-min call") },
        { label: t("ENTREGABLE", "DELIVERABLE"), value: t("Reporte de hallazgos", "Findings report") },
      ],
    },
    {
      id: "estrategia",
      icon: "list",
      title: t("Estrategia", "Strategy"),
      tag: t("1 SEM", "1 WK"),
      eyebrow: t("ETAPA 2 · 1 SEMANA", "STAGE 2 · 1 WEEK"),
      tagline: t(
        "Plan personalizado con KPIs medibles a 30, 60 y 90 días.",
        "Custom plan with measurable KPIs at 30, 60 and 90 days."
      ),
      deliverables: [
        t("Roadmap 30/60/90 con metas cuantificables", "30/60/90 roadmap with measurable goals"),
        t("Estructura de cuenta optimizada (3P o 1P)", "Optimized account structure (3P or 1P)"),
        t("Plan de PPC con presupuesto y target ACOS", "PPC plan with budget and target ACOS"),
        t("Calendario de lanzamiento de catálogo", "Catalog launch calendar"),
      ],
      stats: [
        { label: "KPIS", value: t("Revenue, TACOS, sell-through", "Revenue, TACOS, sell-through") },
        { label: t("INVOLUCRADOS", "TEAM"), value: t("Director + PM dedicado", "Director + dedicated PM") },
        { label: t("ENTREGABLE", "DELIVERABLE"), value: t("Estrategia + KPIs firmados", "Signed strategy + KPIs") },
      ],
    },
    {
      id: "lanzamiento",
      icon: "rocket",
      title: t("Lanzamiento", "Launch"),
      tag: t("4-8 SEM", "4-8 WK"),
      eyebrow: t("ETAPA 3 · 4-8 SEMANAS", "STAGE 3 · 4-8 WEEKS"),
      tagline: t(
        "Ejecución completa: listings, A+, PPC y primera ola de ventas.",
        "Full execution: listings, A+, PPC and first sales wave."
      ),
      deliverables: [
        t("Listings optimizados con SEO en 2 idiomas", "SEO-optimized listings in 2 languages"),
        t("A+ Content premium y Brand Story", "Premium A+ Content and Brand Story"),
        t("Setup de PPC con campañas Auto + Manual", "PPC setup with Auto + Manual campaigns"),
        t("Inventario calculado y enviado a FBA", "Inventory calculated and shipped to FBA"),
        t("Primera ola de reviews via Vine y orgánicos", "First wave of reviews via Vine and organic"),
      ],
      stats: [
        { label: "TIME-TO-LAUNCH", value: t("4-8 semanas vs ~200 días típico", "4-8 weeks vs ~200 days typical") },
        { label: "REPORTING", value: t("Semanal con dashboard live", "Weekly with live dashboard") },
        { label: t("ENTREGABLE", "DELIVERABLE"), value: t("Cuenta lista + ventas activas", "Account live + active sales") },
      ],
    },
    {
      id: "escala",
      icon: "trending",
      title: t("Escala", "Scale"),
      tag: t("CONTINUO", "ONGOING"),
      eyebrow: t("ETAPA 4 · CONTINUO", "STAGE 4 · ONGOING"),
      tagline: t(
        "Optimización continua, expansión de catálogo y nuevos mercados.",
        "Continuous optimization, catalog expansion and new markets."
      ),
      deliverables: [
        t("Optimización semanal de PPC y listings", "Weekly PPC and listings optimization"),
        t("Expansión a nuevos ASINs y marketplaces", "Expansion to new ASINs and marketplaces"),
        t("Reportes ejecutivos con P&L real", "Executive reports with real P&L"),
        t("Restock automation con velocity tracking", "Restock automation with velocity tracking"),
        t("Apelaciones, reembolsos y account health", "Appeals, reimbursements and account health"),
      ],
      stats: [
        { label: t("CADENCIA", "CADENCE"), value: t("Optimización semanal", "Weekly optimization") },
        { label: t("EXPANSIÓN", "EXPANSION"), value: "US, MX, CA · 3P / 1P" },
        { label: t("GARANTÍA", "GUARANTEE"), value: t("Sin permanencia, solo resultados", "No lock-in, just results") },
      ],
    },
  ];
}

// ─── Section root ─────────────────────────────────────────────────────────
function Process({ lang }) {
  const stages = useP2M(() => buildStages(lang), [lang]);
  const isDesktop = useMediaQueryP2("(min-width: 1024px)");
  const reduceMotion = useMediaQueryP2("(prefers-reduced-motion: reduce)");
  const t = (es, en) => (lang === "en" ? en : es);

  return (
    <section className="process-v2" id="proceso">
      <div className="wrap">
        <div className="process-v2-head reveal">
          <div className="process-v2-eyebrow">{t("Cómo trabajamos", "How we work")}</div>
          <h2 className="process-v2-title">
            {t("Sin sorpresas. Sin rollos.", "No surprises. No fluff.")}<br />
            {t("Con resultados.", "Just results.")}
          </h2>
          <p className="process-v2-subtitle">
            {t(
              "Cuatro etapas con tiempos reales. Empezamos con un diagnóstico gratuito.",
              "Four stages with real timeframes. We start with a free diagnosis."
            )}
          </p>
        </div>

        {isDesktop
          ? <ProcessDesktop stages={stages} lang={lang} reduceMotion={reduceMotion} />
          : <ProcessMobile stages={stages} lang={lang} />}
      </div>
    </section>
  );
}

// ─── Desktop variant ──────────────────────────────────────────────────────
function ProcessDesktop({ stages, lang, reduceMotion }) {
  const [activeIdx, setActiveIdx] = useP2S(0);
  const [paused, setPaused] = useP2S(reduceMotion);
  const [autoStartReady, setAutoStartReady] = useP2S(false);
  const resumeTimerRef = useP2R(null);
  const t = (es, en) => (lang === "en" ? en : es);

  // 3s initial delay before auto-play kicks in (and never if reduce-motion).
  useP2E(() => {
    if (reduceMotion) return;
    const timer = setTimeout(() => setAutoStartReady(true), 3000);
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  // Auto-advance every 5s when not paused.
  useP2E(() => {
    if (!autoStartReady || paused || reduceMotion) return;
    const interval = setInterval(() => {
      setActiveIdx(i => (i + 1) % stages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoStartReady, paused, reduceMotion, stages.length, activeIdx]);

  const clearResume = () => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  };
  const scheduleResume = () => {
    clearResume();
    if (reduceMotion) return;
    resumeTimerRef.current = setTimeout(() => setPaused(false), 8000);
  };

  // Hover: pause + cancel any resume. Leave: schedule resume in 8s.
  const onMouseEnter = () => { setPaused(true); clearResume(); };
  const onMouseLeave = () => { scheduleResume(); };
  // Any click anywhere inside: pause + restart 8s resume timer.
  const onUserInteract = () => { setPaused(true); scheduleResume(); };

  const goPrev = () => { onUserInteract(); setActiveIdx(i => (i - 1 + stages.length) % stages.length); };
  const goNext = () => { onUserInteract(); setActiveIdx(i => (i + 1) % stages.length); };

  useP2E(() => () => clearResume(), []);

  const active = stages[activeIdx];
  const fillPct = ((activeIdx + 1) / stages.length) * 100;

  return (
    <div
      className="process-v2-desktop"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Progress bar with overlaid dots */}
      <div className="process-v2-progress" aria-hidden="true">
        <div className="process-v2-progress-track" />
        <div className="process-v2-progress-fill" style={{ width: `${fillPct}%` }} />
        <div className="process-v2-dots">
          {stages.map((s, i) => {
            const isActive = i === activeIdx;
            const isPast = i < activeIdx;
            return (
              <button
                key={s.id}
                className={
                  "process-v2-dot" +
                  (isActive ? " is-active" : "") +
                  (isPast ? " is-past" : "")
                }
                aria-label={`${t("Ir a etapa", "Go to stage")} ${i + 1}: ${s.title}`}
                onClick={() => { onUserInteract(); setActiveIdx(i); }}
              >
                {isActive && !paused && !reduceMotion && (
                  <span className="process-v2-dot-ring" key={"ring-" + activeIdx} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab row */}
      <div role="tablist" className="process-v2-tabs">
        {stages.map((s, i) => {
          const isActive = i === activeIdx;
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={isActive}
              aria-label={`${t("Etapa", "Stage")} ${i + 1}: ${s.title}`}
              className={"process-v2-tab" + (isActive ? " is-active" : "")}
              onClick={() => { onUserInteract(); setActiveIdx(i); }}
            >
              <span className="process-v2-tab-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="process-v2-tab-name">{s.title}</span>
              <span className="process-v2-tab-pill">{s.tag}</span>
            </button>
          );
        })}
      </div>

      {/* Stage card — keyed so it remounts and re-runs the entry animation */}
      <div role="tabpanel" key={active.id} className="process-v2-card">
        <div className="process-v2-card-head">
          <div>
            <div className="process-v2-card-eyebrow">{active.eyebrow}</div>
            <h3 className="process-v2-card-title">{active.title}</h3>
            <p className="process-v2-card-tagline">{active.tagline}</p>
          </div>
          <div className="process-v2-card-icon">
            <ProcessIcon name={active.icon} size={28} />
          </div>
        </div>
        <div className="process-v2-card-body">
          <div>
            <div className="process-v2-section-label">{t("Qué incluye", "What's included")}</div>
            <ul className="process-v2-deliverables">
              {active.deliverables.map((d, i) => (
                <li key={i}>
                  <ProcessIcon name="check" size={14} strokeWidth={2.5} />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="process-v2-stats">
            {active.stats.map(s => (
              <div key={s.label} className="process-v2-stat">
                <div className="process-v2-stat-label">{s.label}</div>
                <div className="process-v2-stat-value">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="process-v2-card-foot">
          <div className="process-v2-counter" aria-live="polite">
            {String(activeIdx + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}
          </div>
          <div className="process-v2-nav">
            <button onClick={goPrev} aria-label={t("Anterior", "Previous")}>
              ← {t("Anterior", "Previous")}
            </button>
            <button onClick={goNext} aria-label={t("Siguiente", "Next")}>
              {t("Siguiente", "Next")} →
            </button>
          </div>
          <a
            href={PROCESS_BOOKING_URL}
            target="_blank"
            rel="noopener"
            className="process-v2-cta"
            onClick={onUserInteract}
          >
            {t("Quiero agendar un diagnóstico gratis", "Book a free diagnosis")} →
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile variant ───────────────────────────────────────────────────────
function ProcessMobile({ stages, lang }) {
  const [reachedIdx, setReachedIdx] = useP2S(-1);
  const [expanded, setExpanded] = useP2S({});
  const itemRefs = useP2R([]);
  const t = (es, en) => (lang === "en" ? en : es);

  useP2E(() => {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.idx);
            setReachedIdx(prev => Math.max(prev, idx));
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    itemRefs.current.forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, [stages.length]);

  // Fill the timeline up through the latest reached stage.
  const fillPct = reachedIdx < 0 ? 0 : ((reachedIdx + 1) / stages.length) * 100;

  return (
    <div className="process-v2-mobile">
      <ol className="process-v2-timeline" style={{ ["--mxs-timeline-fill"]: `${fillPct}%` }}>
        {stages.map((s, i) => {
          const isReached = i <= reachedIdx;
          const isExpanded = !!expanded[i];
          const visible = isExpanded ? s.deliverables : s.deliverables.slice(0, 2);
          const showToggle = s.deliverables.length > 2;
          return (
            <li
              key={s.id}
              ref={el => (itemRefs.current[i] = el)}
              data-idx={i}
              className={"process-v2-timeline-item" + (isReached ? " is-reached" : "")}
            >
              <div className="process-v2-timeline-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="process-v2-timeline-card">
                <div className="process-v2-timeline-card-head">
                  <span className="process-v2-card-eyebrow">{s.eyebrow}</span>
                  <ProcessIcon name={s.icon} size={20} />
                </div>
                <h3 className="process-v2-card-title">{s.title}</h3>
                <p className="process-v2-card-tagline">{s.tagline}</p>
                <ul className="process-v2-deliverables">
                  {visible.map((d, j) => (
                    <li key={j}>
                      <ProcessIcon name="check" size={12} strokeWidth={2.5} />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                {showToggle && (
                  <button
                    type="button"
                    className="process-v2-toggle"
                    aria-expanded={isExpanded}
                    onClick={() => setExpanded(prev => ({ ...prev, [i]: !prev[i] }))}
                  >
                    {isExpanded ? `${t("Ver menos", "Show less")} ↑` : `${t("Ver más", "Show more")} ↓`}
                  </button>
                )}
                <div className="process-v2-stats process-v2-stats-mobile">
                  {s.stats.map(stat => (
                    <div key={stat.label} className="process-v2-stat">
                      <div className="process-v2-stat-label">{stat.label}</div>
                      <div className="process-v2-stat-value">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      <a
        href={PROCESS_BOOKING_URL}
        target="_blank"
        rel="noopener"
        className="process-v2-cta process-v2-cta-mobile"
      >
        {t(
          "Quiero agendar un diagnóstico gratis con MEXUS para mi marca en Amazon",
          "Book a free diagnosis with MEXUS for my Amazon brand"
        )} →
      </a>
    </div>
  );
}

Object.assign(window, { Process });
