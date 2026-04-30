/* MEXUS SELLER — landing interactions
 * vanilla JS, no deps
 */

(() => {
  'use strict';

  /* ─── Translations ─── */
  const translations = {
    es: {
      'meta.title': 'MEXUS SELLER — Lanzamos y escalamos marcas en Amazon USA y México',
      'meta.description': 'Agencia certificada por Amazon Global Selling. Especialistas en expansión MX → US. 6+ años y 20+ marcas activas en Amazon US y México.',

      'nav.servicios': 'Servicios',
      'nav.plataforma': 'Plataforma',
      'nav.proceso': 'Proceso',
      'nav.contacto': 'Contacto',
      'nav.mercados': 'Mercados',
      'nav.clientes': 'Clientes',
      'nav.login': 'Iniciar sesión',

      'hero.headline': 'Lanzamos y escalamos marcas en USA y México.',
      'hero.subheadline': 'Somos sellers. Sabemos lo que cuesta aprender — para que tú no pagues ese precio.',
      'hero.cta.primary': 'Hablar con un experto',
      'hero.cta.secondary': 'Ver qué hacemos',
      'hero.kpi1.label': 'Ventas hoy',
      'hero.stats.years': 'años',
      'hero.stats.brands': 'marcas',
      'hero.stats.markets': 'mercados',

      'services.title': 'Todo lo que tu marca necesita en Amazon.',
      'services.featured.badge': '⭐ Más solicitado',
      'services.featured.title': 'Ready-to-Launch — de cero a primera venta',
      'services.featured.b1': 'Estudio de mercado + análisis de competencia',
      'services.featured.b2': 'Estrategia de pricing y márgenes',
      'services.featured.b3': 'Empaque FBA y logística',
      'services.featured.b4': 'Listings SEO optimizados',
      'services.featured.b5': 'Publicidad PPC desde el día 1',
      'services.featured.b6': 'Lanzamiento supervisado con primera venta',
      'services.featured.cta': 'Hablar con un experto',
      'services.s1.title': 'Gestión de cuenta',
      'services.s1.desc': 'Seller Central y Vendor Central — operación completa de tu cuenta con reportes semanales.',
      'services.s2.title': 'Publicidad PPC',
      'services.s2.desc': 'Sponsored Products, Brands y Display. Optimización semanal por keyword y ASIN.',
      'services.s3.title': 'Estudio de mercado',
      'services.s3.desc': 'Análisis de nicho, keywords y competencia antes de invertir un solo peso.',
      'services.s4.title': 'Expansión MX → US',
      'services.s4.desc': 'El diferenciador que nadie más tiene. Llevamos tu marca mexicana a Amazon USA.',

      'platform.title': 'No solo gestionamos. Construimos tecnología.',
      'platform.subtitle': 'Cada marca tiene acceso a nuestro dashboard propio con KPIs en tiempo real, reportes automáticos y detección de tareas con IA.',
      'platform.c1.title': 'Ventas en tiempo real',
      'platform.c1.desc': 'KPIs actualizados cada hora desde Amazon.',
      'platform.c2.title': 'Reportes mensuales',
      'platform.c2.desc': 'Comparativos automáticos mes a mes.',
      'platform.c3.title': 'Gestión de tareas con IA',
      'platform.c3.desc': 'Gemini detecta acciones en tus llamadas.',
      'platform.c4.title': 'Análisis FBA & logística',
      'platform.c4.desc': 'Costos, fees y sugerencias de resurtido.',
      'platform.c5.title': 'Estudio de mercado',
      'platform.c5.desc': '10 slides con keywords y competencia.',
      'platform.c6.title': 'Captura de reportes',
      'platform.c6.desc': 'Exporta dashboards con tu branding.',
      'platform.cta': 'Ya soy cliente — Acceder a la plataforma',

      'markets.title': 'Dos mercados. Una oportunidad.',
      'markets.subtitle': 'Que pocas marcas están aprovechando.',
      'markets.us.customers': 'clientes activos',
      'markets.us.tag1': 'El marketplace #1 del mundo.',
      'markets.us.tag2': '60% de búsquedas de producto empiezan en Amazon.',
      'markets.mx.growth': 'crecimiento anual',
      'markets.mx.tag1': 'El de mayor crecimiento en LATAM.',
      'markets.mx.tag2': 'Categorías menos saturadas — mayor oportunidad.',
      'markets.banner.title': 'Especialistas en expansión MX → US',
      'markets.banner.subtitle': 'El puente que pocas agencias pueden construir.',
      'markets.banner.badge': '⚡ 60 días a tu primera venta en USA',

      'process.title': 'Así trabajamos.',
      'process.subtitle': 'Sin sorpresas. Sin rollos. Con resultados.',
      'process.s1.title': 'Diagnóstico gratuito',
      'process.s1.time': '48 horas',
      'process.s1.desc': 'Analizamos tu cuenta, tu nicho y tu competencia.',
      'process.s2.title': 'Estrategia a medida',
      'process.s2.time': '1 semana',
      'process.s2.desc': 'Plan completo basado en data real.',
      'process.s3.title': 'Lanzamiento supervisado',
      'process.s3.time': '4-8 semanas',
      'process.s3.desc': 'Ejecutamos contigo, primera venta monitoreada.',
      'process.s4.title': 'Escala y optimización',
      'process.s4.time': 'Continuo',
      'process.s4.desc': 'PPC, inventario, pricing semanal.',
      'process.s1.full': 'Identificamos gaps y oportunidades. Sin compromiso ni costo.',
      'process.s2.full': 'Diseñamos el plan completo: estudio de mercado, pricing competitivo, empaque FBA, keywords y estructura publicitaria.',
      'process.s3.full': 'Listings SEO, campañas, logística FBA, primera venta monitoreada en tiempo real.',
      'process.s4.full': 'Optimizamos semana a semana: PPC, inventario, pricing, reportes detallados. Tu marca crece mientras tú te enfocas en tu negocio.',
      'process.more': 'Ver más',

      'brands.title': 'Marcas que confían en MEXUS.',
      'brands.subtitle': 'Más de 20 marcas activas en Amazon US y México.',
      'brands.your-brand': '+ Tu marca aquí',
      'brands.stats.brands': 'marcas',
      'brands.stats.years': 'años',
      'brands.stats.markets': 'mercados',

      'partner.title': 'Trabajamos de la mano con Amazon.',
      'partner.subtitle': 'Agencia certificada por Amazon Global Selling.',
      'partner.b1': 'Representante de cuenta dedicado en Amazon US',
      'partner.b2': 'Acceso a programas exclusivos de lanzamiento',
      'partner.b3': 'Protección de listing y soporte prioritario',
      'partner.b4': 'Acompañamiento de expertos Amazon',
      'partner.cta': '¿Califico para NSI+?',
      'partner.fineprint': '* Sujeto a criterios de elegibilidad de Amazon.',

      'contact.title': '¿Listo para crecer en Amazon?',
      'contact.subtitle': 'La primera llamada es gratis. Sin rollos. Solo estrategia.',
      'contact.wa.desc': 'Respuesta en menos de 1 hora.',
      'contact.wa.cta': 'Escribir ahora →',
      'contact.email.cta': 'Enviar email →',

      'faq.title': 'Preguntas frecuentes',
      'faq.q1': '¿Cuánto cobran por la gestión de una cuenta?',
      'faq.a1': 'Tenemos diferentes planes según el tamaño de tu marca y el alcance. La primera llamada es gratis y ahí te damos un número exacto.',
      'faq.q2': '¿Trabajan con marcas que están empezando desde cero?',
      'faq.a2': 'Sí. Nuestro servicio Ready-to-Launch está diseñado exactamente para eso.',
      'faq.q3': '¿Qué pasa si ya tengo cuenta en Amazon pero no está funcionando?',
      'faq.a3': 'Hacemos un diagnóstico gratuito en 48 horas para identificar qué está frenando tu crecimiento.',
      'faq.q4': '¿Gestionan cuentas en Amazon US y México al mismo tiempo?',
      'faq.a4': 'Sí. De hecho, es nuestra especialidad — la expansión MX → US con una sola estrategia integrada.',
      'faq.q5': '¿Qué es el programa NSI+ y cómo sé si califico?',
      'faq.a5': 'Es un programa de Amazon para nuevos sellers con acompañamiento exclusivo. Te podemos decir en 10 minutos si tu marca califica.',
      'faq.q6': '¿Cuánto tiempo tarda un lanzamiento en Amazon US?',
      'faq.a6': 'Entre 4 y 8 semanas desde la firma del acuerdo hasta tu primera venta. Nuestro récord: 28 días.',

      'footer.tagline': 'Agencia certificada por Amazon Global Selling.',
      'footer.location': 'Ciudad de México & New York, NY',
      'footer.privacy': 'Privacidad',
      'footer.terms': 'Términos',
    },

    en: {
      'meta.title': 'MEXUS SELLER — We launch and scale brands on Amazon US and Mexico',
      'meta.description': 'Amazon Global Selling certified agency. Specialists in MX → US expansion. 6+ years and 20+ active brands on Amazon US and Mexico.',

      'nav.servicios': 'Services',
      'nav.plataforma': 'Platform',
      'nav.proceso': 'Process',
      'nav.contacto': 'Contact',
      'nav.mercados': 'Markets',
      'nav.clientes': 'Clients',
      'nav.login': 'Log in',

      'hero.headline': 'We launch and scale brands in the US and Mexico.',
      'hero.subheadline': "We're sellers. We know what learning costs — so you don't have to pay that price.",
      'hero.cta.primary': 'Talk to an expert',
      'hero.cta.secondary': 'See what we do',
      'hero.kpi1.label': 'Sales today',
      'hero.stats.years': 'years',
      'hero.stats.brands': 'brands',
      'hero.stats.markets': 'markets',

      'services.title': 'Everything your brand needs on Amazon.',
      'services.featured.badge': '⭐ Most requested',
      'services.featured.title': 'Ready-to-Launch — from zero to first sale',
      'services.featured.b1': 'Market research + competitive analysis',
      'services.featured.b2': 'Pricing and margin strategy',
      'services.featured.b3': 'FBA packaging and logistics',
      'services.featured.b4': 'SEO-optimized listings',
      'services.featured.b5': 'PPC advertising from day one',
      'services.featured.b6': 'Supervised launch with monitored first sale',
      'services.featured.cta': 'Talk to an expert',
      'services.s1.title': 'Account management',
      'services.s1.desc': 'Seller Central and Vendor Central — full account operation with weekly reports.',
      'services.s2.title': 'PPC advertising',
      'services.s2.desc': 'Sponsored Products, Brands and Display. Weekly optimization by keyword and ASIN.',
      'services.s3.title': 'Market research',
      'services.s3.desc': 'Niche, keyword and competitor analysis before spending a single peso.',
      'services.s4.title': 'MX → US expansion',
      'services.s4.desc': 'The differentiator no one else has. We take your Mexican brand to Amazon US.',

      'platform.title': "We don't just manage. We build technology.",
      'platform.subtitle': 'Every brand gets access to our proprietary dashboard with real-time KPIs, automated reports and AI-powered task detection.',
      'platform.c1.title': 'Real-time sales',
      'platform.c1.desc': 'KPIs refreshed hourly from Amazon.',
      'platform.c2.title': 'Monthly reports',
      'platform.c2.desc': 'Automated month-over-month comparisons.',
      'platform.c3.title': 'AI task management',
      'platform.c3.desc': 'Gemini detects action items in your calls.',
      'platform.c4.title': 'FBA & logistics analysis',
      'platform.c4.desc': 'Costs, fees and replenishment suggestions.',
      'platform.c5.title': 'Market research',
      'platform.c5.desc': '10 slides with keywords and competition.',
      'platform.c6.title': 'Report capture',
      'platform.c6.desc': 'Export dashboards with your branding.',
      'platform.cta': "I'm a client — Access the platform",

      'markets.title': 'Two markets. One opportunity.',
      'markets.subtitle': 'That few brands are capturing.',
      'markets.us.customers': 'active customers',
      'markets.us.tag1': "The world's #1 marketplace.",
      'markets.us.tag2': '60% of product searches start on Amazon.',
      'markets.mx.growth': 'annual growth',
      'markets.mx.tag1': 'The fastest-growing in LATAM.',
      'markets.mx.tag2': 'Less saturated categories — more opportunity.',
      'markets.banner.title': 'Specialists in MX → US expansion',
      'markets.banner.subtitle': 'The bridge few agencies can build.',
      'markets.banner.badge': '⚡ 60 days to your first US sale',

      'process.title': 'How we work.',
      'process.subtitle': 'No surprises. No fluff. Just results.',
      'process.s1.title': 'Free diagnostic',
      'process.s1.time': '48 hours',
      'process.s1.desc': 'We analyze your account, niche and competition.',
      'process.s2.title': 'Tailored strategy',
      'process.s2.time': '1 week',
      'process.s2.desc': 'Full plan based on real data.',
      'process.s3.title': 'Supervised launch',
      'process.s3.time': '4-8 weeks',
      'process.s3.desc': 'We execute with you, first sale monitored.',
      'process.s4.title': 'Scale and optimize',
      'process.s4.time': 'Ongoing',
      'process.s4.desc': 'PPC, inventory, weekly pricing.',
      'process.s1.full': 'We spot gaps and opportunities. No commitment, no cost.',
      'process.s2.full': 'We design the full plan: market research, competitive pricing, FBA packaging, keywords and ad structure.',
      'process.s3.full': 'SEO listings, campaigns, FBA logistics, first sale monitored in real time.',
      'process.s4.full': 'We optimize week by week: PPC, inventory, pricing, detailed reports. Your brand grows while you focus on your business.',
      'process.more': 'See more',

      'brands.title': 'Brands that trust MEXUS.',
      'brands.subtitle': 'More than 20 active brands on Amazon US and Mexico.',
      'brands.your-brand': '+ Your brand here',
      'brands.stats.brands': 'brands',
      'brands.stats.years': 'years',
      'brands.stats.markets': 'markets',

      'partner.title': 'We work hand in hand with Amazon.',
      'partner.subtitle': 'Amazon Global Selling certified agency.',
      'partner.b1': 'Dedicated account rep at Amazon US',
      'partner.b2': 'Access to exclusive launch programs',
      'partner.b3': 'Listing protection and priority support',
      'partner.b4': 'Amazon expert coaching',
      'partner.cta': 'Do I qualify for NSI+?',
      'partner.fineprint': '* Subject to Amazon eligibility criteria.',

      'contact.title': 'Ready to grow on Amazon?',
      'contact.subtitle': 'First call is free. No fluff. Just strategy.',
      'contact.wa.desc': 'Reply in under 1 hour.',
      'contact.wa.cta': 'Write now →',
      'contact.email.cta': 'Send email →',

      'faq.title': 'Frequently asked questions',
      'faq.q1': 'How much do you charge to manage an account?',
      'faq.a1': 'We have different plans based on the size of your brand and the scope. The first call is free and that\'s when we give you an exact number.',
      'faq.q2': 'Do you work with brands starting from scratch?',
      'faq.a2': "Yes. Our Ready-to-Launch service is designed exactly for that.",
      'faq.q3': 'What if I already have an Amazon account but it\'s not working?',
      'faq.a3': 'We run a free 48-hour diagnostic to identify what\'s blocking your growth.',
      'faq.q4': 'Do you manage Amazon US and Mexico accounts at the same time?',
      'faq.a4': "Yes. In fact, that's our specialty — MX → US expansion with a single integrated strategy.",
      'faq.q5': 'What is the NSI+ program and how do I know if I qualify?',
      'faq.a5': "It's an Amazon program for new sellers with exclusive coaching. We can tell you in 10 minutes if your brand qualifies.",
      'faq.q6': 'How long does an Amazon US launch take?',
      'faq.a6': 'Between 4 and 8 weeks from signing to first sale. Our record: 28 days.',

      'footer.tagline': 'Amazon Global Selling certified agency.',
      'footer.location': 'Mexico City & New York, NY',
      'footer.privacy': 'Privacy',
      'footer.terms': 'Terms',
    },
  };

  /* ─── State ─── */
  const LANG_KEY = 'mexus.lang';
  const getLang = () => (localStorage.getItem(LANG_KEY) || 'es');
  const setLang = (l) => { localStorage.setItem(LANG_KEY, l); applyLang(l); };

  const byData = (attr) => document.querySelectorAll('[' + attr + ']');

  function applyLang(lang) {
    const t = translations[lang];
    if (!t) return;

    document.documentElement.setAttribute('lang', lang);

    byData('data-i18n').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = t[key];
      if (val == null) return;
      // <title> + <meta content> + normal text
      if (el.tagName === 'META') el.setAttribute('content', val);
      else el.textContent = val;
    });

    // Lang toggle visual
    const cur = document.getElementById('lang-current');
    const oth = document.getElementById('lang-other');
    if (cur && oth) {
      cur.textContent = lang.toUpperCase();
      oth.textContent = (lang === 'es' ? 'EN' : 'ES');
    }
  }

  /* ─── Nav: scroll blur ─── */
  function initNavScroll() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ─── Mobile menu ─── */
  function initMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const btn  = document.getElementById('hamburger');
    if (!menu || !btn) return;

    const open  = () => { menu.classList.add('open'); menu.setAttribute('aria-hidden', 'false'); btn.setAttribute('aria-expanded', 'true');  document.body.classList.add('menu-open'); };
    const close = () => { menu.classList.remove('open'); menu.setAttribute('aria-hidden', 'true');  btn.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open'); };

    btn.addEventListener('click', () => menu.classList.contains('open') ? close() : open());
    menu.querySelectorAll('[data-close-menu]').forEach((el) => el.addEventListener('click', close));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  /* ─── Reveal on scroll ─── */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('visible')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach((el) => io.observe(el));
  }

  /* ─── Counter animation ─── */
  function animateCounter(el, target, decimals = 0, duration = 1800) {
    const start = performance.now();
    const fmt = (n) => {
      if (decimals > 0) return n.toFixed(decimals);
      return Math.round(n).toLocaleString('en-US');
    };
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = fmt(target);
    };
    requestAnimationFrame(tick);
  }

  function initCounters() {
    const counters = document.querySelectorAll('.counter[data-counter]');
    if (!counters.length) return;
    if (!('IntersectionObserver' in window)) {
      counters.forEach((el) => animateCounter(el, parseFloat(el.dataset.counter), parseInt(el.dataset.decimals || '0', 10)));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const target = parseFloat(e.target.dataset.counter);
          const decimals = parseInt(e.target.dataset.decimals || '0', 10);
          animateCounter(e.target, target, decimals);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((el) => io.observe(el));
  }

  /* ─── Language toggle ─── */
  function initLangToggle() {
    const btn = document.getElementById('lang-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => setLang(getLang() === 'es' ? 'en' : 'es'));
  }

  /* ─── Pipeline (Proceso section) ─── */
  function initPipeline() {
    // Click / keyboard to toggle expanded state
    document.querySelectorAll('.stage-card').forEach((card) => {
      const toggle = () => {
        const stage = card.closest('.pipeline-stage');
        if (!stage) return;
        const next = !stage.classList.contains('expanded');
        stage.classList.toggle('expanded', next);
        card.setAttribute('aria-expanded', String(next));
      };
      card.addEventListener('click', toggle);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      });
    });

    // Scroll-based line fill + number pulse (IntersectionObserver)
    if ('IntersectionObserver' in window) {
      const ioLine = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('filled'); ioLine.unobserve(e.target); }
        });
      }, { threshold: 0.3 });
      document.querySelectorAll('.pipeline-connector').forEach((c) => ioLine.observe(c));

      const ioNum = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const n = e.target.querySelector('.stage-number');
            if (n) n.classList.add('active');
            ioNum.unobserve(e.target);
          }
        });
      }, { threshold: 0.5 });
      document.querySelectorAll('.pipeline-stage').forEach((s) => ioNum.observe(s));
    } else {
      document.querySelectorAll('.pipeline-connector').forEach((c) => c.classList.add('filled'));
      document.querySelectorAll('.stage-number').forEach((n) => n.classList.add('active'));
    }

    // Progress bar tied to section visibility
    const section = document.getElementById('proceso');
    const bar = document.querySelector('.pipeline-progress-bar');
    if (!section || !bar) return;
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress = how much of the section has passed above the viewport bottom
      const total = rect.height + vh;
      const passed = vh - rect.top;
      const pct = Math.max(0, Math.min(1, passed / total));
      bar.style.width = (pct * 100).toFixed(1) + '%';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  }

  /* ─── Init ─── */
  document.addEventListener('DOMContentLoaded', () => {
    applyLang(getLang());
    initNavScroll();
    initMobileMenu();
    initReveal();
    initCounters();
    initLangToggle();
    initPipeline();
  });
})();
