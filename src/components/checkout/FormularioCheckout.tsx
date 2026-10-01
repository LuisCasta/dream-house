"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { entregablesDe, obtenerProyecto, type Proyecto } from "@/data/proyectos";
import { textoMedida } from "@/data/terrenos";
import { quitarDelCarrito, useCarrito } from "@/lib/carrito";
import { obtenerAtribucion, track } from "@/lib/analytics";
import { precio } from "@/lib/formato";
import { useMontado } from "@/lib/useMontado";
import { METODOS_PAGO, nuevoIdOrden, pagos, type MetodoPago } from "@/lib/pagos";
import Render from "../Render";
import { IconoCandado, IconoCheck } from "../Iconos";
import { claseBoton } from "../ui";


function Campo({ label, opcional, ...props }: { label: string; opcional?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-sm font-medium">
        {label} {opcional && <span className="font-normal text-gris">(opcional)</span>}
      </span>
      <input
        {...props}
        className="mt-1.5 w-full rounded-xl border border-linea bg-white px-4 py-3.5 text-base outline-none transition focus:border-noche"
      />
    </label>
  );
}

export default function FormularioCheckout() {
  const montado = useMontado();
  const carrito = useCarrito();
  const router = useRouter();
  const [metodo, setMetodo] = useState<MetodoPago>("tarjeta");
  const [enviando, setEnviando] = useState(false);
  const registrado = useRef(false);

  const items = carrito
    .map((i) => ({ ...i, p: obtenerProyecto(i.slug) }))
    .filter((i): i is typeof i & { p: Proyecto } => !!i.p)
    .map((i) => ({ ...i, paquete: i.p.paquetes.find((k) => k.id === i.paquete) ?? i.p.paquetes[0] }));
  const total = items.reduce((s, i) => s + i.paquete.precio, 0);

  useEffect(() => {
    if (!montado || registrado.current || !items.length) return;
    registrado.current = true;
    track("begin_checkout", { proyectos: items.map((i) => i.p.slug), valor: total, moneda: "MXN" });
  }, [montado, items, total]);

  if (!montado) return <div className="min-h-[60vh]" />;

  if (!items.length) {
    return (
      <div className="mx-auto max-w-md px-5 py-24 text-center">
        <p className="font-display text-4xl tracking-tight">Aún no elegiste un proyecto</p>
        <p className="mt-3 text-gris">Empieza por la medida de tu terreno.</p>
        <Link href="/planos" className={`${claseBoton()} mt-8`}>Encontrar mi casa</Link>
      </div>
    );
  }

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const datos = new FormData(e.currentTarget);
    setEnviando(true);
    const { redirigirA } = await pagos.iniciarPago({
      id: nuevoIdOrden(),
      items: items.map(({ slug, paquete }) => ({ slug, paquete: paquete.id })),
      total,
      metodo,
      comprador: {
        nombre: String(datos.get("nombre")),
        email: String(datos.get("email")),
        whatsapp: String(datos.get("whatsapp") || "") || undefined,
      },
      atribucion: obtenerAtribucion(),
    });
    router.push(redirigirA);
  };

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-5 pt-6 sm:px-8 sm:pt-10 lg:grid-cols-[1fr_400px] lg:gap-14">
      {/* Resumen (arriba en móvil, a la derecha en escritorio) */}
      <section aria-label="Resumen" className="lg:order-2">
        <div className="rounded-3xl border border-linea bg-white p-5 lg:sticky lg:top-6">
          {items.map(({ p, paquete }) => (
            <div key={p.slug} className="border-b border-linea py-5 first:pt-0">
              <div className="flex gap-4">
                <Render p={p} className="h-20 w-20 shrink-0 rounded-xl bg-arena" marcarProvisional={false} sizes="80px" />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-2xl leading-tight">{p.nombre}</p>
                  <p className="text-sm text-gris">{paquete.nombre} · Terreno {textoMedida(p.terreno)}</p>
                  <p className="mt-1 text-sm font-medium">{precio(paquete.precio)}</p>
                </div>
                {items.length > 1 && (
                  <button type="button" onClick={() => quitarDelCarrito(p.slug)} className="self-start text-xs text-gris underline">
                    Quitar
                  </button>
                )}
              </div>
              <details className="group mt-4">
                <summary className="cursor-pointer list-none text-sm text-gris [&::-webkit-details-marker]:hidden">
                  <span className="underline decoration-noche/20 underline-offset-4">Qué incluye</span>
                </summary>
                <ul className="mt-3 space-y-2">
                  {entregablesDe(p, paquete.id).map((e) => (
                    <li key={e.id} className="flex items-center gap-2 text-sm">
                      <IconoCheck className="h-4 w-4 text-oro-oscuro" /> {e.nombre} <span className="text-xs text-gris">{e.formato}</span>
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          ))}
          <div className="flex items-baseline justify-between pt-5">
            <span className="font-medium">Total</span>
            <span className="text-2xl font-semibold tracking-tight">{precio(total)}</span>
          </div>
          <ul className="mt-4 space-y-1.5 text-xs text-gris">
            <li>Pago único. Entrega digital al confirmar el pago.</li>
            <li>
              Al comprar aceptas los <Link href="/legal/terminos" className="underline">Términos</Link> y la{" "}
              <Link href="/legal/politica-de-compra" className="underline">Política de compra</Link>.
            </li>
          </ul>
        </div>
      </section>

      {/* Formulario */}
      <form onSubmit={enviar} className="lg:order-1">
        {pagos.esDemo && (
          <p className="mb-6 rounded-xl bg-amber-100 px-4 py-3 text-sm text-amber-900">
            Modo demostración: la pasarela de pago aún no está conectada y no se hará ningún cargo.
          </p>
        )}
        <h1 className="font-display text-4xl tracking-tight">Tus datos</h1>
        <p className="mt-1 text-sm text-gris">Sin cuenta ni contraseña. Te enviamos el proyecto a tu correo.</p>
        <div className="mt-6 space-y-4">
          <Campo label="Nombre" name="nombre" required autoComplete="name" />
          <Campo label="Correo electrónico" name="email" type="email" required autoComplete="email" inputMode="email" />
          <Campo label="WhatsApp" name="whatsapp" type="tel" opcional autoComplete="tel" inputMode="tel" placeholder="Para avisarte si hay algún problema" />
        </div>

        <h2 className="mt-10 font-display text-4xl tracking-tight">Método de pago</h2>
        <fieldset className="mt-5 space-y-3">
          <legend className="sr-only">Método de pago</legend>
          {METODOS_PAGO.map((m) => (
            <label
              key={m.id}
              className={`flex cursor-pointer items-center gap-4 rounded-2xl border bg-white p-4 transition ${metodo === m.id ? "border-noche ring-1 ring-noche" : "border-linea hover:border-noche/30"}`}
            >
              <input type="radio" name="metodo" value={m.id} checked={metodo === m.id} onChange={() => setMetodo(m.id)} className="h-5 w-5 accent-oro" />
              <span>
                <span className="block font-medium">{m.nombre}</span>
                <span className="block text-sm text-gris">{m.detalle}</span>
              </span>
            </label>
          ))}
        </fieldset>
        <p className="mt-3 text-xs text-gris">Los datos de pago se capturan en la página segura de la pasarela, no en este sitio.</p>

        <button type="submit" disabled={enviando} className={`${claseBoton("acento")} mt-8 w-full text-base`}>
          <IconoCandado className="h-4 w-4" />
          {enviando ? "Procesando…" : `Pagar ${precio(total)}`}
        </button>
      </form>
    </div>
  );
}
