import { Suspense } from "react";
import FormularioCheckout from "@/components/checkout/FormularioCheckout";
export default function Checkout() {
  return (
    <Suspense fallback={<p className="ancho py-12">Cargando compra…</p>}>
      <FormularioCheckout />
    </Suspense>
  );
}
