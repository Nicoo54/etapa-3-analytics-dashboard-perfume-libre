export async function getUsuariosKPIs(rango: string = "30d") {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    switch (rango) {
      case "7d":
        return {
          totalUsuarios: 1250,
          nuevosEsteMes: 25,
          compradoresRecurrentes: 310,
        };
      case "mes_actual":
        return {
          totalUsuarios: 1250,
          nuevosEsteMes: 85,
          compradoresRecurrentes: 340,
        };
      case "all":
        return {
          totalUsuarios: 1500,
          nuevosEsteMes: 120,
          compradoresRecurrentes: 340,
        };
      case "30d":
      default:
        return {
          totalUsuarios: 1250,
          nuevosEsteMes: 92,
          compradoresRecurrentes: 340,
        };
    }
  }

  try {
    const res = await fetch(
      `https://buyer-app.vercel.app/api/admin/metricas/usuarios/kpis?rango=${rango}`,
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    console.error("Error obteniendo KPIs de usuarios:", error);
    return { totalUsuarios: 0, nuevosEsteMes: 0, compradoresRecurrentes: 0 };
  }
}

export async function getCrecimientoUsuariosData(rango: string = "30d") {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    switch (rango) {
      case "7d":
        return [
          { fecha: "Lun", usuarios: 1220 },
          { fecha: "Mar", usuarios: 1225 },
          { fecha: "Mié", usuarios: 1230 },
          { fecha: "Jue", usuarios: 1238 },
          { fecha: "Vie", usuarios: 1242 },
          { fecha: "Sáb", usuarios: 1248 },
          { fecha: "Dom", usuarios: 1250 },
        ];
      case "mes_actual":
        return [
          { fecha: "Semana 1", usuarios: 1180 },
          { fecha: "Semana 2", usuarios: 1205 },
          { fecha: "Semana 3", usuarios: 1230 },
          { fecha: "Semana 4", usuarios: 1250 },
        ];
      case "all":
        return [
          { fecha: "Ene", usuarios: 500 },
          { fecha: "Feb", usuarios: 700 },
          { fecha: "Mar", usuarios: 850 },
          { fecha: "Abr", usuarios: 1050 },
          { fecha: "May", usuarios: 1150 },
          { fecha: "Jun", usuarios: 1250 },
        ];
      case "30d":
      default:
        return [
          { fecha: "01/06", usuarios: 1000 },
          { fecha: "05/06", usuarios: 1100 },
          { fecha: "10/06", usuarios: 1200 },
          { fecha: "15/06", usuarios: 1300 },
          { fecha: "20/06", usuarios: 1400 },
          { fecha: "25/06", usuarios: 1500 },
        ];
    }
  }

  try {
    const res = await fetch(
      `https://buyer-app.vercel.app/api/admin/metricas/usuarios/crecimiento?rango=${rango}`,
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}

export async function getCompradoresVsVendedoresData(rango: string = "30d") {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    switch (rango) {
      case "7d":
        return [
          { fecha: "Lun", compradores: 900, vendedores: 110 },
          { fecha: "Mar", compradores: 902, vendedores: 110 },
          { fecha: "Mié", compradores: 905, vendedores: 110 },
          { fecha: "Jue", compradores: 908, vendedores: 110 },
          { fecha: "Vie", compradores: 910, vendedores: 110 },
          { fecha: "Sáb", compradores: 910, vendedores: 110 },
          { fecha: "Dom", compradores: 910, vendedores: 110 },
        ];
      case "mes_actual":
        return [
          { fecha: "Sem 1", compradores: 840, vendedores: 95 },
          { fecha: "Sem 2", compradores: 865, vendedores: 100 },
          { fecha: "Sem 3", compradores: 890, vendedores: 105 },
          { fecha: "Sem 4", compradores: 910, vendedores: 110 },
        ];
      case "all":
        return [
          { fecha: "Ene", compradores: 300, vendedores: 40 },
          { fecha: "Feb", compradores: 450, vendedores: 55 },
          { fecha: "Mar", compradores: 580, vendedores: 70 },
          { fecha: "Abr", compradores: 750, vendedores: 85 },
          { fecha: "May", compradores: 820, vendedores: 90 },
          { fecha: "Jun", compradores: 910, vendedores: 110 },
        ];
      case "30d":
      default:
        return [
          { fecha: "01/06", compradores: 800, vendedores: 100 },
          { fecha: "05/06", compradores: 850, vendedores: 105 },
          { fecha: "10/06", compradores: 900, vendedores: 110 },
          { fecha: "15/06", compradores: 950, vendedores: 115 },
          { fecha: "20/06", compradores: 1000, vendedores: 120 },
          { fecha: "25/06", compradores: 1050, vendedores: 125 },
        ];
    }
  }

  try {
    const res = await fetch(
      `https://buyer-app.vercel.app/api/admin/metricas/usuarios/roles?rango=${rango}`,
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}

export async function getTopCompradores(rango: string = "30d") {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    const baseMock = [
      {
        id: "USR-01",
        nombre: "Martín López",
        email: "martin@email.com",
        ordenes: 12,
        gastado: 245000,
      },
      {
        id: "USR-02",
        nombre: "Sofía Martínez",
        email: "sofia@email.com",
        ordenes: 8,
        gastado: 180500,
      },
      {
        id: "USR-03",
        nombre: "Diego Fernández",
        email: "diego@email.com",
        ordenes: 15,
        gastado: 150000,
      },
      {
        id: "USR-04",
        nombre: "Lucía Gómez",
        email: "lucia@email.com",
        ordenes: 5,
        gastado: 95000,
      },
      {
        id: "USR-05",
        nombre: "Carlos Tevez",
        email: "carlos@email.com",
        ordenes: 3,
        gastado: 88000,
      },
    ];

    if (rango === "7d") {
      return baseMock.map((u) => ({
        ...u,
        ordenes: Math.max(1, Math.floor(u.ordenes / 4)),
        gastado: Math.floor(u.gastado / 4),
      }));
    }

    return baseMock;
  }

  try {
    const res = await fetch(
      `https://buyer-app.vercel.app/api/admin/metricas/usuarios/top-compradores?limit=10&rango=${rango}`,
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}
