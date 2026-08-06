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

const chartConfig = {
  completada: { label: "Completada", color: "var(--primary)" },
  en_curso: { label: "En Curso", color: "var(--muted-foreground)" },
  cancelada: { label: "Cancelada", color: "var(--destructive)" },
};

interface OrderStatusChartProps {
  data: { estado: string; cantidad: number; fill: string }[];
}

export function OrderStatusChart({ data }: OrderStatusChartProps) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Estado de Órdenes</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                cursor={false}
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
                data={data}
                dataKey="cantidad"
                nameKey="estado"
                cx="55%"
                cy="50%"
                innerRadius={55}
                outerRadius={75}
                paddingAngle={5}
              />
              <ChartLegend
                layout="vertical"
                align="left"
                verticalAlign="middle"
                content={<ChartLegendContent nameKey="estado" />}
                className="flex-col items-start gap-2 text-sm pr-2"
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
