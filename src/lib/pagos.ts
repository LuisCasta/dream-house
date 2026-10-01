// Interfaz de la pasarela de pago.
//
// CONECTAR PROVEEDOR: implementar `ProveedorPago` con Stripe Checkout,
// Mercado Pago Checkout Pro o Conekta. El flujo esperado es:
//   1. El navegador llama a una ruta del servidor (ej. POST /api/checkout) con la orden.
//   2. El servidor crea la sesión de pago con la clave secreta del proveedor.
//   3. Se redirige al cliente a la página de pago del proveedor.
//   4. Un webhook del proveedor confirma el pago y dispara la entrega (ver lib/entrega.ts).
//
// Mientras no haya proveedor, se usa `proveedorDemo`, que NO cobra y lo indica en pantalla.

import type { ItemCarrito } from "./carrito";

export type MetodoPago = "tarjeta" | "oxxo" | "spei";

export const METODOS_PAGO: { id: MetodoPago; nombre: string; detalle: string }[] = [
  { id: "tarjeta", nombre: "Tarjeta de crédito o débito", detalle: "Visa, Mastercard, American Express" },
  { id: "oxxo", nombre: "Efectivo en OXXO", detalle: "Recibes una referencia para pagar en tienda" },
  { id: "spei", nombre: "Transferencia SPEI", detalle: "Desde la app de tu banco" },
];

export type Comprador = { nombre: string; email: string; whatsapp?: string };

export type Orden = {
  id: string;
  items: ItemCarrito[];
  total: number;
  comprador: Comprador;
  metodo: MetodoPago;
  atribucion: unknown; // UTM del primer y último toque, para saber qué video generó la venta
};

export interface ProveedorPago {
  nombre: string;
  esDemo: boolean;
  iniciarPago(orden: Orden): Promise<{ redirigirA: string }>;
}

const proveedorDemo: ProveedorPago = {
  nombre: "Demostración",
  esDemo: true,
  async iniciarPago(orden) {
    try {
      sessionStorage.setItem(`dh_orden_${orden.id}`, JSON.stringify(orden));
    } catch {}
    return { redirigirA: `/checkout/confirmacion?orden=${orden.id}&demo=1` };
  },
};

export const pagos: ProveedorPago = proveedorDemo;

export function nuevoIdOrden() {
  return `DH-${Date.now().toString(36).toUpperCase()}`;
}
