import { Sidebar } from "@/components/layout/Sidebar";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { DateRangeFilter } from "@/components/layout/DateRangeFilter";
import { ExportButton } from "@/components/layout/ExportButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-sidebar border-b border-border flex items-center justify-between px-8 transition-all">
          <h2 className="text-lg font-semibold text-foreground">
            Panel de Control
          </h2>
          <div className="flex items-center space-x-4">
            <DateRangeFilter />
            <ExportButton />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto no-scrollbar p-8 bg-muted/20 border-t border-l border-border/50 shadow-inner">
          {children}
        </main>
      </div>
    </div>
  );
}
