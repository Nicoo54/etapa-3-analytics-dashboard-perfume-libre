import * as XLSX from "xlsx";
import {
  getDistribucionCategorias,
  getProductosKPIs,
  getTopProductos,
  getUltimosProductos,
} from "../api/productosData";
import { autoFitColumns } from "@/components/layout/ExportButton";

export async function exportProductos(wb: XLSX.WorkBook, rango: string) {
  const [kpis, top, categorias, ultimos] = await Promise.all([
    getProductosKPIs(),
    getTopProductos(rango),
    getDistribucionCategorias(rango),
    getUltimosProductos(),
  ]);

  const kpisParaExcel = [
    { Metrica: "Total productos", Valor: kpis.total },
    { Metrica: "Productos Activos", Valor: kpis.activos },
    { Metrica: "Productos pausados", Valor: kpis.pausados },
  ];

  const wsKpis = XLSX.utils.json_to_sheet(kpisParaExcel);
  const wsTopProducts = XLSX.utils.json_to_sheet(top);
  const wsCategories = XLSX.utils.json_to_sheet(categorias);
  const wsLastProducts = XLSX.utils.json_to_sheet(ultimos);

  wsKpis["!cols"] = autoFitColumns(kpisParaExcel);
  wsTopProducts["!cols"] = autoFitColumns(top);
  wsCategories["!cols"] = autoFitColumns(categorias);
  wsLastProducts["!cols"] = autoFitColumns(ultimos);

  XLSX.utils.book_append_sheet(wb, wsKpis, "Resumen KPI");
  XLSX.utils.book_append_sheet(wb, wsTopProducts, "Productos mas vendidos");
  XLSX.utils.book_append_sheet(wb, wsCategories, "Distribución por Categoría");
  XLSX.utils.book_append_sheet(
    wb,
    wsLastProducts,
    "Ultimos productos agregados",
  );
}
