import Link from "next/link";

// Etiqueta para datos que aún deben confirmarse con el negocio.
export function Pendiente({ children = "Por confirmar", className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded border border-dashed border-amber-400 bg-amber-50 px-1.5 py-0.5 text-[11px] font-medium leading-none text-amber-800 ${className}`}>
      {children}
    </span>
  );
}

// Bloque completo pendiente de contenido real (testimonios, credenciales, etc.)
export function BloquePendiente({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-amber-400 bg-amber-50/60 p-5 text-sm text-amber-900">
      <p className="flex items-center gap-2 font-medium">
        <Pendiente>Pendiente</Pendiente> {titulo}
      </p>
      <div className="mt-2 leading-relaxed text-amber-900/80">{children}</div>
    </div>
  );
}

// Mayúsculas romanas con filetes, como "— CASA CON ESTILO —" en las portadas.
export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 font-romana text-[11px] font-semibold uppercase tracking-[0.28em] text-oro-oscuro ${className}`}>
      <span className="h-px w-6 bg-current opacity-50" aria-hidden />
      {children}
    </p>
  );
}

export function Titulo({ children, className = "", as: Tag = "h2" }: { children: React.ReactNode; className?: string; as?: "h1" | "h2" | "h3" }) {
  return <Tag className={`font-display text-[2rem] font-medium leading-[1.08] tracking-tight sm:text-[2.9rem] ${className}`}>{children}</Tag>;
}

// Etiqueta "TERRENO 7 × 15 M" con borde, igual que en los videos.
export function EtiquetaTerreno({ frente, fondo, oscura = false, className = "" }: { frente: number; fondo: number; oscura?: boolean; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-romana text-[10px] font-semibold uppercase tracking-[0.2em] ${
        oscura ? "border-oro/70 bg-noche/70 text-hueso backdrop-blur" : "border-oro-oscuro/40 text-oro-oscuro"
      } ${className}`}
    >
      Terreno {frente} × {fondo} m
    </span>
  );
}

export function Contenedor({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

const estilosBoton = {
  primario: "bg-noche text-hueso hover:bg-noche-2",
  acento: "bg-oro text-noche hover:bg-oro-claro",
  secundario: "border border-noche/15 bg-white/60 text-noche hover:border-noche/40",
  claro: "border border-hueso/30 text-hueso hover:border-hueso/70",
};

export function Boton({
  href,
  children,
  variante = "primario",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variante?: keyof typeof estilosBoton;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium transition ${estilosBoton[variante]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function claseBoton(variante: keyof typeof estilosBoton = "primario") {
  return `inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium transition disabled:opacity-50 ${estilosBoton[variante]}`;
}
