"use client";
import { abrirPreferencias } from "@/lib/consentimiento";
export default function PreferenciasAnalitica() {
  return <button type="button" onClick={abrirPreferencias}>Preferencias de analítica</button>;
}
