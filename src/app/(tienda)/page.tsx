import { Suspense } from "react";
import Catalogo from "@/components/catalogo/Catalogo";
export default function Home() {
  return (
    <Suspense fallback={<p className="ancho py-12">Cargando catálogo…</p>}>
      <Catalogo />
    </Suspense>
  );
}
