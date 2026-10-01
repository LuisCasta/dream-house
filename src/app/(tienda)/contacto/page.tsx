import type { Metadata } from "next";
import { CONTACTO, DATOS_FISCALES, REDES, enlaceWhatsApp } from "@/config/sitio";
import { IconoWhatsApp } from "@/components/Iconos";
import { Contenedor, Eyebrow, Pendiente, Titulo, claseBoton } from "@/components/ui";

export const metadata: Metadata = { title: "Contacto" };

export default function Contacto() {
  return (
    <Contenedor className="pt-10 sm:pt-16">
      <Eyebrow>Contacto</Eyebrow>
      <Titulo as="h1" className="mt-3 max-w-xl">Aquí estamos para resolver tus dudas.</Titulo>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <div className="min-w-0 rounded-3xl bg-noche p-6 text-hueso sm:p-8">
          <p className="text-sm text-hueso/60">La forma más rápida</p>
          <p className="mt-1 font-display text-3xl">WhatsApp</p>
          <p className="mt-1 flex flex-wrap items-center gap-2 text-hueso/80">
            {CONTACTO.whatsappVisible} {CONTACTO.pendiente && <Pendiente />}
          </p>
          <a href={enlaceWhatsApp("Hola, tengo una pregunta sobre un proyecto.")} target="_blank" rel="noopener noreferrer" className={`${claseBoton("acento")} mt-6`}>
            <IconoWhatsApp className="h-5 w-5" /> Escribir por WhatsApp
          </a>
        </div>
        <div className="min-w-0 rounded-3xl border border-linea bg-white p-6 sm:p-8">
          <p className="text-sm text-gris">Correo</p>
          <a href={`mailto:${CONTACTO.email}`} className="mt-1 block break-words font-display text-2xl hover:text-oro-oscuro sm:text-3xl">{CONTACTO.email}</a>
          <p className="mt-6 text-sm text-gris">Horario</p>
          <p className="mt-1">{CONTACTO.horario}</p>
        </div>
      </div>

      <div className="mt-12 grid gap-8 border-t border-linea pt-10 sm:grid-cols-2">
        <div>
          <h2 className="font-medium">Redes sociales</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {REDES.map((r) => (
              <li key={r.nombre}>
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center rounded-full border border-linea px-4 text-sm hover:border-noche/40">
                  {r.nombre}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="flex items-center gap-2 font-medium">Datos comerciales {DATOS_FISCALES.pendiente && <Pendiente />}</h2>
          <p className="mt-3 text-sm text-gris">{DATOS_FISCALES.razonSocial}</p>
          <p className="text-sm text-gris">{DATOS_FISCALES.rfc}</p>
        </div>
      </div>
    </Contenedor>
  );
}
