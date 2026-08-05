"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  cantidad: { label: "Cantidad de Reseñas", color: "hsl(var(--primary))" },
};

export function RatingDistributionChart({ data }: { data: any[] }) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Distribución (1 a 5 estrellas)</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" hide />
              <YAxis
                dataKey="estrellas"
                type="category"
                stroke="#888888"
                fontSize={14}
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    nameKey="estado"
                    indicator="dot"
                    className="w-40"
                  />
                }
              />
              <Bar
                dataKey="cantidad"
                fill="#fbbf24"
                radius={[0, 4, 4, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
