import { Suspense } from "react";
import { notFound } from "next/navigation";
import { MEDIDAS, obtenerMedida } from "@/data/terrenos";
import Catalogo from "@/components/catalogo/Catalogo";
export const dynamicParams = false;
export function generateStaticParams() {
  return MEDIDAS.map((m) => ({ medida: m.slug }));
}
export default async function PorMedida({
  params,
}: PageProps<"/planos/[medida]">) {
  const m = obtenerMedida((await params).medida);
  if (!m) notFound();
  return (
    <Suspense fallback={<p className="ancho py-12">Cargando catálogo…</p>}>
      <Catalogo medidaInicial={m.slug} />
    </Suspense>
  );
}
