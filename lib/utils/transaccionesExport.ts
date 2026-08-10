import * as XLSX from "xlsx";
import {
  getTransaccionesKPIs,
  getRevenueAcumuladoData,
  getOrdenesPorDiaData,
  getUltimasOrdenes,
} from "@/lib/api/transaccionesData";
import { autoFitColumns } from "@/components/layout/ExportButton";

export async function exportTransacciones(wb: XLSX.WorkBook, rango: string) {
  const [kpis, revenue, ordenesDia, ordenesDetalle] = await Promise.all([
    getTransaccionesKPIs(rango),
    getRevenueAcumuladoData(rango),
    getOrdenesPorDiaData(rango),
    getUltimasOrdenes(rango, -1),
  ]);

  const kpisParaExcel = [
    { Metrica: "Ticket Promedio", Valor: kpis.ticketPromedio },
    { Metrica: "Tasa de Conversión (%)", Valor: kpis.tasaConversion },
    { Metrica: "Órdenes Canceladas", Valor: kpis.ordenesCanceladas },
  ];

  const ordenesFormateadas = ordenesDetalle.map((orden: any) => ({
    "ID Órden": orden.id,
    Cliente: orden.cliente,
    Fecha: orden.fecha,
    "Monto ($)": orden.monto,
    Estado: orden.estado,
  }));

  const wsKpis = XLSX.utils.json_to_sheet(kpisParaExcel);
  const wsRevenue = XLSX.utils.json_to_sheet(revenue);
  const wsOrder = XLSX.utils.json_to_sheet(ordenesDia);
  const wsDetalle = XLSX.utils.json_to_sheet(ordenesFormateadas);

  wsKpis["!cols"] = autoFitColumns(kpisParaExcel);
  wsRevenue["!cols"] = autoFitColumns(revenue);
  wsOrder["!cols"] = autoFitColumns(ordenesDia);
  wsDetalle["!cols"] = autoFitColumns(ordenesFormateadas);

  XLSX.utils.book_append_sheet(wb, wsKpis, "Resumen KPI");
  XLSX.utils.book_append_sheet(wb, wsRevenue, "Revenue Acumulado");
  XLSX.utils.book_append_sheet(wb, wsOrder, "Volumen de Ordenes");
  XLSX.utils.book_append_sheet(wb, wsDetalle, "Detalle de Órdenes");
}
