"use client";
import { useEffect, useRef } from "react";
// showModal aporta fondo inerte, focus trap y semántica nativa.
export default function Dialogo({
  children,
  cerrar,
  titulo,
  className = "",
}: {
  children: React.ReactNode;
  cerrar: () => void;
  titulo: string;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const alCerrar = useRef(cerrar);
  useEffect(() => {
    alCerrar.current = cerrar;
  }, [cerrar]);
  useEffect(() => {
    const elemento = ref.current!;
    const foco = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    elemento.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      elemento.close();
      document.body.style.overflow = overflow;
      if (foco?.isConnected) foco.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      aria-label={titulo}
      className={`dialogo ${className}`}
      onCancel={(e) => {
        e.preventDefault();
        e.stopPropagation();
        alCerrar.current();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) alCerrar.current();
      }}
    >
      <div className="dialogo-scroll">
        <div className="dialogo-contenido">{children}</div>
      </div>
    </dialog>
  );
}
