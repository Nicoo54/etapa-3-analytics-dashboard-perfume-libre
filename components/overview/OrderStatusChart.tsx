"use client";

import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
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
        <ChartContainer config={chartConfig} className="h-75 w-full">
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
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
