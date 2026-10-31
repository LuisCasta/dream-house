import { Suspense } from "react";
import type { Metadata } from "next";
import Catalogo from "@/components/catalogo/Catalogo";
export const metadata: Metadata = {
  title: "Catálogo de proyectos arquitectónicos",
};
export default function Planos() {
  return (
    <Suspense fallback={<p className="ancho py-12">Cargando catálogo…</p>}>
      <Catalogo />
    </Suspense>
  );
}
