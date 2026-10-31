import type { Metadata } from "next";
import Link from "next/link";
import { obtenerProyecto } from "@/data/proyectos";
import { RECOMENDADOS } from "@/data/recomendados";
import ImagenVenta from "@/components/proyecto/ImagenVenta";
export const metadata: Metadata = {
  title: "Qué es Dream House",
  description:
    "Ideas para tu hogar, proyectos de casas y una forma sencilla de encontrar por dónde empezar.",
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
            En Dream House reunimos ideas de casas, fachadas e interiores.
            Puedes explorar cada propuesta, conocer sus espacios y consultar qué
            incluye su paquete de planos, a tu ritmo.
          </p>
          <Link href="/planos/" className="boton">
            Encuentra tu casa <span aria-hidden>→</span>
          </Link>
        </div>
        <figure className="nosotros-imagen">
          <ImagenVenta p={p} prioridad />
          <figcaption>
            Una idea para empezar · Ilustración provisional
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
      <section
        className="nosotros-recomendados"
        aria-labelledby="titulo-recomendados"
      >
        <div>
          <p className="sobrelinea">DETALLES QUE HACEN HOGAR</p>
          <h2 id="titulo-recomendados">Ideas para darle vida a tu casa.</h2>
          <p>
            También queremos acompañarte al elegir los detalles de tus espacios.
          </p>
        </div>
        {RECOMENDADOS.length ? (
          <>
            <p className="aviso mt-6">
              Estos enlaces son de afiliado de Mercado Libre. Dream House puede
              recibir una comisión si compras a través de ellos.
            </p>
            <div className="recomendados-grid">
              {RECOMENDADOS.map((r) => (
                <article key={r.id} className="panel">
                  <h3>{r.nombre}</h3>
                  <p>{r.descripcion}</p>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="enlace"
                  >
                    Ver en Mercado Libre ↗
                  </a>
                </article>
              ))}
            </div>
          </>
        ) : (
          <p className="proximamente">
            Próximamente, una selección de productos para tu hogar en Mercado
            Libre.
          </p>
        )}
      </section>
      <p className="nota nosotros-demo">
        Estás viendo una versión de demostración. Los proyectos, imágenes,
        paquetes y precios todavía son de ejemplo.
      </p>
    </div>
  );
}
