# MEXUS Seller — Design System

The single source of truth for anything built for **MEXUS Seller** — landing pages, the operator dashboard, decks, reports, social posts, internal tools. Treat the tokens as fixed; treat the patterns as templates.

> **MEXUS SELLER** is a Mexican Amazon **operating** agency (not a consultancy) for the US and MX marketplaces. It runs the day-to-day for established brands — catalog, ads, inventory, reporting — using its own dashboard, P&L per SKU, and an obsession with the listing before the marketing. **15+ active brands**, **$12M+ USD GMV** under management, certified **Amazon Global Selling (AGS) preferred**. Founded by brothers **Patricio "Pato"** and **Rodrigo "Rodri" Cobar** (apellido _sin tilde_). Legal entity **Roospa Products LLC** (Wyoming); operation in **CDMX + NY**.

This file is the authority on **how it looks and reads**. Tokens live in `styles.css` → `tokens/*.css`; assets in `assets/`; fonts in `fonts/`.

## Sources

Distilled from the upstream product + a prior brand kit:
- Landing site — `github.com/MMEXUSSELLER/mexus-landing` (public)
- Operator console (Plataforma V3.0) — `github.com/MMEXUSSELLER/V-3.0` (private)
- Dashboard refactor — `github.com/MMEXUSSELLER/mexus-dashboard` (private)
- Attached codebase this system was ported from: `MEXUS Seller Design System 2/` (mounted folder, contains `BRAND.md`, `colors_and_type.css`, the ui_kits, and all assets)

If you have access, browse the repos to see production wiring — this system is the distilled version.

---

## The two product surfaces

| Surface | Stack | What it is |
|---|---|---|
| **Landing** (mexusseller.com) | Vanilla HTML/CSS + React (CDN) | Marketing site. Hero + services + brands + team + platform preview + footer. Bilingual (ES default, EN toggle). Dark by default. |
| **Plataforma V3.0** (app.mexusseller.com) | React (CDN) | Operator Console. 13 views (Overview, 3P Sellers, PPC, Inventory, FBA Replenish, Profitability, Catalog, BBC/A+, Customers, Tasks, Reports, KAI, Admin). Light/dark + 3 density modes. |

The split is by **density**: Landing = large type, big radii (8/12/16/pill), generous whitespace. Dashboard = small type, tight radii (3/6/9), dense tables, dark by default.

---

## CONTENT FUNDAMENTALS

Voice: **direct, operator, confident-not-arrogant, bilingual-pragmatic**. MEXUS sounds like operators talking to operators — "gente que ha subido flat files a las 2 a.m."

- **Language:** Spanish (es-MX) default everywhere; English (US tone) on landing via ES/EN toggle. Never mix languages in one piece — except Amazon acronyms that stay English unconditionally: **ASIN, FBA, PO, GMV, BSR, SOV, ACOS, TACOS, MAP, MOQ, brand registry, chargeback, A+ Content, Brand Store.**
- **Pronouns:** `tú`, never `usted`. `Nosotros` for MEXUS the company. English: "we" / "you".
- **Casing:** headlines & display are `UPPERCASE` Barlow Condensed (hero, section titles, KPI values + labels, nav-section headers, tags, eyebrows). Body is sentence case (Inter on landing, Montserrat in dashboard) — never title-case sentences. Buttons are sentence case (`"Agendar diagnóstico"`, not caps).
- **The company** is always `MEXUS SELLER` in body copy — never `Mexus` or `mexus`.
- **Numbers always concrete with units:** `$184,320 USD`, `$8K–$25K MXN/mes`, `2,847 unidades`, `14.2%`, `+47% MoM`. Never `$X`, never "significantly". Tabular numerals in KPI tiles.
- **Dates:** Spanish in MX (`15 de mayo de 2026`, "Ayer"), English in US (`May 15, 2026`). Keep Spanish accents (`días`, `México`).
- **Em-dash (—)** is the workhorse separator. No `&` in body — use `y` / `and`. Typographic quotes (`« »` / `" "`), never straight.
- **CTAs** are short verbs + `→` arrow: `Agendar diagnóstico`, `Agendar llamada`, `Ver qué hacemos`, `Iniciar sesión`, `Diagnóstico gratis · 30 min`. Never "Click here" / "Learn more".

**Vocabulary:** say Operación / Catálogo / ASIN / Marca / Reporting / Dashboard / Equipo / Velocity / Listing — not Gestión / "Productos" / "Cliente" (en pieza pública) / Informes / Panel / Staff / Ficha de producto.

**Anti-patterns (never do):** "ROI garantizado" / "primera página en 30 días"; "growth hacks / Amazon secrets / ninja tricks"; courses/masterclasses/mentorías; screenshots of other brands' dashboards without NDA; decorative emojis 🚀💰; competing on price.

**Emoji:** only country flags on marketplace toggles (🇺🇸 🇲🇽 🇨🇦), treated as data. Stars/checks are SVG icons, never emoji.

Full canonical brand voice, personas, positioning, manifesto → `BRAND.md`.

---

## VISUAL FOUNDATIONS

### Color
Small, committed palette; two brand colors carry almost everything.
- **Orange `#F47920`** — primary CTAs, active tabs, accent borders (`border-top: 3px solid orange` on KPI cards is the signature), focus rings, KPI values, eyebrows, hover. Use it like a highlighter, not a paintcan.
- **Navy family** — `#152232` (logo navy / legacy hero surface), `#1B2F45` (cards on navy), `#0D1826` (deepest current surface — footer, dashboard body), `#0A111A` (V3 dark-mode default for net-new work).
- **Neutrals** — warm grays on light (`#4D4D4D` body, `#9CA3AF` muted, `#E5E5E5` hairline, `#F5F5F5` zebra); translucent whites on dark. Never use `opacity` for layering — alpha-blend in the color.
- **Semantic** (sparingly) — success `hsl(142 71% 45%)` / `#7AD694`; danger `hsl(0 72% 51%)` / `#F87171`; warning = orange hue; WhatsApp `#25D366`; cream `#FFF5EC`.
- **Charts** — ordered 5-color series, orange always #1, then navy, green, red, plum.

### Type
Four families, each with a job (all bundled as TTFs in `fonts/`, no CDN):
- **Barlow Condensed** — all display, always `text-transform: uppercase`. Tight tracking (`-0.01em`) big, wider (0.5–2px) small.
- **Inter** — landing body + buttons.
- **Montserrat** — dashboard body (reads well 12–14px).
- **JetBrains Mono** — numbers, ASIN/SKU, dates, URLs (tabular figures).

Landing leans large (hero `clamp(2.5rem, 8vw, 5rem)`); dashboard leans dense (12–14px body, 28px KPI). Full scale in `tokens/typography.css`.

### Backgrounds
- **Landing hero / login:** solid navy with a faint 48px grid overlay (radial-masked to fade at edges) + one orange radial glow. No whole-hero gradients, no busy textures.
- **Section alternation:** zebra `#FFFFFF` ↔ `#F5F5F5` on light; `#152232` ↔ `#0D1826` on dark.
- **Dashboard:** `#1B2F45` cards on `#0D1826` body (dark); `#FFFFFF` cards on `#F5F6F7` body (light).
- No full-bleed photography in chrome. No hand-drawn illustration; the only mascot is **KAI** (4 PNG fox poses, dashboard AI view only).

### Borders, radii, shadows
- **Landing radii:** 8px buttons · 12px cards · 14px logo cards · 16px hero/featured · pill.
- **Dashboard radii:** 3px chips/inputs · 6px buttons · 9px KPI · 10px data cards.
- **Signature top-accent:** `border-top: 3px solid #F47920` on KPI cards.
- **Shadows:** five steps (`xs / sm / soft / card / lift`) plus colored glows (`orange`, `whatsapp`) and `ring` (0 0 0 4px orange @ .18). Always offset-Y, never offset-X, never inset on cards.

### Motion, hover, press, focus
- **Signature easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (swift entry, slow settle). Quick UI: `cubic-bezier(0.4,0,0.2,1)`. Durations: .1s press · .15s color · .25s hover-lift · .4s panel · .6s reveal.
- **Hover (cards):** `translateY(-2px…-4px)` + shadow lift + border shifts toward orange. **Hover (buttons):** primary darkens to `#E56A15`, lifts 2px, orange glow. **Press:** `translateY(1px)`. **Focus:** `outline: 2px solid #F47920; outline-offset: 2px`.
- Reveal-on-scroll fades (`opacity 0→1`, `translateY(20px)→0`). Signature animations: brand marquee (38s), hero mini-dashboard bar grow, WhatsApp pulse halo, KAI aura/breathing. All honor `prefers-reduced-motion`.

### Cards (3 recipes)
1. **Service / landing default** — white, 1px hairline, 12px radius, lifts 4px + orange border on hover.
2. **KPI / dashboard signature** — dark surface, 3px orange top border, 9px radius, uppercase label + Barlow value + sparkline + colored delta. The most recognizable component in the system.
3. **Featured** — service card + fixed orange border + uppercase corner ribbon.

### Transparency & blur
Navbar `backdrop-filter: blur(14px)` + `rgba(13,24,38,.85)` on scroll. Dashboard page-header `color-mix(...92%, transparent)` + `blur(10px)`. Capsules (pills, `radius: 999px`, tinted fill) win for eyebrows/badges/tags. Protection gradients only on the brand marquee edges.

---

## ICONOGRAPHY

Custom **inline SVG** icon sets — no icon font, no CDN library, no emoji-as-icons (only country flags on marketplace toggles). Two consistent sets ship as components and as raw asset files:

- **Landing** — `IconLanding` component (source `assets/icons-landing.jsx`): ~15 stroke icons, `stroke-width 1.8`, 24×24, round caps. `wrench, megaphone, search, chat, globe-arrow, chart-up, list, rocket, star, check, mail, pin, user, plus, whatsapp`.
- **Dashboard** — `IconDashboard` component (source `assets/icons-dashboard.jsx`): ~40 Lucide-style icons, `stroke-width 2`, 24×24. Nav + table + chart UI glyphs.

**Sizing:** in text 12–14px · in buttons/pills 14–16px · section/hero 22–28px · KPI/feature icons hosted in a 44×44 orange-tinted square (`bg rgba(244,121,32,.14); radius 10px; color #F47920`). If prototyping needs a missing glyph, pull the closest Lucide match and flag it.

### Logos & marks (`assets/`)
`logo-mexus-orange.png` (on light) · `logo-mexus-white.png` (on navy) · `logo-mexus-ofcl.png` (compact) · `mexus-mark.png` (the "M", collapsed sidebar / app icon). Wordmark = orange `MEXUS-` + grey `SELLER` + orange chevrons, Barlow 800 uppercase. **Never** rotate, change the dash, or recolor parts individually. No `favicon.svg` shipped in this port — use `mexus-mark.png` for tab icons.

### Partner badges
`badge-amazon-global-selling.png` (AGS — headline cert) · `badge-amazon-spn.png` · `badge-amazon-ads.png`. Always on a white rounded card (`radius 12–14px`, shadow, 1px inset top highlight) — never directly on navy.

### KAI mascot
`kai-fox-default / thinking / celebrating / alert.png` (+ `kai-icon.png`). Used **only** in the Plataforma AI assistant view — never on landing or in marketing decks.

---

## Components

Reusable React primitives (bundled to `window.DesignSystem_<hash>` for card HTML; import by name in JSX). Full inventory:

- **Button** (`components/buttons/`) — primary / secondary / ghost / ghost-dark / whatsapp; sm/md/lg; optional trailing arrow.
- **Card** (`components/cards/`) — service / featured / dark recipes; `accentTop`; `ribbon`.
- **KpiCard** (`components/cards/`) — signature KPI tile (orange top border, Barlow value, delta, sparkline); dark/light tone.
- **Sparkline** (`components/cards/`) — tiny SVG area chart used inside KpiCard.
- **Tag** (`components/data-display/`) — status/label pill; orange/green/red/gray/gray-light; optional ▲/▼ arrow.
- **Badge** (`components/data-display/`) — small numeric count pill (orange/navy/soft).
- **SectionHeader** (`components/layout/`) — orange eyebrow + Barlow display title + sub; center/left; light/dark.
- **IconLanding** (`components/icons/`) — landing SVG icon set (stroke 1.8).
- **IconDashboard** (`components/icons/`) — dashboard SVG icon set (stroke 2).

Each component directory has `<Name>.jsx`, `<Name>.d.ts`, a `*.prompt.md`, and a `@dsCard` card HTML showing its states.

**Intentional additions:** `Badge` and `SectionHeader` are extracted as named primitives here for reuse even though the source expressed them inline — they encode existing brand patterns (nav count pills; the eyebrow+title+sub block), not new UI.

---

## UI kits

Full-screen recreations that compose the primitives — recreations, not storybooks.

- **`ui_kits/landing/`** — marketing site (`index.html` + Navbar / Hero / Services / Brands / Team / PlatformPreview / Footer). ES/EN toggle, WhatsApp FAB, brand marquee. See its `README.md`.
- **`ui_kits/dashboard/`** — Plataforma V3.0 operator console (`index.html` + `dashboard.css` + Sidebar / Topbar / FilterRail / KpiCard / DataTable / Login). Dark default, light + density toggles. See its `README.md`.

---

## Team

| Name | Role |
|---|---|
| Patricio "Pato" Cobar | Director de Estrategia · co-founder |
| Rodrigo "Rodri" Cobar | Director de Operaciones · co-founder |
| Yoshua García | Project Manager |
| Ximena | Account Manager |

Apellido **Cobar** _sin tilde_. Headshots in `assets/team/`.

---

## Project index

```
.
├── readme.md                 ← this file (visual + content system + manifest)
├── BRAND.md                  ← canonical brand voice · personas · manifesto · anti-patterns
├── SKILL.md                  ← Claude Code / Agent Skills entrypoint
├── styles.css                ← DS entry (@import manifest only) — consumers link this
├── tokens/
│   ├── fonts.css             ← @font-face (Barlow · Montserrat · Inter · JetBrains Mono)
│   ├── colors.css            ← palette + semantic + chart tokens
│   ├── typography.css        ← families · scale · line-height · tracking · weights
│   ├── spacing.css           ← 4/8px scale + layout dims
│   ├── effects.css           ← radii · shadows · borders · motion
│   └── base.css              ← semantic h1/h2/p + helper classes
├── fonts/                    ← bundled TTFs
├── assets/                   ← logos · marks · badges · KAI · icons-*.jsx · brands/ · team/
├── guidelines/               ← foundation @dsCard specimen cards (Colors · Type · Spacing · Brand)
├── components/               ← buttons · cards · data-display · layout · icons
└── ui_kits/
    ├── landing/              ← marketing site recreation
    └── dashboard/            ← operator console recreation
```
