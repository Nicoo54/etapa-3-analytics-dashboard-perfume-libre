"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatNumber } from "@/lib/utils";

const chartConfig = {
  despachados: { label: "Paquetes Despachados", color: "hsl(var(--primary))" },
};

export function ShippingVolumeChart({
  data,
  title,
}: {
  data: any[];
  title: string;
}) {
  return (
    <Card className="col-span-3 mt-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorEnvios" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--primary)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--primary)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
              />
              <XAxis
                dataKey="dia"
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
                    labelClassName="font-medium text-foreground"
                    className="text-muted-foreground"
                    formatter={(value, name) => (
                      <>
                        <div
                          className="h-2.5 w-2.5 shrink-0 rounded-xs bg-(--color-bg)"
                          style={
                            {
                              "--color-bg": `var(--primary)`,
                            } as React.CSSProperties
                          }
                        />
                        {chartConfig[name as keyof typeof chartConfig]?.label ||
                          name}
                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                          {formatNumber(Number(value))}
                        </div>
                      </>
                    )}
                  />
                }
                labelFormatter={(label) => (
                  <span className="font-medium text-foreground">{label}</span>
                )}
              />
              <Area
                type="monotone"
                dataKey="despachados"
                stroke="var(--primary)"
                strokeWidth={2}
                fill="url(#colorEnvios)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
