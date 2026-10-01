// Entrega digital de los archivos del proyecto.
//
// CONECTAR PROVEEDOR:
// - Almacenamiento privado de archivos: S3, Cloudflare R2, Supabase Storage o Vercel Blob.
//   Los archivos NUNCA deben estar en /public.
// - Enlaces firmados con caducidad, generados en el servidor solo para órdenes pagadas.
// - Email transaccional (Resend, Postmark, SendGrid) con los enlaces de descarga.
//
// Mientras no exista, `enlacesDeDescarga` devuelve `null` y la interfaz muestra
// los botones desactivados con la nota "Disponible al conectar la entrega".

export type EnlaceDescarga = { entregable: string; url: string; expira: string };

export interface ProveedorEntrega {
  enlacesDeDescarga(ordenId: string): Promise<EnlaceDescarga[] | null>;
}

export const entrega: ProveedorEntrega = {
  async enlacesDeDescarga() {
    return null;
  },
};
