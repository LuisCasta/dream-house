import Image from "next/image";
import Link from "next/link";
import logo from "../../public/marca/logo-dreamhouse.png";

// Logo de redes sociales. PENDIENTE: reemplazar por el archivo original en alta resolución
// (este se recortó de una captura del perfil de TikTok).
export default function Logo({ className = "", conTexto = true }: { className?: string; conTexto?: boolean }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`} aria-label="Dream House, inicio">
      <Image src={logo} alt="" width={38} height={38} className="h-[38px] w-[38px] rounded-full bg-white ring-1 ring-linea" priority />
      {conTexto && <span className="font-display text-[1.35rem] font-semibold leading-none tracking-tight">Dream House</span>}
    </Link>
  );
}
