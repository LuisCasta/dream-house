import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DATOS_DE_EJEMPLO } from "@/data/proyectos";

export default function TiendaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {DATOS_DE_EJEMPLO && (
        <div className="bg-amber-100 px-5 py-1.5 text-center text-[11px] text-amber-900">
          Versión de diseño · proyectos, precios e imágenes son de ejemplo
        </div>
      )}
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
