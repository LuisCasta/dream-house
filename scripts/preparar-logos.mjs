import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

// Procesamiento determinista de originales raster; no vectoriza ni redibuja.
const carpeta = path.resolve("public/brand");
const margen = 12;
await mkdir(carpeta, { recursive: true });

async function recortarAlfa(data, width, height, archivo) {
  let minX = width,
    minY = height,
    maxX = -1,
    maxY = -1;
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > 0) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  if (maxX < 0) throw new Error(`Sin contenido: ${archivo}`);
  await sharp(data, { raw: { width, height, channels: 4 } })
    .extract({
      left: minX,
      top: minY,
      width: maxX - minX + 1,
      height: maxY - minY + 1,
    })
    .extend({
      top: margen,
      bottom: margen,
      left: margen,
      right: margen,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toFile(path.join(carpeta, archivo));
  return {
    x: minX,
    y: minY,
    width: maxX - minX + 1 + margen * 2,
    height: maxY - minY + 1 + margen * 2,
    margen,
  };
}

const { data: rgb, info } = await sharp(
  path.join(carpeta, "dream-house-original.jpg"),
)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
if (info.width !== 1438 || info.height !== 1438)
  throw new Error("Revisar coordenadas: original Dream House distinto.");
const w = info.width,
  h = info.height,
  n = w * h;
const rgba = Buffer.alloc(n * 4);
const tinta = new Uint8Array(n);
const origen = new Int32Array(n).fill(-1);
const distancia = new Uint8Array(n);
const cola = new Int32Array(n);
let inicio = 0,
  fin = 0;
// Semillas opacas: tinta saturada rodeada por tinta, sin blanco de fondo.
for (let i = 0; i < n; i++) {
  const r = rgb[i * 3],
    g = rgb[i * 3 + 1],
    b = rgb[i * 3 + 2];
  tinta[i] =
    Math.max(r, g, b) - Math.min(r, g, b) > 60 && Math.min(r, g, b) < 190
      ? 1
      : 0;
}
for (let y = 297; y < 1096; y++)
  for (let x = 148; x < 1304; x++) {
    const i = y * w + x;
    if (
      tinta[i] &&
      tinta[i - 1] &&
      tinta[i + 1] &&
      tinta[i - w] &&
      tinta[i + w] &&
      tinta[i - w - 1] &&
      tinta[i - w + 1] &&
      tinta[i + w - 1] &&
      tinta[i + w + 1]
    ) {
      origen[i] = i;
      cola[fin++] = i;
    }
  }
// Referencia de color local para descomponer los bordes mezclados con blanco.
while (inicio < fin) {
  const i = cola[inicio++];
  if (distancia[i] >= 8) continue;
  for (const j of [i - 1, i + 1, i - w, i + w])
    if (j >= 0 && j < n && origen[j] < 0) {
      origen[j] = origen[i];
      distancia[j] = distancia[i] + 1;
      cola[fin++] = j;
    }
}
for (let y = 296; y < 1096; y++)
  for (let x = 148; x < 1304; x++) {
    const i = y * w + x,
      out = i * 4;
    // Esta región está dentro de la barra sólida: preservar IA y sus antialias.
    const protegerIA = x >= 660 && x <= 765 && y >= 760 && y <= 836;
    if (protegerIA || origen[i] === i) {
      rgba[out] = rgb[i * 3];
      rgba[out + 1] = rgb[i * 3 + 1];
      rgba[out + 2] = rgb[i * 3 + 2];
      rgba[out + 3] = 255;
      continue;
    }
    if (origen[i] < 0) continue;
    const canales = [rgb[i * 3], rgb[i * 3 + 1], rgb[i * 3 + 2]];
    if (Math.max(...canales) - Math.min(...canales) < 5) continue;
    const ref = origen[i] * 3;
    let canal = 0;
    if (rgb[ref + 1] < rgb[ref + canal]) canal = 1;
    if (rgb[ref + 2] < rgb[ref + canal]) canal = 2;
    const alfa = Math.min(
      1,
      (255 - rgb[i * 3 + canal]) / (255 - rgb[ref + canal]),
    );
    if (alfa < 0.045) continue; // Ruido JPEG cercano a blanco, sin tinta real.
    // En el antialias usar la tinta local evita amplificar ruido cromático JPEG.
    for (let c = 0; c < 3; c++)
      rgba[out + c] = alfa < 0.98 ? rgb[ref + c] : rgb[i * 3 + c];
    rgba[out + 3] = Math.round(alfa * 255);
  }
// Eliminar motas desconectadas del JPEG, conservando ventanas y trazos reales.
const visitado = new Uint8Array(n);
for (let i = 0; i < n; i++) {
  if (visitado[i] || !rgba[i * 4 + 3]) continue;
  inicio = 0;
  fin = 1;
  cola[0] = i;
  visitado[i] = 1;
  while (inicio < fin) {
    const k = cola[inicio++];
    for (const j of [
      k - 1,
      k + 1,
      k - w,
      k + w,
      k - w - 1,
      k - w + 1,
      k + w - 1,
      k + w + 1,
    ]) {
      if (j >= 0 && j < n && !visitado[j] && rgba[j * 4 + 3]) {
        visitado[j] = 1;
        cola[fin++] = j;
      }
    }
  }
  if (fin < 32) for (let k = 0; k < fin; k++) rgba[cola[k] * 4 + 3] = 0;
}
const dream = await recortarAlfa(rgba, w, h, "dream-house.png");
const klaro = await sharp(path.join(carpeta, "klaro-original.png"))
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const klaroRecorte = await recortarAlfa(
  klaro.data,
  klaro.info.width,
  klaro.info.height,
  "klaro.png",
);
console.log(JSON.stringify({ dream, klaro: klaroRecorte }, null, 2));

// Composición de revisión; los PNG finales conservan su transparencia.
const dreamPreview = await sharp(path.join(carpeta, "dream-house.png"))
  .resize({ width: 420 })
  .toBuffer();
const klaroPreview = await sharp(path.join(carpeta, "klaro.png"))
  .resize({ width: 540 })
  .toBuffer();
const crema = await sharp({
  create: { width: 700, height: 650, channels: 4, background: "#FAF7F0" },
})
  .png()
  .toBuffer();
const oscuro = await sharp({
  create: { width: 700, height: 650, channels: 4, background: "#15223B" },
})
  .png()
  .toBuffer();
await sharp({
  create: { width: 1400, height: 650, channels: 4, background: "#FAF7F0" },
})
  .composite([
    { input: crema, left: 0, top: 0 },
    { input: oscuro, left: 700, top: 0 },
    { input: dreamPreview, left: 140, top: 30 },
    { input: dreamPreview, left: 840, top: 30 },
    { input: klaroPreview, left: 80, top: 400 },
    { input: klaroPreview, left: 780, top: 400 },
  ])
  .png()
  .toFile(
    path.resolve(process.env.TEMP || ".", "dreamhouse-logos-revision.png"),
  );
