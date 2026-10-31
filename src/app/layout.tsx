import type { Metadata, Viewport } from "next";
import { Cinzel, Geist, Playfair_Display } from "next/font/google";
import Atribucion from "@/components/Atribucion";
import { SITIO } from "@/config/sitio";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
// Playfair: los títulos tipo "70 m² INFONAVIT" de las portadas.
// Cinzel: las mayúsculas romanas tipo "CASA CON ESTILO" / "TERRENO 7 × 15".
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITIO.url),
  title: {
    default: "Dream House · Los planos de la casa que viste",
    template: "%s · Dream House",
  },
  description:
    "Explora casas y proyectos arquitectónicos de Dream House. Versión de demostración con imágenes, paquetes y precios de ejemplo.",
  openGraph: {
    siteName: SITIO.nombreCompleto,
    locale: "es_MX",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#15223B",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-MX"
      className={`${geist.variable} ${playfair.variable} ${cinzel.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col font-sans">
        <Atribucion />
        {children}
      </body>
    </html>
  );
}
