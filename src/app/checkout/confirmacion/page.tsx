import { Suspense } from "react";
import Confirmacion from "@/components/checkout/Confirmacion";

export default function PaginaConfirmacion() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <Confirmacion />
    </Suspense>
  );
}
