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
import { Ban, Ticket, TrendingUp } from "lucide-react";

export default async function TransaccionesPage() {
  const [kpis, revenueData, ordenesDiaData, ultimasOrdenes] = await Promise.all(
    [
      getTransaccionesKPIs(),
      getRevenueAcumuladoData(),
      getOrdenesPorDiaData(),
      getUltimasOrdenes(),
    ],
  );

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
          title="Ticket Promedio"
          value={kpis.ticketPromedio.toLocaleString("es-AR")}
          prefix="$"
          icon={<Ticket className="w-4 h-4" />}
        />
        <MetricCard
          title="Tasa de Conversión"
          value={kpis.tasaConversion}
          suffix="%"
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <MetricCard
          title="Órdenes Canceladas"
          value={kpis.ordenesCanceladas}
          icon={<Ban className="w-4 h-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        <RevenueLineChart data={revenueData} />
        <OrdersByDayChart data={ordenesDiaData} />
      </div>

      <div className="mt-8">
        <RecentOrdersTable data={ultimasOrdenes} />
      </div>
    </div>
  );
}
