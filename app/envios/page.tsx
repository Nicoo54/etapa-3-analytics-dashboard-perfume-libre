import {
  getEnviosKPIs,
  getDistribucionEstados,
  getEnviosPorOperador,
  getVolumenEnviosDia,
} from "@/lib/api/enviosData";
import { ShippingStatusDonut } from "@/components/envios/ShippingStatusDonut";
import { CarrierBarChart } from "@/components/envios/CarrierBarChart";
import { ShippingVolumeChart } from "@/components/envios/ShippingVolumeChart";
import { MetricCard } from "@/components/MetricCard";
import { Clock, PackageCheck, Truck } from "lucide-react";

export default async function EnviosPage({
  searchParams,
}: {
  searchParams: Promise<{ rango?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const rango = resolvedSearchParams?.rango || "30d";

  const [kpis, estadosData, operadorData, volumenData] = await Promise.all([
    getEnviosKPIs(rango),
    getDistribucionEstados(rango),
    getEnviosPorOperador(rango),
    getVolumenEnviosDia(rango),
  ]);

  let entregadosLabel = "Entregados (Últimos 30 días)";
  let distTitle = "Distribución de Estados";
  let opTitle = "Envíos por Operador";
  let volTitle = "Volumen de Envíos";

  if (rango === "7d") {
    entregadosLabel = "Entregados (Últimos 7 días)";
    distTitle = "Estados (Últimos 7 días)";
    opTitle = "Operadores (Últimos 7 días)";
    volTitle = "Volumen Semanal";
  } else if (rango === "mes_actual") {
    entregadosLabel = "Entregados (Este mes)";
    distTitle = "Estados (Este mes)";
    opTitle = "Operadores (Este mes)";
    volTitle = "Volumen Mensual";
  } else if (rango === "all") {
    entregadosLabel = "Entregados (Histórico)";
    distTitle = "Estados (Histórico)";
    opTitle = "Operadores (Histórico)";
    volTitle = "Volumen Histórico";
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">
          Logística y Envíos
        </h1>
        <p className="text-muted-foreground text-sm">
          Monitoreo de despachos, tiempos de entrega y distribución de carga.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Paquetes en Tránsito"
          value={kpis.enTransito}
          icon={<Truck className="w-4 h-4" />}
        />
        <MetricCard
          title={entregadosLabel}
          value={kpis.entregados}
          icon={<PackageCheck className="w-4 h-4" />}
        />
        <MetricCard
          title="Tiempo Promedio de Entrega"
          value={kpis.tiempoPromedio}
          suffix={
            <span className="text-base font-normal text-muted-foreground">
              días
            </span>
          }
          icon={<Clock className="w-4 h-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        <ShippingStatusDonut data={estadosData} title={distTitle} />
        <CarrierBarChart data={operadorData} title={opTitle} />
      </div>

      <div className="mt-8">
        <ShippingVolumeChart data={volumenData} title={volTitle} />
      </div>
    </div>
  );
}
