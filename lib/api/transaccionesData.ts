export async function getTransaccionesKPIs(rango: string = "30d") {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    switch (rango) {
      case "7d":
        return {
          ticketPromedio: 11200,
          tasaConversion: 3.5,
          ordenesCanceladas: 2,
        };
      case "mes_actual":
        return {
          ticketPromedio: 13100,
          tasaConversion: 3.0,
          ordenesCanceladas: 8,
        };
      case "all":
        return {
          ticketPromedio: 9800,
          tasaConversion: 2.8,
          ordenesCanceladas: 145,
        };
      case "30d":
      default:
        return {
          ticketPromedio: 12500,
          tasaConversion: 3.2,
          ordenesCanceladas: 14,
        };
    }
  }

  try {
    const res = await fetch(
      `https://buyer-app.vercel.app/api/admin/metricas/transacciones/kpis?rango=${rango}`,
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    console.error("Error obteniendo KPIs de transacciones:", error);
    return { ticketPromedio: 0, tasaConversion: 0, ordenesCanceladas: 0 };
  }
}

export async function getRevenueAcumuladoData(rango: string = "30d") {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    switch (rango) {
      case "7d":
        return [
          { fecha: "Lun", acumulado: 2000 },
          { fecha: "Mar", acumulado: 5500 },
          { fecha: "Mié", acumulado: 9000 },
          { fecha: "Jue", acumulado: 12500 },
          { fecha: "Vie", acumulado: 18000 },
          { fecha: "Sáb", acumulado: 24000 },
          { fecha: "Dom", acumulado: 28000 },
        ];
      case "mes_actual":
        return [
          { fecha: "Semana 1", acumulado: 35000 },
          { fecha: "Semana 2", acumulado: 80000 },
          { fecha: "Semana 3", acumulado: 110000 },
          { fecha: "Semana 4", acumulado: 155000 },
        ];
      case "all":
        return [
          { fecha: "Ene", acumulado: 150000 },
          { fecha: "Feb", acumulado: 320000 },
          { fecha: "Mar", acumulado: 550000 },
          { fecha: "Abr", acumulado: 890000 },
          { fecha: "May", acumulado: 1200000 },
          { fecha: "Jun", acumulado: 1540000 },
        ];
      case "30d":
      default:
        return [
          { fecha: "01/06", acumulado: 15000 },
          { fecha: "05/06", acumulado: 32000 },
          { fecha: "10/06", acumulado: 54000 },
          { fecha: "15/06", acumulado: 89000 },
          { fecha: "20/06", acumulado: 112000 },
          { fecha: "25/06", acumulado: 145000 },
        ];
    }
  }

  try {
    const res = await fetch(
      `https://buyer-app.vercel.app/api/admin/metricas/revenue-acumulado?rango=${rango}`,
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}

export async function getOrdenesPorDiaData(rango: string = "30d") {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    switch (rango) {
      case "7d":
        return [
          { fecha: "Lun", ordenes: 15 },
          { fecha: "Mar", ordenes: 22 },
          { fecha: "Mié", ordenes: 18 },
          { fecha: "Jue", ordenes: 30 },
          { fecha: "Vie", ordenes: 45 },
          { fecha: "Sáb", ordenes: 60 },
          { fecha: "Dom", ordenes: 50 },
        ];
      case "mes_actual":
        return [
          { fecha: "Semana 1", ordenes: 120 },
          { fecha: "Semana 2", ordenes: 180 },
          { fecha: "Semana 3", ordenes: 150 },
          { fecha: "Semana 4", ordenes: 210 },
        ];
      case "all":
        return [
          { fecha: "Ene", ordenes: 500 },
          { fecha: "Feb", ordenes: 650 },
          { fecha: "Mar", ordenes: 600 },
          { fecha: "Abr", ordenes: 800 },
          { fecha: "May", ordenes: 950 },
          { fecha: "Jun", ordenes: 1100 },
        ];
      case "30d":
      default:
        return [
          { fecha: "01/06", ordenes: 120 },
          { fecha: "05/06", ordenes: 95 },
          { fecha: "10/06", ordenes: 110 },
          { fecha: "15/06", ordenes: 140 },
          { fecha: "20/06", ordenes: 210 },
          { fecha: "25/06", ordenes: 250 },
        ];
    }
  }

  try {
    const res = await fetch(
      `https://buyer-app.vercel.app/api/admin/metricas/ordenes-por-dia?rango=${rango}`,
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}

export async function getUltimasOrdenes(
  rango: string = "30d",
  limit: number = 20,
) {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    const ordenesMock = [
      {
        id: "ORD-001",
        cliente: "Juan Pérez",
        fecha: "2026-06-25",
        monto: 15400,
        estado: "completada",
      },
      {
        id: "ORD-002",
        cliente: "María Gómez",
        fecha: "2026-06-25",
        monto: 8200,
        estado: "en_curso",
      },
      {
        id: "ORD-003",
        cliente: "Carlos Ruiz",
        fecha: "2026-06-24",
        monto: 21000,
        estado: "cancelada",
      },
      {
        id: "ORD-004",
        cliente: "Ana Silva",
        fecha: "2026-06-24",
        monto: 12300,
        estado: "completada",
      },
      {
        id: "ORD-005",
        cliente: "Luis Torres",
        fecha: "2026-06-23",
        monto: 9500,
        estado: "completada",
      },
    ];

    return ordenesMock;
  }

  try {
    const res = await fetch(
      `https://buyer-app.vercel.app/api/admin/ordenes/ultimas?limit=${limit}&rango=${rango}`,
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}
