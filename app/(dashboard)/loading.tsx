import { Loader2 } from "lucide-react";

export default function LoadingDashboard() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Skeleton del Título */}
      <div>
        <div className="h-8 w-48 bg-muted-foreground/20 rounded-md mb-2"></div>
        <div className="h-4 w-96 bg-muted-foreground/10 rounded-md"></div>
      </div>

      {/* Skeleton de las KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-6 rounded-xl border border-border bg-card/50 h-32 flex flex-col justify-center"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="h-4 w-24 bg-muted-foreground/20 rounded"></div>
              <div className="h-4 w-4 bg-muted-foreground/20 rounded-full"></div>
            </div>
            <div className="h-8 w-32 bg-muted-foreground/20 rounded"></div>
          </div>
        ))}
      </div>

      {/* Skeletons de los Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
        <div className="p-6 rounded-xl border border-border bg-card/50 h-80 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-muted-foreground/30 animate-spin" />
        </div>
        <div className="p-6 rounded-xl border border-border bg-card/50 h-80 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-muted-foreground/30 animate-spin" />
        </div>
      </div>
    </div>
  );
}
