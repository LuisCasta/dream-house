import type { Metadata } from "next";
import { Suspense } from "react";
import { SERVICIOS } from "@/data/contenido";
import Image from "next/image";
import { CONTACTO } from "@/config/sitio";
import { recurso } from "@/lib/rutas";
import FormularioAdaptar from "@/components/FormularioAdaptar";
import { Contenedor, Eyebrow, Titulo } from "@/components/ui";

export const metadata: Metadata = {
  title: "Proyecto personalizado",
  description: "Comparte las medidas de tu terreno y los cambios que necesitas. Consulta una adaptación o un proyecto personalizado por WhatsApp con Dream House.",
};

export default function Adaptar() {
  return (
    <Contenedor className="pt-10 sm:pt-16">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div>
          <Eyebrow>¿Ya tienes terreno?</Eyebrow>
          <Titulo as="h1" className="mt-3">
            Hagamos que la casa se ajuste a tu terreno.
          </Titulo>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-gris">
            Si tu terreno tiene otra medida, está en esquina o quieres cambiar
            algo de la casa, cuéntanos qué necesitas para revisar tu solicitud.
          </p>
          <figure className="mt-7">
            <Image src={recurso("/renders/brisa/sala-comedor.webp")} alt="Sala, comedor y cocina de Casa Brisa junto al jardín lateral" width={1672} height={941} className="w-full rounded-2xl" sizes="(min-width:1024px) 55vw, 100vw" />
            <figcaption className="nota mt-2">Casa Brisa · Render del área social</figcaption>
          </figure>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {SERVICIOS.map((s) => (
              <li
                key={s.titulo}
                className="rounded-2xl border border-linea bg-white/70 p-5"
              >
                <p className="font-medium">{s.titulo}</p>
                <p className="mt-1 text-sm text-gris">{s.texto}</p>
              </li>
            ))}
          </ul>
          <p className="nota mt-4">
            Cada solicitud se revisa según el terreno y los cambios propuestos.
            La adaptación y el proyecto personalizado se cotizan por separado
            del paquete de planos. El alcance, el costo y el plazo se acuerdan
            antes de iniciar el trabajo.
          </p>
        </div>
        <div className="lg:pt-8">
          <div className="rounded-3xl border border-linea bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-3xl tracking-tight">
              Cuéntanos de tu terreno
            </h2>
            <p className="mt-1 text-sm text-gris">
              Indica las medidas y los cambios que buscas. Podrás revisar tu
              mensaje y enviarlo por WhatsApp para solicitar una cotización.
            </p>
            <div className="mt-6">
              <Suspense fallback={null}>
                <FormularioAdaptar />
              </Suspense>
            </div>
            <p className="nota mt-5">También puedes escribir a <a className="enlace break-all" href={`mailto:${CONTACTO.email}`}>{CONTACTO.email}</a>.</p>
          </div>
        </div>
      </div>
    </Contenedor>
  );
}
