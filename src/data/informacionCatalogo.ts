import { COMPRA_REAL_HABILITADA } from "@/config/compra";

export const ATENCION_CATALOGO = COMPRA_REAL_HABILITADA
  ? ["Entrega digital", "Pago seguro", "Soporte de compra"]
  : ["Compra de demostración", "Sin cobros reales", "Ayuda y contacto"];

export const ADAPTACION_CATALOGO = {
  titulo: "Tu proyecto, adaptado a tu terreno.",
  texto:
    "Antes de construir, un profesional local debe revisar el terreno, la normativa, la estructura y las instalaciones.",
  enlace: "Consultar adaptación",
  mensaje:
    "Hola, quiero consultar la adaptación de un proyecto de Dream House a mi terreno y recibir una cotización por separado.",
};

export const PREGUNTAS_CATALOGO = [
  {
    pregunta: "¿Puedo construir directamente con estos planos?",
    respuesta:
      "Antes de construir, un profesional local debe revisar y adaptar el proyecto a tu terreno y a la normativa aplicable. Consulta en cada casa qué documentos incluye el paquete.",
  },
  {
    pregunta: "¿Y si mi terreno tiene otras medidas?",
    respuesta:
      "Podría requerir ajustes. Contáctanos con las medidas de tu terreno y el nombre de la casa para revisar una posible adaptación y cotizarla por separado.",
  },
  {
    pregunta: "¿Cómo recibo los archivos?",
    respuesta: COMPRA_REAL_HABILITADA
      ? "Cuando se confirme tu pago, podrás descargar el paquete y recibirás un enlace en el correo de compra."
      : "Esta versión permite probar el proceso. No realiza cobros ni entrega proyectos reales.",
  },
  {
    pregunta: "¿Necesito crear una cuenta?",
    respuesta:
      "No. La compra se realiza con tu correo, sin registro obligatorio.",
  },
];
