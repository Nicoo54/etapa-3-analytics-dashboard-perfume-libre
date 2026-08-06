"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowRightLeft,
  Users,
  Package,
  Star,
  Truck,
  LogOut,
  Sun,
  Moon,
  UserCircle,
  Activity,
  ChevronsLeft,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";

const navItems = [
  { href: "/general", label: "General", icon: LayoutDashboard },
  { href: "/transacciones", label: "Transacciones", icon: ArrowRightLeft },
  { href: "/usuarios", label: "Usuarios", icon: Users },
  { href: "/productos", label: "Productos", icon: Package },
  { href: "/calificaciones", label: "Calificaciones", icon: Star },
  { href: "/envios", label: "Envíos", icon: Truck },
];

export function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div
        className={`shrink-0 h-screen transition-all duration-300 ${
          expanded ? "w-64" : "w-18"
        }`}
      />

      <aside
        onClick={() => setExpanded((prev) => !prev)}
        className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-border transition-all duration-300 ease-in-out overflow-hidden z-50 flex flex-col cursor-pointer ${
          expanded ? "w-64" : "w-18"
        }`}
      >
        {expanded && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(false);
            }}
            className="absolute right-2.5 top-5.5 w-6 h-6 flex items-center justify-center rounded-md bg-muted text-muted-foreground hover:bg-primary/15 hover:text-primary transition-colors z-10"
            aria-label="Contraer sidebar"
          >
            <ChevronsLeft className="h-3.5 w-3.5" />
          </button>
        )}

        {/* Header / Logo del Sidebar */}
        <div className="h-16 flex items-center px-4 border-b border-border min-w-[256px]">
          <div className="w-10 h-10 flex items-center justify-center shrink-0">
            <Activity className="h-7 w-7 text-primary" />
          </div>
          <h1
            className={`text-xl font-bold text-primary ml-3 whitespace-nowrap transition-opacity duration-300 ${
              expanded ? "opacity-100" : "opacity-0"
            }`}
          >
            Analytics
          </h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 min-w-[256px]">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => e.stopPropagation()}
                className={`flex items-center rounded-lg whitespace-nowrap transition-colors ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                } ${
                  expanded
                    ? isActive
                      ? "bg-primary/15"
                      : "hover:bg-muted hover:text-foreground"
                    : ""
                }`}
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-lg shrink-0 transition-colors ${
                    !expanded && isActive ? "bg-primary/15" : ""
                  } ${!expanded ? "hover:bg-muted" : ""}`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <span
                  className={`text-sm whitespace-nowrap transition-opacity duration-300 ${
                    expanded ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer del Sidebar */}
        <div className="border-t border-border p-4 space-y-2 min-w-[256px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setTheme(theme === "dark" ? "light" : "dark");
            }}
            className={`w-full flex items-center rounded-lg whitespace-nowrap text-muted-foreground transition-colors ${
              expanded ? "hover:bg-muted hover:text-foreground" : ""
            }`}
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-lg shrink-0 transition-colors ${
                !expanded ? "hover:bg-muted" : ""
              }`}
            >
              <Sun className="h-5 w-5 dark:hidden" />
              <Moon className="h-5 w-5 hidden dark:block" />
            </div>
            <span
              className={`text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${
                expanded ? "opacity-100" : "opacity-0"
              }`}
            >
              Cambiar Tema
            </span>
          </button>

          <Link
            href="/perfil"
            onClick={(e) => e.stopPropagation()}
            className={`flex items-center rounded-lg whitespace-nowrap text-muted-foreground transition-colors ${
              expanded ? "hover:bg-muted hover:text-foreground" : ""
            }`}
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-lg shrink-0 transition-colors ${
                !expanded ? "hover:bg-muted" : ""
              }`}
            >
              <UserCircle className="h-5 w-5" />
            </div>
            <span
              className={`text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${
                expanded ? "opacity-100" : "opacity-0"
              }`}
            >
              Mi Perfil
            </span>
          </Link>

          <button
            onClick={(e) => e.stopPropagation()}
            className={`w-full flex items-center rounded-lg whitespace-nowrap text-red-500 transition-colors ${
              expanded ? "hover:bg-red-500/10 hover:text-red-600" : ""
            }`}
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-lg shrink-0 transition-colors ${
                !expanded ? "hover:bg-red-500/10" : ""
              }`}
            >
              <LogOut className="h-5 w-5" />
            </div>
            <span
              className={`text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${
                expanded ? "opacity-100" : "opacity-0"
              }`}
            >
              Cerrar Sesión
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
