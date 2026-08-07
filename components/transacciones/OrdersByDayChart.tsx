"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  ordenes: { label: "Volumen de Órdenes", color: "var(--primary)" },
};

export function OrdersByDayChart({
  data,
  title = "Órdenes por Días",
}: {
  data: any[];
  title?: string;
}) {
  const formatTick = (value: string) => {
    if (!value) return "";

    if (value.toLowerCase().includes("semana")) {
      return value.replace("Semana ", "Sem ");
    }

    if (/^\d+[\/\-]\d+/.test(value)) {
      return value;
    }

    if (value.length <= 4) {
      return value;
    }

    return value.substring(0, 3);
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, bottom: 20 }}>
              <XAxis
                dataKey="fecha"
                stroke="currentColor"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
                tickFormatter={formatTick}
                dy={10}
              />
              <YAxis
                stroke="currentColor"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
                width={30}
              />
              <ChartTooltip
                cursor={{ fill: "var(--muted)", opacity: 0.4 }}
                content={
                  <ChartTooltipContent
                    hideLabel
                    indicator="dot"
                    className="w-40"
                  />
                }
              />
              <Bar
                dataKey="ordenes"
                fill="var(--color-ordenes)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
