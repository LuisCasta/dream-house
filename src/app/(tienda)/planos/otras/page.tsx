import type { Metadata } from "next";
import OtraMedida from "@/components/catalogo/OtraMedida";
import { Contenedor } from "@/components/ui";

export const metadata: Metadata = { title: "Casas para tu medida de terreno" };

export default function PaginaOtraMedida() {
  return (
    <Contenedor className="pt-10 sm:pt-16">
      <h1 className="font-display text-[2.6rem] leading-[1.02] tracking-tight sm:text-6xl">¿Cuánto mide tu terreno?</h1>
      <p className="mt-3 max-w-md text-gris">Escribe el frente (lo que da a la calle) y el fondo. Te mostramos las casas que caben.</p>
      <div className="mt-8">
        <OtraMedida />
      </div>
    </Contenedor>
  );
}
