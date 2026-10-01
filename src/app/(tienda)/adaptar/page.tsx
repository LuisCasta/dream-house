import type { Metadata } from "next";
import { Suspense } from "react";
import { SERVICIOS } from "@/data/contenido";
import FormularioAdaptar from "@/components/FormularioAdaptar";
import { Contenedor, Eyebrow, Pendiente, Titulo } from "@/components/ui";

export const metadata: Metadata = { title: "Adaptar un proyecto a tu terreno" };

export default function Adaptar() {
  return (
    <Contenedor className="pt-10 sm:pt-16">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div>
          <Eyebrow>¿Ya tienes terreno?</Eyebrow>
          <Titulo as="h1" className="mt-3">Hagamos que la casa se ajuste a tu terreno.</Titulo>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-gris">
            Si tu terreno tiene otra medida, está en esquina o quieres cambiar algo de la casa, podemos ayudarte.
          </p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {SERVICIOS.map((s) => (
              <li key={s.titulo} className="rounded-2xl border border-linea bg-white/70 p-5">
                <p className="font-medium">{s.titulo}</p>
                <p className="mt-1 text-sm text-gris">{s.texto}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4"><Pendiente>Servicios, alcances y precios por confirmar</Pendiente></p>
        </div>
        <div className="lg:pt-8">
          <div className="rounded-3xl border border-linea bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-3xl tracking-tight">Cuéntanos de tu terreno</h2>
            <p className="mt-1 text-sm text-gris">Te respondemos por WhatsApp.</p>
            <div className="mt-6">
              <Suspense fallback={null}>
                <FormularioAdaptar />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </Contenedor>
  );
}
