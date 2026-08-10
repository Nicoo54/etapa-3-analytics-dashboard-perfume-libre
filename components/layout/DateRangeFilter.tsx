"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

function DateRangeFilterInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentRange = searchParams.get("rango") || "30d";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRange = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set("rango", newRange);

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

export function DateRangeFilter() {
  return (
    <Suspense
      fallback={<div className="h-9 w-36 bg-muted animate-pulse rounded-md" />}
    >
      <DateRangeFilterInner />
    </Suspense>
  );
}
