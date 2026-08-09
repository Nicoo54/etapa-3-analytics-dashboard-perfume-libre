import * as XLSX from "xlsx";
import {
  getCompradoresVsVendedoresData,
  getCrecimientoUsuariosData,
  getTopCompradores,
  getUsuariosKPIs,
} from "../api/usuariosData";
import { autoFitColumns } from "@/components/layout/ExportButton";

export async function exportUsuarios(wb: XLSX.WorkBook, rango: string) {
  const [kpis, crecimiento, roles, topCompradores] = await Promise.all([
    getUsuariosKPIs(rango),
    getCrecimientoUsuariosData(rango),
    getCompradoresVsVendedoresData(rango),
    getTopCompradores(),
  ]);

  const kpiFlat = [
    {
      Metrica: "Total Registrados",
      Valor: kpis.totalUsuarios,
    },
    {
      Metrica: "Nuevos",
      Valor: kpis.nuevosUsuarios,
    },
    {
      Metrica: "Compradores Recurrentes",
      Valor: kpis.compradoresRecurrentes,
    },
  ];

  const wsKpis = XLSX.utils.json_to_sheet(kpiFlat);
  const wsGrowth = XLSX.utils.json_to_sheet(crecimiento);
  const wsRol = XLSX.utils.json_to_sheet(roles);
  const wsTopBuyers = XLSX.utils.json_to_sheet(topCompradores);

  wsKpis["!cols"] = autoFitColumns(kpiFlat);
  wsGrowth["!cols"] = autoFitColumns(crecimiento);
  wsRol["!cols"] = autoFitColumns(roles);
  wsTopBuyers["!cols"] = autoFitColumns(topCompradores);

  XLSX.utils.book_append_sheet(wb, wsKpis, "Resumen KPI");
  XLSX.utils.book_append_sheet(wb, wsGrowth, "Crecimiento");
  XLSX.utils.book_append_sheet(wb, wsRol, "Roles");
  XLSX.utils.book_append_sheet(wb, wsTopBuyers, "Top Compradores");
}
