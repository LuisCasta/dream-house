import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Contenedor, Titulo } from "@/components/ui";
import { DOCUMENTOS_LEGALES, TECNOLOGIAS_PRIVACIDAD } from "@/data/legal";
import { DOCUMENTOS_LEGALES_COMPLETOS, LEGAL } from "@/config/legal";
import { CONTACTO } from "@/config/sitio";

const DOCUMENTOS = DOCUMENTOS_LEGALES;

type Doc = keyof typeof DOCUMENTOS;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(DOCUMENTOS).map((doc) => ({ doc }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[doc]">): Promise<Metadata> {
  const doc = (await params).doc;
  if (!Object.hasOwn(DOCUMENTOS, doc)) return {};
  const d = DOCUMENTOS[doc as Doc];
  return { title: d.titulo, description: d.resumen, robots: { index: DOCUMENTOS_LEGALES_COMPLETOS, follow: true } };
}

export default async function Legal({ params }: PageProps<"/legal/[doc]">) {
  const doc = (await params).doc;
  if (!Object.hasOwn(DOCUMENTOS, doc)) notFound();
  const d = DOCUMENTOS[doc as Doc];
  return (
    <Contenedor className="pagina-legal max-w-4xl pt-10 sm:pt-16 pb-14">
      <Titulo as="h1">{d.titulo}</Titulo>
      <p className="mt-3 text-gris">{d.resumen}</p>
      <p className="nota mt-4">Última actualización: <time dateTime={LEGAL.actualizado}>{LEGAL.fechaVisible}</time>.</p>
      <nav className="legal-documentos" aria-label="Documentos legales">
        {(Object.keys(DOCUMENTOS) as Doc[]).map((clave) => <Link key={clave} href={`/legal/${clave}/`} aria-current={clave === doc ? "page" : undefined}>{DOCUMENTOS[clave].titulo}</Link>)}
      </nav>
      <nav className="legal-indice" aria-label="Contenido del documento">
        <h2>En este documento</h2>
        <ol>{d.secciones.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.titulo}</a></li>)}</ol>
      </nav>
      <article className="legal-contenido">
        {d.secciones.map((seccion) => <section key={seccion.id} id={seccion.id}>
          <h2>{seccion.titulo}</h2>
          {seccion.parrafos.map((parrafo, i) => <p key={i}>{parrafo}</p>)}
          {seccion.lista && <ul>{seccion.lista.map((item) => <li key={item}>{item}</li>)}</ul>}
          {doc === "privacidad" && seccion.id === "tecnologias" && <div className="legal-tabla-scroll" tabIndex={0} role="region" aria-label="Tecnologías del navegador">
            <table>
              <caption>Almacenamiento de Dream House en tu navegador</caption>
              <thead><tr><th scope="col">Tecnología</th><th scope="col">Datos y finalidad</th><th scope="col">Duración</th></tr></thead>
              <tbody>{TECNOLOGIAS_PRIVACIDAD.map((t) => <tr key={t.clave}>
                <th scope="row">{t.nombre}<code>{t.clave}</code></th>
                <td>{t.datos}. {t.finalidad}.</td>
                <td>{t.duracion}.</td>
              </tr>)}</tbody>
            </table>
          </div>}
          {doc === "privacidad" && seccion.id === "proveedores" && <ul>
            <li><a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">Privacidad de GitHub</a></li>
            <li><a href="https://policies.google.com/privacy?hl=es" target="_blank" rel="noopener noreferrer">Privacidad de Google y Gmail</a></li>
            <li><a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Privacidad de WhatsApp</a></li>
            <li><a href="https://stripe.com/mx/privacy" target="_blank" rel="noopener noreferrer">Privacidad de Stripe</a></li>
          </ul>}
        </section>)}
      </article>
      <aside className="panel p-6 mt-10">
        <h2 className="font-display text-2xl">Contacto de Dream House</h2>
        <p className="mt-3">Para consultas sobre estos documentos o para ejercer tus derechos, escribe a <a className="enlace break-all" href={`mailto:${CONTACTO.email}`}>{CONTACTO.email}</a>.</p>
        <p className="mt-2">WhatsApp: {CONTACTO.whatsappVisible}.</p>
      </aside>
    </Contenedor>
  );
}
