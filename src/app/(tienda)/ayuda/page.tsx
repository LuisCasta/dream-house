import type { Metadata } from "next";
import Link from "next/link";
import { PREGUNTAS } from "@/data/contenido";
import { ListaPreguntas } from "@/components/Secciones";
import { Contenedor, Eyebrow, Titulo } from "@/components/ui";

export const metadata: Metadata = { title: "Preguntas frecuentes" };

const temas = [
  { id: "proyecto", titulo: "Sobre los proyectos" },
  { id: "compra", titulo: "Compra y entrega" },
  { id: "construccion", titulo: "Construcción" },
] as const;

export default function Ayuda() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PREGUNTAS.filter((q) => !q.pendiente).map((q) => ({
      "@type": "Question",
      name: q.p,
      acceptedAnswer: { "@type": "Answer", text: q.r },
    })),
  };

  return (
    <Contenedor className="pt-10 sm:pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Eyebrow>Ayuda</Eyebrow>
      <Titulo as="h1" className="mt-3">Preguntas frecuentes</Titulo>
      <p className="mt-3 text-gris">
        ¿No encuentras tu respuesta? <Link href="/contacto" className="underline underline-offset-4">Escríbenos</Link>.
      </p>
      <div className="mt-12 space-y-14">
        {temas.map((t) => (
          <section key={t.id} className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <h2 className="font-display text-3xl tracking-tight">{t.titulo}</h2>
            <ListaPreguntas preguntas={PREGUNTAS.filter((q) => q.tema === t.id)} />
          </section>
        ))}
      </div>
    </Contenedor>
  );
}
