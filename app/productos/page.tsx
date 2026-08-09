import {
  getProductosKPIs,
  getTopProductos,
  getDistribucionCategorias,
  getUltimosProductos,
} from "@/lib/api/productosData";
import { TopProductsChart } from "@/components/productos/TopProductsChart";
import { CategoryDonutChart } from "@/components/productos/CategoryDonutChart";
import { CatalogTable } from "@/components/productos/CatalogTable";
import { MetricCard } from "@/components/MetricCard";
import { Database, Eye, PauseCircle } from "lucide-react";

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<{ rango?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const rango = resolvedSearchParams?.rango || "30d";

  const [kpis, topData, categoriaData, catalogoData] = await Promise.all([
    getProductosKPIs(),
    getTopProductos(rango),
    getDistribucionCategorias(rango),
    getUltimosProductos(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Catálogo</h1>
        <p className="text-muted-foreground text-sm">
          Estado de las publicaciones y rendimiento de productos C2C.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Total Productos Históricos"
          value={kpis.total.toLocaleString("es-AR")}
          icon={<Database className="w-4 h-4" />}
        />
        <MetricCard
          title="Publicaciones Activas"
          value={kpis.activos.toLocaleString("es-AR")}
          icon={<Eye className="w-4 h-4" />}
        />
        <MetricCard
          title="Publicaciones Pausadas"
          value={kpis.pausados.toLocaleString("es-AR")}
          icon={<PauseCircle className="w-4 h-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        <TopProductsChart data={topData} />
        <CategoryDonutChart data={categoriaData} />
      </div>

      <div className="mt-8">
        <CatalogTable data={catalogoData} />
      </div>
    </div>
  );
}
