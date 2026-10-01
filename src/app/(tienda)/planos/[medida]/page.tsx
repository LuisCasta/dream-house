import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compatiblesCon, disenadosPara } from "@/data/proyectos";
import { MEDIDAS, obtenerMedida, textoMedida } from "@/data/terrenos";
import Resultados from "@/components/catalogo/Resultados";
import { Contenedor } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return MEDIDAS.map((m) => ({ medida: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/planos/[medida]">): Promise<Metadata> {
  const m = obtenerMedida((await params).medida);
  if (!m) return {};
  return {
    title: `Casas para terreno de ${textoMedida(m)}`,
    description: `Proyectos arquitectónicos diseñados para terrenos de ${textoMedida(m)}: planos, fachadas y renders.`,
    alternates: { canonical: `/planos/${m.slug}` },
  };
}

export default async function PaginaMedida({ params }: PageProps<"/planos/[medida]">) {
  const m = obtenerMedida((await params).medida);
  if (!m) notFound();

  return (
    <Contenedor className="pt-6 sm:pt-12">
      {/* Cambiar de medida sin volver atrás */}
      <nav aria-label="Otras medidas" className="fila -mx-5 flex scroll-px-5 gap-2 overflow-x-auto px-5 sm:mx-0 sm:scroll-px-0 sm:px-0">
        {MEDIDAS.map((x) => (
          <Link
            key={x.slug}
            href={`/planos/${x.slug}`}
            aria-current={x.slug === m.slug ? "page" : undefined}
            className={`min-h-10 shrink-0 rounded-full border px-4 py-2 text-sm tabular-nums transition ${
              x.slug === m.slug ? "border-noche bg-noche text-hueso" : "border-linea bg-white hover:border-noche/40"
            }`}
          >
            {x.frente} × {x.fondo}
          </Link>
        ))}
        <Link href="/planos/otras" className="min-h-10 shrink-0 rounded-full border border-dashed border-noche/25 px-4 py-2 text-sm hover:border-noche/50">
          Otra medida
        </Link>
      </nav>

      <h1 className="mt-8 font-display text-[2.6rem] leading-[1.02] tracking-tight sm:text-6xl">
        Casas para terreno de <span className="whitespace-nowrap">{textoMedida(m)}</span>
      </h1>
      <p className="mt-3 text-gris">
        Tu terreno mide {m.frente}×{m.fondo}. Estas casas fueron pensadas para él.
      </p>

      <div className="mt-8">
        <Resultados disenados={disenadosPara(m)} compatibles={compatiblesCon(m)} />
      </div>
    </Contenedor>
  );
}
