import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/layout/Sidebar";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { DateRangeFilter } from "@/components/layout/DateRangeFilter";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Analytics Dashboard",
  description: "Métricas y reportes globales del ecosistema",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={cn("font-sans", inter.variable)}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground font-sans antialiased flex h-screen overflow-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Sidebar />

          <div className="flex-1 flex flex-col h-screen overflow-hidden">
            <header className="h-16 bg-sidebar border-b border-border flex items-center justify-between px-8 transition-all">
              <h2 className="text-lg font-semibold text-foreground">
                Panel de Control
              </h2>
              <div className="flex items-center space-x-4">
                <DateRangeFilter />
                <button className="bg-primary text-primary-foreground px-4 py-1.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
                  Exportar
                </button>
              </div>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar p-8 bg-muted/20 border-t border-l border-border/50 shadow-inner">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
