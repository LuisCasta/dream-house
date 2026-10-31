import { useId } from "react";
import type { Espacio, Proyecto } from "@/data/proyectos";

// Ilustraciones provisionales de interiores. Sirven para maquetar el recorrido
// visual mientras llegan los renders reales de cada proyecto.

const PISO_Y = 222;

type Props = { p: Proyecto; espacio: Exclude<Espacio, "fachada">; className?: string; encajar?: boolean };

function Ventana({ x, y, w, h, id }: { x: number; y: number; w: number; h: number; id: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={`url(#${id})`} />
      <ellipse cx={x + w * 0.3} cy={y + h} rx={w * 0.35} ry={h * 0.32} fill="#8a9a72" opacity={0.75} />
      <ellipse cx={x + w * 0.8} cy={y + h} rx={w * 0.3} ry={h * 0.42} fill="#76875f" opacity={0.75} />
      <rect x={x} y={y} width={w} height={h} fill="none" stroke="#2b2724" strokeWidth={4} />
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke="#2b2724" strokeWidth={2.5} />
    </g>
  );
}

function Luz({ x }: { x: number }) {
  return <polygon points={`${x},40 ${x + 110},40 ${x - 20},${PISO_Y + 40} ${x - 150},${PISO_Y + 40}`} fill="#fff" opacity={0.13} />;
}

function Maceta({ x, alto = 60 }: { x: number; alto?: number }) {
  return (
    <g>
      <path d={`M${x - 12} ${PISO_Y - 26} h24 l-4 26 h-16 z`} fill="#b9a68f" />
      {[-14, -6, 2, 10].map((dx, i) => (
        <path key={i} d={`M${x} ${PISO_Y - 26} Q${x + dx * 2} ${PISO_Y - 26 - alto * 0.6} ${x + dx * 1.6} ${PISO_Y - 26 - alto}`} stroke={i % 2 ? "#6d7d5c" : "#7f8f69"} strokeWidth={7} fill="none" strokeLinecap="round" />
      ))}
    </g>
  );
}

export default function Interior({ p, espacio, className, encajar = false }: Props) {
  const { muro, acento, madera } = p.paleta;
  const id = `ext-${useId().replace(/:/g, "")}`;
  const exterior = espacio === "patio";
  const pisoMadera = espacio === "sala" || espacio === "recamara" || espacio === "recamara2" || exterior;

  return (
    <svg viewBox="0 0 400 300" className={className} role="img" aria-label={`Ilustración: ${espacio} de ${p.nombre}`} preserveAspectRatio={encajar ? "xMidYMid meet" : "xMidYMid slice"}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dfe5e3" />
          <stop offset="1" stopColor="#f3efe6" />
        </linearGradient>
      </defs>

      {/* Muro de fondo y piso */}
      <rect width={400} height={300} fill={exterior ? "#e9e1d3" : muro} />
      {!exterior && <rect width={400} height={300} fill="#fff" opacity={0.35} />}
      <rect y={PISO_Y} width={400} height={78} fill={pisoMadera ? "#cfae8a" : "#e4ddd1"} />
      {pisoMadera
        ? Array.from({ length: 10 }, (_, i) => <line key={i} x1={0} y1={PISO_Y + 8 + i * 8} x2={400} y2={PISO_Y + 8 + i * 8} stroke="#000" strokeOpacity={0.05} />)
        : Array.from({ length: 8 }, (_, i) => <line key={i} x1={i * 52} y1={PISO_Y} x2={i * 52} y2={300} stroke="#000" strokeOpacity={0.05} />)}
      <rect y={PISO_Y - 4} width={400} height={4} fill="#000" opacity={0.07} />

      {espacio === "sala" && (
        <g>
          <Ventana x={252} y={46} w={118} h={168} id={id} />
          <Luz x={250} />
          <rect x={86} y={74} width={70} height={88} fill="#f6f1e8" stroke="#b8ab98" strokeWidth={3} />
          <path d="M100 150 V110 A21 21 0 0 1 142 110 V150 Z" fill={acento} opacity={0.75} />
          <ellipse cx={150} cy={PISO_Y + 30} rx={130} ry={16} fill="#e9dfcf" />
          <rect x={30} y={170} width={200} height={50} rx={10} fill="#d4c6b3" />
          <rect x={40} y={150} width={88} height={34} rx={9} fill="#ddd1c0" />
          <rect x={132} y={150} width={88} height={34} rx={9} fill="#ddd1c0" />
          <rect x={58} y={148} width={26} height={22} rx={5} fill={acento} />
          <rect x={150} y={PISO_Y + 2} width={90} height={10} rx={4} fill={madera} />
          <line x1={225} y1={92} x2={225} y2={PISO_Y} stroke="#2b2724" strokeWidth={2} />
          <path d="M210 92 h30 l-6 -22 h-18 z" fill="#efe6d6" stroke="#2b2724" strokeWidth={1.5} />
          <Maceta x={380} alto={70} />
        </g>
      )}

      {espacio === "cocina" && (
        <g>
          <rect x={20} y={56} width={236} height={56} fill={madera} />
          {[79, 138, 197].map((x) => <line key={x} x1={x} y1={56} x2={x} y2={112} stroke="#000" strokeOpacity={0.15} />)}
          {Array.from({ length: 6 }, (_, i) => <line key={i} x1={20} y1={118 + i * 7} x2={256} y2={118 + i * 7} stroke="#000" strokeOpacity={0.06} />)}
          <rect x={20} y={152} width={236} height={8} fill="#ece6dc" />
          <rect x={20} y={160} width={236} height={62} fill={madera} />
          {[79, 138, 197].map((x) => <line key={x} x1={x} y1={160} x2={x} y2={222} stroke="#000" strokeOpacity={0.15} />)}
          <Ventana x={282} y={60} w={92} h={110} id={id} />
          <Luz x={290} />
          {[130, 200, 270].map((x) => (
            <g key={x}>
              <line x1={x} y1={0} x2={x} y2={142} stroke="#2b2724" strokeWidth={1.2} />
              <path d={`M${x - 13} 154 a13 13 0 0 1 26 0 z`} fill={acento} />
            </g>
          ))}
          <rect x={92} y={196} width={220} height={10} fill="#f4f0e9" />
          <rect x={98} y={206} width={208} height={50} fill="#e8e0d3" />
          {[130, 200, 270].map((x) => (
            <g key={x} stroke="#2b2724" strokeWidth={2}>
              <line x1={x - 10} y1={232} x2={x - 14} y2={276} />
              <line x1={x + 10} y1={232} x2={x + 14} y2={276} />
              <rect x={x - 15} y={226} width={30} height={7} fill={madera} stroke="none" />
            </g>
          ))}
        </g>
      )}

      {espacio === "recamara" && (
        <g>
          <Ventana x={22} y={56} w={70} h={140} id={id} />
          <rect x={14} y={48} width={22} height={176} fill="#efe7da" />
          <rect x={86} y={48} width={14} height={176} fill="#efe7da" />
          <rect x={120} y={104} width={180} height={100} fill={madera} />
          {Array.from({ length: 9 }, (_, i) => <line key={i} x1={120 + i * 20} y1={104} x2={120 + i * 20} y2={204} stroke="#000" strokeOpacity={0.12} />)}
          <rect x={128} y={178} width={164} height={52} rx={6} fill="#f6f2ea" />
          <rect x={128} y={204} width={164} height={28} rx={4} fill={acento} opacity={0.8} />
          <rect x={140} y={160} width={60} height={26} rx={8} fill="#fbf8f2" />
          <rect x={220} y={160} width={60} height={26} rx={8} fill="#fbf8f2" />
          {[104, 316].map((x) => (
            <g key={x}>
              <rect x={x - 14} y={190} width={28} height={30} fill="#d8cbb8" />
              <line x1={x} y1={190} x2={x} y2={168} stroke="#2b2724" strokeWidth={1.5} />
              <ellipse cx={x} cy={166} rx={10} ry={8} fill="#f4ead8" />
            </g>
          ))}
          <Maceta x={370} alto={52} />
        </g>
      )}

      {espacio === "recamara2" && (
        <g>
          <rect x={30} y={150} width={150} height={60} rx={6} fill="#f5f0e7" />
          <rect x={30} y={178} width={150} height={34} rx={4} fill="#b9c2b0" />
          <rect x={22} y={120} width={14} height={102} fill={madera} />
          <rect x={44} y={136} width={50} height={22} rx={7} fill="#fbf8f2" />
          <Ventana x={238} y={60} w={110} h={86} id={id} />
          <rect x={220} y={168} width={150} height={8} fill={madera} />
          <line x1={232} y1={176} x2={232} y2={PISO_Y} stroke="#2b2724" strokeWidth={2} />
          <line x1={358} y1={176} x2={358} y2={PISO_Y} stroke="#2b2724" strokeWidth={2} />
          <rect x={268} y={180} width={34} height={8} fill={acento} />
          <line x1={272} y1={188} x2={270} y2={PISO_Y} stroke="#2b2724" strokeWidth={2} />
          <line x1={298} y1={188} x2={300} y2={PISO_Y} stroke="#2b2724" strokeWidth={2} />
          <rect x={60} y={70} width={110} height={4} fill={madera} />
          {[66, 76, 84, 96, 106].map((x, i) => (
            <rect key={x} x={x} y={46 + (i % 2) * 4} width={8} height={24 - (i % 2) * 4} fill={["#b98a5e", acento, "#7f8f69", "#d4c3a6", "#5d6b75"][i]} />
          ))}
        </g>
      )}

      {espacio === "bano" && (
        <g>
          <rect y={130} width={400} height={92} fill="#e9e3d9" />
          {Array.from({ length: 13 }, (_, i) => <line key={i} x1={i * 32} y1={130} x2={i * 32} y2={PISO_Y} stroke="#000" strokeOpacity={0.05} />)}
          {Array.from({ length: 3 }, (_, i) => <line key={i} x1={0} y1={160 + i * 30} x2={400} y2={160 + i * 30} stroke="#000" strokeOpacity={0.05} />)}
          <circle cx={128} cy={90} r={38} fill="#e6ece9" stroke={madera} strokeWidth={4} />
          <rect x={58} y={164} width={140} height={34} fill={madera} />
          <ellipse cx={128} cy={160} rx={26} ry={8} fill="#f8f6f1" />
          <line x1={128} y1={146} x2={128} y2={136} stroke="#2b2724" strokeWidth={2.5} />
          <rect x={250} y={36} width={120} height={186} fill="#dfe8e8" opacity={0.55} />
          <rect x={250} y={36} width={120} height={186} fill="none" stroke="#2b2724" strokeWidth={2} />
          <line x1={330} y1={36} x2={330} y2={70} stroke="#2b2724" strokeWidth={2} />
          <ellipse cx={330} cy={72} rx={12} ry={3} fill="#2b2724" />
          <Maceta x={222} alto={42} />
          <Luz x={360} />
        </g>
      )}

      {espacio === "patio" && (
        <g>
          <rect width={400} height={120} fill="#efe7da" />
          <rect y={80} width={400} height={142} fill={muro} />
          {Array.from({ length: 16 }, (_, i) => <rect key={i} x={230 + i * 10} y={80} width={5} height={142} fill={madera} />)}
          <circle cx={90} cy={70} r={48} fill="#7c8b65" />
          <circle cx={60} cy={92} r={30} fill="#6f7f5a" />
          <rect x={86} y={110} width={6} height={112} fill="#6b5a48" />
          {/* Agaves */}
          {[40, 180].map((x) => (
            <g key={x}>
              <path d={`M${x - 16} ${PISO_Y - 26} h32 l-4 26 h-24 z`} fill="#c2ad93" />
              {[-26, -12, 0, 12, 26].map((d) => (
                <path key={d} d={`M${x} ${PISO_Y - 26} L${x + d} ${PISO_Y - 70 + Math.abs(d)} L${x + d * 0.4} ${PISO_Y - 26} Z`} fill="#8a9c7a" />
              ))}
            </g>
          ))}
          {[270, 330].map((x) => (
            <g key={x}>
              <path d={`M${x - 20} ${PISO_Y - 34} q20 14 40 0 v18 h-40 z`} fill={acento} opacity={0.85} />
              <line x1={x - 18} y1={PISO_Y - 16} x2={x - 22} y2={PISO_Y} stroke="#2b2724" strokeWidth={2} />
              <line x1={x + 18} y1={PISO_Y - 16} x2={x + 22} y2={PISO_Y} stroke="#2b2724" strokeWidth={2} />
            </g>
          ))}
          <ellipse cx={300} cy={PISO_Y - 18} rx={10} ry={3} fill={madera} />
          <line x1={300} y1={PISO_Y - 18} x2={300} y2={PISO_Y} stroke="#2b2724" strokeWidth={2} />
        </g>
      )}
    </svg>
  );
}
