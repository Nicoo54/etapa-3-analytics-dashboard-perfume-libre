import { MetricCard } from "@/components/MetricCard";
import { OrdersByDayChart } from "@/components/transacciones/OrdersByDayChart";
import { RecentOrdersTable } from "@/components/transacciones/RecentOrdersTable";
import { RevenueLineChart } from "@/components/transacciones/RevenueLineChart";
import {
  getOrdenesPorDiaData,
  getRevenueAcumuladoData,
  getTransaccionesKPIs,
  getUltimasOrdenes,
} from "@/lib/api/transaccionesData";
import { getDateRangeLabel } from "@/lib/utils";
import { Ban, Ticket, TrendingUp } from "lucide-react";

export default async function TransaccionesPage({
  searchParams,
}: {
  searchParams: Promise<{ rango?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const rango = resolvedSearchParams?.rango || "30d";

  const [kpis, revenueData, ordenesDiaData, ultimasOrdenes] = await Promise.all(
    [
      getTransaccionesKPIs(rango),
      getRevenueAcumuladoData(rango),
      getOrdenesPorDiaData(rango),
      getUltimasOrdenes(),
    ],
  );

  let labelGraficoOrdenes = "Órdenes (Últimos 30 días)";
  let labelGraficoRevenue = "Revenue (Últimos 30 días)";
  const labelRango = getDateRangeLabel(rango);

  const labelTicketPromedio = "Ticket Promedio " + labelRango;
  const labelTasaConversion = "Tasa de Conversión " + labelRango;
  const labelOrdenesCanceladas = "Órdenes Canceladas " + labelRango;

  if (rango === "7d") {
    labelGraficoOrdenes = "Órdenes (Últimos 7 días)";
    labelGraficoRevenue = "Revenue (Últimos 7 días)";
  }
  if (rango === "mes_actual") {
    labelGraficoOrdenes = "Órdenes de este mes";
    labelGraficoRevenue = "Revenue de este mes";
  }
  if (rango === "all") {
    labelGraficoOrdenes = "Órdenes Históricas";
    labelGraficoRevenue = "Revenue Histórico";
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">
          Transacciones
        </h1>
        <p className="text-muted-foreground text-sm">
          Análisis de volumen de ventas y patrones de compra.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title={labelTicketPromedio}
          value={kpis.ticketPromedio.toLocaleString("es-AR")}
          prefix="$"
          icon={<Ticket className="w-4 h-4" />}
        />
        <MetricCard
          title={labelTasaConversion}
          value={kpis.tasaConversion}
          suffix="%"
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <MetricCard
          title={labelOrdenesCanceladas}
          value={kpis.ordenesCanceladas}
          icon={<Ban className="w-4 h-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        <RevenueLineChart data={revenueData} title={labelGraficoRevenue} />
        <OrdersByDayChart data={ordenesDiaData} title={labelGraficoOrdenes} />
      </div>

      <div className="mt-8">
        <RecentOrdersTable data={ultimasOrdenes} />
      </div>
    </div>
  );
}
