/* @ds-bundle: {"format":4,"namespace":"MEXUSSellerDesignSystem_9cd3ce","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"Card","sourcePath":"components/cards/Card.jsx"},{"name":"KpiCard","sourcePath":"components/cards/KpiCard.jsx"},{"name":"Sparkline","sourcePath":"components/cards/Sparkline.jsx"},{"name":"Badge","sourcePath":"components/data-display/Badge.jsx"},{"name":"Tag","sourcePath":"components/data-display/Tag.jsx"},{"name":"IconDashboard","sourcePath":"components/icons/IconDashboard.jsx"},{"name":"IconLanding","sourcePath":"components/icons/IconLanding.jsx"},{"name":"SectionHeader","sourcePath":"components/layout/SectionHeader.jsx"}],"sourceHashes":{"assets/icons-dashboard.jsx":"2b2bcaf82b08","assets/icons-landing.jsx":"4c16b754f21d","components/buttons/Button.jsx":"fd07f6714d02","components/cards/Card.jsx":"33a31039038c","components/cards/KpiCard.jsx":"da73217a46ef","components/cards/Sparkline.jsx":"acf709ef8a9a","components/data-display/Badge.jsx":"7a2771b2ad3b","components/data-display/Tag.jsx":"938bd1e1b18c","components/icons/IconDashboard.jsx":"26db58c047a6","components/icons/IconLanding.jsx":"905d25899c6c","components/layout/SectionHeader.jsx":"bfb2c08f9fbc","ui_kits/dashboard/DashKpiCard.jsx":"78e841914ceb","ui_kits/dashboard/DataTable.jsx":"0067f593f4dd","ui_kits/dashboard/FilterRail.jsx":"17e0720e962b","ui_kits/dashboard/Login.jsx":"3d87cf94bca8","ui_kits/dashboard/Sidebar.jsx":"b13b31ccb41e","ui_kits/dashboard/Topbar.jsx":"43363727ae56","ui_kits/landing/Brands.jsx":"c7849ccbaef6","ui_kits/landing/Footer.jsx":"66dadc8853f1","ui_kits/landing/Hero.jsx":"003db0711017","ui_kits/landing/Navbar.jsx":"76503206c878","ui_kits/landing/PlatformPreview.jsx":"cbc5bfd41c1b","ui_kits/landing/Services.jsx":"ed01b6335ae0","ui_kits/landing/Team.jsx":"628595672d84"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MEXUSSellerDesignSystem_9cd3ce = window.MEXUSSellerDesignSystem_9cd3ce || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/icons-dashboard.jsx
try { (() => {
/* MEXUS — Dashboard (V-3.0) icon set
   Lucide-style stroke 2, currentColor, 24x24.
   Render as <Icon name="grid" size={16} />.
*/
window.Icon = function Icon({
  name,
  size = 16,
  className = "",
  style = {}
}) {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    style
  };
  const paths = {
    grid: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "3",
      width: "7",
      height: "7"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "14",
      y: "3",
      width: "7",
      height: "7"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "14",
      y: "14",
      width: "7",
      height: "7"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "14",
      width: "7",
      height: "7"
    })),
    users: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "9",
      cy: "7",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M23 21v-2a4 4 0 0 0-3-3.87"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16 3.13a4 4 0 0 1 0 7.75"
    })),
    trendup: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M3 17l6-6 4 4 8-8"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14 7h7v7"
    })),
    trenddown: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M3 7l6 6 4-4 8 8"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14 17h7v-7"
    })),
    package: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3.27 6.96L12 12.01l8.73-5.05"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 22.08V12"
    })),
    truck: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "1",
      y: "3",
      width: "15",
      height: "13"
    }), /*#__PURE__*/React.createElement("polygon", {
      points: "16 8 20 8 23 11 23 16 16 16 16 8"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "5.5",
      cy: "18.5",
      r: "2.5"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "18.5",
      cy: "18.5",
      r: "2.5"
    })),
    dollar: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "1",
      x2: "12",
      y2: "23"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
    })),
    star: /*#__PURE__*/React.createElement("polygon", {
      points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
    }),
    layers: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polygon", {
      points: "12 2 2 7 12 12 22 7 12 2"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "2 17 12 22 22 17"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "2 12 12 17 22 12"
    })),
    grid2: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "3",
      width: "18",
      height: "18",
      rx: "2"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "9",
      y1: "3",
      x2: "9",
      y2: "21"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "15",
      y1: "3",
      x2: "15",
      y2: "21"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "3",
      y1: "9",
      x2: "21",
      y2: "9"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "3",
      y1: "15",
      x2: "21",
      y2: "15"
    })),
    review: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
    })),
    check: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polyline", {
      points: "9 11 12 14 22 4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
    })),
    file: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "14 2 14 8 20 8"
    })),
    sparkles: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z"
    })),
    settings: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
    })),
    bell: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M13.73 21a2 2 0 0 1-3.46 0"
    })),
    search: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "8"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "21",
      y1: "21",
      x2: "16.65",
      y2: "16.65"
    })),
    chev: /*#__PURE__*/React.createElement("polyline", {
      points: "6 9 12 15 18 9"
    }),
    chevright: /*#__PURE__*/React.createElement("polyline", {
      points: "9 18 15 12 9 6"
    }),
    plus: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "5",
      x2: "12",
      y2: "19"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "5",
      y1: "12",
      x2: "19",
      y2: "12"
    })),
    download: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "7 10 12 15 17 10"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "15",
      x2: "12",
      y2: "3"
    })),
    send: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "22",
      y1: "2",
      x2: "11",
      y2: "13"
    }), /*#__PURE__*/React.createElement("polygon", {
      points: "22 2 15 22 11 13 2 9 22 2"
    })),
    mail: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "22,6 12,13 2,6"
    })),
    eye: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "3"
    })),
    edit: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
    })),
    clock: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "12 6 12 12 16 14"
    })),
    calendar: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "4",
      width: "18",
      height: "18",
      rx: "2",
      ry: "2"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "16",
      y1: "2",
      x2: "16",
      y2: "6"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8",
      y1: "2",
      x2: "8",
      y2: "6"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "3",
      y1: "10",
      x2: "21",
      y2: "10"
    })),
    filter: /*#__PURE__*/React.createElement("polygon", {
      points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
    }),
    more: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "1"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "19",
      cy: "12",
      r: "1"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "5",
      cy: "12",
      r: "1"
    })),
    x: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "18",
      y1: "6",
      x2: "6",
      y2: "18"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "6",
      y1: "6",
      x2: "18",
      y2: "18"
    })),
    arrow: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "5",
      y1: "12",
      x2: "19",
      y2: "12"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "12 5 19 12 12 19"
    })),
    arrowup: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "19",
      x2: "12",
      y2: "5"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "5 12 12 5 19 12"
    })),
    flag: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "4",
      y1: "22",
      x2: "4",
      y2: "15"
    })),
    zap: /*#__PURE__*/React.createElement("polygon", {
      points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2"
    }),
    book: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
    })),
    target: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "6"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "2"
    })),
    bot: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "11",
      width: "18",
      height: "10",
      rx: "2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "5",
      r: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 7v4"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8",
      y1: "16",
      x2: "8",
      y2: "16"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "16",
      y1: "16",
      x2: "16",
      y2: "16"
    })),
    refresh: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polyline", {
      points: "23 4 23 10 17 10"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "1 20 1 14 7 14"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
    })),
    logout: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "16 17 21 12 16 7"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "21",
      y1: "12",
      x2: "9",
      y2: "12"
    }))
  };
  return /*#__PURE__*/React.createElement("svg", p, paths[name] || null);
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/icons-dashboard.jsx", error: String((e && e.message) || e) }); }

// assets/icons-landing.jsx
try { (() => {
/* MEXUS — Landing icon set
   Stroke-based, currentColor, 24x24 viewBox.
   Drop into a React app loaded with @babel/standalone, then render <Icon name="..." />.
*/
function Icon({
  name,
  size = 24,
  color = "currentColor",
  style = {}
}) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style
  };
  switch (name) {
    case "wrench":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.3 2.3-2.4-2.4 2.3-2.3z"
      }));
    case "megaphone":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M3 11v3a1 1 0 0 0 1 1h2l3 3 1-1V8L9 7 6 10H4a1 1 0 0 0-1 1z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M11 5l8-2v18l-8-2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M19 9a3 3 0 0 1 0 6"
      }));
    case "search":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("circle", {
        cx: "11",
        cy: "11",
        r: "7"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M20 20l-3.5-3.5"
      }));
    case "chat":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12z"
      }));
    case "globe-arrow":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "9"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M16 8l3 -1 -1 3"
      }));
    case "chart-up":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M3 21h18"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M5 17l5-5 4 4 6-7"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M14 9h6v6"
      }));
    case "list":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M8 6h13M8 12h13M8 18h13"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "4",
        cy: "6",
        r: "1"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "4",
        cy: "12",
        r: "1"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "4",
        cy: "18",
        r: "1"
      }));
    case "rocket":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M5 14l-2 5 5-2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M14 4c-3 0-6 2-8 6l4 4c4-2 6-5 6-8 0-1-1-2-2-2z"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "14",
        cy: "9",
        r: "1.4"
      }));
    case "star":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M12 3l2.6 5.5 6 .9-4.3 4.2 1 6L12 17l-5.3 2.6 1-6L3.4 9.4l6-.9z"
      }));
    case "check":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M5 12l5 5L20 7"
      }));
    case "mail":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("rect", {
        x: "3",
        y: "5",
        width: "18",
        height: "14",
        rx: "2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M3 7l9 6 9-6"
      }));
    case "pin":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "9",
        r: "2.5"
      }));
    case "whatsapp":
      return /*#__PURE__*/React.createElement("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: color,
        style: style
      }, /*#__PURE__*/React.createElement("path", {
        d: "M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.46 1.32 4.96L2 22l5.2-1.36a9.94 9.94 0 0 0 4.84 1.24c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm0 18.16c-1.5 0-2.96-.4-4.24-1.16l-.3-.18-3.08.8.82-3-.2-.32a8.2 8.2 0 1 1 6.99 3.86zm4.5-6.13c-.25-.13-1.46-.72-1.69-.8-.22-.08-.39-.13-.55.13-.16.25-.63.8-.78.96-.14.17-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.43.13-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.13-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.43h-.47c-.16 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.55.13.16 1.74 2.66 4.21 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.29z"
      }));
    case "user":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "8",
        r: "4"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M4 21c0-4 4-7 8-7s8 3 8 7"
      }));
    case "plus":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M12 5v14M5 12h14"
      }));
    default:
      return null;
  }
}
Object.assign(window, {
  Icon
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/icons-landing.jsx", error: String((e && e.message) || e) }); }

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MEXUS Seller button. Sentence-case label, optional trailing arrow.
 * Variants map to the brand's real CTAs across landing + dashboard.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  as = "button",
  disabled = false,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: "8px 14px",
      fontSize: 13,
      radius: 6,
      gap: 6
    },
    md: {
      padding: "12px 20px",
      fontSize: 14,
      radius: 8,
      gap: 8
    },
    lg: {
      padding: "16px 28px",
      fontSize: 15,
      radius: 8,
      gap: 8
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: "var(--mx-orange)",
      color: "#fff",
      border: "none",
      boxShadow: "var(--mx-shadow-orange)"
    },
    secondary: {
      background: "var(--mx-navy)",
      color: "#fff",
      border: "none"
    },
    ghost: {
      background: "transparent",
      color: "var(--mx-navy)",
      border: "1.5px solid var(--mx-border)"
    },
    "ghost-dark": {
      background: "rgba(255,255,255,.05)",
      color: "#fff",
      border: "1.5px solid rgba(255,255,255,.25)"
    },
    whatsapp: {
      background: "var(--mx-whatsapp)",
      color: "#fff",
      border: "none",
      boxShadow: "var(--mx-shadow-whatsapp)"
    }
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    disabled: as === "button" ? disabled : undefined,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: s.gap,
      padding: s.padding,
      fontFamily: "var(--mx-font-body)",
      fontWeight: 700,
      fontSize: s.fontSize,
      lineHeight: 1,
      borderRadius: s.radius,
      cursor: disabled ? "not-allowed" : "pointer",
      textDecoration: "none",
      whiteSpace: "nowrap",
      opacity: disabled ? 0.5 : 1,
      transition: "background var(--mx-dur-2) var(--mx-ease-swift), transform var(--mx-dur-1) var(--mx-ease-swift), box-shadow var(--mx-dur-3) var(--mx-ease)",
      ...(variants[variant] || variants.primary),
      ...style
    }
  }, rest), children, arrow && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontSize: "1.05em"
    }
  }, "\u2192"));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/cards/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MEXUS surface card. Three recipes via `variant`:
 *  - "service" (default): white, hairline, 12px radius, lifts on hover.
 *  - "featured": same but fixed orange border + optional ribbon.
 *  - "dark": navy surface for on-dark contexts.
 * Set `accentTop` for the signature 3px orange top border.
 */
function Card({
  children,
  variant = "service",
  accentTop = false,
  ribbon = null,
  hover = true,
  style = {},
  ...rest
}) {
  const base = {
    position: "relative",
    borderRadius: "var(--mx-radius-lg)",
    padding: "28px 24px",
    transition: "transform var(--mx-dur-3) var(--mx-ease), border-color var(--mx-dur-2) var(--mx-ease-swift), box-shadow var(--mx-dur-3) var(--mx-ease)"
  };
  const variants = {
    service: {
      background: "var(--mx-surface)",
      border: "1px solid var(--mx-border)",
      color: "var(--mx-fg-1)"
    },
    featured: {
      background: "var(--mx-surface)",
      border: "1px solid var(--mx-orange)",
      color: "var(--mx-fg-1)"
    },
    dark: {
      background: "var(--mx-navy-light)",
      border: "1px solid var(--mx-gray-border-dark)",
      color: "#fff"
    }
  };
  const v = variants[variant] || variants.service;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: hover ? "mx-card mx-card--hover" : "mx-card",
    style: {
      ...base,
      ...v,
      ...(accentTop ? {
        borderTop: "var(--mx-border-top-accent)"
      } : {}),
      ...style
    }
  }, rest), ribbon && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 16,
      right: 16,
      background: "var(--mx-orange)",
      color: "#fff",
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: 1,
      padding: "4px 10px",
      borderRadius: "var(--mx-radius-pill)",
      textTransform: "uppercase",
      display: "inline-flex",
      alignItems: "center",
      gap: 4
    }
  }, ribbon), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/Card.jsx", error: String((e && e.message) || e) }); }

// components/cards/Sparkline.jsx
try { (() => {
/**
 * Tiny area sparkline used inside KpiCard. Pure SVG, no deps.
 */
function Sparkline({
  data = [],
  color = "var(--mx-orange)",
  height = 24
}) {
  const w = 100;
  const h = height;
  if (!data.length) return null;
  const max = Math.max(...data, 1);
  const range = max || 1;
  const pts = data.map((v, i) => `${i / (data.length - 1) * w},${h - v / range * h}`).join(" ");
  const area = pts + ` ${w},${h} 0,${h}`;
  return /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: h,
    viewBox: `0 0 ${w} ${h}`,
    preserveAspectRatio: "none",
    style: {
      marginTop: 4,
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("polygon", {
    points: area,
    fill: color,
    fillOpacity: "0.1"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: pts,
    fill: "none",
    stroke: color,
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}
Object.assign(__ds_scope, { Sparkline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/Sparkline.jsx", error: String((e && e.message) || e) }); }

// components/cards/KpiCard.jsx
try { (() => {
/**
 * The most recognizable component in the system: dark KPI tile with the
 * signature 3px orange top border, uppercase label, big Barlow value,
 * colored delta and an optional sparkline. Works on light or dark surfaces.
 */
function KpiCard({
  label,
  value,
  prev = null,
  delta = null,
  deltaDir = "up",
  sparkData = null,
  tone = "dark",
  color = "var(--mx-orange)",
  style = {}
}) {
  const dark = tone === "dark";
  const deltaColor = deltaDir === "down" ? "var(--mx-danger-fg)" : "var(--mx-success-fg)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: dark ? "var(--mx-navy-light)" : "var(--mx-surface)",
      border: `1px solid ${dark ? "var(--mx-gray-border-dark)" : "var(--mx-border)"}`,
      borderTop: "var(--mx-border-top-accent)",
      borderRadius: "var(--mx-radius-md)",
      padding: "14px 16px 16px",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--mx-font-sans)",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: 0.5,
      textTransform: "uppercase",
      color: dark ? "var(--mx-fg-dark-3)" : "var(--mx-fg-3)"
    }
  }, label), prev != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--mx-font-mono)",
      fontSize: 10,
      color: dark ? "rgba(255,255,255,.35)" : "var(--mx-fg-4)"
    }
  }, "prev ", prev)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--mx-font-display)",
      fontSize: 28,
      fontWeight: 800,
      lineHeight: 1,
      letterSpacing: "-.01em",
      color: dark ? "#fff" : "var(--mx-fg-1)",
      fontVariantNumeric: "tabular-nums"
    }
  }, value), delta && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--mx-font-mono)",
      fontSize: 12,
      fontWeight: 700,
      display: "inline-flex",
      gap: 4,
      alignItems: "center",
      color: deltaColor,
      fontVariantNumeric: "tabular-nums"
    }
  }, deltaDir === "down" ? "▼" : "▲", " ", delta), sparkData && /*#__PURE__*/React.createElement(__ds_scope.Sparkline, {
    data: sparkData,
    color: color
  }));
}
Object.assign(__ds_scope, { KpiCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/KpiCard.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Small numeric count badge (orange pill), e.g. nav item counters.
 */
function Badge({
  children,
  tone = "orange",
  style = {},
  ...rest
}) {
  const tones = {
    orange: {
      bg: "var(--mx-orange)",
      fg: "#fff"
    },
    navy: {
      bg: "var(--mx-navy)",
      fg: "#fff"
    },
    soft: {
      bg: "var(--mx-orange-soft)",
      fg: "var(--mx-orange)"
    }
  };
  const t = tones[tone] || tones.orange;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: 18,
      padding: "1px 6px",
      borderRadius: "var(--mx-radius-pill)",
      fontFamily: "var(--mx-font-body)",
      fontSize: 10,
      fontWeight: 700,
      lineHeight: 1.4,
      background: t.bg,
      color: t.fg,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Status/label pill in Barlow Condensed uppercase. Tinted fill by tone.
 * Optional leading triangle for deltas (▲ / ▼).
 */
function Tag({
  children,
  tone = "orange",
  arrow = null,
  style = {},
  ...rest
}) {
  const tones = {
    orange: {
      bg: "var(--mx-orange-soft)",
      fg: "var(--mx-orange)"
    },
    green: {
      bg: "rgba(37,211,102,.16)",
      fg: "var(--mx-success-fg)"
    },
    red: {
      bg: "rgba(239,68,68,.16)",
      fg: "var(--mx-danger-fg)"
    },
    gray: {
      bg: "rgba(255,255,255,.06)",
      fg: "rgba(255,255,255,.7)"
    },
    "gray-light": {
      bg: "var(--mx-off-white)",
      fg: "var(--mx-gray)"
    }
  };
  const t = tones[tone] || tones.orange;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      gap: 4,
      alignItems: "center",
      padding: "2px 8px",
      borderRadius: "var(--mx-radius-pill)",
      fontFamily: "var(--mx-font-display)",
      fontSize: 10.5,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      background: t.bg,
      color: t.fg,
      ...style
    }
  }, rest), arrow === "up" && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u25B2"), arrow === "down" && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u25BC"), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/icons/IconDashboard.jsx
try { (() => {
/**
 * MEXUS dashboard (V-3.0) icon set — Lucide-style stroke 2, currentColor, 24x24.
 * Covers dashboard nav, table actions and chart UI.
 */
function IconDashboard({
  name,
  size = 16,
  color = "currentColor",
  className = "",
  style = {},
  ...rest
}) {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    style,
    ...rest
  };
  const paths = {
    grid: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "3",
      width: "7",
      height: "7"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "14",
      y: "3",
      width: "7",
      height: "7"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "14",
      y: "14",
      width: "7",
      height: "7"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "14",
      width: "7",
      height: "7"
    })),
    users: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "9",
      cy: "7",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M23 21v-2a4 4 0 0 0-3-3.87"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16 3.13a4 4 0 0 1 0 7.75"
    })),
    trendup: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M3 17l6-6 4 4 8-8"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14 7h7v7"
    })),
    trenddown: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M3 7l6 6 4-4 8 8"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14 17h7v-7"
    })),
    package: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3.27 6.96L12 12.01l8.73-5.05"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 22.08V12"
    })),
    truck: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "1",
      y: "3",
      width: "15",
      height: "13"
    }), /*#__PURE__*/React.createElement("polygon", {
      points: "16 8 20 8 23 11 23 16 16 16 16 8"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "5.5",
      cy: "18.5",
      r: "2.5"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "18.5",
      cy: "18.5",
      r: "2.5"
    })),
    dollar: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "1",
      x2: "12",
      y2: "23"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
    })),
    star: /*#__PURE__*/React.createElement("polygon", {
      points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
    }),
    layers: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polygon", {
      points: "12 2 2 7 12 12 22 7 12 2"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "2 17 12 22 22 17"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "2 12 12 17 22 12"
    })),
    grid2: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "3",
      width: "18",
      height: "18",
      rx: "2"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "9",
      y1: "3",
      x2: "9",
      y2: "21"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "15",
      y1: "3",
      x2: "15",
      y2: "21"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "3",
      y1: "9",
      x2: "21",
      y2: "9"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "3",
      y1: "15",
      x2: "21",
      y2: "15"
    })),
    review: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
    })),
    check: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polyline", {
      points: "9 11 12 14 22 4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
    })),
    file: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "14 2 14 8 20 8"
    })),
    sparkles: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z"
    })),
    settings: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
    })),
    bell: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M13.73 21a2 2 0 0 1-3.46 0"
    })),
    search: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "8"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "21",
      y1: "21",
      x2: "16.65",
      y2: "16.65"
    })),
    chev: /*#__PURE__*/React.createElement("polyline", {
      points: "6 9 12 15 18 9"
    }),
    chevright: /*#__PURE__*/React.createElement("polyline", {
      points: "9 18 15 12 9 6"
    }),
    plus: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "5",
      x2: "12",
      y2: "19"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "5",
      y1: "12",
      x2: "19",
      y2: "12"
    })),
    download: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "7 10 12 15 17 10"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "15",
      x2: "12",
      y2: "3"
    })),
    send: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "22",
      y1: "2",
      x2: "11",
      y2: "13"
    }), /*#__PURE__*/React.createElement("polygon", {
      points: "22 2 15 22 11 13 2 9 22 2"
    })),
    mail: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "22,6 12,13 2,6"
    })),
    eye: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "3"
    })),
    edit: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
    })),
    clock: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "12 6 12 12 16 14"
    })),
    calendar: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "4",
      width: "18",
      height: "18",
      rx: "2",
      ry: "2"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "16",
      y1: "2",
      x2: "16",
      y2: "6"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8",
      y1: "2",
      x2: "8",
      y2: "6"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "3",
      y1: "10",
      x2: "21",
      y2: "10"
    })),
    filter: /*#__PURE__*/React.createElement("polygon", {
      points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
    }),
    more: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "1"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "19",
      cy: "12",
      r: "1"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "5",
      cy: "12",
      r: "1"
    })),
    x: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "18",
      y1: "6",
      x2: "6",
      y2: "18"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "6",
      y1: "6",
      x2: "18",
      y2: "18"
    })),
    arrow: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "5",
      y1: "12",
      x2: "19",
      y2: "12"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "12 5 19 12 12 19"
    })),
    arrowup: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "19",
      x2: "12",
      y2: "5"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "5 12 12 5 19 12"
    })),
    flag: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "4",
      y1: "22",
      x2: "4",
      y2: "15"
    })),
    zap: /*#__PURE__*/React.createElement("polygon", {
      points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2"
    }),
    book: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
    })),
    target: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "6"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "2"
    })),
    bot: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "11",
      width: "18",
      height: "10",
      rx: "2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "5",
      r: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 7v4"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8",
      y1: "16",
      x2: "8",
      y2: "16"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "16",
      y1: "16",
      x2: "16",
      y2: "16"
    })),
    refresh: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polyline", {
      points: "23 4 23 10 17 10"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "1 20 1 14 7 14"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
    })),
    logout: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "16 17 21 12 16 7"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "21",
      y1: "12",
      x2: "9",
      y2: "12"
    }))
  };
  return /*#__PURE__*/React.createElement("svg", p, paths[name] || null);
}
Object.assign(__ds_scope, { IconDashboard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icons/IconDashboard.jsx", error: String((e && e.message) || e) }); }

// components/icons/IconLanding.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MEXUS landing icon set — stroke-based, currentColor, 24x24, stroke-width 1.8,
 * round caps/joins. One-to-one with landing section content.
 */
function IconLanding({
  name,
  size = 24,
  color = "currentColor",
  style = {},
  ...rest
}) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style,
    ...rest
  };
  switch (name) {
    case "wrench":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.3 2.3-2.4-2.4 2.3-2.3z"
      }));
    case "megaphone":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M3 11v3a1 1 0 0 0 1 1h2l3 3 1-1V8L9 7 6 10H4a1 1 0 0 0-1 1z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M11 5l8-2v18l-8-2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M19 9a3 3 0 0 1 0 6"
      }));
    case "search":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("circle", {
        cx: "11",
        cy: "11",
        r: "7"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M20 20l-3.5-3.5"
      }));
    case "chat":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12z"
      }));
    case "globe-arrow":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "9"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M16 8l3 -1 -1 3"
      }));
    case "chart-up":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M3 21h18"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M5 17l5-5 4 4 6-7"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M14 9h6v6"
      }));
    case "list":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M8 6h13M8 12h13M8 18h13"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "4",
        cy: "6",
        r: "1"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "4",
        cy: "12",
        r: "1"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "4",
        cy: "18",
        r: "1"
      }));
    case "rocket":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M5 14l-2 5 5-2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M14 4c-3 0-6 2-8 6l4 4c4-2 6-5 6-8 0-1-1-2-2-2z"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "14",
        cy: "9",
        r: "1.4"
      }));
    case "star":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M12 3l2.6 5.5 6 .9-4.3 4.2 1 6L12 17l-5.3 2.6 1-6L3.4 9.4l6-.9z"
      }));
    case "check":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M5 12l5 5L20 7"
      }));
    case "mail":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("rect", {
        x: "3",
        y: "5",
        width: "18",
        height: "14",
        rx: "2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M3 7l9 6 9-6"
      }));
    case "pin":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "9",
        r: "2.5"
      }));
    case "whatsapp":
      return /*#__PURE__*/React.createElement("svg", _extends({
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: color,
        style: style
      }, rest), /*#__PURE__*/React.createElement("path", {
        d: "M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.46 1.32 4.96L2 22l5.2-1.36a9.94 9.94 0 0 0 4.84 1.24c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm0 18.16c-1.5 0-2.96-.4-4.24-1.16l-.3-.18-3.08.8.82-3-.2-.32a8.2 8.2 0 1 1 6.99 3.86zm4.5-6.13c-.25-.13-1.46-.72-1.69-.8-.22-.08-.39-.13-.55.13-.16.25-.63.8-.78.96-.14.17-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.43.13-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.13-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.43h-.47c-.16 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.55.13.16 1.74 2.66 4.21 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.29z"
      }));
    case "user":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "8",
        r: "4"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M4 21c0-4 4-7 8-7s8 3 8 7"
      }));
    case "plus":
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M12 5v14M5 12h14"
      }));
    default:
      return null;
  }
}
Object.assign(__ds_scope, { IconLanding });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icons/IconLanding.jsx", error: String((e && e.message) || e) }); }

// components/layout/SectionHeader.jsx
try { (() => {
/**
 * Section header block: orange uppercase eyebrow + Barlow display title,
 * optional sub-paragraph. Centered on landing, left-aligned in-app.
 */
function SectionHeader({
  eyebrow,
  title,
  sub,
  align = "center",
  tone = "light",
  style = {}
}) {
  const onDark = tone === "dark";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: align,
      ...style
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-block",
      fontFamily: "var(--mx-font-sans)",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 2,
      textTransform: "uppercase",
      color: "var(--mx-orange)",
      marginBottom: 16
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--mx-font-display)",
      fontWeight: 800,
      fontSize: "clamp(28px, 5vw, 56px)",
      lineHeight: 1.05,
      letterSpacing: "-.01em",
      textTransform: "uppercase",
      margin: "0 0 16px",
      color: onDark ? "#fff" : "var(--mx-navy)"
    }
  }, title), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.55,
      maxWidth: 640,
      margin: align === "center" ? "0 auto" : 0,
      color: onDark ? "rgba(255,255,255,.78)" : "var(--mx-gray)"
    }
  }, sub));
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/DashKpiCard.jsx
try { (() => {
/* global React */
/* Prototype KPI tile for the dashboard UI kit — uses dashboard.css classes.
   Named DashKpiCard to avoid clashing with the design-system <KpiCard> component;
   aliased to window.KpiCard so the prototype markup stays unchanged. */

function DashKpiCard({
  label,
  value,
  prev,
  delta,
  deltaDir,
  sparkData,
  color = "#F47920"
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "kpi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, label), prev != null && /*#__PURE__*/React.createElement("span", {
    className: "prev"
  }, "prev ", prev)), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, value), delta && /*#__PURE__*/React.createElement("div", {
    className: "delta " + (deltaDir || "up")
  }, deltaDir === "down" ? "▼" : "▲", " ", delta), sparkData && /*#__PURE__*/React.createElement(DashSparkline, {
    data: sparkData,
    color: color
  }));
}
function DashSparkline({
  data,
  color = "#F47920",
  height = 24
}) {
  const w = 100,
    h = height;
  const max = Math.max(...data, 1);
  const min = 0;
  const range = max - min || 1;
  const pts = data.map((v, i) => `${i / (data.length - 1) * w},${h - (v - min) / range * h}`).join(" ");
  const area = pts + ` ${w},${h} 0,${h}`;
  return /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: h,
    viewBox: `0 0 ${w} ${h}`,
    preserveAspectRatio: "none",
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("polygon", {
    points: area,
    fill: color,
    fillOpacity: "0.10"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: pts,
    fill: "none",
    stroke: color,
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}
Object.assign(window, {
  KpiCard: DashKpiCard,
  DashKpiCard,
  Sparkline: DashSparkline
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/DashKpiCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/DataTable.jsx
try { (() => {
/* global React */

function DataTable() {
  const rows = [{
    sku: "B0CTRJM81X",
    title: "Vela aromática Artisans · Frasco vidrio 250g · Cedro & Tabaco",
    gmv: "$28,420",
    units: 184,
    acos: "11.2%",
    health: "good"
  }, {
    sku: "B0DZK4XQ2P",
    title: "Set de 3 velas Artisans · Edición Limitada Otoño 2025",
    gmv: "$18,960",
    units: 122,
    acos: "14.8%",
    health: "good"
  }, {
    sku: "B0CYWB9PLM",
    title: "Difusor de varillas Artisans · 200ml · Lavanda Mexicana",
    gmv: "$14,210",
    units: 96,
    acos: "17.4%",
    health: "warn"
  }, {
    sku: "B0E2RTV3KL",
    title: "Jabón artesanal Artisans · Pack 3 piezas · Avena & Miel",
    gmv: "$11,720",
    units: 154,
    acos: "21.6%",
    health: "warn"
  }, {
    sku: "B0CPZN8MQR",
    title: "Vela votiva · Set de 6 · Aromas surtidos · Pequeño formato",
    gmv: "$9,380",
    units: 71,
    acos: "9.4%",
    health: "good"
  }, {
    sku: "B0DJY9X7TM",
    title: "Spray ambiental Artisans · 100ml · Vainilla & Caña",
    gmv: "$6,120",
    units: 48,
    acos: "26.1%",
    health: "bad"
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-head",
    style: {
      padding: "16px 20px 0"
    }
  }, /*#__PURE__*/React.createElement("h4", null, "Top SKUs \xB7 \xDAltimos 30 d\xEDas"), /*#__PURE__*/React.createElement("span", {
    className: "sub"
  }, "6 of 142 active SKUs"), /*#__PURE__*/React.createElement("div", {
    className: "actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn ghost"
  }, "Ver todos"))), /*#__PURE__*/React.createElement("table", {
    className: "tbl"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ASIN"), /*#__PURE__*/React.createElement("th", null, "T\xEDtulo"), /*#__PURE__*/React.createElement("th", {
    className: "num"
  }, "GMV (30d)"), /*#__PURE__*/React.createElement("th", {
    className: "num"
  }, "Unidades"), /*#__PURE__*/React.createElement("th", {
    className: "pct"
  }, "ACOS"), /*#__PURE__*/React.createElement("th", null, "Health"))), /*#__PURE__*/React.createElement("tbody", null, rows.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.sku
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      color: "var(--app-fg-2)"
    }
  }, r.sku)), /*#__PURE__*/React.createElement("td", {
    style: {
      maxWidth: 380,
      color: "var(--app-fg-1)"
    }
  }, r.title), /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, /*#__PURE__*/React.createElement("strong", null, r.gmv)), /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, r.units), /*#__PURE__*/React.createElement("td", {
    className: "pct"
  }, r.acos), /*#__PURE__*/React.createElement("td", null, r.health === "good" && /*#__PURE__*/React.createElement("span", {
    className: "tag green"
  }, "\u25B2 ok"), r.health === "warn" && /*#__PURE__*/React.createElement("span", {
    className: "tag orange"
  }, "acos \u2191"), r.health === "bad" && /*#__PURE__*/React.createElement("span", {
    className: "tag red"
  }, "acos crit")))))));
}
Object.assign(window, {
  DataTable
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/DataTable.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/FilterRail.jsx
try { (() => {
/* global React, Icon */

function FilterRail({
  brand,
  onBrand,
  marketplace,
  onMarketplace,
  period,
  onPeriod
}) {
  const brands = [{
    id: "all",
    name: "Todas las marcas",
    initials: "ALL",
    color: "#F47920",
    category: "12 brands"
  }, {
    id: "artisans-bazaar",
    name: "Artisans Bazaar",
    initials: "AB",
    color: "#9C6B4F",
    category: "Home & Decor"
  }, {
    id: "prisma",
    name: "Prisma",
    initials: "PR",
    color: "#4D7DA8",
    category: "Lighting"
  }, {
    id: "maja",
    name: "Maja",
    initials: "MJ",
    color: "#C26A8C",
    category: "Beauty"
  }, {
    id: "hauss",
    name: "Hauss",
    initials: "HS",
    color: "#2A6FDB",
    category: "Home"
  }];
  const current = brands.find(b => b.id === brand) || brands[0];
  const mks = [{
    id: "all",
    label: "Combined"
  }, {
    id: "US",
    label: "🇺🇸 USA",
    sub: "USD"
  }, {
    id: "MX",
    label: "🇲🇽 MX",
    sub: "MXN"
  }, {
    id: "CA",
    label: "🇨🇦 CA",
    sub: "CAD"
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "filter-rail"
  }, /*#__PURE__*/React.createElement("button", {
    className: "brand-pill",
    onClick: () => {
      const idx = brands.findIndex(b => b.id === brand);
      onBrand(brands[(idx + 1) % brands.length].id);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand-swatch",
    style: {
      background: current.color
    }
  }, current.initials), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "name"
  }, current.name), /*#__PURE__*/React.createElement("span", {
    className: "sub"
  }, current.category)), /*#__PURE__*/React.createElement(Icon, {
    name: "chev",
    size: 14
  })), /*#__PURE__*/React.createElement("div", {
    className: "seg"
  }, mks.map(m => /*#__PURE__*/React.createElement("button", {
    key: m.id,
    className: marketplace === m.id ? "active" : "",
    onClick: () => onMarketplace(m.id)
  }, /*#__PURE__*/React.createElement("span", null, m.label), m.sub && /*#__PURE__*/React.createElement("span", {
    className: "sub"
  }, m.sub)))), /*#__PURE__*/React.createElement("button", {
    className: "period-pick",
    onClick: () => {
      const opts = ["last_7", "last_30", "mtd", "last_month"];
      const labels = {
        last_7: "Últimos 7 días",
        last_30: "Últimos 30 días",
        mtd: "Mes actual",
        last_month: "Mes pasado"
      };
      const i = opts.indexOf(period);
      const next = opts[(i + 1) % opts.length];
      onPeriod({
        id: next,
        label: labels[next]
      });
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 13,
    style: {
      color: "var(--app-fg-3)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      lineHeight: 1.1
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, "Per\xEDodo"), /*#__PURE__*/React.createElement("span", null, period?.label || "Mes actual", " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--app-fg-3)"
    }
  }, "\xB7 1 may \u2013 14 may"))), /*#__PURE__*/React.createElement(Icon, {
    name: "chev",
    size: 13,
    style: {
      color: "var(--app-fg-4)",
      marginLeft: 8
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn ghost"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 13
  }), " Exportar"), /*#__PURE__*/React.createElement("button", {
    className: "btn"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 13
  }), " Nueva tarea"));
}
Object.assign(window, {
  FilterRail
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/FilterRail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Login.jsx
try { (() => {
/* global React */

function Login() {
  const [email, setEmail] = React.useState("patricio@mexusseller.com");
  const [pwd, setPwd] = React.useState("");
  return /*#__PURE__*/React.createElement("div", {
    style: lgStyles.wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: lgStyles.grid
  }), /*#__PURE__*/React.createElement("div", {
    style: lgStyles.glow
  }), /*#__PURE__*/React.createElement("div", {
    style: lgStyles.card
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/mexus-mark.png",
    alt: "MEXUS",
    style: {
      width: 56,
      height: 56
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mexus-white.png",
    alt: "MEXUS SELLER",
    style: {
      height: 26,
      display: "block",
      margin: "0 auto"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: lgStyles.tag
  }, "Plataforma \xB7 V3.0"))), /*#__PURE__*/React.createElement("div", {
    style: lgStyles.eyebrow
  }, "Operator Console"), /*#__PURE__*/React.createElement("h1", {
    style: lgStyles.h1
  }, "Bienvenido de vuelta."), /*#__PURE__*/React.createElement("p", {
    style: lgStyles.sub
  }, "Inicia sesi\xF3n para entrar a tu consola."), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      alert("Demo — auth not wired");
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: lgStyles.label
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value),
    style: lgStyles.input
  }), /*#__PURE__*/React.createElement("label", {
    style: lgStyles.label
  }, "Contrase\xF1a"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: pwd,
    onChange: e => setPwd(e.target.value),
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    style: lgStyles.input
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    style: lgStyles.btn
  }, "Entrar \u2192")), /*#__PURE__*/React.createElement("div", {
    style: lgStyles.foot
  }, "\xBFProblemas para entrar? ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:soporte@mexusseller.com",
    style: {
      color: "#F47920",
      textDecoration: "none"
    }
  }, "Escr\xEDbele al equipo"))));
}
const lgStyles = {
  wrap: {
    minHeight: "100vh",
    background: "#0D1826",
    color: "#fff",
    display: "grid",
    placeItems: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Montserrat', sans-serif",
    padding: 24
  },
  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage: "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
    maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
    WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
    pointerEvents: "none"
  },
  glow: {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translateX(-50%)",
    width: 600,
    height: 300,
    background: "radial-gradient(ellipse, rgba(244,121,32,.18) 0%, transparent 60%)",
    pointerEvents: "none"
  },
  card: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: 420,
    background: "#152232",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: 14,
    padding: "36px 32px",
    boxShadow: "0 30px 80px rgba(0,0,0,.5)"
  },
  tag: {
    marginTop: 6,
    textAlign: "center",
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 10,
    letterSpacing: 2,
    color: "#F47920",
    textTransform: "uppercase",
    fontWeight: 700
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 2,
    color: "#F47920",
    textTransform: "uppercase",
    fontFamily: "'Barlow Condensed', sans-serif",
    marginBottom: 8
  },
  h1: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 800,
    fontSize: 32,
    textTransform: "uppercase",
    letterSpacing: "-.01em",
    margin: "0 0 6px",
    color: "#fff"
  },
  sub: {
    fontSize: 13,
    color: "rgba(255,255,255,.65)",
    margin: "0 0 24px"
  },
  label: {
    display: "block",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 1.2,
    color: "rgba(255,255,255,.5)",
    textTransform: "uppercase",
    fontFamily: "'Barlow Condensed', sans-serif",
    marginBottom: 6,
    marginTop: 14
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 6,
    background: "rgba(255,255,255,.04)",
    border: "1px solid rgba(255,255,255,.08)",
    color: "#fff",
    fontFamily: "inherit",
    fontSize: 14,
    outline: "none"
  },
  btn: {
    marginTop: 22,
    width: "100%",
    background: "#F47920",
    color: "#fff",
    padding: "14px 20px",
    borderRadius: 6,
    border: 0,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 14,
    fontFamily: "inherit",
    boxShadow: "0 6px 20px rgba(244,121,32,.4)"
  },
  foot: {
    marginTop: 22,
    textAlign: "center",
    fontSize: 12,
    color: "rgba(255,255,255,.5)"
  }
};
Object.assign(window, {
  Login
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Login.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Sidebar.jsx
try { (() => {
/* global React, Icon */

function Sidebar({
  active,
  onNav
}) {
  const sections = [{
    group: "Comando",
    items: [{
      id: "overview",
      label: "Overview",
      icon: "grid"
    }, {
      id: "sales",
      label: "3P Sellers",
      icon: "users"
    }]
  }, {
    group: "Operación",
    items: [{
      id: "ppc",
      label: "PPC",
      icon: "trendup"
    }, {
      id: "inventory",
      label: "Inventory",
      icon: "package"
    }, {
      id: "fba",
      label: "FBA Replenish",
      icon: "truck"
    }, {
      id: "profit",
      label: "Profitability",
      icon: "dollar"
    }, {
      id: "catalog",
      label: "Catalog",
      icon: "grid2"
    }, {
      id: "bbc",
      label: "BBC / A+",
      icon: "layers"
    }, {
      id: "reviews",
      label: "Customers",
      icon: "review"
    }]
  }, {
    group: "Workflow",
    items: [{
      id: "tasks",
      label: "Tasks",
      icon: "check",
      badge: 6
    }, {
      id: "reports",
      label: "Reports",
      icon: "file"
    }, {
      id: "ai",
      label: "KAI",
      icon: "sparkles"
    }]
  }, {
    group: "Sistema",
    items: [{
      id: "admin",
      label: "Admin",
      icon: "settings"
    }]
  }];
  return /*#__PURE__*/React.createElement("aside", {
    className: "sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mexus-white.png",
    alt: "MEXUS SELLER"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sidebar-tag"
  }, "V3.0")), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-scroll"
  }, sections.map(s => /*#__PURE__*/React.createElement(React.Fragment, {
    key: s.group
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-section"
  }, s.group), s.items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.id,
    className: "nav-item " + (active === it.id ? "active" : ""),
    onClick: () => onNav(it.id)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.icon,
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, it.label), it.badge ? /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, it.badge) : null))))), /*#__PURE__*/React.createElement("div", {
    className: "user-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "avatar"
  }, "PC"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "name"
  }, "Patricio Cobar"), /*#__PURE__*/React.createElement("div", {
    className: "role"
  }, "Admin")), /*#__PURE__*/React.createElement("button", {
    className: "icon-btn",
    style: {
      width: 28,
      height: 28
    },
    title: "Cerrar sesi\xF3n"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "logout",
    size: 13
  }))));
}
Object.assign(window, {
  Sidebar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Topbar.jsx
try { (() => {
/* global React, Icon */

function Topbar({
  crumbs,
  title,
  theme,
  onTheme,
  density,
  onDensity
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "crumbs"
  }, crumbs), /*#__PURE__*/React.createElement("div", {
    className: "page-title"
  }, title)), /*#__PURE__*/React.createElement("div", {
    className: "topbar-right"
  }, /*#__PURE__*/React.createElement("button", {
    className: "icon-btn",
    title: theme === "dark" ? "Modo claro" : "Modo oscuro",
    onClick: () => onTheme(theme === "dark" ? "light" : "dark")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: theme === "dark" ? "eye" : "sparkles",
    size: 15
  })), /*#__PURE__*/React.createElement("button", {
    className: "icon-btn",
    title: "Densidad · " + density,
    onClick: () => {
      const order = ["compact", "comfort", "cozy"];
      onDensity(order[(order.indexOf(density) + 1) % order.length]);
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "grid2",
    size: 15
  })), /*#__PURE__*/React.createElement("button", {
    className: "icon-btn",
    title: "Buscar"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 15
  })), /*#__PURE__*/React.createElement("button", {
    className: "icon-btn",
    title: "Notificaciones"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 15
  }), /*#__PURE__*/React.createElement("span", {
    className: "dot"
  })), /*#__PURE__*/React.createElement("button", {
    className: "icon-btn",
    title: "Refrescar"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "refresh",
    size: 15
  }))));
}
Object.assign(window, {
  Topbar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Topbar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Brands.jsx
try { (() => {
/* global React */

function Brands({
  lang
}) {
  const t = (es, en) => lang === "en" ? en : es;
  const brands = [{
    name: "Artisans Bazaar",
    src: "../../assets/brands/artisans-bazaar.png"
  }, {
    name: "Prisma",
    src: "../../assets/brands/prisma.png",
    zoom: 1.45
  }, {
    name: "Maja",
    src: "../../assets/brands/maja.png",
    zoom: 1.45
  }, {
    name: "Tía Ofilia",
    src: "../../assets/brands/tia-ofilia.png",
    zoom: 1.75
  }, {
    name: "Hauss",
    src: "../../assets/brands/hauss.png",
    zoom: 1.75
  }, {
    name: "Mil Flores",
    src: "../../assets/brands/mil-flores.png",
    zoom: 1.45
  }, {
    name: "Pronalux",
    src: "../../assets/brands/pronalux.png"
  }, {
    name: "Seima",
    src: "../../assets/brands/seima.png",
    zoom: 1.75
  }, {
    name: "Lyssette",
    src: "../../assets/brands/lyssette.webp"
  }, {
    name: "Habits",
    src: "../../assets/brands/habits.webp",
    zoom: 1.45
  }, {
    name: "Bio Maussan",
    src: "../../assets/brands/bio-maussan.png",
    zoom: 1.45
  }, {
    name: "Luxus",
    src: "../../assets/brands/luxus.png"
  }, {
    name: "Regina Romero",
    src: "../../assets/brands/regina-romero.png",
    zoom: 1.45
  }, {
    name: "Tamboreta",
    src: "../../assets/brands/tamboreta.png"
  }, {
    name: "Tramborneas",
    src: "../../assets/brands/tramborneas.png"
  }];
  const doubled = [...brands, ...brands];
  return /*#__PURE__*/React.createElement("section", {
    style: brStyles.section,
    id: "casos"
  }, /*#__PURE__*/React.createElement("div", {
    style: brStyles.wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: brStyles.overline
  }, t("Marcas que confían", "Brands that trust us")), /*#__PURE__*/React.createElement("h2", {
    style: brStyles.title
  }, t("15+ marcas. 3 mercados.", "15+ brands. 3 markets."), /*#__PURE__*/React.createElement("br", null), t("Operación real.", "Real operation.")))), /*#__PURE__*/React.createElement("div", {
    style: brStyles.marquee
  }, /*#__PURE__*/React.createElement("div", {
    style: brStyles.track
  }, doubled.map((b, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: brStyles.card,
    title: b.name
  }, /*#__PURE__*/React.createElement("img", {
    src: b.src,
    alt: b.name,
    style: {
      ...brStyles.img,
      transform: `scale(${b.zoom || 1})`
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: brStyles.wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: brStyles.badges
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/badge-amazon-spn.png",
    alt: "Amazon SPN",
    style: brStyles.badge
  }), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/badge-amazon-global-selling.png",
    alt: "Amazon Global Selling",
    style: brStyles.badge
  }), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/badge-amazon-ads.png",
    alt: "Amazon Ads",
    style: brStyles.badge
  }))), /*#__PURE__*/React.createElement("style", {
    dangerouslySetInnerHTML: {
      __html: `
        @keyframes mxMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .mx-marquee-track { animation: mxMarquee 38s linear infinite; }
        .mx-brand-card:hover img { filter: grayscale(0) !important; opacity: 1 !important; }
      `
    }
  }));
}
const brStyles = {
  section: {
    background: "#152232",
    color: "#fff",
    padding: "80px 0",
    fontFamily: "Inter, sans-serif"
  },
  wrap: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px"
  },
  overline: {
    display: "inline-block",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#F47920",
    marginBottom: 16,
    fontFamily: "Montserrat, sans-serif"
  },
  title: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 800,
    fontSize: "clamp(28px, 4vw, 44px)",
    lineHeight: 1.05,
    letterSpacing: "-.01em",
    textTransform: "uppercase",
    margin: "0 0 16px",
    color: "#fff"
  },
  marquee: {
    display: "flex",
    overflow: "hidden",
    maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
    WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
    marginTop: 8,
    marginBottom: 56
  },
  track: {
    display: "flex",
    gap: 20,
    whiteSpace: "nowrap",
    paddingRight: 20,
    animation: "mxMarquee 38s linear infinite"
  },
  card: {
    flexShrink: 0,
    width: 200,
    height: 110,
    background: "#fff",
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "14px 18px",
    boxShadow: "0 14px 36px rgba(0,0,0,.30), 0 1px 0 rgba(255,255,255,.4) inset",
    border: "1px solid rgba(255,255,255,.10)",
    overflow: "hidden"
  },
  img: {
    display: "block",
    width: "100%",
    height: 60,
    maxWidth: 160,
    objectFit: "contain",
    filter: "grayscale(100%) contrast(1.05)",
    opacity: .85,
    transition: "filter .3s, opacity .3s"
  },
  badges: {
    display: "flex",
    gap: 18,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  badge: {
    height: 64,
    background: "#fff",
    borderRadius: 14,
    padding: "8px 18px",
    boxShadow: "0 14px 40px rgba(0,0,0,.35), 0 1px 0 rgba(255,255,255,.5) inset",
    border: "1px solid rgba(255,255,255,.12)",
    objectFit: "contain"
  }
};
Object.assign(window, {
  Brands
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Brands.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Footer.jsx
try { (() => {
/* global React, Icon */

function Footer({
  lang
}) {
  const t = (es, en) => lang === "en" ? en : es;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("footer", {
    style: ftStyles.footer
  }, /*#__PURE__*/React.createElement("div", {
    style: ftStyles.wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: ftStyles.top
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mexus-white.png",
    alt: "MEXUS SELLER",
    style: {
      height: 38
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: ftStyles.tagline
  }, t("Agencia Amazon · USA y México · Certificada AGS", "Amazon agency · USA and Mexico · AGS certified"))), /*#__PURE__*/React.createElement("div", {
    style: ftStyles.grid
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: ftStyles.h
  }, t("Servicios", "Services")), /*#__PURE__*/React.createElement("ul", {
    style: ftStyles.ul
  }, /*#__PURE__*/React.createElement("li", null, "Full Management"), /*#__PURE__*/React.createElement("li", null, "PPC Management"), /*#__PURE__*/React.createElement("li", null, t("Estudios de mercado", "Market studies")), /*#__PURE__*/React.createElement("li", null, t("Asesoría 1:1", "1:1 Consulting")), /*#__PURE__*/React.createElement("li", null, "Cross-border MX \u2192 US"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: ftStyles.h
  }, "MEXUS"), /*#__PURE__*/React.createElement("ul", {
    style: ftStyles.ul
  }, /*#__PURE__*/React.createElement("li", null, t("Cómo trabajamos", "Process")), /*#__PURE__*/React.createElement("li", null, t("Equipo", "Team")), /*#__PURE__*/React.createElement("li", null, t("Marcas que confían", "Brands")), /*#__PURE__*/React.createElement("li", null, "FAQ"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: ftStyles.h
  }, t("Contacto", "Contact")), /*#__PURE__*/React.createElement("ul", {
    style: ftStyles.ul
  }, /*#__PURE__*/React.createElement("li", null, "hola@mexusseller.com"), /*#__PURE__*/React.createElement("li", null, "WhatsApp: +52 33 1234 5678"), /*#__PURE__*/React.createElement("li", null, "Guadalajara, M\xE9xico")))), /*#__PURE__*/React.createElement("div", {
    style: ftStyles.legal
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 MEXUS Seller"), /*#__PURE__*/React.createElement("span", null, t("Hecho en México con orgullo.", "Made in Mexico with pride."))))), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: ftStyles.wa,
    "aria-label": "WhatsApp"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "whatsapp",
    size: 28,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("style", {
    dangerouslySetInnerHTML: {
      __html: `
        @keyframes waPulse {
          0%   { transform: scale(1);   opacity: .35; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        .wa-halo { position: absolute; inset: 0; border-radius: 999px; background: #25D366; animation: waPulse 2s ease-out infinite; pointer-events: none; }
      `
    }
  }));
}
const ftStyles = {
  footer: {
    background: "#0D1826",
    color: "#fff",
    padding: "80px 0 32px",
    fontFamily: "Inter, sans-serif"
  },
  wrap: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px"
  },
  top: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    paddingBottom: 32,
    borderBottom: "1px solid rgba(255,255,255,.08)"
  },
  tagline: {
    fontSize: 12,
    color: "rgba(255,255,255,.6)",
    letterSpacing: 1,
    textTransform: "uppercase",
    fontWeight: 600
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 40,
    padding: "40px 0"
  },
  h: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 14,
    fontWeight: 800,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#F47920",
    marginBottom: 14
  },
  ul: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    fontSize: 13.5,
    color: "rgba(255,255,255,.7)"
  },
  legal: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: 24,
    borderTop: "1px solid rgba(255,255,255,.06)",
    fontSize: 11,
    color: "rgba(255,255,255,.45)",
    letterSpacing: ".5px"
  },
  wa: {
    position: "fixed",
    bottom: 24,
    right: 24,
    zIndex: 60,
    width: 60,
    height: 60,
    borderRadius: "50%",
    background: "#25D366",
    color: "#fff",
    display: "grid",
    placeItems: "center",
    boxShadow: "0 12px 28px rgba(37,211,102,.45)",
    textDecoration: "none"
  }
};
Object.assign(window, {
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Hero.jsx
try { (() => {
/* global React */

function Hero({
  lang
}) {
  const t = (es, en) => lang === "en" ? en : es;
  return /*#__PURE__*/React.createElement("section", {
    style: heroStyles.wrap,
    id: "top"
  }, /*#__PURE__*/React.createElement("div", {
    style: heroStyles.grid
  }), /*#__PURE__*/React.createElement("div", {
    style: heroStyles.glow
  }), /*#__PURE__*/React.createElement("div", {
    style: heroStyles.inner
  }, /*#__PURE__*/React.createElement("div", {
    style: heroStyles.eyebrow
  }, t("AGENCIA AMAZON · USA + MÉXICO · CERTIFICADA AGS", "AMAZON AGENCY · USA + MEXICO · AGS CERTIFIED")), /*#__PURE__*/React.createElement("h1", {
    style: heroStyles.h1
  }, t("LANZAMOS Y ESCALAMOS", "WE LAUNCH AND SCALE"), /*#__PURE__*/React.createElement("br", null), t("MARCAS EN ", "BRANDS ON "), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#F47920"
    }
  }, "AMAZON.")), /*#__PURE__*/React.createElement("p", {
    style: heroStyles.sub
  }, t("Somos sellers en Amazon. Atención y estrategia directa con Patricio y Rodrigo — para que tu marca no pague el precio de aprender Amazon.", "We're sellers on Amazon. Direct strategy with Patricio and Rodrigo — so your brand doesn't pay the cost of learning Amazon.")), /*#__PURE__*/React.createElement("div", {
    style: heroStyles.ctas
  }, /*#__PURE__*/React.createElement("a", {
    href: "#contacto",
    style: heroStyles.ctaPrimary
  }, t("Agendar diagnóstico", "Book diagnosis"), " \u2192"), /*#__PURE__*/React.createElement("a", {
    href: "#servicios",
    style: heroStyles.ctaGhost
  }, t("Ver qué hacemos", "See what we do"), " \u2192")), /*#__PURE__*/React.createElement("div", {
    style: heroStyles.stats
  }, /*#__PURE__*/React.createElement(HeroStat, {
    value: "6+",
    label: t("AÑOS EN AMAZON", "YEARS ON AMAZON")
  }), /*#__PURE__*/React.createElement(HeroStat, {
    value: "20+",
    label: t("MARCAS ESCALADAS", "BRANDS SCALED")
  }), /*#__PURE__*/React.createElement(HeroStat, {
    value: "3",
    label: t("MERCADOS AMAZON", "AMAZON MARKETS")
  }), /*#__PURE__*/React.createElement(HeroStat, {
    value: "60d",
    label: t("A 1ER VENTA AMAZON USA", "TO 1ST AMAZON USA SALE")
  })), /*#__PURE__*/React.createElement(MiniDashboard, null)));
}
function HeroStat({
  value,
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: heroStyles.stat
  }, /*#__PURE__*/React.createElement("span", {
    style: heroStyles.statVal
  }, value), /*#__PURE__*/React.createElement("span", {
    style: heroStyles.statLbl
  }, label));
}
function MiniDashboard() {
  const bars = [42, 58, 51, 72, 65, 81, 68, 92, 84, 96, 88, 100];
  return /*#__PURE__*/React.createElement("div", {
    style: heroStyles.dash
  }, /*#__PURE__*/React.createElement("div", {
    style: heroStyles.dashHead
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: "#FF5F57"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: "#FEBC2E"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: "#28C840"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: 1,
      color: "rgba(255,255,255,.5)",
      textTransform: "uppercase"
    }
  }, "MEXUS \xB7 Brand Pulse \xB7 ARTISANS BAZAAR"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "hsl(142 71% 45%)",
      boxShadow: "0 0 0 4px rgba(74,222,128,.22)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: heroStyles.dashBody
  }, /*#__PURE__*/React.createElement(DashKpi, {
    label: "GMV (30d)",
    value: "$184,320",
    delta: "+24.3%"
  }), /*#__PURE__*/React.createElement(DashKpi, {
    label: "UNIDADES",
    value: "2,847",
    delta: "+18.1%"
  }), /*#__PURE__*/React.createElement(DashKpi, {
    label: "TACOS",
    value: "12.4%",
    delta: "-3.4%",
    down: true
  }), /*#__PURE__*/React.createElement(DashKpi, {
    label: "CONVERSION",
    value: "22.7%",
    delta: "+11.5%"
  })), /*#__PURE__*/React.createElement("div", {
    style: heroStyles.dashChart
  }, bars.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      height: `${h}%`,
      background: "linear-gradient(180deg, #F47920, rgba(244,121,32,.2))",
      borderRadius: "4px 4px 0 0"
    }
  }))));
}
function DashKpi({
  label,
  value,
  delta,
  down
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: heroStyles.dashKpi
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      letterSpacing: 1.5,
      fontWeight: 700,
      color: "rgba(255,255,255,.55)",
      textTransform: "uppercase"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Barlow Condensed',sans-serif",
      fontSize: 24,
      fontWeight: 800,
      color: "#fff",
      lineHeight: 1.1,
      fontVariantNumeric: "tabular-nums"
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: down ? "#7AD694" : "#7AD694",
      fontVariantNumeric: "tabular-nums"
    }
  }, down ? "▼ " : "▲ ", delta));
}
const heroStyles = {
  wrap: {
    position: "relative",
    background: "#152232",
    color: "#fff",
    fontFamily: "Inter, sans-serif",
    overflow: "hidden",
    padding: "140px 0 100px",
    isolation: "isolate"
  },
  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage: "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
    maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
    WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
    pointerEvents: "none"
  },
  glow: {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translateX(-50%)",
    width: 800,
    height: 400,
    background: "radial-gradient(ellipse, rgba(244,121,32,.15) 0%, transparent 60%)",
    pointerEvents: "none",
    zIndex: 0
  },
  inner: {
    position: "relative",
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px",
    textAlign: "center",
    zIndex: 1
  },
  eyebrow: {
    color: "#F47920",
    fontSize: "clamp(13px, 1.2vw, 16px)",
    fontWeight: 700,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    marginBottom: 22
  },
  h1: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 800,
    fontSize: "clamp(40px, 5.5vw, 72px)",
    lineHeight: 1.05,
    letterSpacing: "-.015em",
    margin: "0 0 24px",
    color: "#fff"
  },
  sub: {
    fontSize: 18,
    color: "rgba(255,255,255,.75)",
    maxWidth: 620,
    margin: "0 auto 36px",
    lineHeight: 1.55
  },
  ctas: {
    display: "inline-flex",
    gap: 12,
    flexWrap: "wrap",
    justifyContent: "center"
  },
  ctaPrimary: {
    background: "#F47920",
    color: "#fff",
    padding: "16px 28px",
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 14,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    boxShadow: "0 8px 26px rgba(244,121,32,.4)"
  },
  ctaGhost: {
    background: "rgba(255,255,255,.05)",
    color: "#fff",
    padding: "16px 28px",
    borderRadius: 8,
    border: "1.5px solid rgba(255,255,255,.25)",
    fontWeight: 700,
    fontSize: 14,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 8
  },
  stats: {
    marginTop: 64,
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 24,
    maxWidth: 720,
    margin: "64px auto 0"
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6
  },
  statVal: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 800,
    fontSize: 40,
    color: "#F47920",
    lineHeight: 1
  },
  statLbl: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 1.6,
    color: "rgba(255,255,255,.55)"
  },
  dash: {
    marginTop: 80,
    background: "#0D1826",
    border: "1px solid rgba(255,255,255,.10)",
    borderRadius: 12,
    boxShadow: "0 30px 80px rgba(0,0,0,.5)",
    maxWidth: 920,
    marginLeft: "auto",
    marginRight: "auto",
    overflow: "hidden",
    textAlign: "left"
  },
  dashHead: {
    padding: "12px 18px",
    borderBottom: "1px solid rgba(255,255,255,.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12
  },
  dashBody: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 1,
    background: "rgba(255,255,255,.06)"
  },
  dashKpi: {
    background: "#0D1826",
    padding: "16px 18px",
    borderTop: "3px solid #F47920",
    display: "flex",
    flexDirection: "column",
    gap: 4
  },
  dashChart: {
    height: 80,
    padding: "8px 18px",
    display: "flex",
    alignItems: "flex-end",
    gap: 4,
    borderTop: "1px solid rgba(255,255,255,.08)"
  }
};
Object.assign(window, {
  Hero
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Navbar.jsx
try { (() => {
/* global React */
const {
  useState,
  useEffect
} = React;
function Navbar({
  lang,
  onLang
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const t = (es, en) => lang === "en" ? en : es;
  const links = [{
    href: "#servicios",
    es: "Qué hacemos",
    en: "Services"
  }, {
    href: "#proceso",
    es: "Cómo trabajamos",
    en: "Process"
  }, {
    href: "#casos",
    es: "Marcas",
    en: "Brands"
  }, {
    href: "#equipo",
    es: "Equipo",
    en: "Team"
  }, {
    href: "#plataforma",
    es: "Plataforma",
    en: "Platform"
  }, {
    href: "#faq",
    es: "FAQ",
    en: "FAQ"
  }];
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      ...navStyles.bar,
      ...(scrolled ? navStyles.scrolled : {})
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: navStyles.inner
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mexus-white.png",
    alt: "MEXUS SELLER",
    style: {
      height: 44
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: navStyles.links
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.href,
    href: l.href,
    style: navStyles.link,
    onMouseEnter: e => e.target.style.color = "#F47920",
    onMouseLeave: e => e.target.style.color = "rgba(255,255,255,.82)"
  }, t(l.es, l.en)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onLang(lang === "es" ? "en" : "es"),
    style: navStyles.langTog
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: lang === "es" ? "#F47920" : "rgba(255,255,255,.5)",
      fontWeight: 700
    }
  }, "ES"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "rgba(255,255,255,.3)"
    }
  }, "|"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: lang === "en" ? "#F47920" : "rgba(255,255,255,.5)",
      fontWeight: 700
    }
  }, "EN")), /*#__PURE__*/React.createElement("a", {
    href: "#contacto",
    style: navStyles.cta
  }, t("Agendar llamada", "Book a call"), " \u2192"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: navStyles.ghost
  }, t("Iniciar sesión", "Sign in")))));
}
const navStyles = {
  bar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    background: "transparent",
    transition: ".25s cubic-bezier(.4,0,.2,1)",
    fontFamily: "Inter, sans-serif"
  },
  scrolled: {
    background: "rgba(13,24,38,.85)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    borderBottom: "1px solid rgba(255,255,255,.08)"
  },
  inner: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "14px 28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24
  },
  links: {
    display: "flex",
    gap: 26
  },
  link: {
    color: "rgba(255,255,255,.82)",
    fontSize: 13.5,
    fontWeight: 500,
    textDecoration: "none",
    transition: "color .2s"
  },
  langTog: {
    display: "inline-flex",
    gap: 6,
    padding: "6px 10px",
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.12)",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 12,
    fontFamily: "inherit",
    color: "#fff"
  },
  cta: {
    background: "#F47920",
    color: "#fff",
    padding: "10px 18px",
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 13,
    fontFamily: "inherit",
    textDecoration: "none",
    boxShadow: "0 4px 14px rgba(244,121,32,.3)",
    whiteSpace: "nowrap"
  },
  ghost: {
    background: "transparent",
    color: "rgba(255,255,255,.85)",
    padding: "10px 14px",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 13,
    fontFamily: "inherit",
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,.18)",
    whiteSpace: "nowrap"
  }
};
Object.assign(window, {
  Navbar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Navbar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/PlatformPreview.jsx
try { (() => {
/* global React */

function PlatformPreview({
  lang
}) {
  const t = (es, en) => lang === "en" ? en : es;
  return /*#__PURE__*/React.createElement("section", {
    style: pfStyles.section,
    id: "plataforma"
  }, /*#__PURE__*/React.createElement("div", {
    style: pfStyles.wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: pfStyles.overline
  }, t("Plataforma de desarrollo propio", "Proprietary platform")), /*#__PURE__*/React.createElement("h2", {
    style: pfStyles.title
  }, t("Data conectada con Amazon.", "Data connected to Amazon."), /*#__PURE__*/React.createElement("br", null), t("Automatizada.", "Automated.")), /*#__PURE__*/React.createElement("p", {
    style: pfStyles.sub
  }, t("Dashboard interno con todos los KPIs de tu marca. Brand Pulse, PPC, Stock, Reportes — todo lo que opera tu cuenta.", "Internal dashboard with all your brand's KPIs. Brand Pulse, PPC, Stock, Reports — everything your account runs on."))), /*#__PURE__*/React.createElement("div", {
    style: pfStyles.frame
  }, /*#__PURE__*/React.createElement("div", {
    style: pfStyles.frameHead
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12,
      height: 12,
      borderRadius: "50%",
      background: "#FF5F57"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12,
      height: 12,
      borderRadius: "50%",
      background: "#FEBC2E"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12,
      height: 12,
      borderRadius: "50%",
      background: "#28C840"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: pfStyles.urlBar
  }, "app.mexusseller.com / brand-pulse / artisans-bazaar"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 60
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: pfStyles.frameBody
  }, /*#__PURE__*/React.createElement("div", {
    style: pfStyles.tabs
  }, ["Brand Pulse", "PPC", "Stock", "Reports", "Catalog"].map((tt, i) => /*#__PURE__*/React.createElement("span", {
    key: tt,
    style: {
      ...pfStyles.tab,
      ...(i === 0 ? pfStyles.tabActive : {})
    }
  }, tt))), /*#__PURE__*/React.createElement("div", {
    style: pfStyles.kpiGrid
  }, [{
    l: "GMV (30d)",
    v: "$184,320",
    d: "+24.3%"
  }, {
    l: "Unidades",
    v: "2,847",
    d: "+18.1%"
  }, {
    l: "ACOS",
    v: "14.2%",
    d: "-3.4%"
  }, {
    l: "Sessions",
    v: "48.7K",
    d: "+11.6%"
  }].map((k, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: pfStyles.kpi
  }, /*#__PURE__*/React.createElement("div", {
    style: pfStyles.kpiLbl
  }, k.l), /*#__PURE__*/React.createElement("div", {
    style: pfStyles.kpiVal
  }, k.v), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: k.d.startsWith("+") ? "#7AD694" : "#F87171"
    }
  }, k.d.startsWith("+") ? "▲" : "▼", " ", k.d)))), /*#__PURE__*/React.createElement("div", {
    style: pfStyles.chart
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Barlow Condensed',sans-serif",
      fontWeight: 700,
      fontSize: 16,
      textTransform: "uppercase",
      letterSpacing: 1,
      color: "#fff"
    }
  }, t("Ventas semanales · 12 sem", "Weekly sales · 12 weeks")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      fontSize: 11,
      color: "rgba(255,255,255,.6)"
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      width: 10,
      height: 10,
      background: "#F47920",
      borderRadius: 2,
      marginRight: 6
    }
  }), "USA"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      width: 10,
      height: 10,
      background: "#4D7DA8",
      borderRadius: 2,
      marginRight: 6
    }
  }), "MX"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 6,
      height: 140
    }
  }, [40, 52, 48, 65, 58, 72, 68, 82, 76, 90, 88, 96].map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: `${h}%`,
      background: "linear-gradient(180deg, #F47920, rgba(244,121,32,.4))",
      borderRadius: "3px 3px 0 0"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: `${h * 0.45}%`,
      background: "linear-gradient(180deg, #4D7DA8, rgba(77,125,168,.4))",
      borderRadius: "3px 3px 0 0"
    }
  })))))))));
}
const pfStyles = {
  section: {
    background: "#152232",
    color: "#fff",
    padding: "96px 0",
    fontFamily: "Inter, sans-serif"
  },
  wrap: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px"
  },
  overline: {
    display: "inline-block",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#F47920",
    marginBottom: 16,
    fontFamily: "Montserrat, sans-serif"
  },
  title: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 800,
    fontSize: "clamp(36px, 5vw, 56px)",
    lineHeight: 1.05,
    letterSpacing: "-.01em",
    textTransform: "uppercase",
    margin: "0 0 16px",
    color: "#fff"
  },
  sub: {
    color: "rgba(255,255,255,.78)",
    maxWidth: 640,
    margin: "0 auto",
    fontSize: 17,
    lineHeight: 1.55
  },
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
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    background: "rgba(255,255,255,.02)"
  },
  urlBar: {
    flex: 1,
    maxWidth: 480,
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: 6,
    padding: "5px 14px",
    fontSize: 11,
    color: "rgba(255,255,255,.55)",
    fontFamily: "JetBrains Mono, monospace",
    textAlign: "center"
  },
  frameBody: {
    padding: 24
  },
  tabs: {
    display: "flex",
    gap: 4,
    borderBottom: "1px solid rgba(255,255,255,.08)",
    marginBottom: 22
  },
  tab: {
    padding: "10px 16px",
    fontSize: 13,
    fontWeight: 500,
    color: "rgba(255,255,255,.55)",
    cursor: "pointer",
    borderBottom: "2px solid transparent",
    marginBottom: -1
  },
  tabActive: {
    color: "#F47920",
    borderBottomColor: "#F47920",
    fontWeight: 700
  },
  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 12,
    marginBottom: 22
  },
  kpi: {
    background: "rgba(255,255,255,.03)",
    border: "1px solid rgba(255,255,255,.08)",
    borderTop: "3px solid #F47920",
    borderRadius: 9,
    padding: "14px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 4
  },
  kpiLbl: {
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: 700,
    color: "rgba(255,255,255,.5)",
    textTransform: "uppercase"
  },
  kpiVal: {
    fontFamily: "'Barlow Condensed',sans-serif",
    fontSize: 28,
    fontWeight: 800,
    color: "#fff",
    lineHeight: 1.05
  },
  chart: {
    background: "rgba(255,255,255,.02)",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: 9,
    padding: 20
  }
};
Object.assign(window, {
  PlatformPreview
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/PlatformPreview.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Services.jsx
try { (() => {
/* global React, Icon */

function Services({
  lang
}) {
  const t = (es, en) => lang === "en" ? en : es;
  const services = [{
    icon: "wrench",
    title: "Full Management",
    desc: t("Operación Amazon completa en Seller Central o Vendor Central: listings, PPC, inventario y reportes mensuales.", "Full Amazon operation on Seller Central or Vendor Central: listings, PPC, inventory and monthly reports."),
    price: "$8K – $25K MXN/mes",
    tag: "Seller & Vendor",
    highlighted: true
  }, {
    icon: "megaphone",
    title: "PPC Management",
    desc: t("Sponsored Products, Brands y Display. Optimización semanal con métricas claras.", "Sponsored Products, Brands and Display. Weekly optimization with clear metrics."),
    price: t("$5K – $15K MXN · según ad spend", "$5K – $15K MXN · per ad spend")
  }, {
    icon: "search",
    title: t("Estudios de mercado", "Market studies"),
    desc: t("Demanda real, competencia, keywords, márgenes. Reporte ejecutable en 5 días.", "Real demand, competition, keywords, margins. Actionable report in 5 days."),
    price: "$1,200 MXN",
    tag: t("Básico para lanzamientos", "Launch essential")
  }, {
    icon: "chat",
    title: t("Asesoría 1:1", "1:1 Consulting"),
    desc: t("Sesión directa con Patricio o Rodrigo. 60 min, agenda abierta, recomendaciones específicas.", "Direct session with Patricio or Rodrigo. 60 min, open agenda, specific recommendations."),
    price: t("$2,000 MXN/hora", "$2,000 MXN/hour")
  }, {
    icon: "globe-arrow",
    title: "Cross-border MX → US",
    desc: t("Sistema de seguimiento de exportación. LLC, EIN, logística, taxes. Custom según diagnóstico.", "Export tracking system. LLC, EIN, logistics, taxes. Custom based on diagnosis."),
    price: t("Custom · post-llamada", "Custom · post-call"),
    tag: t("Diferenciador único", "Unique differentiator"),
    highlighted: true
  }, {
    icon: "chart-up",
    title: t("Auditoría completa", "Full audit"),
    desc: t("Revisión profunda de cuenta, listings, PPC, márgenes. Plan de acción priorizado.", "Deep review of account, listings, PPC, margins. Prioritized action plan."),
    price: t("Incluida en diagnóstico", "Included in diagnosis")
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: svStyles.section,
    id: "servicios"
  }, /*#__PURE__*/React.createElement("div", {
    style: svStyles.wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: svStyles.overline
  }, t("Lo que hacemos", "What we do")), /*#__PURE__*/React.createElement("h2", {
    style: svStyles.title
  }, t("Operación Amazon completa.", "Full Amazon operation."), /*#__PURE__*/React.createElement("br", null), t("Sin sorpresas.", "No surprises.")), /*#__PURE__*/React.createElement("p", {
    style: svStyles.sub
  }, t("Servicios pensados como sellers, no como agencia. Pricing transparente, scope claro, resultados medibles.", "Services built like sellers, not an agency. Transparent pricing, clear scope, measurable results."))), /*#__PURE__*/React.createElement("div", {
    style: svStyles.grid
  }, services.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      ...svStyles.card,
      ...(s.highlighted ? svStyles.cardHi : {})
    }
  }, s.tag && /*#__PURE__*/React.createElement("span", {
    style: svStyles.ribbon
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "star",
    size: 10,
    color: "#fff"
  }), " ", s.tag), /*#__PURE__*/React.createElement("div", {
    style: svStyles.iconBox
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: svStyles.cardTitle
  }, s.title), /*#__PURE__*/React.createElement("div", {
    style: svStyles.cardDesc
  }, s.desc), /*#__PURE__*/React.createElement("div", {
    style: svStyles.cardPrice
  }, s.price)))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#contacto",
    style: svStyles.cta
  }, t("Diagnóstico gratis · 30 min", "Free diagnosis · 30 min"), " \u2192"))));
}
const svStyles = {
  section: {
    background: "#fff",
    padding: "96px 0",
    fontFamily: "Inter, sans-serif"
  },
  wrap: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px"
  },
  overline: {
    display: "inline-block",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#F47920",
    marginBottom: 16,
    fontFamily: "Montserrat, sans-serif"
  },
  title: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 800,
    fontSize: "clamp(36px, 5vw, 56px)",
    lineHeight: 1.05,
    letterSpacing: "-.01em",
    textTransform: "uppercase",
    margin: "0 0 16px",
    color: "#152232"
  },
  sub: {
    color: "#4D4D4D",
    maxWidth: 640,
    margin: "0 auto",
    fontSize: 17,
    lineHeight: 1.55
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 20
  },
  card: {
    position: "relative",
    background: "#fff",
    border: "1px solid #E5E5E5",
    borderRadius: 12,
    padding: "28px 24px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    transition: "transform .25s, border-color .2s, box-shadow .25s",
    cursor: "pointer"
  },
  cardHi: {
    borderColor: "#F47920"
  },
  ribbon: {
    position: "absolute",
    top: 16,
    right: 16,
    background: "#F47920",
    color: "#fff",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 1,
    padding: "4px 10px",
    borderRadius: 999,
    textTransform: "uppercase",
    display: "inline-flex",
    alignItems: "center",
    gap: 4
  },
  iconBox: {
    width: 44,
    height: 44,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    background: "rgba(244,121,32,.14)",
    color: "#F47920"
  },
  cardTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    fontSize: 22,
    textTransform: "uppercase",
    letterSpacing: ".3px",
    lineHeight: 1.1,
    color: "#152232"
  },
  cardDesc: {
    fontSize: 14,
    lineHeight: 1.55,
    color: "#4D4D4D"
  },
  cardPrice: {
    marginTop: 8,
    display: "inline-flex",
    alignItems: "baseline",
    padding: "6px 12px",
    background: "rgba(244,121,32,.14)",
    color: "#F47920",
    borderRadius: 999,
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: ".3px",
    textTransform: "uppercase",
    width: "fit-content"
  },
  cta: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "#F47920",
    color: "#fff",
    padding: "14px 24px",
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 14,
    textDecoration: "none",
    boxShadow: "0 6px 20px rgba(244,121,32,.28)"
  }
};
Object.assign(window, {
  Services
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Services.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Team.jsx
try { (() => {
/* global React */

function Team({
  lang
}) {
  const t = (es, en) => lang === "en" ? en : es;
  return /*#__PURE__*/React.createElement("section", {
    style: teamStyles.section,
    id: "equipo"
  }, /*#__PURE__*/React.createElement("div", {
    style: teamStyles.wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: teamStyles.grid
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: teamStyles.overline
  }, t("Sobre nosotros", "About us")), /*#__PURE__*/React.createElement("h2", {
    style: teamStyles.title
  }, t("Consultoría de sellers,", "Consulting by sellers,"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#F47920"
    }
  }, t("para sellers.", "for sellers."))), /*#__PURE__*/React.createElement("p", {
    style: teamStyles.body
  }, t("Patricio y Rodrigo llevamos 6+ años exportando marcas mexicanas a Amazon USA. Aprendimos con nuestras propias marcas, perdiendo dinero en lanzamientos fallidos, optimizando PPC hasta las 2am, y peleando con freight forwarders.", "Patricio and Rodrigo have spent 6+ years exporting Mexican brands to Amazon USA. We learned with our own brands — losing money on failed launches, optimizing PPC until 2am, fighting with freight forwarders.")), /*#__PURE__*/React.createElement("p", {
    style: {
      ...teamStyles.body,
      marginBottom: 32
    }
  }, t("Cuando contratas a MEXUS, hablas directo con nosotros. No hay account managers junior. No hay templates copy-paste. Cada estrategia es nuestra firma.", "When you hire MEXUS, you talk to us directly. No junior account managers. No copy-paste templates. Every strategy bears our signature.")), /*#__PURE__*/React.createElement("div", {
    style: teamStyles.diffGrid
  }, /*#__PURE__*/React.createElement(Diff, {
    num: "01",
    t: t("Sellers activos", "Active sellers"),
    d: t("Operamos 4 marcas propias", "We run 4 of our own brands")
  }), /*#__PURE__*/React.createElement(Diff, {
    num: "02",
    t: t("Atención directa", "Direct access"),
    d: t("Slack/WhatsApp con fundadores", "Slack/WhatsApp with founders")
  }), /*#__PURE__*/React.createElement(Diff, {
    num: "03",
    t: t("Amazon SPN", "Amazon SPN"),
    d: t("Agencia certificada oficial", "Official certified agency")
  }), /*#__PURE__*/React.createElement(Diff, {
    num: "04",
    t: t("Cross-border MX→US", "Cross-border MX→US"),
    d: t("Único playbook validado", "Only validated playbook")
  }))), /*#__PURE__*/React.createElement("div", {
    style: teamStyles.cards
  }, /*#__PURE__*/React.createElement(FounderCard, {
    name: "Rodrigo",
    role: t("Co-founder · Operaciones", "Co-founder · Operations"),
    bio: t("Logística, freight, taxes y exportación MX→USA. Habla con Aduanas.", "Logistics, freight, taxes and MX→USA export. Talks to Customs."),
    tags: ["LLC/EIN", "Logística", "Inventario"],
    photo: "../../assets/team/rodrigo.png"
  }), /*#__PURE__*/React.createElement(FounderCard, {
    name: "Patricio",
    role: t("Co-founder · Estrategia", "Co-founder · Strategy"),
    bio: t("6+ años Amazon USA. Lead en lanzamientos cross-border y PPC.", "6+ years Amazon USA. Lead on cross-border launches and PPC."),
    tags: ["PPC", "Listings", "Cross-border"],
    photo: "../../assets/team/patricio.jpeg"
  }), /*#__PURE__*/React.createElement(FounderCard, {
    name: "Ximena",
    role: t("Content & PPC", "Content & PPC"),
    bio: t("Listings, A+ Content, PPC, Brand Store. Cuida la marca como propia.", "Listings, A+ Content, PPC, Brand Store. Treats your brand as her own."),
    tags: ["Listings", "A+", "Brand Store"],
    photo: "../../assets/team/ximena.jpeg"
  }), /*#__PURE__*/React.createElement(FounderCard, {
    name: "Yoshua",
    role: t("Catálogo & Analista", "Catalog & Analyst"),
    bio: t("Catálogo y reportes. ACOS bajo control, decisiones con datos.", "Catalog and reporting. ACOS under control, decisions made with data."),
    tags: ["PPC", "Analytics", "Reporting"],
    photo: "../../assets/team/yoshua.jpeg"
  })))));
}
function Diff({
  num,
  t,
  d
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Barlow Condensed',sans-serif",
      fontWeight: 800,
      fontSize: 26,
      color: "#F47920",
      lineHeight: 1
    }
  }, num), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Barlow Condensed',sans-serif",
      fontWeight: 700,
      fontSize: 16,
      textTransform: "uppercase",
      color: "#152232",
      letterSpacing: ".5px"
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#4D4D4D",
      lineHeight: 1.4,
      marginTop: 2
    }
  }, d)));
}
function FounderCard({
  name,
  role,
  bio,
  tags,
  photo
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: teamStyles.fc
  }, /*#__PURE__*/React.createElement("div", {
    style: teamStyles.fcAvatar
  }, /*#__PURE__*/React.createElement("img", {
    src: photo,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 22px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Barlow Condensed',sans-serif",
      fontWeight: 800,
      fontSize: 22,
      textTransform: "uppercase",
      color: "#152232",
      lineHeight: 1.05
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 1.2,
      color: "#F47920",
      textTransform: "uppercase",
      marginTop: 4
    }
  }, role), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13.5,
      color: "#4D4D4D",
      marginTop: 10,
      lineHeight: 1.5
    }
  }, bio), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      marginTop: 12
    }
  }, tags.map(tg => /*#__PURE__*/React.createElement("span", {
    key: tg,
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: 1,
      padding: "3px 9px",
      borderRadius: 999,
      background: "rgba(244,121,32,.10)",
      color: "#F47920",
      textTransform: "uppercase"
    }
  }, tg)))));
}
const teamStyles = {
  section: {
    background: "#F5F5F5",
    padding: "96px 0",
    fontFamily: "Inter, sans-serif"
  },
  wrap: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1.05fr 1fr",
    gap: 56,
    alignItems: "center"
  },
  overline: {
    display: "inline-block",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#F47920",
    marginBottom: 16,
    fontFamily: "Montserrat, sans-serif"
  },
  title: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 800,
    fontSize: "clamp(36px, 5vw, 56px)",
    lineHeight: 1.05,
    letterSpacing: "-.01em",
    textTransform: "uppercase",
    margin: "0 0 24px",
    color: "#152232"
  },
  body: {
    fontSize: 16,
    lineHeight: 1.6,
    color: "#4D4D4D",
    marginBottom: 20
  },
  diffGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 22,
    marginTop: 8
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14
  },
  fc: {
    background: "#fff",
    border: "1px solid #E5E5E5",
    borderRadius: 14,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  },
  fcAvatar: {
    aspectRatio: "1 / 1",
    background: "linear-gradient(135deg, #FFF5EC, #FFE5CC)",
    overflow: "hidden",
    borderBottom: "1px solid #E5E5E5"
  }
};
Object.assign(window, {
  Team
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Team.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.KpiCard = __ds_scope.KpiCard;

__ds_ns.Sparkline = __ds_scope.Sparkline;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.IconDashboard = __ds_scope.IconDashboard;

__ds_ns.IconLanding = __ds_scope.IconLanding;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

})();
