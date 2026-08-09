import * as XLSX from "xlsx";
import {
  getDistribucionEstados,
  getEnviosKPIs,
  getEnviosPorOperador,
  getVolumenEnviosDia,
} from "../api/enviosData";
import { autoFitColumns } from "@/components/layout/ExportButton";

export async function exportEnvios(wb: XLSX.WorkBook, rango: string) {
  const [kpis, estados, operadores, volumen] = await Promise.all([
    getEnviosKPIs(rango),
    getDistribucionEstados(rango),
    getEnviosPorOperador(rango),
    getVolumenEnviosDia(rango),
  ]);

  const kpisParaExcel = [
    { Metrica: "Paquetes en Tránsito", Valor: kpis.enTransito },
    { Metrica: "Paquetes Entregados", Valor: kpis.entregados },
    { Metrica: "Tiempo Promedio de Entrega", Valor: kpis.tiempoPromedio },
  ];

  const wsKpis = XLSX.utils.json_to_sheet(kpisParaExcel);
  const wsStatusDist = XLSX.utils.json_to_sheet(estados);
  const wsOperatorDist = XLSX.utils.json_to_sheet(operadores);
  const wsVolume = XLSX.utils.json_to_sheet(volumen);

  wsKpis["!cols"] = autoFitColumns(kpisParaExcel);
  wsStatusDist["!cols"] = autoFitColumns(estados);
  wsOperatorDist["!cols"] = autoFitColumns(operadores);
  wsVolume["!cols"] = autoFitColumns(volumen);

  XLSX.utils.book_append_sheet(wb, wsKpis, "Resumen KPI");
  XLSX.utils.book_append_sheet(wb, wsStatusDist, "Distribución por Estado");
  XLSX.utils.book_append_sheet(wb, wsOperatorDist, "Envíos por Operador");
  XLSX.utils.book_append_sheet(wb, wsVolume, "Volumen Diario");
}
