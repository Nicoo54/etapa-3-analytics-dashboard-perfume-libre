import { OrderStatusChart } from "@/components/overview/OrderStatusChart";
import { OverviewChart } from "@/components/overview/OverviewChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getOrderStatusData,
  getOverviewMetricas,
  getRevenueData,
} from "@/lib/api/overviewData";
import { Star } from "lucide-react";

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
        />
        <MetricCard
          title="Ingresos Totales"
          value={metrics.revenueTotal.toLocaleString("es-AR", {
            minimumFractionDigits: 2,
          })}
          prefix="$"
        />
        <MetricCard
          title="Usuarios Activos"
          value={metrics.usuariosActivos.toLocaleString("es-AR")}
        />
        <MetricCard
          title="Calificación Promedio"
          value={metrics.calificacionPromedio}
          prefix={<Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        <OverviewChart data={revenueData} />

        <OrderStatusChart data={statusData} />
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  prefix = "",
}: {
  title: string;
  value: string | number;
  prefix?: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold flex items-center gap-1.5">
          {prefix}
          <span>{value}</span>
        </div>
      </CardContent>
    </Card>
  );
}
