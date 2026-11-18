"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { obtenerProyecto } from "@/data/proyectos";
import Compra from "../Compra";
import Resumen from "./Resumen";

export default function FormularioCheckout() {
  const params = useSearchParams();
  const p = obtenerProyecto(params.get("proyecto") ?? "");
  if (!p)
    return (
      <div className="ancho estado-vacio">
        <h1 className="titulo-pagina">Elige una casa para continuar.</h1>
        <p className="text-gris my-5">La compra es de un proyecto a la vez.</p>
        <Link href="/planos" className="boton">Ver catálogo</Link>
      </div>
    );
  if (p.estado === "proximamente")
    return (
      <div className="ancho estado-vacio">
        <span className="estado-proximamente">Próximamente</span>
        <h1 className="titulo-pagina mt-5">{p.nombre} está en preparación.</h1>
        <p className="text-gris my-5">Publicaremos su información y precio cuando esté listo. Aún no está disponible para compra.</p>
        <Link href={`/${p.slug}/`} className="enlace">Ver avance del proyecto →</Link>
      </div>
    );
  return (
    <div className="ancho checkout">
      <Link href={`/${p.slug}/`} className="enlace text-sm">← Volver a la casa</Link>
      <div className="checkout-grid">
        <div className="checkout-formulario">
          <p className="sobrelinea">UN PASO MÁS CERCA DE TU CASA</p>
          <h1 className="titulo-pagina">Finaliza tu compra</h1>
          <p className="text-gris my-6">Completa tu pago en Stripe. Una vez acreditado, podrás descargar el archivo ZIP con los documentos incluidos en tu paquete.</p>
          <Compra p={p} className="w-full" />
          <p className="nota mt-5">Revisa las <Link href="/legal/terminos/" className="enlace">condiciones de compra</Link> y el alcance del paquete antes de pagar. Requiere revisión y adaptación local antes de construir.</p>
        </div>
        <Resumen p={p} />
      </div>
    </div>
  );
}
