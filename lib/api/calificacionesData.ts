export async function getCalificacionesKPIs(rango: string = "30d") {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const reportesPendientes = 12;

    switch (rango) {
      case "7d":
        return { promedioResenas: 3.8, totalResenas: 145, reportesPendientes };
      case "mes_actual":
        return { promedioResenas: 4.1, totalResenas: 680, reportesPendientes };
      case "all":
        return {
          promedioResenas: 4.6,
          totalResenas: 15400,
          reportesPendientes,
        };
      case "30d":
      default:
        return { promedioResenas: 4.2, totalResenas: 1845, reportesPendientes };
    }
  }

  try {
    const res = await fetch(
      `https://feedback-app.vercel.app/api/admin/metricas/calificaciones/kpis?rango=${rango}`,
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return { promedioResenas: 0, totalResenas: 0, reportesPendientes: 0 };
  }
}

export async function getDistribucionCalificaciones(rango: string = "30d") {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    switch (rango) {
      case "7d":
        return [
          { estrellas: 5, cantidad: 45 },
          { estrellas: 4, cantidad: 20 },
          { estrellas: 3, cantidad: 15 },
          { estrellas: 2, cantidad: 10 },
          { estrellas: 1, cantidad: 55 },
        ];
      case "all":
        return [
          { estrellas: 5, cantidad: 9500 },
          { estrellas: 4, cantidad: 3200 },
          { estrellas: 3, cantidad: 1100 },
          { estrellas: 2, cantidad: 500 },
          { estrellas: 1, cantidad: 1100 },
        ];
      case "30d":
        return [
          { estrellas: 5, cantidad: 600 },
          { estrellas: 4, cantidad: 250 },
          { estrellas: 3, cantidad: 100 },
          { estrellas: 2, cantidad: 40 },
          { estrellas: 1, cantidad: 55 },
        ];
      case "mes_actual":
      default:
        return [
          { estrellas: 5, cantidad: 1100 },
          { estrellas: 4, cantidad: 450 },
          { estrellas: 3, cantidad: 180 },
          { estrellas: 2, cantidad: 65 },
          { estrellas: 1, cantidad: 50 },
        ];
    }
  }

  try {
    const res = await fetch(
      `https://feedback-app.vercel.app/api/admin/metricas/calificaciones/distribucion?rango=${rango}`,
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}

export async function getEvolucionPromedio(rango: string = "30d") {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    switch (rango) {
      case "7d":
        return [
          { mes: "Lun", promedio: 4.2 },
          { mes: "Mar", promedio: 4.3 },
          { mes: "Mié", promedio: 3.9 },
          { mes: "Jue", promedio: 3.5 },
          { mes: "Vie", promedio: 3.8 },
          { mes: "Sáb", promedio: 4.0 },
          { mes: "Dom", promedio: 4.1 },
        ];
      case "mes_actual":
        return [
          { mes: "Sem 1", promedio: 4.1 },
          { mes: "Sem 2", promedio: 4.3 },
          { mes: "Sem 3", promedio: 4.0 },
          { mes: "Sem 4", promedio: 4.2 },
        ];
      case "all":
      case "30d":
      default:
        return [
          { mes: "Ene", promedio: 3.8 },
          { mes: "Feb", promedio: 3.9 },
          { mes: "Mar", promedio: 4.1 },
          { mes: "Abr", promedio: 4.0 },
          { mes: "May", promedio: 4.2 },
          { mes: "Jun", promedio: 4.2 },
        ];
    }
  }

  try {
    const res = await fetch(
      `https://feedback-app.vercel.app/api/admin/metricas/calificaciones/evolucion?rango=${rango}`,
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}

export async function getVendedoresEnRiesgo() {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    const baseMock = [
      {
        id: "VEND-104",
        nombre: "Perfumes Express",
        promedio: 2.1,
        resenas: 45,
      },
      { id: "VEND-211", nombre: "Aromas del Sur", promedio: 2.4, resenas: 32 },
      {
        id: "VEND-089",
        nombre: "Boutique Fragance",
        promedio: 2.8,
        resenas: 112,
      },
    ];

    return baseMock;
  }

  try {
    const res = await fetch(
      `https://seller-app.vercel.app/api/admin/vendedores/riesgo`,
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}
