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

export default async function ProductosPage() {
  const [kpis, topData, categoriaData, catalogoData] = await Promise.all([
    getProductosKPIs(),
    getTopProductos(),
    getDistribucionCategorias(),
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
        />
        <MetricCard
          title="Publicaciones Activas"
          value={kpis.activos.toLocaleString("es-AR")}
        />
        <MetricCard
          title="Publicaciones Pausadas"
          value={kpis.pausados.toLocaleString("es-AR")}
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
