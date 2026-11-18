// Pagos y entrega activos, confirmados por el negocio.
// Esta configuración describe capacidades; no implementa pasarelas ni entrega.
export const COMPRA = {
  modo: "produccion" as "demostracion" | "produccion",
  pagoIntegrado: true,
  entregaIntegrada: true,
  soporteConfirmado: true,
};

export const COMPRA_REAL_HABILITADA =
  COMPRA.modo === "produccion" &&
  COMPRA.pagoIntegrado &&
  COMPRA.entregaIntegrada &&
  COMPRA.soporteConfirmado;
