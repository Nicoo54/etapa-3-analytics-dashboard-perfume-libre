import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface MetricCardProps {
  title: string;
  value: string | number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export function MetricCard({
  title,
  value,
  prefix = "",
  suffix = "",
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold flex items-center gap-1.5 text-foreground">
          {prefix}
          <span>{value}</span>
          {suffix}
        </div>
      </CardContent>
    </Card>
  );
}
