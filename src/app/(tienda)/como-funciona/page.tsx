import type { Metadata } from "next";
import { Transparencia } from "@/components/Secciones";
import { Boton, Contenedor, Eyebrow, Titulo } from "@/components/ui";

export const metadata: Metadata = { title: "Cómo funciona" };

const pasos = [
  { titulo: "Elige por la medida de tu terreno", texto: "Dinos cuánto mide tu terreno y te mostramos solo las casas que caben en él. Si tu medida no está, escríbela." },
  { titulo: "Conoce la casa antes de comprar", texto: "Recorre cada espacio con los renders, revisa la planta y lo que incluye el proyecto." },
  { titulo: "Compra en minutos", texto: "Sin registro. Solo tu nombre y tu correo, y el método de pago que prefieras." },
  { titulo: "Descarga tu proyecto", texto: "Recibes los archivos en pantalla al terminar el pago y una copia en tu correo." },
  { titulo: "Adáptalo localmente", texto: "Lleva el proyecto con un arquitecto o ingeniero de tu ciudad para revisarlo con el reglamento de tu municipio y complementarlo con estructura e instalaciones." },
  { titulo: "Construye a tu ritmo", texto: "Por etapas o de una vez. Si necesitas cambios, también podemos ayudarte." },
];

export default function ComoFunciona() {
  return (
    <>
      <Contenedor className="pt-10 sm:pt-16">
        <Eyebrow>Cómo funciona</Eyebrow>
        <Titulo as="h1" className="mt-3 max-w-2xl">Compra el proyecto. Adáptalo localmente. Construye a tu ritmo.</Titulo>
      </Contenedor>
      <Contenedor className="mt-12">
        <ol className="relative space-y-10 border-l border-linea pl-8 sm:pl-12">
          {pasos.map((p, i) => (
            <li key={p.titulo} className="relative">
              <span className="absolute -left-[3.05rem] flex h-9 w-9 items-center justify-center rounded-full border border-linea bg-hueso font-display text-xl sm:-left-[4.05rem]">
                {i + 1}
              </span>
              <h2 className="font-display text-3xl tracking-tight">{p.titulo}</h2>
              <p className="mt-2 max-w-xl leading-relaxed text-gris">{p.texto}</p>
            </li>
          ))}
        </ol>
      </Contenedor>
      <Contenedor className="mt-20">
        <Transparencia />
        <div className="mt-12 text-center">
          <Boton href="/#terreno" variante="acento">Encontrar mi casa</Boton>
        </div>
      </Contenedor>
    </>
  );
}
