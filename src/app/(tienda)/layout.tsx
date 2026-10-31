import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function TiendaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="contenido" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
