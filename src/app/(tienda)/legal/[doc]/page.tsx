import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BloquePendiente, Contenedor, Titulo } from "@/components/ui";

const DOCUMENTOS = {
  terminos: { titulo: "Términos y condiciones", resumen: "Condiciones de uso del sitio y licencia de uso de los proyectos adquiridos." },
  privacidad: { titulo: "Aviso de privacidad", resumen: "Cómo se recaban, usan y protegen los datos personales, conforme a la LFPDPPP." },
  "politica-de-compra": { titulo: "Política de compra", resumen: "Proceso de compra, entrega digital, facturación, reembolsos y alcance del proyecto." },
} as const;

type Doc = keyof typeof DOCUMENTOS;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(DOCUMENTOS).map((doc) => ({ doc }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[doc]">): Promise<Metadata> {
  const d = DOCUMENTOS[(await params).doc as Doc];
  return d ? { title: d.titulo } : {};
}

export default async function Legal({ params }: PageProps<"/legal/[doc]">) {
  const d = DOCUMENTOS[(await params).doc as Doc];
  if (!d) notFound();
  return (
    <Contenedor className="max-w-3xl pt-10 sm:pt-16">
      <Titulo as="h1">{d.titulo}</Titulo>
      <p className="mt-3 text-gris">{d.resumen}</p>
      <div className="mt-10">
        <BloquePendiente titulo="Texto legal">
          Este documento debe redactarlo o revisarlo un abogado antes de publicar el sitio. No se debe usar un texto genérico.
        </BloquePendiente>
      </div>
    </Contenedor>
  );
}
