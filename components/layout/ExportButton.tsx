"use client";

import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Download, FileSpreadsheet, Loader2 } from "lucide-react";
import { exportAllPages, exportCurrentPage } from "@/lib/utils/index";

export function ExportButton() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const rango = searchParams.get("rango") || "30d";

  const handleExportCurrentPage = async () => {
    setLoading(true);
    setOpen(false);
    try {
      await exportCurrentPage(pathname, rango);
    } catch (error) {
      console.error("Error al exportar página actual:", error);
      alert(
        "Hubo un error al exportar los datos. Por favor, intenta de nuevo.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleExportAllPages = async () => {
    setLoading(true);
    setOpen(false);
    try {
      await exportAllPages(rango);
    } catch (error) {
      console.error("Error al exportar reporte completo:", error);
      alert("Hubo un error al generar el reporte completo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        disabled={loading}
        className="bg-primary text-primary-foreground px-4 py-1.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity flex items-center space-x-2 disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin mr-1" />
        ) : (
          <Download className="w-4 h-4 mr-1" />
        )}
        <span>Exportar</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-background border border-border ring-1 ring-black/5 z-50 py-1">
            <button
              onClick={handleExportCurrentPage}
              className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted flex items-center space-x-2 transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
              <span>Exportar página actual</span>
            </button>
            <button
              onClick={handleExportAllPages}
              className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted flex items-center space-x-2 transition-colors"
            >
              <Download className="w-4 h-4 text-primary" />
              <span>Exportar reporte completo</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export const autoFitColumns = (json: any[]) => {
  if (!json || json.length === 0) return [];

  const keys = Object.keys(json[0]);

  const colWidths = keys.map((key) => {
    let maxLength = key.toString().length;

    json.forEach((row) => {
      const value = row[key];
      const valueLength =
        value !== null && value !== undefined ? value.toString().length : 0;
      if (valueLength > maxLength) {
        maxLength = valueLength;
      }
    });

    return { wch: Math.min(maxLength + 2, 50) };
  });

  return colWidths;
};
