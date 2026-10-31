// Cambiar a producción solo después de conectar y verificar los servicios reales.
// Esta configuración describe capacidades; no implementa pasarelas ni entrega.
export const COMPRA = {
  modo: "demostracion" as "demostracion" | "produccion",
  pagoIntegrado: false,
  entregaIntegrada: false,
  soporteConfirmado: false,
};

export const COMPRA_REAL_HABILITADA =
  COMPRA.modo === "produccion" &&
  COMPRA.pagoIntegrado &&
  COMPRA.entregaIntegrada &&
  COMPRA.soporteConfirmado;
