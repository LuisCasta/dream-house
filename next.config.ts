import type { NextConfig } from "next";

// Exportación estática para GitHub Pages.
// El workflow pasa NEXT_PUBLIC_BASE_PATH="/dream-house" (vacío si se usa dominio propio).
// BACKLOG: al conectar pagos/descargas reales (necesitan servidor), quitar `output: "export"`
// y desplegar en una plataforma con Node (ej. Vercel).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
