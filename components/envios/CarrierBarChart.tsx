"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  envios: { label: "Envíos Procesados", color: "var(--primary)" },
};

export function CarrierBarChart({
  data,
  title,
}: {
  data: any[];
  title: string;
}) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ left: 40, right: 20 }}
              barCategoryGap={12}
            >
              <XAxis type="number" hide />
              <YAxis
                dataKey="operador"
                type="category"
                stroke="currentColor"
                fontSize={13}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              <ChartTooltip
                cursor={{ fill: "var(--muted)", opacity: 0.4 }}
                content={
                  <ChartTooltipContent
                    hideLabel
                    indicator="dot"
                    className="w-60"
                    formatter={(value, name, item) => (
                      <div className="flex w-full flex-col gap-1">
                        <span className="font-semibold text-foreground text-[13px] leading-tight mb-1">
                          {item.payload.operador}
                        </span>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="h-2.5 w-2.5 shrink-0 rounded-full"
                              style={{
                                backgroundColor: `var(--color-${name})`,
                              }}
                            />
                            <span className="text-muted-foreground text-sm">
                              {chartConfig[name as keyof typeof chartConfig]
                                ?.label || name}
                            </span>
                          </div>
                          <div className="font-mono font-medium tabular-nums text-foreground">
                            {Number(value).toLocaleString("es-AR")}
                          </div>
                        </div>
                      </div>
                    )}
                  />
                }
              />
              <Bar
                dataKey="envios"
                fill="var(--color-envios)"
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
