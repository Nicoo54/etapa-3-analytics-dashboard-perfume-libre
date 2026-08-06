"use client";

import { Pie, PieChart, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const COLORS = [
  "var(--color-chart-preparing)",
  "var(--primary)",
  "var(--color-chart-transit)",
  "var(--color-chart-delivered)",
];

export function ShippingStatusDonut({ data }: { data: any[] }) {
  const chartData = data.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  }));

  const dynamicConfig = chartData.reduce(
    (config, item, index) => {
      config[item.estado] = {
        label: item.estado,
        color: COLORS[index % COLORS.length],
      };
      return config;
    },
    {} as Record<string, { label: string; color: string }>,
  );

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Distribución de Estados</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={dynamicConfig} className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    hideLabel
                    nameKey="estado"
                    indicator="dot"
                    className="w-40"
                  />
                }
              />
              <Pie
                data={chartData}
                dataKey="cantidad"
                nameKey="estado"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
              />
              <ChartLegend
                layout="vertical"
                align="center"
                verticalAlign="bottom"
                content={<ChartLegendContent nameKey="estado" />}
                className="flex-wrap justify-center gap-4 mt-6 text-sm"
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
