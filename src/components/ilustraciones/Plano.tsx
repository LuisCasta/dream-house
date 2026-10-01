import type { Proyecto } from "@/data/proyectos";
import { useId } from "react";
import { aleatorio } from "@/lib/formato";

// Vista previa de la planta, dibujada dentro del terreno con sus medidas.
// Es deliberadamente simplificada y lleva marca de agua: los planos
// completos y acotados solo se entregan con la compra.

type Rect = { x: number; y: number; w: number; h: number };

function ambientes(p: Proyecto, planta: number): string[] {
  const rec = Array.from({ length: p.recamaras }, (_, i) => (i === 0 ? "Recámara principal" : `Recámara ${i + 1}`));
  const completos = Math.floor(p.banos);
  const medio = p.banos % 1 !== 0;
  const banos = (n: number) => Array.from({ length: n }, () => "Baño");

  if (p.plantas === 1) {
    return ["Sala", "Cocina-comedor", ...rec, ...banos(completos), ...(medio ? ["½ baño"] : []), ...(p.m2 > 90 ? ["Lavado"] : [])];
  }
  if (planta === 1) {
    const recAbajo = p.recamaras >= 4 ? ["Recámara 4"] : [];
    return ["Sala", "Cocina-comedor", "Escalera", ...recAbajo, ...(medio ? ["½ baño"] : ["Baño"]), "Lavado"];
  }
  const recArriba = p.recamaras >= 4 ? rec.slice(0, 3) : rec;
  return [...recArriba, "Escalera", ...banos(medio ? completos : Math.max(1, completos - 1))];
}

function dividir(W: number, H: number, n: number, r: () => number): Rect[] {
  const cuartos: Rect[] = [{ x: 0, y: 0, w: W, h: H }];
  while (cuartos.length < n) {
    let i = 0;
    cuartos.forEach((c, j) => {
      if (c.w * c.h > cuartos[i].w * cuartos[i].h) i = j;
    });
    const c = cuartos[i];
    const t = 0.4 + r() * 0.2;
    if (c.w >= c.h) {
      const a = c.w * t;
      cuartos.splice(i, 1, { ...c, w: a }, { ...c, x: c.x + a, w: c.w - a });
    } else {
      const a = c.h * t;
      cuartos.splice(i, 1, { ...c, h: a }, { ...c, y: c.y + a, h: c.h - a });
    }
  }
  return cuartos.sort((a, b) => b.w * b.h - a.w * a.h);
}

export default function Plano({ p, planta = 1, className }: { p: Proyecto; planta?: number; className?: string }) {
  const r = aleatorio(`${p.slug}-planta-${planta}`);
  const marca = `marca-${useId().replace(/:/g, "")}`;
  const { frente, fondo } = p.terreno;
  const W = frente;
  const H = +(p.m2 / p.plantas / W).toFixed(2);
  const libre = Math.max(0, fondo - H);
  const frontal = p.cochera ? Math.min(5, Math.max(0, libre - 1)) : Math.min(2, libre / 2);
  const y0 = frontal; // la calle está abajo: dibujamos el frente abajo
  const etiquetas = ambientes(p, planta);
  // Orden de tamaños: las áreas grandes reciben los nombres principales
  const orden = [...etiquetas].sort((a, b) => peso(b) - peso(a));
  const cuartos = dividir(W, H, etiquetas.length, r);

  const margen = 1.6;
  const vbW = W + margen * 2;
  const vbH = fondo + margen * 2;
  // Coordenadas: y crece hacia abajo; el fondo del terreno arriba y la calle abajo.
  const casaY = fondo - y0 - H;

  return (
    <svg viewBox={`${-margen} ${-margen} ${vbW} ${vbH}`} className={className} role="img" aria-label={`Vista previa de la planta ${planta} de ${p.nombre}`}>
      <defs>
        <pattern id={marca} width="6" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
          <text x="0" y="2" fontSize="0.42" fill="#211e1b" opacity="0.07" fontFamily="sans-serif" fontWeight="700" letterSpacing="0.05">
            VISTA PREVIA · DREAM HOUSE
          </text>
        </pattern>
      </defs>
      <rect x={-margen} y={-margen} width={vbW} height={vbH} fill="#fbf9f5" />

      {/* Terreno */}
      <rect x={0} y={0} width={W} height={fondo} fill="#f1ece2" stroke="#b9ad9b" strokeWidth={0.06} strokeDasharray="0.3 0.2" />
      {casaY > 0.8 && (
        <text x={W / 2} y={casaY / 2 + 0.15} fontSize={0.5} textAnchor="middle" fill="#7f8f69" fontFamily="var(--font-sans), sans-serif">
          Patio
        </text>
      )}
      {frontal >= 3 && (
        <g>
          <rect x={0.4} y={fondo - frontal + 0.3} width={W - 0.8} height={frontal - 0.6} fill="none" stroke="#c9bfae" strokeWidth={0.05} strokeDasharray="0.2 0.15" />
          <text x={W / 2} y={fondo - frontal / 2 + 0.15} fontSize={0.5} textAnchor="middle" fill="#8b8173" fontFamily="var(--font-sans), sans-serif">
            {p.cochera > 1 ? "Cochera (2 autos)" : "Cochera"}
          </text>
        </g>
      )}

      {/* Casa */}
      <g transform={`translate(0 ${casaY})`}>
        <rect x={0} y={0} width={W} height={H} fill="#fff" />
        {cuartos.map((c, i) => {
          const txt = orden[i];
          const humedo = txt.includes("año") || txt === "Lavado" || txt === "Escalera";
          return (
            <rect key={i} x={c.x} y={c.y} width={c.w} height={c.h} fill={humedo ? "#f3eee5" : "#fff"} stroke="#2b2724" strokeWidth={0.1} />
          );
        })}
        {cuartos.map((c, i) =>
          orden[i] === "Escalera" ? (
            <g key={`e${i}`} stroke="#9b9184" strokeWidth={0.035}>
              {Array.from({ length: Math.floor(c.h / 0.28) }, (_, k) => (
                <line key={k} x1={c.x + 0.1} y1={c.y + k * 0.28} x2={c.x + c.w - 0.1} y2={c.y + k * 0.28} />
              ))}
            </g>
          ) : null,
        )}
        <rect x={0} y={0} width={W} height={H} fill="none" stroke="#211e1b" strokeWidth={0.24} />
        {/* Acceso */}
        <rect x={W * 0.18} y={H - 0.14} width={0.9} height={0.28} fill="#fff" />
        <path d={`M${W * 0.18} ${H} L${W * 0.18} ${H - 0.9} A0.9 0.9 0 0 1 ${W * 0.18 + 0.9} ${H}`} fill="none" stroke="#9b9184" strokeWidth={0.04} />
        {cuartos.map((c, i) => {
          const txt = orden[i];
          const fs = Math.min(0.42, (c.w - 0.3) / (txt.length * 0.55));
          if (fs < 0.2) return null;
          return (
            <text key={`t${i}`} x={c.x + c.w / 2} y={c.y + c.h / 2 + fs * 0.35} fontSize={fs} textAnchor="middle" fill="#2b2724" fontFamily="var(--font-sans), sans-serif">
              {txt}
            </text>
          );
        })}
        <rect x={0} y={0} width={W} height={H} fill={`url(#${marca})`} />
      </g>

      {/* Cotas del terreno */}
      <g stroke="#8b8173" strokeWidth={0.04} fill="#6f685e" fontFamily="var(--font-sans), sans-serif">
        <line x1={0} y1={fondo + 0.8} x2={W} y2={fondo + 0.8} />
        <line x1={0} y1={fondo + 0.6} x2={0} y2={fondo + 1} />
        <line x1={W} y1={fondo + 0.6} x2={W} y2={fondo + 1} />
        <text x={W / 2} y={fondo + 1.35} fontSize={0.42} textAnchor="middle" stroke="none">
          Frente {frente} m · calle
        </text>
        <line x1={W + 0.8} y1={0} x2={W + 0.8} y2={fondo} />
        <line x1={W + 0.6} y1={0} x2={W + 1} y2={0} />
        <line x1={W + 0.6} y1={fondo} x2={W + 1} y2={fondo} />
        <text x={W + 1.3} y={fondo / 2} fontSize={0.42} textAnchor="middle" stroke="none" transform={`rotate(90 ${W + 1.3} ${fondo / 2})`}>
          Fondo {fondo} m
        </text>
      </g>
    </svg>
  );
}

function peso(nombre: string) {
  if (nombre === "Sala") return 10;
  if (nombre === "Cocina-comedor") return 9;
  if (nombre === "Recámara principal") return 8;
  if (nombre.startsWith("Recámara")) return 7;
  if (nombre === "Escalera") return 4;
  if (nombre === "Baño") return 3;
  if (nombre === "Lavado") return 2;
  return 1;
}
