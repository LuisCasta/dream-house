"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { obtenerProyecto } from "@/data/proyectos";
import { guardarDemo, type Escenario } from "@/lib/demo";
import { track } from "@/lib/analytics";
import Resumen from "./Resumen";

export default function FormularioCheckout() {
  const params = useSearchParams();
  const router = useRouter();
  const p = obtenerProyecto(params.get("proyecto") ?? "");
  const [email, setEmail] = useState("");
  const [acepto, setAcepto] = useState(false);
  const [escenario, setEscenario] = useState<Escenario>("aprobado");
  const [errores, setErrores] = useState({
    email: "",
    condiciones: "",
    general: "",
  });
  const [procesando, setProcesando] = useState(false);
  const bloqueo = useRef(false);
  const correoRef = useRef<HTMLInputElement>(null);
  const condicionesRef = useRef<HTMLInputElement>(null);
  if (!p)
    return (
      <div className="ancho estado-vacio">
        <h1 className="titulo-pagina">Elige una casa para continuar.</h1>
        <p className="text-gris my-5">La compra es de un proyecto a la vez.</p>
        <Link href="/planos" className="boton">
          Ver catálogo
        </Link>
      </div>
    );
  async function enviar(e: FormEvent) {
    e.preventDefault();
    if (bloqueo.current || !p) return;
    const errorEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      ? ""
      : "Escribe un correo válido, por ejemplo nombre@correo.com.";
    const errorCondiciones = acepto
      ? ""
      : "Debes aceptar las condiciones y el alcance de la demostración.";
    setErrores({
      email: errorEmail,
      condiciones: errorCondiciones,
      general: "",
    });
    if (errorEmail || errorCondiciones) {
      (errorEmail ? correoRef : condicionesRef).current?.focus();
      return;
    }
    bloqueo.current = true;
    setProcesando(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const pedido = guardarDemo(p.slug, escenario);
      track("demo_payment_result", { proyecto: p.slug, escenario });
      router.push(`/checkout/confirmacion/?orden=${pedido.id}`);
    } catch {
      setErrores({
        email: "",
        condiciones: "",
        general:
          "No pudimos guardar la simulación en este navegador. Habilita el almacenamiento de sesión e inténtalo de nuevo.",
      });
      bloqueo.current = false;
      setProcesando(false);
    }
  }
  return (
    <div className="ancho checkout">
      <Link href={`/${p.slug}/`} className="enlace text-sm">
        ← Volver a la casa
      </Link>
      <div className="checkout-grid">
        <div className="checkout-formulario">
          <p className="sobrelinea">UN PASO MÁS CERCA DE TU CASA</p>
          <h1 className="titulo-pagina">Finaliza tu compra</h1>
          <div className="aviso my-6">
            <strong>Demostración: no se realizará ningún cobro.</strong>
            <p>
              No ingreses datos bancarios. No se enviarán correos ni archivos
              reales.
            </p>
          </div>
          <form
            noValidate
            onSubmit={enviar}
            className="formulario"
            aria-busy={procesando}
          >
            <label htmlFor="email-compra">
              Correo para recibir tus archivos
            </label>
            <input
              ref={correoRef}
              id="email-compra"
              type="email"
              autoComplete="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!errores.email}
              aria-describedby="email-ayuda email-error"
              required
            />
            <p id="email-error" className="error" role="alert">
              {errores.email}
            </p>
            <p id="email-ayuda" className="nota">
              Sin crear una cuenta. En esta demo, tu correo no se guarda ni se
              envía.
            </p>
            <fieldset className="mt-8">
              <legend className="font-medium mb-3">Escenario de prueba</legend>
              <div className="escenarios">
                {(["aprobado", "pendiente", "fallido"] as const).map(
                  (valor) => (
                    <label
                      key={valor}
                      className={escenario === valor ? "seleccionado" : ""}
                    >
                      <input
                        type="radio"
                        name="escenario"
                        value={valor}
                        checked={escenario === valor}
                        onChange={() => setEscenario(valor)}
                      />
                      <span>
                        {valor === "aprobado"
                          ? "Aprobado"
                          : valor === "pendiente"
                            ? "Pendiente"
                            : "Fallido"}
                      </span>
                    </label>
                  ),
                )}
              </div>
            </fieldset>
            <label className="aceptacion mt-7">
              <input
                ref={condicionesRef}
                type="checkbox"
                checked={acepto}
                onChange={(e) => setAcepto(e.target.checked)}
                aria-invalid={!!errores.condiciones}
                aria-describedby="condiciones-error"
              />
              <span>
                Acepto las{" "}
                <Link
                  href="/legal/terminos"
                  target="_blank"
                  className="underline"
                >
                  condiciones de compra
                </Link>{" "}
                y el{" "}
                <Link
                  href={`/${p.slug}/`}
                  target="_blank"
                  className="underline"
                >
                  alcance del paquete
                </Link>
                . Entiendo que es una simulación.
              </span>
            </label>
            <p id="condiciones-error" className="error" role="alert">
              {errores.condiciones}
            </p>
            <p className="error" role="alert">
              {errores.general}
            </p>
            <button
              className="boton w-full mt-5"
              type="submit"
              disabled={procesando}
            >
              {procesando ? "Procesando simulación…" : "Simular pago"}
            </button>
            <p className="nota text-center mt-3" role="status">
              {procesando
                ? "Estamos preparando el resultado de prueba."
                : "Requiere revisión y adaptación local antes de construir."}
            </p>
          </form>
        </div>
        <Resumen p={p} />
      </div>
    </div>
  );
}
