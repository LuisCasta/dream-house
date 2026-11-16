import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Pruebas de privacidad y envío con navegador simulado, sin contactar a Microsoft.
function navegador(modo = "production") {
  const datos = new Map();
  const llamadas = [];
  const cookies = [];
  let recargas = 0;
  const storage = {
    getItem: (clave) => datos.get(clave) ?? null,
    setItem: (clave, valor) => datos.set(clave, valor),
    removeItem: (clave) => datos.delete(clave),
  };
  const location = {
    pathname: "/brisa/",
    origin: "https://dreamhouse.test",
    hostname: "dreamhouse.test",
    search: "?utm_source=tiktok&utm_medium=social&utm_campaign=lanzamiento&utm_content=video_01",
    reload: () => { recargas++; },
  };
  const window = Object.assign(new EventTarget(), { location });
  const document = { referrer: "https://www.youtube.com/watch?v=123&email=privado%40example.com" };
  Object.defineProperty(document, "cookie", { set: (valor) => cookies.push(valor) });
  const contexto = vm.createContext({
    window, location, document, localStorage: storage,
    Event, URL, URLSearchParams, Date,
    process: { env: { NODE_ENV: modo } },
    console: { info() {} },
  });
  const modulos = new Map();
  function cargar(nombre, desde = raiz) {
    const base = nombre.startsWith("@/") ? path.join(raiz, "src", nombre.slice(2)) : path.resolve(desde, nombre);
    const archivo = base.endsWith(".ts") ? base : `${base}.ts`;
    if (modulos.has(archivo)) return modulos.get(archivo).exports;
    const modulo = { exports: {} };
    modulos.set(archivo, modulo);
    const { outputText } = ts.transpileModule(fs.readFileSync(archivo, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    });
    const ejecutar = new vm.Script(`(function(require, module, exports) { ${outputText}\n})`, { filename: archivo }).runInContext(contexto);
    ejecutar((ref) => cargar(ref, path.dirname(archivo)), modulo, modulo.exports);
    return modulo.exports;
  }
  const consentimiento = cargar("@/lib/consentimiento");
  const analytics = cargar("@/lib/analytics");
  const clarity = cargar("@/lib/clarity");
  return {
    datos, llamadas, cookies, window, location, consentimiento, analytics, clarity,
    activarEspia: () => { window.clarity = (...args) => llamadas.push(args); },
    recargas: () => recargas,
  };
}

test("sin permiso o tras rechazar no se capturan UTM ni se generan eventos", () => {
  const n = navegador();
  n.activarEspia();
  n.analytics.capturarAtribucion();
  n.analytics.track("begin_checkout", { proyecto: "brisa" });
  assert.equal(n.datos.size, 0);
  assert.equal(n.window.dataLayer, undefined);
  assert.equal(n.llamadas.length, 0);
  n.consentimiento.guardarConsentimiento("rechazado");
  n.analytics.capturarAtribucion();
  n.analytics.track("view_project", { proyecto: "brisa" });
  assert.equal(n.window.dataLayer, undefined);
  assert.equal(n.llamadas.length, 0);
});

test("con permiso registra el evento y solo parámetros permitidos", () => {
  const n = navegador();
  n.consentimiento.guardarConsentimiento("aceptado");
  n.activarEspia();
  n.analytics.capturarAtribucion();
  n.analytics.track("begin_checkout", { proyecto: "brisa", proveedor: "stripe", email: "privado@example.com", mensaje: "Mi teléfono es privado", canal: "privado@example.com" });
  assert.equal(n.window.dataLayer.length, 1);
  assert.deepEqual(n.llamadas.at(-1), ["event", "begin_checkout"]);
  const registro = JSON.stringify(n.window.dataLayer);
  assert.ok(registro.includes('"utm_source":"tiktok"'));
  assert.ok(registro.includes('"referrer":"https://www.youtube.com"'));
  assert.ok(!registro.includes("privado"));
  assert.ok(!JSON.stringify(n.llamadas).includes("privado"));
});

test("los eventos se encolan hasta que carga el script, sin enviar simulaciones", () => {
  const n = navegador();
  n.consentimiento.guardarConsentimiento("aceptado");
  n.analytics.track("view_project", { proyecto: "brisa" });
  assert.ok(n.window.clarity.q.some((args) => args[0] === "event" && args[1] === "view_project"));
  const antes = n.window.clarity.q.length;
  n.analytics.track("demo_payment_result", { proyecto: "brisa", escenario: "aprobado" });
  assert.equal(n.window.clarity.q.length, antes);
});

test("revocar elimina atribución, deniega cookies y recarga para detener Clarity", () => {
  const n = navegador();
  n.consentimiento.guardarConsentimiento("aceptado");
  n.analytics.capturarAtribucion();
  n.activarEspia();
  n.consentimiento.guardarConsentimiento("rechazado");
  n.clarity.retirarClarity();
  assert.equal(n.datos.has("dh_atribucion_primer_toque"), false);
  assert.equal(n.datos.has("dh_atribucion_ultimo_toque"), false);
  assert.equal(n.llamadas[0][0], "consentv2");
  assert.equal(n.llamadas[0][1].analytics_Storage, "denied");
  assert.equal(n.llamadas[0][1].ad_Storage, "denied");
  assert.ok(n.cookies.some((c) => c.startsWith("_clck=")));
  assert.ok(n.cookies.some((c) => c.startsWith("_clsk=")));
  assert.equal(n.recargas(), 1);
  const antes = n.llamadas.length;
  n.analytics.track("begin_checkout", { proyecto: "brisa" });
  assert.equal(n.llamadas.length, antes);
});

test("una preferencia corrupta o caducada no autoriza analítica", () => {
  const n = navegador();
  const clave = n.consentimiento.CLAVE_CONSENTIMIENTO;
  n.datos.set(clave, "no es JSON");
  assert.equal(n.consentimiento.leerConsentimiento(), null);
  n.datos.set(clave, JSON.stringify({ version: 1, eleccion: "aceptado", fecha: Date.now() - 181 * 86400000 }));
  assert.equal(n.consentimiento.leerConsentimiento(), null);
});

test("el desarrollo no envía eventos a Clarity aunque se acepte", () => {
  const n = navegador("development");
  n.consentimiento.guardarConsentimiento("aceptado");
  n.activarEspia();
  n.analytics.track("view_project", { proyecto: "brisa" });
  assert.equal(n.llamadas.length, 0);
});

test("se rechazan UTM con correos y se descartan parámetros de la referencia", () => {
  const n = navegador();
  n.location.search = "?utm_source=youtube&utm_campaign=privado%40example.com";
  n.consentimiento.guardarConsentimiento("aceptado");
  n.analytics.capturarAtribucion();
  const dato = JSON.parse(n.datos.get("dh_atribucion_ultimo_toque"));
  assert.equal(dato.utm_source, "youtube");
  assert.equal(dato.utm_campaign, undefined);
  assert.equal(dato.referrer, "https://www.youtube.com");
});
