import * as XLSX from "xlsx";
import {
  getTransaccionesKPIs,
  getRevenueAcumuladoData,
  getOrdenesPorDiaData,
  getUltimasOrdenes,
} from "@/lib/api/transaccionesData";
import { autoFitColumns } from "@/components/layout/ExportButton";

export async function exportTransacciones(wb: XLSX.WorkBook, rango: string) {
  const [kpis, revenue, ordenesDia, ultimas] = await Promise.all([
    getTransaccionesKPIs(rango),
    getRevenueAcumuladoData(rango),
    getOrdenesPorDiaData(rango),
    getUltimasOrdenes(),
  ]);

  const kpisParaExcel = [
    { Metrica: "Ticket Promedio", Valor: kpis.ticketPromedio },
    { Metrica: "Tasa de Conversión (%)", Valor: kpis.tasaConversion },
    { Metrica: "Órdenes Canceladas", Valor: kpis.ordenesCanceladas },
  ];

  const wsKpis = XLSX.utils.json_to_sheet(kpisParaExcel);
  const wsRevenue = XLSX.utils.json_to_sheet(revenue);
  const wsOrder = XLSX.utils.json_to_sheet(ordenesDia);
  const wsLastOrders = XLSX.utils.json_to_sheet(ultimas);

  wsKpis["!cols"] = autoFitColumns(kpisParaExcel);
  wsRevenue["!cols"] = autoFitColumns(revenue);
  wsOrder["!cols"] = autoFitColumns(ordenesDia);
  wsLastOrders["!cols"] = autoFitColumns(ultimas);

  XLSX.utils.book_append_sheet(wb, wsKpis, "Resumen KPI");
  XLSX.utils.book_append_sheet(wb, wsRevenue, "Serie Temporal");
  XLSX.utils.book_append_sheet(wb, wsOrder, "Órdenes por Día");
  XLSX.utils.book_append_sheet(wb, wsLastOrders, "Últimas Órdenes");
}
