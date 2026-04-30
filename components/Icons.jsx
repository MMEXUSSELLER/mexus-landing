/* global React */
/* SVG icon set — replaces emoji throughout the landing.
   Stroke-based, currentColor, 24x24 viewBox. */

function Icon({ name, size = 24, color = "currentColor", style = {} }) {
  const props = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: color, strokeWidth: 1.8,
    strokeLinecap: "round", strokeLinejoin: "round",
    style,
  };
  switch (name) {
    case "wrench": // Full Management
      return (
        <svg {...props}>
          <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.3 2.3-2.4-2.4 2.3-2.3z"/>
        </svg>
      );
    case "megaphone": // PPC
      return (
        <svg {...props}>
          <path d="M3 11v3a1 1 0 0 0 1 1h2l3 3 1-1V8L9 7 6 10H4a1 1 0 0 0-1 1z"/>
          <path d="M11 5l8-2v18l-8-2"/>
          <path d="M19 9a3 3 0 0 1 0 6"/>
        </svg>
      );
    case "search": // Estudios de mercado / Diagnóstico
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7"/>
          <path d="M20 20l-3.5-3.5"/>
        </svg>
      );
    case "chat": // Asesoría 1:1
      return (
        <svg {...props}>
          <path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12z"/>
        </svg>
      );
    case "globe-arrow": // Cross-border
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9"/>
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>
          <path d="M16 8l3 -1 -1 3" />
        </svg>
      );
    case "chart-up": // Auditoría / Escala
      return (
        <svg {...props}>
          <path d="M3 21h18"/>
          <path d="M5 17l5-5 4 4 6-7"/>
          <path d="M14 9h6v6"/>
        </svg>
      );
    case "list": // Estrategia
      return (
        <svg {...props}>
          <path d="M8 6h13M8 12h13M8 18h13"/>
          <circle cx="4" cy="6" r="1"/>
          <circle cx="4" cy="12" r="1"/>
          <circle cx="4" cy="18" r="1"/>
        </svg>
      );
    case "rocket": // Lanzamiento
      return (
        <svg {...props}>
          <path d="M5 14l-2 5 5-2"/>
          <path d="M14 4c-3 0-6 2-8 6l4 4c4-2 6-5 6-8 0-1-1-2-2-2z"/>
          <circle cx="14" cy="9" r="1.4"/>
        </svg>
      );
    case "star":
      return (
        <svg {...props}>
          <path d="M12 3l2.6 5.5 6 .9-4.3 4.2 1 6L12 17l-5.3 2.6 1-6L3.4 9.4l6-.9z"/>
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <path d="M5 12l5 5L20 7"/>
        </svg>
      );
    case "mail":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="14" rx="2"/>
          <path d="M3 7l9 6 9-6"/>
        </svg>
      );
    case "pin": // Office
      return (
        <svg {...props}>
          <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z"/>
          <circle cx="12" cy="9" r="2.5"/>
        </svg>
      );
    case "whatsapp":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
          <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.46 1.32 4.96L2 22l5.2-1.36a9.94 9.94 0 0 0 4.84 1.24c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm0 18.16c-1.5 0-2.96-.4-4.24-1.16l-.3-.18-3.08.8.82-3-.2-.32a8.2 8.2 0 1 1 6.99 3.86zm4.5-6.13c-.25-.13-1.46-.72-1.69-.8-.22-.08-.39-.13-.55.13-.16.25-.63.8-.78.96-.14.17-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.43.13-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.13-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.43h-.47c-.16 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.55.13.16 1.74 2.66 4.21 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.29z"/>
        </svg>
      );
    case "user":
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="4"/>
          <path d="M4 21c0-4 4-7 8-7s8 3 8 7"/>
        </svg>
      );
    case "plus":
      return (
        <svg {...props}>
          <path d="M12 5v14M5 12h14"/>
        </svg>
      );
    default:
      return null;
  }
}

Object.assign(window, { Icon });
