import { MetricCard } from "@/components/MetricCard";
import { OrderStatusChart } from "@/components/overview/OrderStatusChart";
import { OverviewChart } from "@/components/overview/OverviewChart";
import {
  getOrderStatusData,
  getOverviewMetricas,
  getRevenueData,
} from "@/lib/api/overviewData";
import { getDateRangeLabel } from "@/lib/utils";
import { Star, ShoppingBag, DollarSign, Users, Trophy } from "lucide-react";

function TendencyText({
  value,
  label,
}: {
  value: number | null;
  label: string | null;
}) {
  if (value === null || !label) return null;

  const isPositive = value >= 0;
  const colorClass = isPositive ? "text-emerald-500" : "text-red-500";
  const sign = isPositive ? "+" : "";

  return (
    <span className={`${colorClass} font-medium`}>
      {sign}
      {value}% {label}
    </span>
  );
}

export default async function OverviewPage({
  searchParams,
}: {
  searchParams: Promise<{ rango?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const rango = resolvedSearchParams?.rango || "30d";

  const [metrics, revenueData, statusData] = await Promise.all([
    getOverviewMetricas(rango),
    getRevenueData(rango),
    getOrderStatusData(rango),
  ]);

  let labelTendencia = "";
  let labelOverview = "Ingresos historicos";
  let labelStatus = "Estado de órdenes historico";

  if (rango === "7d") {
    labelTendencia = "vs últimos 7 días";
    labelOverview = "Ingresos de la ultima semana";
    labelStatus = "Estado de órdenes de la ultima semana";
  }
  if (rango === "30d") {
    labelTendencia = "vs últimos 30 días";
    labelOverview = "Ingresos de los últimos 30 días";
    labelStatus = "Estado de órdenes de los últimos 30 días";
  }
  if (rango === "mes_actual") {
    labelTendencia = "vs mes anterior";
    labelOverview = "Ingresos del mes actual";
    labelStatus = "Estado de órdenes del mes actual";
  }

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
          value={metrics.totalOrdenes.valor.toLocaleString("es-AR")}
          icon={<ShoppingBag className="h-4 w-4" />}
          description={
            <TendencyText
              value={metrics.totalOrdenes.tendencia}
              label={labelTendencia}
            />
          }
        />

        <MetricCard
          title="Ingresos Totales"
          value={metrics.revenueTotal.valor.toLocaleString("es-AR", {
            minimumFractionDigits: 2,
          })}
          prefix="$"
          icon={<DollarSign className="h-4 w-4" />}
          description={
            <TendencyText
              value={metrics.revenueTotal.tendencia}
              label={labelTendencia}
            />
          }
        />

        <MetricCard
          title="Usuarios Activos"
          value={metrics.usuariosActivos.valor.toLocaleString("es-AR")}
          icon={<Users className="h-4 w-4" />}
          description={
            <TendencyText
              value={metrics.usuariosActivos.tendencia}
              label={labelTendencia}
            />
          }
        />

        <MetricCard
          title="Calificación Promedio"
          value={metrics.calificacionPromedio}
          prefix={<Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
          icon={<Trophy className="w-4 h-4" />}
          description="Basado en el histórico"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        <OverviewChart data={revenueData} title={labelOverview} />
        <OrderStatusChart data={statusData} title={labelStatus} />
      </div>
    </div>
  );
}
