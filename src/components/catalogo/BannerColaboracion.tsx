import Image from "next/image";
import Link from "next/link";
import { recurso } from "@/lib/rutas";

export default function BannerColaboracion() {
  return (
    <section className="banner-colaboracion" aria-labelledby="titulo-catalogo">
      <Image
        className="colaboracion-fondo"
        src={recurso("/brand/fondo-arquitectonico.webp")}
        alt=""
        aria-hidden="true"
        width={1920}
        height={645}
        priority
        sizes="(min-width: 1384px) 1320px, (min-width: 768px) calc(100vw - 64px), calc(100vw - 36px)"
      />
      <div className="colaboracion-degradado" aria-hidden="true" />
      <div className="colaboracion-texto colaboracion-entrada">
        <p className="sobrelinea">ENCUENTRA TU PRÓXIMO HOGAR</p>
        <h1 id="titulo-catalogo">Los planos de la casa que viste.</h1>
        <p className="colaboracion-descripcion">
          Elige tu casa. Conoce el proyecto. Hazlo tuyo.
        </p>
        <div className="colaboracion-enlaces">
          <Link href="#casas" className="boton">
            Ver casas <span aria-hidden>→</span>
          </Link>
          <Link href="/nosotros/" className="enlace">
            Conoce Dream House ↗
          </Link>
        </div>
      </div>
      <div
        className="colaboracion-marcas colaboracion-entrada"
        role="group"
        aria-label="Dream House IA en colaboración con Klaro"
      >
        <Image
          className="colaboracion-logo-dream"
          src={recurso("/brand/dream-house.png")}
          alt="Dream House IA"
          width={1155}
          height={800}
          priority
          sizes="(min-width: 768px) 194px, 120px"
        />
        <p className="colaboracion-etiqueta">En colaboración</p>
        <Image
          className="colaboracion-logo-klaro"
          src={recurso("/brand/klaro.png")}
          alt="Klaro"
          width={1360}
          height={384}
          priority
          sizes="(min-width: 768px) 240px, 145px"
        />
      </div>
    </section>
  );
}
