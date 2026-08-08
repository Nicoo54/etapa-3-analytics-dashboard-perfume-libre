export interface MetricWithTrend {
  valor: number;
  tendencia: number | null;
}

export type OverviewMetrics = {
  totalOrdenes: MetricWithTrend;
  revenueTotal: MetricWithTrend;
  usuariosActivos: MetricWithTrend;
  calificacionPromedio: number;
};

export async function getOverviewMetricas(
  rango: string = "30d",
): Promise<OverviewMetrics> {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    await new Promise((resolve) => setTimeout(resolve, 800));

    switch (rango) {
      case "7d":
        return {
          totalOrdenes: { valor: 320, tendencia: 5.2 },
          revenueTotal: { valor: 12500, tendencia: -2.1 },
          usuariosActivos: { valor: 85, tendencia: 12.0 },
          calificacionPromedio: 4.6,
        };
      case "mes_actual":
        return {
          totalOrdenes: { valor: 850, tendencia: 15.4 },
          revenueTotal: { valor: 31000, tendencia: 8.9 },
          usuariosActivos: { valor: 210, tendencia: 5.5 },
          calificacionPromedio: 4.6,
        };
      case "all":
        return {
          totalOrdenes: { valor: 5420, tendencia: null },
          revenueTotal: { valor: 254000, tendencia: null },
          usuariosActivos: { valor: 1240, tendencia: null },
          calificacionPromedio: 4.6,
        };
      case "30d":
      default:
        return {
          totalOrdenes: { valor: 1248, tendencia: 12.5 },
          revenueTotal: { valor: 45200.5, tendencia: 20.1 },
          usuariosActivos: { valor: 342, tendencia: -3.4 },
          calificacionPromedio: 4.6,
        };
    }
  }

  try {
    const [ordenesRes, usuariosRes, feedbackRes] = await Promise.all([
      fetch(
        `https://buyer-app.vercel.app/api/admin/ordenes/metricas?rango=${rango}`,
      ),
      fetch(
        `https://buyer-app.vercel.app/api/admin/usuarios/activos?rango=${rango}`,
      ),
      fetch(
        `https://feedback-app.vercel.app/api/admin/calificaciones/promedio?rango=${rango}`,
      ),
    ]);

    const ordenes = await ordenesRes.json();
    const usuarios = await usuariosRes.json();
    const feedback = await feedbackRes.json();

    return {
      totalOrdenes: { valor: ordenes.total, tendencia: ordenes.tendencia },
      revenueTotal: {
        valor: ordenes.revenue,
        tendencia: ordenes.tendenciaRevenue,
      },
      usuariosActivos: { valor: usuarios.total, tendencia: usuarios.tendencia },
      calificacionPromedio: feedback.promedio,
    };
  } catch (error) {
    console.error("Error obteniendo métricas reales:", error);
    return {
      totalOrdenes: { valor: 0, tendencia: null },
      revenueTotal: { valor: 0, tendencia: null },
      usuariosActivos: { valor: 0, tendencia: null },
      calificacionPromedio: 0,
    };
  }
}

export async function getRevenueData(rango: string = "30d") {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    await new Promise((resolve) => setTimeout(resolve, 600));

    switch (rango) {
      case "7d":
        return [
          { fecha: "Lun", revenue: 4500 },
          { fecha: "Mar", revenue: 5200 },
          { fecha: "Mié", revenue: 3800 },
          { fecha: "Jue", revenue: 6100 },
          { fecha: "Vie", revenue: 7500 },
          { fecha: "Sáb", revenue: 8200 },
          { fecha: "Dom", revenue: 6900 },
        ];

      case "mes_actual":
        return [
          { fecha: "Semana 1", revenue: 12000 },
          { fecha: "Semana 2", revenue: 15500 },
          { fecha: "Semana 3", revenue: 14200 },
          { fecha: "Semana 4", revenue: 18000 },
        ];

      case "all":
        return [
          { fecha: "Ene", revenue: 45000 },
          { fecha: "Feb", revenue: 52000 },
          { fecha: "Mar", revenue: 48000 },
          { fecha: "Abr", revenue: 61000 },
          { fecha: "May", revenue: 59000 },
          { fecha: "Jun", revenue: 75000 },
        ];

      case "30d":
      default:
        return [
          { fecha: "01-07", revenue: 18000 },
          { fecha: "08-14", revenue: 21500 },
          { fecha: "15-21", revenue: 19800 },
          { fecha: "22-28", revenue: 24200 },
          { fecha: "29-30", revenue: 8100 },
        ];
    }
  }

  try {
    const res = await fetch(
      `https://buyer-app.vercel.app/api/admin/ordenes/serie-temporal?rango=${rango}`,
    );

    if (!res.ok) throw new Error("API error");

    return await res.json();
  } catch (error) {
    console.error("Error obteniendo revenue:", error);
    return [];
  }
}

export async function getOrderStatusData(rango: string = "30d") {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    await new Promise((resolve) => setTimeout(resolve, 600));

    switch (rango) {
      case "7d":
        return [
          {
            estado: "completada",
            cantidad: 85,
            fill: "var(--color-completada)",
          },
          { estado: "en_curso", cantidad: 45, fill: "var(--color-en_curso)" },
          { estado: "cancelada", cantidad: 5, fill: "var(--color-cancelada)" },
        ];
      case "mes_actual":
        return [
          {
            estado: "completada",
            cantidad: 210,
            fill: "var(--color-completada)",
          },
          { estado: "en_curso", cantidad: 90, fill: "var(--color-en_curso)" },
          { estado: "cancelada", cantidad: 12, fill: "var(--color-cancelada)" },
        ];
      case "all":
        return [
          {
            estado: "completada",
            cantidad: 4500,
            fill: "var(--color-completada)",
          },
          { estado: "en_curso", cantidad: 320, fill: "var(--color-en_curso)" },
          {
            estado: "cancelada",
            cantidad: 150,
            fill: "var(--color-cancelada)",
          },
        ];
      case "30d":
      default:
        return [
          {
            estado: "completada",
            cantidad: 350,
            fill: "var(--color-completada)",
          },
          { estado: "en_curso", cantidad: 120, fill: "var(--color-en_curso)" },
          { estado: "cancelada", cantidad: 30, fill: "var(--color-cancelada)" },
        ];
    }
  }

  try {
    const res = await fetch(
      `https://buyer-app.vercel.app/api/admin/metricas/ordenes/por-estado?rango=${rango}`,
    );

    if (!res.ok) throw new Error("API error");

    const data = await res.json();

    return Object.entries(data).map(([key, value]) => ({
      estado: key,
      cantidad: Number(value),
      fill: `var(--color-${key})`,
    }));
  } catch (error) {
    console.error("Error obteniendo estados:", error);
    return [];
  }
}
