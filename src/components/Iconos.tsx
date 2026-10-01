type P = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

const icono = (d: React.ReactNode) =>
  function Icono({ className = "h-4 w-4" }: P) {
    return (
      <svg {...base} className={className}>
        {d}
      </svg>
    );
  };

export const IconoTerreno = icono(<><path d="M3 6h18v12H3z" strokeDasharray="2.5 2" /><path d="M8 18V11h8v7" /></>);
export const IconoArea = icono(<><path d="M4 4h16v16H4z" /><path d="M4 9h5V4M15 20v-5h5" /></>);
export const IconoCama = icono(<><path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" /><circle cx="7" cy="11" r="1.6" /></>);
export const IconoBano = icono(<path d="M3 12h18v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5zM6 12V6a2 2 0 0 1 4 0M7 19l-1 2M17 19l1 2" />);
export const IconoPlantas = icono(<path d="M3 10l9-6 9 6M5 9v11h14V9M5 14.5h14" />);
export const IconoAuto = icono(<><path d="M5 16V11l2-5h10l2 5v5M3 16h18v2H3zM5 11h14" /></>);
export const IconoCarrito = icono(<><path d="M5 7h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8z" /><path d="M9 10V6a3 3 0 0 1 6 0v4" /></>);
export const IconoMenu = icono(<path d="M4 8h16M4 16h16" />);
export const IconoCerrar = icono(<path d="M6 6l12 12M18 6L6 18" />);
export const IconoFlecha = icono(<path d="M5 12h14M13 6l6 6-6 6" />);
export const IconoAtras = icono(<path d="M19 12H5M11 6l-6 6 6 6" />);
export const IconoCheck = icono(<path d="M5 12.5l4.5 4.5L19 7.5" />);
export const IconoCandado = icono(<><rect x="5" y="11" width="14" height="9" rx="1.5" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>);
export const IconoDescarga = icono(<path d="M12 4v11M7 10l5 5 5-5M4 19h16" />);
export const IconoNube = icono(<><path d="M7 18a4 4 0 0 1-.6-7.95A5.5 5.5 0 0 1 17 9a4.5 4.5 0 0 1 0 9z" /><path d="M12 11v5M9.5 13.5 12 16l2.5-2.5" /></>);
export const IconoSoporte = icono(<><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /></>);
export const IconoWhatsApp = icono(<><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" /><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1a3.5 3.5 0 0 1-2-2l1-1-1-2z" /></>);
export const IconoMas = icono(<path d="M12 5v14M5 12h14" />);
export const IconoFiltro = icono(<path d="M4 7h16M7 12h10M10 17h4" />);
export const IconoRegla = icono(<><path d="M3 17 17 3l4 4L7 21z" /><path d="M7 13l2 2M10 10l2 2M13 7l2 2" /></>);
export const IconoLapiz = icono(<path d="M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4" />);
export const IconoPlay = icono(<path d="M8 5v14l11-7z" />);

// Icono de documento según formato
export function IconoDocumento({ formato, className = "h-11 w-10" }: { formato: string } & P) {
  const colores: Record<string, string> = { PDF: "#b0532c", JPG: "#8a5c3c", DWG: "#3e5566" };
  return (
    <svg viewBox="0 0 40 48" className={className} aria-hidden>
      <path d="M4 2h22l10 10v32a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="#fff" stroke="#d9d0c1" />
      <path d="M26 2v10h10" fill="none" stroke="#d9d0c1" />
      <rect x="0" y="26" width="30" height="12" rx="2" fill={colores[formato] ?? "#6f685e"} />
      <text x="15" y="35" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff" fontFamily="sans-serif">
        {formato}
      </text>
    </svg>
  );
}
