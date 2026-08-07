import {
  getCalificacionesKPIs,
  getDistribucionCalificaciones,
  getEvolucionPromedio,
  getVendedoresEnRiesgo,
} from "@/lib/api/calificacionesData";
import { RatingDistributionChart } from "@/components/calificaciones/RatingDistributionChart";
import { RatingEvolutionChart } from "@/components/calificaciones/RatingEvolutionChart";
import { SellersAtRiskTable } from "@/components/calificaciones/SellersAtRiskTable";
import { Flag, MessageSquare, Star, Trophy } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";

export default async function CalificacionesPage({
  searchParams,
}: {
  searchParams: Promise<{ rango?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const rango = resolvedSearchParams?.rango || "30d";

  const [kpis, distribucionData, evolucionData, riesgoData] = await Promise.all(
    [
      getCalificacionesKPIs(rango),
      getDistribucionCalificaciones(rango),
      getEvolucionPromedio(rango),
      getVendedoresEnRiesgo(rango),
    ],
  );

  let distTitle = "Distribución de Calificaciones";
  let evoTitle = "Evolución del Promedio";

  if (rango === "7d") {
    distTitle = "Distribución (Últimos 7 días)";
    evoTitle = "Evolución Semanal";
  } else if (rango === "mes_actual") {
    distTitle = "Distribución (Este mes)";
    evoTitle = "Evolución del Mes";
  } else if (rango === "all") {
    evoTitle = "Evolución Histórica";
  }

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
          title="Promedio"
          value={kpis.promedioGlobal.toFixed(1)}
          suffix={<Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
          icon={<Trophy className="w-4 h-4" />}
        />
        <MetricCard
          title="Total de Reseñas"
          value={kpis.totalResenas.toLocaleString("es-AR")}
          icon={<MessageSquare className="w-4 h-4" />}
        />
        <MetricCard
          title="Reportes Pendientes"
          value={kpis.reportesPendientes}
          icon={<Flag className="w-4 h-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        <RatingDistributionChart data={distribucionData} title={distTitle} />
        <RatingEvolutionChart data={evolucionData} title={evoTitle} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        <SellersAtRiskTable data={riesgoData} />
      </div>
    </div>
  );
}
