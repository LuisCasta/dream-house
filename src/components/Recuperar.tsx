import Link from "next/link";
import { CONTACTO, enlaceWhatsApp } from "@/config/sitio";

export default function Recuperar() {
  return (
    <div className="ancho py-10 sm:py-16">
      <section className="recuperar panel">
        <div className="estado-icono correo-icono" aria-hidden>✉</div>
        <h1 className="titulo-pagina">Recupera tus archivos</h1>
        <p className="text-gris mt-4">Si tu pago ya se acreditó y no puedes acceder al descargable, contáctanos para ayudarte a recuperar tus planos.</p>
        <p className="nota mt-3">Indica el correo que utilizaste al comprar, el proyecto y tu comprobante de pago. Si el enlace está vencido o incompleto, envíanos también ese detalle.</p>
        <a className="boton w-full mt-8" href={enlaceWhatsApp("Hola, necesito recuperar los archivos de mi compra en Dream House.")} target="_blank" rel="noopener noreferrer">Solicitar ayuda por WhatsApp</a>
        <a className="enlace inline-block mt-5" href={`mailto:${CONTACTO.email}?subject=Ayuda%20con%20mis%20archivos`}>Escribir por correo</a>
        <p className="nota mt-4">No necesitas crear una cuenta.</p>
        <div className="mt-8 border-t border-linea pt-6">
          <Link href="/planos" className="enlace">← Volver al catálogo</Link>
        </div>
      </section>
    </div>
  );
}
