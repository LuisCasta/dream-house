import type { Metadata } from "next";
import Link from "next/link";
import { disenadosPara } from "@/data/proyectos";
import { MEDIDAS, textoMedida } from "@/data/terrenos";
import SelectorTerreno from "@/components/SelectorTerreno";
import { FilaProyectos } from "@/components/TarjetaProyecto";
import { IconoFlecha } from "@/components/Iconos";
import { Contenedor, Titulo } from "@/components/ui";

export const metadata: Metadata = {
  title: "Planos de casas por medida de terreno",
  description: "Encuentra proyectos arquitectónicos para terrenos de 7×15, 8×15, 10×10, 10×15 y 10×20.",
};

export default function Catalogo() {
  return (
    <>
      <Contenedor className="pt-10 sm:pt-16">
        <Titulo as="h1" className="max-w-2xl">Encuentra la casa que cabe en tu terreno.</Titulo>
        <p className="mt-3 text-gris">Elige la medida de tu terreno.</p>
        <div className="mt-8">
          <SelectorTerreno />
        </div>
      </Contenedor>

      {MEDIDAS.map((m) => {
        const lista = disenadosPara(m);
        if (!lista.length) return null;
        return (
          <section key={m.slug} className="pt-16 sm:pt-24">
            <Contenedor>
              <div className="flex items-end justify-between gap-4">
                <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Terreno {textoMedida(m)}</h2>
                <Link href={`/planos/${m.slug}`} className="flex shrink-0 items-center gap-1.5 text-sm font-medium hover:text-oro-oscuro">
                  Ver todas <IconoFlecha />
                </Link>
              </div>
              <div className="mt-6">
                <FilaProyectos proyectos={lista} />
              </div>
            </Contenedor>
          </section>
        );
      })}
    </>
  );
}
