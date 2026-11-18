// Completar exclusivamente con datos confirmados por el titular del negocio.
// Mientras falten identidad, domicilio o condiciones de entrega, los documentos
// se muestran como borradores y no se indexan.
export const LEGAL = {
  actualizado: "2026-11-17",
  fechaVisible: "17 de noviembre de 2026",
  responsable: "KLARO SERVICIOS DE MANTENIMIENTO Y CONSTRUCCIÓN",
  domicilio: null as string | null,
  canalEntrega: null as string | null,
  plazoEntrega: "de inmediato, una vez que Stripe haya confirmado la acreditación del pago",
};

export const DOCUMENTOS_LEGALES_COMPLETOS = Boolean(
  LEGAL.responsable && LEGAL.domicilio && LEGAL.canalEntrega && LEGAL.plazoEntrega,
);
