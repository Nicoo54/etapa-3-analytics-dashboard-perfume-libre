import {
  getUsuariosKPIs,
  getCrecimientoUsuariosData,
  getCompradoresVsVendedoresData,
  getTopCompradores,
} from "@/lib/api/usuariosData";
import { UserGrowthChart } from "@/components/usuarios/UserGrowthChart";
import { RolesComparisonChart } from "@/components/usuarios/RolesComparisonChart";
import { TopBuyersTable } from "@/components/usuarios/TopBuyersTable";
import { MetricCard } from "@/components/MetricCard";
import { DollarSign, UserCheck, UserPlus, Users } from "lucide-react";
import { getDateRangeLabel } from "@/lib/utils";

export default async function UsuariosPage({
  searchParams,
}: {
  searchParams: Promise<{ rango?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const rango = resolvedSearchParams?.rango || "30d";

  const [kpis, crecimientoData, rolesData, topCompradores] = await Promise.all([
    getUsuariosKPIs(rango),
    getCrecimientoUsuariosData(rango),
    getCompradoresVsVendedoresData(rango),
    getTopCompradores(),
  ]);

  const esHistorico = rango === "all";

  let labelNuevosUsuarios = "";
  let labelGraficoCrecimiento = "Crecimiento de usuarios historico";
  let labelGraficoActividad = "Actividad por rol historico  ";
  const labelRango = getDateRangeLabel(rango);

  const labelCompradoresRecurrentes = `Compradores recurrentes ${labelRango}`;

  if (rango === "7d") {
    labelNuevosUsuarios = "Nuevos usuarios esta semana";
    labelGraficoCrecimiento = "Crecimiento de usuarios de la ultima semana";
    labelGraficoActividad = "Actividad por rol de la ultima semana";
  }
  if (rango === "30d") {
    labelNuevosUsuarios = "Nuevos usuarios en los ultimos 30 días";
    labelGraficoCrecimiento = "Crecimiento de usuarios en los ultimos 30 días";
    labelGraficoActividad = "Actividad por rol de los ultimos 30 días";
  }
  if (rango === "mes_actual") {
    labelNuevosUsuarios = "Nuevos usuarios este mes";
    labelGraficoCrecimiento = "Crecimiento de usuarios este mes";
    labelGraficoActividad = "Actividad por rol de este mes";
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Usuarios</h1>
        <p className="text-muted-foreground text-sm">
          Métricas de retención, roles y crecimiento en la plataforma.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Total Usuarios Registrados"
          value={kpis.totalUsuarios.toLocaleString("es-AR")}
          icon={<Users className="w-4 h-4" />}
        />
        {esHistorico ? (
          <MetricCard
            title="Valor de Vida del Cliente (LTV)"
            value={`$${(kpis.ltv || 0).toLocaleString("es-AR")}`}
            icon={<DollarSign className="w-4 h-4" />}
          />
        ) : (
          <MetricCard
            title={labelNuevosUsuarios}
            value={kpis.nuevosUsuarios ?? 0}
            prefix="+"
            icon={<UserPlus className="w-4 h-4" />}
          />
        )}
        <MetricCard
          title={labelCompradoresRecurrentes}
          value={kpis.compradoresRecurrentes.toLocaleString("es-AR")}
          icon={<UserCheck className="w-4 h-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        <UserGrowthChart
          data={crecimientoData}
          title={labelGraficoCrecimiento}
        />
        <RolesComparisonChart data={rolesData} title={labelGraficoActividad} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        <TopBuyersTable data={topCompradores} />
      </div>
    </div>
  );
}
