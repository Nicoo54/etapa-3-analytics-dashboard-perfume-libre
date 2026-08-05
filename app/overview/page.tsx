import { MetricCard } from "@/components/MetricCard";
import { OrderStatusChart } from "@/components/overview/OrderStatusChart";
import { OverviewChart } from "@/components/overview/OverviewChart";
import {
  getOrderStatusData,
  getOverviewMetricas,
  getRevenueData,
} from "@/lib/api/overviewData";
import { Star, ShoppingBag, DollarSign, Users, Trophy } from "lucide-react";

// TODO: Implementar logica para obtener tendencias y rangos de fechas
// para remplazar los valores hardcodeados en las descripciones de los MetricCard

export default async function OverviewPage() {
  const [metrics, revenueData, statusData] = await Promise.all([
    getOverviewMetricas(),
    getRevenueData(),
    getOrderStatusData(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">
          Resumen General
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Órdenes"
          value={metrics.totalOrdenes.toLocaleString("es-AR")}
          icon={<ShoppingBag className="h-4 w-4" />}
          description={
            <span className="text-emerald-500 font-medium">
              +12.5% desde el mes pasado
            </span>
          }
        />
        <MetricCard
          title="Ingresos Totales"
          value={metrics.revenueTotal.toLocaleString("es-AR", {
            minimumFractionDigits: 2,
          })}
          prefix="$"
          icon={<DollarSign className="h-4 w-4" />}
          description={
            <span className="text-emerald-500 font-medium">
              +20.1% desde el mes pasado
            </span>
          }
        />
        <MetricCard
          title="Usuarios Activos"
          value={metrics.usuariosActivos.toLocaleString("es-AR")}
          icon={<Users className="h-4 w-4" />}
          description="+180 nuevos esta semana"
        />
        <MetricCard
          title="Calificación Promedio"
          value={metrics.calificacionPromedio}
          prefix={<Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
          icon={<Trophy className="w-4 h-4" />}
          description="Basado en 2,340 reseñas"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        <OverviewChart data={revenueData} />
        <OrderStatusChart data={statusData} />
      </div>
    </div>
  );
}
