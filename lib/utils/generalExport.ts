import * as XLSX from "xlsx";
import {
  getOrderStatusData,
  getOverviewMetricas,
  getRevenueData,
} from "../api/overviewData";
import { autoFitColumns } from "@/components/layout/ExportButton";

export async function exportGeneral(wb: XLSX.WorkBook, rango: string) {
  const [metrics, revenue, status] = await Promise.all([
    getOverviewMetricas(rango),
    getRevenueData(rango),
    getOrderStatusData(rango),
  ]);

  const sheetData = [
    {
      Metrica: "Total Órdenes",
      Valor: metrics.totalOrdenes.valor,
      Tendencia: metrics.totalOrdenes.tendencia ?? "N/A",
    },
    {
      Metrica: "Ingresos Totales ($)",
      Valor: metrics.revenueTotal.valor,
      Tendencia: metrics.revenueTotal.tendencia ?? "N/A",
    },
    {
      Metrica: "Usuarios Activos",
      Valor: metrics.usuariosActivos.valor,
      Tendencia: metrics.usuariosActivos.tendencia ?? "N/A",
    },
    {
      Metrica: "Calificación Promedio",
      Valor: metrics.calificacionPromedio,
      Tendencia: "N/A",
    },
  ];

  let statusData = status.map((item) => ({
    Estado: item.estado,
    Cantidad: item.cantidad,
  }));

  const wsKpis = XLSX.utils.json_to_sheet(sheetData);
  const wsRevenue = XLSX.utils.json_to_sheet(revenue);
  const wsStatus = XLSX.utils.json_to_sheet(statusData);

  wsKpis["!cols"] = autoFitColumns(sheetData);
  wsRevenue["!cols"] = autoFitColumns(revenue);
  wsStatus["!cols"] = autoFitColumns(statusData);

  XLSX.utils.book_append_sheet(wb, wsKpis, "Resumen KPI");
  XLSX.utils.book_append_sheet(wb, wsRevenue, "Ingresos por Fecha");
  XLSX.utils.book_append_sheet(wb, wsStatus, "Órdenes por Estado");
}
