"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Star } from "lucide-react";

const chartConfig = {
  cantidad: { label: "Cantidad de Reseñas", color: "var(--chart-5)" },
};

// Este componente se utiliza para mostrar las marcas del eje Y
// con un icono de estrella para cada valor de calificación.
const CustomYAxisTick = ({ x, y, payload }: any) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={-20}
        y={4}
        textAnchor="end"
        className="fill-muted-foreground text-xs font-semibold"
      >
        {payload.value}
      </text>

      <foreignObject x={-16} y={-8} width={16} height={16}>
        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
      </foreignObject>
    </g>
  );
};

export function RatingDistributionChart({ data }: { data: any[] }) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Distribución de Calificaciones</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ left: 10, right: 10 }}
            >
              <XAxis type="number" hide />
              <YAxis
                dataKey="estrellas"
                type="category"
                tickLine={false}
                axisLine={false}
                width={45}
                tick={<CustomYAxisTick />}
              />
              <ChartTooltip
                cursor={{ fill: "var(--muted)", opacity: 0.4 }}
                content={
                  <ChartTooltipContent
                    hideLabel
                    indicator="dot"
                    className="w-45"
                  />
                }
              />
              <Bar
                dataKey="cantidad"
                fill="var(--color-cantidad)"
                radius={[0, 4, 4, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
