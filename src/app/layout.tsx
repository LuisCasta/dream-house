import type { Metadata, Viewport } from "next";
import { Cinzel, Geist, Playfair_Display } from "next/font/google";
import Atribucion from "@/components/Atribucion";
import { SITIO } from "@/config/sitio";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
// Playfair: los títulos tipo "70 m² INFONAVIT" de las portadas.
// Cinzel: las mayúsculas romanas tipo "CASA CON ESTILO" / "TERRENO 7 × 15".
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], style: ["normal", "italic"] });
const cinzel = Cinzel({ variable: "--font-cinzel", subsets: ["latin"], weight: ["500", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITIO.url),
  title: {
    default: "Dream House · Encuentra la casa que cabe en tu terreno",
    template: "%s · Dream House",
  },
  description:
    "Proyectos arquitectónicos para terrenos reales de 7×15, 8×15, 10×10, 10×15 y 10×20. Planos, fachadas y renders listos para descargar.",
  openGraph: { siteName: SITIO.nombreCompleto, locale: "es_MX", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#15213b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-MX" className={`${geist.variable} ${playfair.variable} ${cinzel.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <Atribucion />
        {children}
      </body>
    </html>
  );
}
