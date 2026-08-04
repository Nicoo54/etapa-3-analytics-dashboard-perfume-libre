import {
  getUsuariosKPIs,
  getCrecimientoUsuariosData,
  getCompradoresVsVendedoresData,
  getTopCompradores,
} from "@/lib/api/usuariosData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserGrowthChart } from "@/components/usuarios/UserGrowthChart";
import { RolesComparisonChart } from "@/components/usuarios/RolesComparisonChart";
import { TopBuyersTable } from "@/components/usuarios/TopBuyersTable";

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
        />
        <MetricCard
          title="Nuevos este mes"
          value={kpis.nuevosEsteMes}
          prefix="+"
        />
        <MetricCard
          title="Compradores Recurrentes"
          value={kpis.compradoresRecurrentes.toLocaleString("es-AR")}
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
