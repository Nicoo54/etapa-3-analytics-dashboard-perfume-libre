import * as XLSX from "xlsx";
import {
  getOrderStatusData,
  getOverviewMetricas,
  getRevenueData,
} from "../api/overviewData";
import { autoFitColumns } from "@/components/layout/ExportButton";
import {
  getRevenueAcumuladoData,
  getTransaccionesKPIs,
  getUltimasOrdenes,
} from "../api/transaccionesData";
import { getProductosKPIs, getTopProductos } from "../api/productosData";
import {
  getCalificacionesKPIs,
  getVendedoresEnRiesgo,
} from "../api/calificacionesData";
import { getEnviosKPIs } from "../api/enviosData";
import { getTopCompradores, getUsuariosKPIs } from "../api/usuariosData";

export async function exportAll(wb: XLSX.WorkBook, rango: string) {
  const [
    metricsOverview,
    transaccionesKpis,
    revenueAcumulado,
    ultimasOrdenes,
    usuariosKpis,
    topCompradores,
    productosKpis,
    topProductos,
    calificacionesKpis,
    vendedoresRiesgo,
    enviosKpis,
  ] = await Promise.all([
    getOverviewMetricas(rango),

    getTransaccionesKPIs(rango),
    getRevenueAcumuladoData(rango),
    getUltimasOrdenes(rango, -1),
    getUsuariosKPIs(rango),
    getTopCompradores(), // Si tu endpoint de top soporta -1, lo usamos acá también

    getProductosKPIs(),
    getTopProductos(rango),

    getCalificacionesKPIs(rango),
    getVendedoresEnRiesgo(),

    getEnviosKPIs(rango),
  ]);

  const resumenEjecutivo = [
    {
      Categoría: "FINANZAS",
      Métrica: "Ingresos Totales",
      Valor: metricsOverview.revenueTotal.valor,
      Tendencia: metricsOverview.revenueTotal.tendencia ?? "N/A",
    },
    {
      Categoría: "FINANZAS",
      Métrica: "Ticket Promedio",
      Valor: transaccionesKpis.ticketPromedio,
      Tendencia: "N/A",
    },
    {
      Categoría: "USUARIOS",
      Métrica: "Usuarios Activos",
      Valor: metricsOverview.usuariosActivos.valor,
      Tendencia: metricsOverview.usuariosActivos.tendencia ?? "N/A",
    },
    {
      Categoría: "USUARIOS",
      Métrica: "Compradores Recurrentes",
      Valor: usuariosKpis.compradoresRecurrentes,
      Tendencia: usuariosKpis.compradoresRecurrentes.tendencia ?? "N/A",
    },
    {
      Categoría: "CATÁLOGO",
      Métrica: "Publicaciones Activas",
      Valor: productosKpis.activos,
      Tendencia: "N/A",
    },
    {
      Categoría: "CALIDAD",
      Métrica: "Calificación Promedio",
      Valor: metricsOverview.calificacionPromedio,
      Tendencia: "N/A",
    },
    {
      Categoría: "ENVÍOS",
      Métrica: "Entregados en Período",
      Valor: enviosKpis.entregados,
      Tendencia: "N/A",
    },
  ];
  const wsResumen = XLSX.utils.json_to_sheet(resumenEjecutivo);
  wsResumen["!cols"] = autoFitColumns(resumenEjecutivo);
  XLSX.utils.book_append_sheet(wb, wsResumen, "Resumen Ejecutivo");

  if (ultimasOrdenes && ultimasOrdenes.length > 0) {
    const ordenesFormateadas = ultimasOrdenes.map((o: any) => ({
      ID: o.id,
      Fecha: o.fecha,
      Cliente: o.cliente,
      Monto: o.monto,
      Estado: o.estado,
    }));
    const wsOrdenes = XLSX.utils.json_to_sheet(ordenesFormateadas);
    wsOrdenes["!cols"] = autoFitColumns(ordenesFormateadas);
    XLSX.utils.book_append_sheet(wb, wsOrdenes, "Transacciones");
  }

  if (topCompradores && topCompradores.length > 0) {
    const wsTopCompradores = XLSX.utils.json_to_sheet(topCompradores);
    wsTopCompradores["!cols"] = autoFitColumns(topCompradores);
    XLSX.utils.book_append_sheet(wb, wsTopCompradores, "Top Compradores");
  }

  if (topProductos && topProductos.length > 0) {
    const wsTopProductos = XLSX.utils.json_to_sheet(topProductos);
    wsTopProductos["!cols"] = autoFitColumns(topProductos);
    XLSX.utils.book_append_sheet(wb, wsTopProductos, "Top Productos");
  }

  if (vendedoresRiesgo && vendedoresRiesgo.length > 0) {
    const wsRiesgo = XLSX.utils.json_to_sheet(vendedoresRiesgo);
    wsRiesgo["!cols"] = autoFitColumns(vendedoresRiesgo);
    XLSX.utils.book_append_sheet(wb, wsRiesgo, "Vendedores en Riesgo");
  }
}
