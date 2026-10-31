import type { Proyecto } from "@/data/proyectos";
import { useId } from "react";
import { aleatorio } from "@/lib/formato";

// Ilustración provisional de fachada, dibujada a escala del frente del terreno.
// Se reemplaza automáticamente cuando el proyecto tiene un render real.

const E = 24; // px por metro
const SUELO = 250;
const PISO = 3 * E;

function Ventana({
  x,
  y,
  w,
  h,
  arco,
  id,
  marco = "#2b2724",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  arco?: boolean;
  id: string;
  marco?: string;
}) {
  const forma = arco
    ? `M${x} ${y + h} V${y + w / 2} A${w / 2} ${w / 2} 0 0 1 ${x + w} ${y + w / 2} V${y + h} Z`
    : `M${x} ${y} H${x + w} V${y + h} H${x} Z`;
  return (
    <g>
      <path d={forma} fill={`url(#${id})`} stroke={marco} strokeWidth={2.5} />
      <line x1={x + w / 2} y1={y + (arco ? w / 2 : 0)} x2={x + w / 2} y2={y + h} stroke={marco} strokeWidth={1.5} />
      <path d={`M${x + 4} ${y + h - 6} L${x + w * 0.38} ${y + (arco ? w / 2 : 6)}`} stroke="#fff" strokeOpacity={0.28} strokeWidth={3} />
    </g>
  );
}

function Plantas({ x, w, y }: { x: number; w: number; y: number }) {
  const n = Math.max(2, Math.floor(w / 16));
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <ellipse cx={x + 8 + i * ((w - 16) / (n - 1))} cy={y - 6} rx={9} ry={11} fill={i % 2 ? "#6d7d5c" : "#7f8f69"} />
        </g>
      ))}
      <rect x={x} y={y - 2} width={w} height={14} fill="#cfc4b3" />
    </g>
  );
}

export default function Fachada({ p, className, encajar = false }: { p: Proyecto; className?: string; encajar?: boolean }) {
  const r = aleatorio(p.slug);
  const { muro, acento, madera } = p.paleta;
  const uid = useId().replace(/:/g, "");
  const id = `vidrio-${uid}`;
  const W = p.terreno.frente * E;
  const x0 = 200 - W / 2;
  const izq = r() > 0.5;
  const anchoCochera = p.cochera ? Math.min(W * 0.48, (p.cochera > 1 ? 5.2 : 3.1) * E) : 0;
  const xc = izq ? x0 : x0 + W - anchoCochera;
  const xr = izq ? x0 + anchoCochera : x0;
  const wr = W - anchoCochera;
  const alto = p.plantas * PISO;
  const techo = SUELO - alto;
  const vecinoIzq = 90 + r() * 70;
  const vecinoDer = 80 + r() * 80;
  const volado = p.plantas === 2 && !p.arcos;
  const xv = izq ? x0 + W * 0.3 : x0 - 8;
  const wv = W * 0.7 + 8;
  const ventanasAlta = Math.max(2, Math.floor(W / 60));

  return (
    <svg viewBox="0 0 400 300" className={className} role="img" aria-label={`Ilustración de la fachada de ${p.nombre}`} preserveAspectRatio={encajar ? "xMidYMid meet" : "xMidYMid slice"}>
      <defs>
        <linearGradient id={`cielo-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#15213b" /><stop offset="0.55" stopColor="#3b4a70" /><stop offset="0.85" stopColor="#c99a78" />
          <stop offset="1" stopColor="#efc995" />
        </linearGradient>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f7dca2" />
          <stop offset="1" stopColor="#c98a45" />
        </linearGradient>
      </defs>

      <rect width={400} height={300} fill={`url(#cielo-${uid})`} />
      <g fill="#fff">{[[40, 30], [96, 52], [150, 22], [252, 40], [318, 26], [372, 58]].map(([x, y]) => <circle key={x} cx={x} cy={y} r={0.9} opacity={0.6} />)}</g>
      <ellipse cx={200} cy={SUELO} rx={260} ry={70} fill="#f6c98a" opacity={0.35} />

      {/* Vecinos: el terreno es urbano */}
      <rect x={0} y={SUELO - vecinoIzq} width={x0 - 6} height={vecinoIzq} fill="#2c3858" />
      <rect x={x0 + W + 6} y={SUELO - vecinoDer} width={400 - x0 - W - 6} height={vecinoDer} fill="#26314f" />
      {x0 > 40 && <rect x={x0 - 34} y={SUELO - vecinoIzq + 18} width={14} height={26} fill="#e9b770" opacity={0.75} />}
      {x0 > 40 && <rect x={x0 + W + 22} y={SUELO - vecinoDer + 18} width={14} height={26} fill="#e9b770" opacity={0.6} />}

      {/* Cuerpo principal */}
      <rect x={x0} y={techo} width={W} height={alto} fill={muro} />

      {/* Planta baja: cochera */}
      {p.cochera > 0 && (
        <g>
          <rect x={xc + 5} y={SUELO - PISO + 12} width={anchoCochera - 10} height={PISO - 12} fill="#3a342f" opacity={0.18} />
          <rect x={xc + 8} y={SUELO - PISO + 18} width={anchoCochera - 16} height={PISO - 18} fill={madera} />
          {Array.from({ length: Math.floor((anchoCochera - 16) / 5) }, (_, i) => (
            <line key={i} x1={xc + 10 + i * 5} y1={SUELO - PISO + 18} x2={xc + 10 + i * 5} y2={SUELO} stroke="#000" strokeOpacity={0.18} />
          ))}
        </g>
      )}

      {/* Planta baja: acceso y ventana */}
      <g>
        <rect x={xr + 12} y={SUELO - 2.35 * E} width={E} height={2.35 * E} fill={p.arcos ? acento : "#3d2f25"} />
        <circle cx={xr + 12 + E - 5} cy={SUELO - 1.1 * E} r={1.3} fill="#e8d9b8" />
        {/* Arbotante encendido */}
        <ellipse cx={xr + 12 + E + 8} cy={SUELO - 2.35 * E + 2} rx={14} ry={18} fill="#ffd99a" opacity={0.35} />
        <rect x={xr + 12 + E + 6} y={SUELO - 2.35 * E - 2} width={4} height={7} fill="#3a2f25" />
        <rect x={xr + 12 + E + 6.5} y={SUELO - 2.35 * E + 5} width={3} height={2} fill="#ffe2a8" />
        {wr - 2 * E - 18 > 16 && (
          <>
            <Ventana id={id} x={xr + 2 * E + 4} y={SUELO - PISO + 14} w={wr - 2 * E - 18} h={PISO - 34} arco={p.arcos} />
            <Plantas x={xr + 2 * E} w={wr - 2 * E - 10} y={SUELO - 12} />
          </>
        )}
      </g>

      {/* Planta alta */}
      {p.plantas === 2 && (
        <g>
          <rect x={x0} y={SUELO - PISO - 3} width={W} height={5} fill="#cfc4b3" />
          {volado ? (
            <g>
              <rect x={xv} y={techo - 6} width={wv} height={PISO + 4} fill="#d6ccbd" />
              <rect x={xv + 7} y={techo + 2} width={wv - 14} height={PISO - 12} fill={`url(#${id})`} />
              {/* Celosía */}
              {Array.from({ length: Math.floor((wv * 0.45) / 6) }, (_, i) => (
                <rect
                  key={i}
                  x={(izq ? xv + wv - 7 - wv * 0.45 : xv + 7) + i * 6}
                  y={techo + 2}
                  width={3}
                  height={PISO - 12}
                  fill={madera}
                />
              ))}
              {!izq ? null : <rect x={x0 + 10} y={techo + 16} width={W * 0.3 - 28} height={30} fill={`url(#${id})`} stroke="#2b2724" strokeWidth={2.5} />}
              {izq ? null : <rect x={xv + wv + 10} y={techo + 16} width={x0 + W - xv - wv - 20} height={30} fill={`url(#${id})`} stroke="#2b2724" strokeWidth={2.5} />}
            </g>
          ) : (
            <g>
              {Array.from({ length: ventanasAlta }, (_, i) => {
                const ancho = (W - 20) / ventanasAlta;
                return (
                  <Ventana key={i} id={id} x={x0 + 10 + i * ancho + ancho * 0.18} y={techo + 12} w={ancho * 0.64} h={PISO - 26} arco={p.arcos} />
                );
              })}
              {/* Barandal de terraza */}
              <rect x={x0 - 4} y={SUELO - PISO - 22} width={W + 8} height={2} fill="#2b2724" opacity={0.7} />
            </g>
          )}
        </g>
      )}

      {/* Una planta: celosía decorativa */}
      {p.plantas === 1 && !p.arcos && (
        <g>
          {Array.from({ length: Math.floor((W * 0.22) / 6) }, (_, i) => (
            <rect key={i} x={(izq ? x0 + W - 12 - W * 0.22 : x0 + 12) + i * 6} y={techo + 8} width={3} height={PISO - 40} fill={madera} opacity={p.cochera ? 0 : 1} />
          ))}
        </g>
      )}

      {/* Pretil / remate */}
      <rect x={x0 - 3} y={techo - (volado ? 14 : 8)} width={W + 6} height={volado ? 8 : 8} fill={muro} />
      <rect x={x0 - 3} y={techo - (volado ? 14 : 8)} width={W + 6} height={2} fill="#000" opacity={0.08} />
      {p.arcos && <rect x={x0 - 6} y={techo - 10} width={W + 12} height={4} fill={acento} opacity={0.85} />}

      {/* Banqueta y calle */}
      <rect y={SUELO} width={400} height={50} fill="#d6c3a5" />
      <rect y={SUELO} width={400} height={3} fill="#bfa984" />
      <rect y={SUELO + 22} width={400} height={28} fill="#b9a585" />
      {/* Árbol en banqueta */}
      <g transform={`translate(${izq ? x0 + W + 26 : x0 - 26} ${SUELO + 6})`}>
        <rect x={-2} y={-58} width={4} height={58} fill="#6b5a48" />
        <circle cx={0} cy={-72} r={22} fill="#7c8b65" />
        <circle cx={-14} cy={-60} r={14} fill="#6f7f5a" />
        <circle cx={13} cy={-62} r={15} fill="#879670" />
      </g>
    </svg>
  );
}
