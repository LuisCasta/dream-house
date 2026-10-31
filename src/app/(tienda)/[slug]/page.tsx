import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PROYECTOS, obtenerProyecto } from "@/data/proyectos";
import Catalogo from "@/components/catalogo/Catalogo";
export const dynamicParams = false;
export function generateStaticParams() {
  return PROYECTOS.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: PageProps<"/[slug]">): Promise<Metadata> {
  const p = obtenerProyecto((await params).slug);
  return p
    ? {
        title: p.nombre,
        description: `${p.lema} Proyecto de ejemplo de Dream House.`,
        alternates: { canonical: `/${p.slug}/` },
      }
    : {};
}
export default async function Proyecto({ params }: PageProps<"/[slug]">) {
  const p = obtenerProyecto((await params).slug);
  if (!p) notFound();
  return (
    <Suspense fallback={<p className="ancho py-12">Cargando proyecto…</p>}>
      <Catalogo inicial={p.slug} />
    </Suspense>
  );
}
