import type { Metadata } from "next";
import { ENTREGABLES, obtenerProyecto } from "@/data/proyectos";
import Plano from "@/components/ilustraciones/Plano";
import { QueRecibes, Transparencia } from "@/components/Secciones";
import { IconoCheck } from "@/components/Iconos";
import { Boton, Contenedor, Eyebrow, Pendiente, Titulo } from "@/components/ui";

export const metadata: Metadata = { title: "Qué incluye tu proyecto" };

const contenidoPlanos = [
  "Planta arquitectónica de cada nivel",
  "Plantas acotadas con medidas generales",
  "Fachadas",
  "Cortes",
  "Cuadro de áreas",
];

const noIncluye = [
  "Cálculo y planos estructurales",
  "Proyectos de instalaciones (eléctrica, hidráulica, sanitaria, gas)",
  "Trámites, licencias o firma de un director responsable de obra",
  "Visitas al terreno o supervisión de obra",
];

export default function QueIncluye() {
  const muestra = obtenerProyecto("brisa")!;
  return (
    <>
      <Contenedor className="pt-10 sm:pt-16">
        <Eyebrow>Qué incluye tu proyecto</Eyebrow>
        <Titulo as="h1" className="mt-3 max-w-2xl">Todo lo que necesitas para entender tu casa y llevarla con un profesional.</Titulo>
        <div className="mt-10">
          <QueRecibes entregables={Object.values(ENTREGABLES)} />
        </div>
      </Contenedor>

      <Contenedor className="mt-20 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-display text-4xl tracking-tight">Dentro de los planos</h2>
          <ul className="mt-6 space-y-3">
            {contenidoPlanos.map((c) => (
              <li key={c} className="flex items-center gap-3">
                <IconoCheck className="h-5 w-5 text-oro-oscuro" /> {c}
              </li>
            ))}
          </ul>
          <p className="mt-4"><Pendiente>Contenido exacto por confirmar con arquitectura</Pendiente></p>

          <h2 className="mt-14 font-display text-4xl tracking-tight">Lo que no incluye</h2>
          <p className="mt-3 text-gris">Dependen de tu terreno y tu municipio, por eso los hace un profesional local.</p>
          <ul className="mt-5 space-y-3 text-gris">
            {noIncluye.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <span className="mt-2.5 h-px w-3 shrink-0 bg-gris" aria-hidden /> {c}
              </li>
            ))}
          </ul>
        </div>
        <figure>
          <div className="rounded-3xl border border-linea bg-[#fbf9f5] p-4">
            <Plano p={muestra} className="mx-auto max-h-[640px] w-full" />
          </div>
          <figcaption className="mt-3 text-sm text-gris">Muestra simplificada de planta ({muestra.nombre}). Los planos entregados incluyen cotas y más detalle.</figcaption>
        </figure>
      </Contenedor>

      <Contenedor className="mt-20">
        <Transparencia />
        <div className="mt-12 text-center">
          <Boton href="/planos">Ver proyectos</Boton>
        </div>
      </Contenedor>
    </>
  );
}
