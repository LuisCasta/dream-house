import Link from "next/link";
export default function ComoFunciona() {
  return (
    <div className="ancho pagina-ayuda">
      <p className="sobrelinea">CÓMO FUNCIONA</p>
      <h1 className="titulo-pagina">De una idea a tu próximo hogar.</h1>
      <ol className="preguntas space-y-7">
        {[
          [
            "Encuentra tu casa",
            "Busca por nombre o filtra por terreno de referencia. Las medidas no sustituyen una revisión de compatibilidad local.",
          ],
          [
            "Conoce el proyecto",
            "Revisa fachada, dos interiores, recorrido cuando esté disponible y el alcance del paquete. No mostramos vistas previas de planos.",
          ],
          [
            "Prueba la compra",
            "Esta versión solo simula el pago. No se cobra, no se envían correos ni se entregan planos reales.",
          ],
          [
            "Revisa antes de construir",
            "La construcción requiere revisión y adaptación de un profesional local. La adaptación se cotiza por separado.",
          ],
        ].map(([titulo, texto], i) => (
          <li key={titulo}>
            <h2 className="font-display text-2xl">
              {i + 1}. {titulo}
            </h2>
            <p className="text-gris mt-2 max-w-2xl">{texto}</p>
          </li>
        ))}
      </ol>
      <Link href="/planos" className="boton mt-8">
        Ver proyectos
      </Link>
    </div>
  );
}
