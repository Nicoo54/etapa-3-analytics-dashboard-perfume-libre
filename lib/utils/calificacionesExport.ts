import * as XLSX from "xlsx";
import {
  getCalificacionesKPIs,
  getDistribucionCalificaciones,
  getEvolucionPromedio,
  getVendedoresEnRiesgo,
} from "../api/calificacionesData";
import { autoFitColumns } from "@/components/layout/ExportButton";

export async function exportCalificaciones(wb: XLSX.WorkBook, rango: string) {
  const [kpis, dist, evo, riesgo] = await Promise.all([
    getCalificacionesKPIs(rango),
    getDistribucionCalificaciones(rango),
    getEvolucionPromedio(rango),
    getVendedoresEnRiesgo(),
  ]);

  const kpisParaExcel = [
    { Metrica: "Promedio de Reseñas", Valor: kpis.promedioResenas },
    { Metrica: "Total de Reseñas", Valor: kpis.totalResenas },
    { Metrica: "Reportes Pendientes", Valor: kpis.reportesPendientes },
  ];

  const wsKpis = XLSX.utils.json_to_sheet(kpisParaExcel);
  const wsRatingDist = XLSX.utils.json_to_sheet(dist);
  const wsRatingEvol = XLSX.utils.json_to_sheet(evo);
  const wsSalesRisk = XLSX.utils.json_to_sheet(riesgo);

  wsKpis["!cols"] = autoFitColumns(kpisParaExcel);
  wsRatingDist["!cols"] = autoFitColumns(dist);
  wsRatingEvol["!cols"] = autoFitColumns(evo);
  wsSalesRisk["!cols"] = autoFitColumns(riesgo);

  XLSX.utils.book_append_sheet(wb, wsKpis, "Resumen KPI");
  XLSX.utils.book_append_sheet(
    wb,
    wsRatingDist,
    "Distribución por Calificación",
  );
  XLSX.utils.book_append_sheet(
    wb,
    wsRatingEvol,
    "Evolución de la Calificación",
  );
  XLSX.utils.book_append_sheet(wb, wsSalesRisk, "Vendedores en Riesgo");
}
