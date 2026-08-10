import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("es-AR").format(value);
}

export function formatCurrency(value: number) {
  return `${formatNumber(value)} $`;
}

export function getDateRangeLabel(rango: string = "30d"): string {
  switch (rango) {
    case "7d":
      return "(Últimos 7 días)";
    case "mes_actual":
      return "(Este mes)";
    case "all":
      return "(Histórico)";
    case "30d":
    default:
      return "(Últimos 30 días)";
  }
}
