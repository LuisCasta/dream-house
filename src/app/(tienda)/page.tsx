import Link from "next/link";
import { PREGUNTAS } from "@/data/contenido";
import { ENTREGABLES, destacados, obtenerProyecto } from "@/data/proyectos";
import Render from "@/components/Render";
import SelectorTerreno from "@/components/SelectorTerreno";
import { Arquitecto, Garantias, ListaPreguntas, QueRecibes, Testimonios, Transparencia } from "@/components/Secciones";
import { FilaProyectos } from "@/components/TarjetaProyecto";
import { IconoFlecha } from "@/components/Iconos";
import { Boton, Contenedor, EtiquetaTerreno, Eyebrow, Titulo } from "@/components/ui";

const pasos = [
  { n: "1", titulo: "Dinos cuánto mide tu terreno", texto: "Te mostramos solo las casas que caben en él." },
  { n: "2", titulo: "Conoce la casa por dentro", texto: "Recorre cada espacio y revisa la distribución antes de comprar." },
  { n: "3", titulo: "Compra y descarga", texto: "Sin registro. Recibes el proyecto al terminar el pago." },
];

export default function Home() {
  const brisa = obtenerProyecto("brisa")!;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-noche pb-14 pt-10 text-hueso sm:pb-20 sm:pt-20">
        {/* Degradado de cielo nocturno, como en las portadas de los videos */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_100%,#3b4a70_0%,transparent_70%)]" aria-hidden />
        <Contenedor className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center text-oro-claro">Proyectos para terrenos reales</Eyebrow>
            <h1 className="mt-6 font-display text-[2.6rem] font-medium leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.4rem]">
              Tu terreno ya tiene posibilidades.{" "}
              <em className="font-normal text-oro-claro">Encuentra la casa diseñada para él.</em>
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-lg text-hueso/70 sm:text-xl">Proyectos arquitectónicos profesionales para terrenos reales.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Boton href="#terreno" variante="acento">
                Encontrar mi casa <IconoFlecha />
              </Boton>
              <Boton href="/planos" variante="claro">
                Ver proyectos
              </Boton>
            </div>
          </div>
        </Contenedor>

        <Contenedor className="relative mt-10 sm:mt-14">
          <Link href={`/${brisa.slug}`} className="group relative block">
            <Render p={brisa} className="aspect-[4/5] rounded-3xl bg-noche-2 ring-1 ring-hueso/10 sm:aspect-[16/11] lg:aspect-[16/8]" prioridad sizes="(min-width:1152px) 1100px, 100vw" />
            {/* Rótulo estilo portada: m² grande + etiqueta de terreno */}
            <div className="pointer-events-none absolute inset-x-0 top-5 text-center sm:top-5">
              <p className="font-display text-5xl font-semibold tracking-tight text-hueso drop-shadow sm:text-6xl">
                {brisa.m2} m²
              </p>
              <EtiquetaTerreno {...brisa.terreno} oscura className="mt-3" />
            </div>
            <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl border border-oro/25 bg-noche/80 p-4 text-hueso backdrop-blur-md sm:inset-x-auto sm:bottom-6 sm:left-6 sm:min-w-80">
              <div>
                <p className="font-display text-2xl font-medium leading-none">{brisa.nombre}</p>
                <p className="mt-1.5 text-sm text-hueso/65">
                  {brisa.recamaras} recámaras · {brisa.plantas} plantas · {brisa.estilo}
                </p>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-oro text-noche transition group-hover:bg-oro-claro">
                <IconoFlecha className="h-5 w-5" />
              </span>
            </div>
          </Link>
        </Contenedor>
      </section>

      {/* ── ¿Cuánto mide tu terreno? ── */}
      <section id="terreno" className="scroll-mt-16 pt-20 sm:pt-28">
        <Contenedor>
          <Titulo className="text-center">¿Cuánto mide tu terreno?</Titulo>
          <p className="mx-auto mt-3 max-w-md text-center text-gris">No necesitas saber de arquitectura. Solo dinos cuánto mide tu terreno.</p>
          <div className="mt-9">
            <SelectorTerreno />
          </div>
        </Contenedor>
      </section>

      {/* ── Destacados ── */}
      <section className="pt-20 sm:pt-28">
        <Contenedor>
          <div className="flex items-end justify-between gap-4">
            <Titulo>Proyectos destacados</Titulo>
            <Link href="/planos" className="hidden shrink-0 items-center gap-2 text-sm font-medium hover:text-oro-oscuro sm:flex">
              Ver todos <IconoFlecha />
            </Link>
          </div>
          <div className="mt-8">
            <FilaProyectos proyectos={destacados().slice(0, 3)} />
          </div>
        </Contenedor>
      </section>

      {/* ── Conoce cada espacio ── */}
      <section className="pt-20 sm:pt-28">
        <Contenedor>
          <Eyebrow>{brisa.nombre}</Eyebrow>
          <Titulo className="mt-3 max-w-xl">Conoce cada espacio antes de comprar.</Titulo>
        </Contenedor>
        <div className="mt-8 overflow-hidden">
          <Contenedor>
            <div className="fila -mx-5 flex scroll-px-5 gap-3 overflow-x-auto px-5 sm:mx-0 sm:scroll-px-0 sm:px-0">
              {brisa.renders.slice(1).map((r) => (
                <Link key={r.espacio} href={`/${brisa.slug}#recorrido`} className="group w-[70%] shrink-0 sm:w-[30%]">
                  <Render p={brisa} espacio={r.espacio} className="aspect-[3/4] rounded-2xl bg-arena" sizes="(min-width:640px) 30vw, 70vw" marcarProvisional={false} />
                  <p className="mt-3 text-sm font-medium">{r.titulo}</p>
                </Link>
              ))}
            </div>
          </Contenedor>
        </div>
      </section>

      {/* ── Cómo funciona ── */}
      <section className="pt-20 sm:pt-28">
        <Contenedor>
          <div className="rounded-3xl bg-noche px-6 py-12 text-hueso sm:px-12 sm:py-16">
            <Eyebrow className="text-oro-claro">Cómo funciona</Eyebrow>
            <Titulo className="mt-3 max-w-lg">De “me encantó esa casa” a tener el proyecto.</Titulo>
            <ol className="mt-10 grid gap-8 sm:grid-cols-3">
              {pasos.map((p) => (
                <li key={p.n} className="border-t border-hueso/15 pt-5">
                  <span className="font-display text-4xl text-oro-claro">{p.n}</span>
                  <p className="mt-3 text-lg font-medium">{p.titulo}</p>
                  <p className="mt-1 text-hueso/65">{p.texto}</p>
                </li>
              ))}
            </ol>
            <Link href="/como-funciona" className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-hueso/80 hover:text-hueso">
              Ver el proceso completo <IconoFlecha />
            </Link>
          </div>
        </Contenedor>
      </section>

      {/* ── Qué recibes ── */}
      <section className="pt-20 sm:pt-28">
        <Contenedor>
          <Titulo>¿Qué recibes?</Titulo>
          <p className="mt-3 max-w-xl text-gris">Cada proyecto incluye los documentos para entender la casa y llevarla con un profesional local.</p>
          <div className="mt-8">
            <QueRecibes entregables={Object.values(ENTREGABLES)} />
          </div>
          <Link href="/que-incluye" className="mt-6 inline-flex items-center gap-2 text-sm font-medium hover:text-oro-oscuro">
            Qué incluye tu proyecto, en detalle <IconoFlecha />
          </Link>
        </Contenedor>
      </section>

      <section className="pt-20 sm:pt-28">
        <Contenedor>
          <Transparencia />
        </Contenedor>
      </section>

      {/* ── Confianza ── */}
      <section className="pt-20 sm:pt-28">
        <Contenedor>
          <Titulo>Diseñado por arquitectos</Titulo>
          <div className="mt-8 space-y-10">
            <Arquitecto />
            <Testimonios />
            <Garantias className="border-t border-linea pt-8" />
          </div>
        </Contenedor>
      </section>

      {/* ── Preguntas ── */}
      <section className="pt-20 sm:pt-28">
        <Contenedor className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <Titulo>Preguntas frecuentes</Titulo>
            <Link href="/ayuda" className="mt-4 inline-block text-sm underline decoration-noche/20 underline-offset-4 hover:decoration-oro">
              Ver todas
            </Link>
          </div>
          <ListaPreguntas preguntas={PREGUNTAS.slice(0, 4)} />
        </Contenedor>
      </section>

      {/* ── Cierre ── */}
      <section className="pt-20 sm:pt-28">
        <Contenedor className="text-center">
          <Titulo>Encuentra la casa que cabe en tu terreno.</Titulo>
          <div className="mt-8">
            <Boton href="#terreno" variante="acento">
              Encontrar mi casa
            </Boton>
          </div>
        </Contenedor>
      </section>
    </>
  );
}
