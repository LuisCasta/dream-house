import Link from "next/link";
export default function Confirmacion() {
  return (
    <div className="ancho estado-vacio">
      <h1 className="titulo-pagina">Accede a tus planos</h1>
      <p className="text-gris my-5">La descarga de tu paquete está disponible en el enlace de entrega de tu compra una vez que Stripe confirme la acreditación del pago.</p>
      <p className="nota mb-6">Si tu pago sigue pendiente, espera a que se acredite. Si ya pagaste y necesitas ayuda para acceder a los archivos, contacta a nuestro equipo con tu correo de compra y comprobante.</p>
      <Link href="/recuperar/" className="boton">Ayuda con mis archivos</Link>
      <Link href="/planos/" className="enlace block mt-5">Volver al catálogo</Link>
    </div>
  );
}
