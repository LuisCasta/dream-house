import type { Metadata } from "next";
import Link from "next/link";
import { obtenerProyecto } from "@/data/proyectos";
import ImagenVenta from "@/components/proyecto/ImagenVenta";
export const metadata: Metadata = {
  title: "Conoce Dream House",
  description:
    "Conoce Dream House y Casa Brisa: planos arquitectónicos, renders de sus espacios y atención para consultar un proyecto personalizado.",
};

export default function Nosotros() {
  const p = obtenerProyecto("brisa")!;
  return (
    <div className="ancho nosotros">
      <section className="nosotros-intro">
        <div>
          <p className="sobrelinea">CONOCE DREAM HOUSE</p>
          <h1>
            Tu casa empieza
            <br />
            con una idea.
          </h1>
          <p className="nosotros-bajada">
            Un lugar para imaginar tu hogar y encontrar un proyecto con el que
            dar el siguiente paso.
          </p>
          <p className="nosotros-descripcion">
            En Dream House convertimos ideas de vivienda en proyectos que
            puedes explorar a través de planos y renders. Casa Brisa es nuestro
            primer proyecto digital: una casa de una planta con dos recámaras,
            un baño y 72 m² construidos, para un terreno de 7 × 15 m.
          </p>
          <Link href="/planos/" className="boton">
            Encuentra tu casa <span aria-hidden>→</span>
          </Link>
        </div>
        <figure className="nosotros-imagen">
          <ImagenVenta p={p} prioridad />
          <figcaption>
            Casa Brisa · Render de fachada del proyecto
          </figcaption>
        </figure>
      </section>
      <section className="nosotros-acerca">
        <p className="sobrelinea">DE LA INSPIRACIÓN A TU TERRENO</p>
        <h2>Imagina. Explora. Adapta.</h2>
        <p>
          La casa que te gusta es el punto de partida. Antes de construir, un
          profesional local debe revisar el proyecto y adaptarlo a tu terreno,
          tus necesidades y la normativa de tu localidad.
        </p>
        <Link href="/adaptar/" className="enlace">
          ¿Buscas algo a tu medida? Platiquemos →
        </Link>
      </section>
      <section className="nosotros-espacios" aria-labelledby="titulo-espacios">
        <p className="sobrelinea">LOS ESPACIOS DE CASA BRISA</p>
        <h2 id="titulo-espacios">Luz, materiales cálidos y vistas al jardín.</h2>
        <div className="nosotros-espacios-grid">
          {p.renders.slice(1).map((render, i) => (
            <figure key={render.espacio}>
              <div className="nosotros-render"><ImagenVenta p={p} indice={i + 1} /></div>
              <figcaption>{render.titulo} · Casa Brisa</figcaption>
            </figure>
          ))}
        </div>
        <p className="text-gris mt-5">El paquete reúne planos arquitectónicos y renders de las áreas del proyecto. Consulta la ficha para conocer su distribución y los documentos incluidos.</p>
        <Link href="/brisa/" className="enlace inline-block mt-5">Conocer Casa Brisa →</Link>
      </section>
    </div>
  );
}
