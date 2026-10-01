import type { MetadataRoute } from "next";
import { SITIO } from "@/config/sitio";
import { PROYECTOS } from "@/data/proyectos";
import { MEDIDAS } from "@/data/terrenos";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutas = ["", "/planos", "/como-funciona", "/que-incluye", "/ayuda", "/adaptar", "/contacto"];
  return [
    ...rutas.map((r) => ({ url: `${SITIO.url}${r}` })),
    ...MEDIDAS.map((m) => ({ url: `${SITIO.url}/planos/${m.slug}` })),
    ...PROYECTOS.map((p) => ({ url: `${SITIO.url}/${p.slug}`, priority: 0.9 })),
  ];
}
