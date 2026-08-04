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

export default async function EnviosPage() {
  const [kpis, estadosData, operadorData, volumenData] = await Promise.all([
    getEnviosKPIs(),
    getDistribucionEstados(),
    getEnviosPorOperador(),
    getVolumenEnviosDia(),
  ]);

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
        <MetricCard title="Paquetes en Tránsito" value={kpis.enTransito} />
        <MetricCard title="Entregados Hoy" value={kpis.entregadosHoy} />
        <MetricCard
          title="Tiempo Promedio de Entrega"
          value={kpis.tiempoPromedio}
          suffix={
            <span className="text-base font-normal text-muted-foreground">
              días
            </span>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        <ShippingStatusDonut data={estadosData} />
        <CarrierBarChart data={operadorData} />
      </div>

      <div className="mt-8">
        <ShippingVolumeChart data={volumenData} />
      </div>
    </div>
  );
}
