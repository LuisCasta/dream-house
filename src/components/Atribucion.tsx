"use client";

import { useEffect } from "react";
import { capturarAtribucion } from "@/lib/analytics";

// Guarda los parámetros UTM de la visita para atribuir la compra al video de origen.
export default function Atribucion() {
  useEffect(() => {
    capturarAtribucion();
  }, []);
  return null;
}
