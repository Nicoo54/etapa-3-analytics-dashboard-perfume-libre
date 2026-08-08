"use client";

// -------------------------------------------------------------------------
// Referencia de codigo: Diseño del gráfico y Tooltip adaptados de shadcn/ui.
// Fuente: https://ui.shadcn.com/charts/tooltip#charts
// El codigo tomado de referencia es el de Tooltip - Advanced
// -------------------------------------------------------------------------

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatCurrency } from "@/lib/utils";

interface OverviewChartProps {
  data: { nombre: string; revenue: number }[];
}

const chartConfig = {
  revenue: {
    label: "Ingresos",
    color: "var(--primary)",
  },
};

export function OverviewChart({ data }: OverviewChartProps) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Ingresos de la última semana</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey="fecha"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}$`}
              />
              <ChartTooltip
                cursor={{ style: { fill: "var(--primary)", opacity: 0.1 } }}
                content={
                  <ChartTooltipContent
                    labelClassName="font-medium text-foreground"
                    className="text-muted-foreground"
                    formatter={(value, name) => (
                      <>
                        <div
                          className="h-2.5 w-2.5 shrink-0 rounded-xs bg-(--color-bg)"
                          style={
                            {
                              "--color-bg": `var(--color-${name})`,
                            } as React.CSSProperties
                          }
                        />
                        {chartConfig[name as keyof typeof chartConfig]?.label ||
                          name}
                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                          {formatCurrency(Number(value))}
                        </div>
                      </>
                    )}
                  />
                }
                labelFormatter={(label) => (
                  <span className="font-medium text-foreground">{label}</span>
                )}
              />
              <Bar
                dataKey="revenue"
                fill="var(--color-revenue)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
