import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface MetricCardProps {
  title: string;
  value: string | number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  icon?: React.ReactNode;
  description?: React.ReactNode;
}

export function MetricCard({
  title,
  value,
  prefix = "",
  suffix = "",
  icon,
  description,
}: MetricCardProps) {
  return (
    <Card className="border-border/50 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-primary/30">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold flex items-center gap-1.5 text-foreground">
          {prefix}
          <span>{value}</span>
          {suffix}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
