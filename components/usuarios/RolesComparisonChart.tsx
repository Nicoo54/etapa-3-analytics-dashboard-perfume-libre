"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  compradores: { label: "Compradores", color: "var(--chart-2)" },
  vendedores: { label: "Vendedores", color: "var(--chart-1)" },
};

export function RolesComparisonChart({ data }: { data: any[] }) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Actividad por Rol</CardTitle>
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
              />
              <ChartTooltip
                cursor={{ style: { fill: "var(--primary)", opacity: 0.1 } }}
                content={
                  <ChartTooltipContent
                    hideLabel
                    nameKey="estado"
                    indicator="dot"
                    className="w-40"
                  />
                }
              />
              <Legend verticalAlign="top" height={36} />
              <Bar
                dataKey="compradores"
                fill="var(--chart-2)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="vendedores"
                fill="var(--chart-1)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
