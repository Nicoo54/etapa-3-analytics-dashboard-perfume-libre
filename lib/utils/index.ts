import * as XLSX from "xlsx";
import { exportTransacciones } from "./transaccionesExport";
import { exportGeneral } from "./generalExport";
import { exportUsuarios } from "./usuariosExport";
import { exportProductos } from "./productosExport";
import { exportEnvios } from "./enviosExport";
import { exportCalificaciones } from "./calificacionesExport";
import { exportAll } from "./exportacionGlobal";

export const downloadWorkbook = (
  wb: XLSX.WorkBook,
  fileName: string,
  rango: string,
) => {
  XLSX.writeFile(
    wb,
    `${fileName}_${rango}_${new Date().toISOString().slice(0, 10)}.xlsx`,
  );
};

export async function exportCurrentPage(pathname: string, rango: string) {
  const wb = XLSX.utils.book_new();

  if (pathname.includes("/general")) {
    await exportGeneral(wb, rango);
    downloadWorkbook(wb, "Reporte_General", rango);
  } else if (pathname.includes("/transacciones")) {
    await exportTransacciones(wb, rango);
    downloadWorkbook(wb, "Reporte_Transacciones", rango);
  } else if (pathname.includes("/usuarios")) {
    await exportUsuarios(wb, rango);
    downloadWorkbook(wb, "Reporte_Usuarios", rango);
  } else if (pathname.includes("/productos")) {
    await exportProductos(wb, rango);
    downloadWorkbook(wb, "Reporte_Productos", rango);
  } else if (pathname.includes("/calificaciones")) {
    await exportCalificaciones(wb, rango);
    downloadWorkbook(wb, "Reporte_Calificaciones", rango);
  } else if (pathname.includes("/envios")) {
    await exportEnvios(wb, rango);
    downloadWorkbook(wb, "Reporte_Envios", rango);
  } else {
    throw new Error("Página no soportada para exportación");
  }
}

export async function exportAllPages(rango: string) {
  const wb = XLSX.utils.book_new();

  await exportAll(wb, rango);

  downloadWorkbook(wb, "Reporte_Ecosistema_Completo", rango);
}
