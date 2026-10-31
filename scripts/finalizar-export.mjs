import { readdir, copyFile, writeFile } from "node:fs/promises";
import path from "node:path";

// Next 16.3 en Windows conserva separadores del SO al exportar segmentos RSC.
// El navegador solicita nombres planos __next.segmento.__PAGE__.txt.
// En Linux ya son planos: este paso solo añade .nojekyll.
const raiz = path.resolve("out");
let normalizados = 0;
async function aplanar(directorio, destino) {
  for (const entrada of await readdir(directorio, { withFileTypes: true })) {
    const origen = path.join(directorio, entrada.name);
    if (entrada.isDirectory()) await aplanar(origen, destino);
    else if (entrada.name.endsWith(".txt")) {
      const nombre = path.relative(destino, origen).split(path.sep).join(".");
      await copyFile(origen, path.join(destino, nombre));
      normalizados++;
    }
  }
}
async function recorrer(directorio) {
  for (const entrada of await readdir(directorio, { withFileTypes: true })) {
    if (!entrada.isDirectory() || entrada.name === "_next") continue;
    const ruta = path.join(directorio, entrada.name);
    if (entrada.name.startsWith("__next.")) await aplanar(ruta, directorio);
    else await recorrer(ruta);
  }
}
await recorrer(raiz);
await writeFile(path.join(raiz, ".nojekyll"), "");
console.log(`Export estático listo. Segmentos normalizados: ${normalizados}.`);
