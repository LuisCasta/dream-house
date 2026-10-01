import { Boton, Contenedor } from "@/components/ui";

export default function NoEncontrado() {
  return (
    <Contenedor className="py-24 text-center">
      <p className="font-display text-5xl tracking-tight">No encontramos esta página</p>
      <p className="mt-3 text-gris">Quizá la casa que buscas tiene otro nombre.</p>
      <Boton href="/planos" className="mt-8">Ver todas las casas</Boton>
    </Contenedor>
  );
}
