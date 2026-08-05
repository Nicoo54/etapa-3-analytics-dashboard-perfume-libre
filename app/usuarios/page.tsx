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
import { UserCheck, UserPlus, Users } from "lucide-react";

export default async function UsuariosPage() {
  const [kpis, crecimientoData, rolesData, topCompradores] = await Promise.all([
    getUsuariosKPIs(),
    getCrecimientoUsuariosData(),
    getCompradoresVsVendedoresData(),
    getTopCompradores(),
  ]);

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
        <MetricCard
          title="Nuevos este mes"
          value={kpis.nuevosEsteMes}
          prefix="+"
          icon={<UserPlus className="w-4 h-4" />}
        />
        <MetricCard
          title="Compradores Recurrentes"
          value={kpis.compradoresRecurrentes.toLocaleString("es-AR")}
          icon={<UserCheck className="w-4 h-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        <UserGrowthChart data={crecimientoData} />
        <RolesComparisonChart data={rolesData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        <TopBuyersTable data={topCompradores} />
      </div>
    </div>
  );
}
