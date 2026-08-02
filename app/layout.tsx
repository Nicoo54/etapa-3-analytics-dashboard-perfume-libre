import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/Sidebar";

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
    <html lang="es" className={cn("font-sans", inter.variable)}>
      <body className="bg-background text-foreground font-sans antialiased flex h-screen overflow-hidden">
        <aside className="w-64 bg-sidebar border-r border-border flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-border">
            <h1 className="text-xl font-bold text-primary">Analytics</h1>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Sidebar />
          </nav>
        </aside>

        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="h-16 bg-background border-b border-border flex items-center justify-between px-8">
            <h2 className="text-lg font-semibold text-foreground">
              Panel de Control
            </h2>
            <div className="flex items-center space-x-4">
              <select className="bg-background text-foreground border border-input rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Últimos 30 días</option>
                <option>Últimos 7 días</option>
                <option>Este mes</option>
              </select>

              <button className="bg-primary text-foreground px-4 py-1.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
                Exportar
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
