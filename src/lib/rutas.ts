// Las rutas de <Link> reciben basePath de Next. Los recursos públicos lo necesitan explícito.
export function recurso(ruta: string) {
  if (!ruta.startsWith("/")) return ruta;
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${ruta}`;
}

export function checkoutUrl(slug: string) {
  return `/checkout/?proyecto=${encodeURIComponent(slug)}`;
}
