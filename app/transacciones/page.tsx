import { OrdersByDayChart } from "@/components/transacciones/OrdersByDayChart";
import { RecentOrdersTable } from "@/components/transacciones/RecentOrdersTable";
import { RevenueLineChart } from "@/components/transacciones/RevenueLineChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getOrdenesPorDiaData,
  getRevenueAcumuladoData,
  getTransaccionesKPIs,
  getUltimasOrdenes,
} from "@/lib/api/transaccionesData";

function MetricCard({
  title,
  value,
  prefix = "",
  suffix = "",
}: {
  title: string;
  value: string | number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
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
          {suffix}
        </div>
      </CardContent>
    </Card>
  );
}

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
        />
        <MetricCard
          title="Tasa de Conversión"
          value={kpis.tasaConversion}
          suffix="%"
        />
        <MetricCard title="Órdenes Canceladas" value={kpis.ordenesCanceladas} />
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
