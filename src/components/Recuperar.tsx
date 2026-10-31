"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
export default function Recuperar() {
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [procesando, setProcesando] = useState(false);
  const [solicitar, setSolicitar] = useState(false);
  const bloqueo = useRef(false);
  const ref = useRef<HTMLInputElement>(null);
  const invalido =
    params.has("token") ||
    params.get("estado") === "vencido" ||
    params.get("estado") === "incorrecto";
  async function enviar(e: FormEvent) {
    e.preventDefault();
    if (bloqueo.current) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Escribe un correo válido.");
      ref.current?.focus();
      return;
    }
    setError("");
    setProcesando(true);
    bloqueo.current = true;
    await new Promise((resolve) => setTimeout(resolve, 400));
    setEnviado(true);
    setProcesando(false);
    bloqueo.current = false;
    setEmail("");
  }
  return (
    <div className="ancho py-10 sm:py-16">
      <section className="recuperar panel">
        <div className="estado-icono correo-icono" aria-hidden>
          ✉
        </div>
        {invalido && !solicitar ? (
          <>
            <h1 className="titulo-pagina">Este enlace no es válido.</h1>
            <p className="text-gris mt-4">
              Puede haber vencido o estar incompleto. Solicita un nuevo enlace
              para continuar.
            </p>
            <p className="nota mt-3">
              Demostración: no se verifican enlaces ni compras reales.
            </p>
            <button
              className="boton w-full mt-8"
              onClick={() => setSolicitar(true)}
            >
              Solicitar otro enlace
            </button>
          </>
        ) : (
          <>
            <h1 className="titulo-pagina">Recupera tus archivos</h1>
            <p className="text-gris mt-4">
              Escribe el correo que utilizaste al comprar.
            </p>
            <p className="nota mt-2">
              Demostración: no se enviará ningún correo.
            </p>
            <form
              className="formulario text-left mt-8"
              noValidate
              onSubmit={enviar}
              aria-busy={procesando}
            >
              <label htmlFor="correo-recuperar">Correo de compra</label>
              <input
                ref={ref}
                id="correo-recuperar"
                autoComplete="email"
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!error}
                aria-describedby="recuperar-error"
                required
              />
              <p className="error" id="recuperar-error" role="alert">
                {error}
              </p>
              <button className="boton w-full mt-4" disabled={procesando}>
                {procesando
                  ? "Preparando solicitud…"
                  : "Enviar enlace de acceso"}
              </button>
              <p className="nota text-center mt-3">
                No necesitas crear una cuenta.
              </p>
            </form>
            {enviado && (
              <div role="status" className="aviso mt-7 text-left">
                <p>
                  Si hay una compra asociada a ese correo, recibirás un enlace
                  para acceder a tus archivos. Revisa también tu carpeta de
                  spam.
                </p>
                <p className="mt-3 font-medium">
                  En esta demostración no se envió correo ni se consultaron
                  compras.
                </p>
              </div>
            )}
          </>
        )}
        <p className="mt-8 text-sm">
          ¿No recuerdas el correo o necesitas ayuda?
        </p>
        <Link href="/contacto" className="enlace inline-block mt-2">
          Contactar soporte
        </Link>
        <div className="mt-8 border-t border-linea pt-6">
          <Link href="/planos" className="enlace">
            ← Volver al catálogo
          </Link>
        </div>
      </section>
    </div>
  );
}
