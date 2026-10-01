import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SITIO } from "@/config/sitio";
import { PREGUNTAS } from "@/data/contenido";
import { PROYECTOS, compatiblesCon, disenadosPara, entregablesDe, obtenerProyecto, precioDesde } from "@/data/proyectos";
import { slugMedida, textoMedida } from "@/data/terrenos";
import { banos, precio } from "@/lib/formato";
import GaleriaProyecto from "@/components/proyecto/GaleriaProyecto";
import { BotonComprar, CompraFijaMovil, PlantaInteractiva, ReferenciaSocial, VistaProyecto } from "@/components/proyecto/Interactivos";
import Render from "@/components/Render";
import { Arquitecto, Garantias, ListaPreguntas, QueRecibes, Transparencia } from "@/components/Secciones";
import { FilaProyectos } from "@/components/TarjetaProyecto";
import { IconoArea, IconoAuto, IconoBano, IconoCama, IconoPlantas, IconoTerreno } from "@/components/Iconos";
import { Contenedor, Eyebrow, Pendiente, Titulo } from "@/components/ui";

// URL corta por proyecto: dreamhouse.mx/brisa
export const dynamicParams = false;

export function generateStaticParams() {
  return PROYECTOS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const p = obtenerProyecto((await params).slug);
  if (!p) return {};
  const titulo = `${p.nombre} · Casa para terreno ${textoMedida(p.terreno)}`;
  return {
    title: titulo,
    description: `${p.lema} ${p.m2} m², ${p.recamaras} recámaras, ${banos(p.banos)} baños. Proyecto arquitectónico listo para descargar.`,
    alternates: { canonical: `/${p.slug}` },
    openGraph: { title: titulo, description: p.lema, url: `/${p.slug}` },
  };
}

export default async function PaginaProyecto({ params }: PageProps<"/[slug]">) {
  const p = obtenerProyecto((await params).slug);
  if (!p) notFound();

  const entregables = entregablesDe(p);
  const paquete = p.paquetes[0];
  const masParaTerreno = [...disenadosPara(p.terreno), ...compatiblesCon(p.terreno)].filter((o) => o.slug !== p.slug).slice(0, 3);
  const otros = masParaTerreno.length ? masParaTerreno : PROYECTOS.filter((o) => o.slug !== p.slug).slice(0, 3);

  const datos = [
    { icono: <IconoTerreno className="h-5 w-5" />, valor: textoMedida(p.terreno), etiqueta: "Terreno" },
    { icono: <IconoArea className="h-5 w-5" />, valor: `${p.m2} m²`, etiqueta: "Construcción" },
    { icono: <IconoCama className="h-5 w-5" />, valor: p.recamaras, etiqueta: "Recámaras" },
    { icono: <IconoBano className="h-5 w-5" />, valor: banos(p.banos), etiqueta: "Baños" },
    { icono: <IconoPlantas className="h-5 w-5" />, valor: p.plantas, etiqueta: p.plantas === 1 ? "Planta" : "Plantas" },
    { icono: <IconoAuto className="h-5 w-5" />, valor: p.cochera || "—", etiqueta: "Cochera" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.nombre,
    sku: p.codigo,
    description: p.descripcion,
    brand: { "@type": "Brand", name: SITIO.nombreCompleto },
    url: `${SITIO.url}/${p.slug}`,
    offers: {
      "@type": "Offer",
      price: precioDesde(p),
      priceCurrency: "MXN",
      availability: "https://schema.org/InStock",
      url: `${SITIO.url}/${p.slug}`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <VistaProyecto p={p} />

      {/* ── Primera pantalla: galería + decisión ── */}
      <div className="sm:pt-6">
        <Contenedor className="px-0 sm:px-8">
          <div className="px-5 pt-4 sm:px-0 sm:pt-0">
            <Suspense fallback={null}>
              <ReferenciaSocial p={p} />
            </Suspense>
          </div>
          <GaleriaProyecto p={p} />
        </Contenedor>
      </div>

      <Contenedor className="mt-6 sm:mt-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">
          <div className="min-w-0">
            <p className="flex flex-wrap items-center gap-x-2 text-xs text-gris">
              <span>{p.estilo}</span>
              <span aria-hidden>·</span>
              <span className="tabular-nums">{p.codigo}</span>
            </p>
            <h1 className="mt-1 font-display text-5xl leading-none tracking-tight sm:text-6xl">{p.nombre}</h1>
            <p className="mt-3 text-lg text-gris">{p.lema}</p>

            <Link
              href={`/planos/${slugMedida(p.terreno)}`}
              className="mt-5 inline-flex items-start gap-2 rounded-2xl border border-oro/30 bg-oro/5 px-4 py-2 text-sm sm:rounded-full"
            >
              <IconoTerreno className="mt-0.5 h-4 w-4 shrink-0 text-oro-oscuro" />
              <span>Cabe en terrenos de <strong className="whitespace-nowrap font-semibold">{textoMedida(p.terreno)}</strong> o más grandes</span>
            </Link>

            <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-linea bg-linea">
              {datos.map((d) => (
                <div key={d.etiqueta} className="bg-hueso p-3.5 sm:p-4">
                  <dt className="flex items-center gap-1.5 text-xs text-gris">
                    <span className="hidden min-[420px]:inline">{d.icono}</span>
                    <span className="truncate">{d.etiqueta}</span>
                  </dt>
                  <dd className="mt-1.5 text-lg font-medium tabular-nums">{d.valor}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Tarjeta de compra */}
          <aside className="lg:row-span-2">
            <div className="rounded-3xl border border-linea bg-white p-6 shadow-sm lg:sticky lg:top-24">
              <p className="text-sm text-gris">{paquete.nombre}</p>
              <p className="mt-1 flex items-center gap-2 text-3xl font-semibold tracking-tight">
                {precio(paquete.precio)}
              </p>
              <p className="mt-1"><Pendiente>Precio de ejemplo</Pendiente></p>
              <div id="compra-principal" className="mt-5">
                <BotonComprar p={p} />
              </div>
              <p className="mt-3 text-center text-xs text-gris">Sin registro · Pago único · Entrega digital</p>
              <ul className="mt-5 space-y-2 border-t border-linea pt-5 text-sm">
                {entregables.map((e) => (
                  <li key={e.id} className="flex items-center justify-between gap-3">
                    <span>{e.nombre}</span>
                    <span className="text-xs text-gris">{e.formato}</span>
                  </li>
                ))}
              </ul>
              <a href="#que-recibes" className="mt-4 inline-block text-sm underline decoration-noche/20 underline-offset-4 hover:decoration-oro">
                Ver qué recibes
              </a>
            </div>
          </aside>

          <div className="min-w-0 lg:col-start-1">
            <p className="max-w-2xl text-[17px] leading-relaxed">{p.descripcion}</p>
          </div>
        </div>
      </Contenedor>

      {/* ── Recorrido visual ── */}
      <section id="recorrido" className="mt-20 sm:mt-28">
        <Contenedor>
          <Eyebrow>¿Te imaginas viviendo aquí?</Eyebrow>
          <Titulo className="mt-3">Conoce {p.nombre}</Titulo>
          <p className="mt-3 max-w-xl text-gris">Conoce cada espacio antes de comprar.</p>
        </Contenedor>
        <Contenedor className="mt-10 space-y-14 sm:space-y-20">
          {p.renders.map((r, i) => (
            <figure key={r.espacio} className={`grid items-end gap-5 sm:grid-cols-[1.6fr_1fr] sm:gap-10 ${i % 2 ? "sm:grid-cols-[1fr_1.6fr]" : ""}`}>
              <Render
                p={p}
                espacio={r.espacio}
                className={`aspect-[4/3] rounded-3xl bg-arena ${i % 2 ? "sm:order-2" : ""}`}
                sizes="(min-width:640px) 60vw, 100vw"
              />
              <figcaption className={i % 2 ? "sm:order-1 sm:text-right" : ""}>
                <span className="text-xs tabular-nums text-gris">{String(i + 1).padStart(2, "0")} / {String(p.renders.length).padStart(2, "0")}</span>
                <p className="mt-1 font-display text-3xl tracking-tight">{r.titulo}</p>
                <p className="mt-2 text-gris">{r.texto}</p>
              </figcaption>
            </figure>
          ))}
        </Contenedor>
      </section>

      {/* ── Planta ── */}
      <section className="mt-24 sm:mt-32">
        <Contenedor>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-16">
            <div>
              <Eyebrow>Distribución</Eyebrow>
              <Titulo className="mt-3">Así se distribuyen los espacios</Titulo>
              <p className="mt-4 max-w-md leading-relaxed text-gris">
                Un buen proyecto empieza por aprovechar bien cada metro. Esta es una vista previa simplificada de la planta dentro de un terreno de {textoMedida(p.terreno)}.
              </p>
              <p className="mt-4 max-w-md text-sm text-gris">
                Los planos completos, acotados y con fachadas y cortes se entregan al comprar.
              </p>
            </div>
            <PlantaInteractiva p={p} />
          </div>
        </Contenedor>
      </section>

      {/* ── Qué recibes ── */}
      <section id="que-recibes" className="mt-24 scroll-mt-20 sm:mt-32">
        <Contenedor>
          <Eyebrow>Lo que compras</Eyebrow>
          <Titulo className="mt-3">¿Qué recibes?</Titulo>
          <p className="mt-3 max-w-xl text-gris">Al terminar el pago descargas estos archivos. También te los enviamos por correo.</p>
          <div className="mt-8">
            <QueRecibes entregables={entregables} />
          </div>
          <Garantias className="mt-10 border-t border-linea pt-8" />
        </Contenedor>
      </section>

      {/* ── Arquitectos ── */}
      <section className="mt-24 sm:mt-32">
        <Contenedor>
          <Eyebrow>Quién lo diseñó</Eyebrow>
          <Titulo className="mt-3">Diseñado por arquitectos</Titulo>
          <div className="mt-8">
            <Arquitecto />
          </div>
        </Contenedor>
      </section>

      <section className="mt-24 sm:mt-32">
        <Contenedor>
          <Transparencia />
        </Contenedor>
      </section>

      {/* ── Preguntas ── */}
      <section className="mt-24 sm:mt-32">
        <Contenedor className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <Titulo>Antes de comprar</Titulo>
            <Link href="/ayuda" className="mt-4 inline-block text-sm underline decoration-noche/20 underline-offset-4 hover:decoration-oro">
              Todas las preguntas
            </Link>
          </div>
          <ListaPreguntas preguntas={PREGUNTAS.slice(0, 4)} />
        </Contenedor>
      </section>

      {/* ── Más casas para el mismo terreno ── */}
      <section className="mt-24 sm:mt-32">
        <Contenedor>
          <Titulo>Más casas para {textoMedida(p.terreno)}</Titulo>
          <div className="mt-8">
            <FilaProyectos proyectos={otros} />
          </div>
        </Contenedor>
      </section>

      <div className="h-20 sm:hidden" aria-hidden />
      <CompraFijaMovil p={p} ancla="compra-principal" />
    </>
  );
}
