import {
  getCalificacionesKPIs,
  getDistribucionCalificaciones,
  getEvolucionPromedio,
  getVendedoresEnRiesgo,
} from "@/lib/api/calificacionesData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RatingDistributionChart } from "@/components/calificaciones/RatingDistributionChart";
import { RatingEvolutionChart } from "@/components/calificaciones/RatingEvolutionChart";
import { SellersAtRiskTable } from "@/components/calificaciones/SellersAtRiskTable";
import { Star } from "lucide-react";

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

export default async function CalificacionesPage() {
  const [kpis, distribucionData, evolucionData, riesgoData] = await Promise.all(
    [
      getCalificacionesKPIs(),
      getDistribucionCalificaciones(),
      getEvolucionPromedio(),
      getVendedoresEnRiesgo(),
    ],
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">
          Feedback y Calidad
        </h1>
        <p className="text-muted-foreground text-sm">
          Monitoreo de la satisfacción del usuario y reputación de vendedores.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Promedio Global"
          value={kpis.promedioGlobal.toFixed(1)}
          suffix={<Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
        />
        <MetricCard
          title="Total de Reseñas"
          value={kpis.totalResenas.toLocaleString("es-AR")}
        />
        <MetricCard
          title="Reportes Pendientes (Moderación)"
          value={kpis.reportesPendientes}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        <RatingDistributionChart data={distribucionData} />
        <RatingEvolutionChart data={evolucionData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        <SellersAtRiskTable data={riesgoData} />
      </div>
    </div>
  );
}
