"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function DateRangeFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Leemos el valor actual de la URL. Si no hay, asumimos "30d" (últimos 30 días)
  const currentRange = searchParams.get("rango") || "30d";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRange = e.target.value;
    // Construimos la nueva URL manteniendo los parámetros existentes
    const params = new URLSearchParams(searchParams.toString());
    params.set("rango", newRange);

    // Actualizamos la URL (esto hace que el Server Component vuelva a pedir datos)
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      value={currentRange}
      onChange={handleChange}
      className="bg-background text-foreground border border-input rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
    >
      <option value="7d">Últimos 7 días</option>
      <option value="30d">Últimos 30 días</option>
      <option value="mes_actual">Este mes</option>
      <option value="all">Global (Histórico)</option>
    </select>
  );
}
