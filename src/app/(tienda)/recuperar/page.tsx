import { Suspense } from "react";
import type { Metadata } from "next";
import Recuperar from "@/components/Recuperar";
export const metadata: Metadata = {
  title: "Recuperar mis archivos",
  robots: { index: false },
};
export default function PaginaRecuperar() {
  return (
    <Suspense fallback={<p className="ancho py-12">Cargando recuperación…</p>}>
      <Recuperar />
    </Suspense>
  );
}
