export async function getEnviosKPIs(rango: string = "30d") {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    switch (rango) {
      case "7d":
        return { enTransito: 145, entregados: 320, tiempoPromedio: 2.1 };
      case "mes_actual":
        return { enTransito: 142, entregados: 1150, tiempoPromedio: 2.3 };
      case "all":
        return { enTransito: 130, entregados: 25400, tiempoPromedio: 2.6 };
      case "30d":
      default:
        return { enTransito: 142, entregados: 980, tiempoPromedio: 2.4 };
    }
  }

  try {
    const res = await fetch(
      `https://shipping-app.vercel.app/api/admin/metricas/kpis?rango=${rango}`,
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return { enTransito: 0, entregados: 0, tiempoPromedio: 0 };
  }
}

export async function getDistribucionEstados(rango: string = "30d") {
  const useRealApi = process.env.useRealApi === "true";

  if (!useRealApi) {
    switch (rango) {
      case "7d":
        return [
          { estado: "En Preparación", cantidad: 45 },
          { estado: "Retirado", cantidad: 20 },
          { estado: "En Tránsito", cantidad: 145 },
          { estado: "Entregado", cantidad: 320 },
        ];
      case "all":
        return [
          { estado: "En Preparación", cantidad: 45 },
          { estado: "Retirado", cantidad: 20 },
          { estado: "En Tránsito", cantidad: 130 },
          { estado: "Entregado", cantidad: 25400 },
        ];
      case "30d":
      case "mes_actual":
      default:
        return [
          { estado: "En Preparación", cantidad: 85 },
          { estado: "Retirado", cantidad: 40 },
          { estado: "En Tránsito", cantidad: 142 },
          { estado: "Entregado", cantidad: 980 },
        ];
    }
  }

  try {
    const res = await fetch(
      `https://shipping-app.vercel.app/api/admin/metricas/estados?rango=${rango}`,
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}

export async function getEnviosPorOperador(rango: string = "30d") {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    switch (rango) {
      case "7d":
        return [
          { operador: "Andreani", envios: 120 },
          { operador: "Correo Argentino", envios: 80 },
          { operador: "OCASA", envios: 45 },
        ];
      case "all":
        return [
          { operador: "Andreani", envios: 12500 },
          { operador: "Correo Argentino", envios: 8200 },
          { operador: "OCASA", envios: 4700 },
        ];
      case "30d":
      case "mes_actual":
      default:
        return [
          { operador: "Andreani", envios: 310 },
          { operador: "Correo Argentino", envios: 185 },
          { operador: "OCASA", envios: 92 },
        ];
    }
  }

  try {
    const res = await fetch(
      `https://shipping-app.vercel.app/api/admin/metricas/operadores?rango=${rango}`,
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}

export async function getVolumenEnviosDia(rango: string = "30d") {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    switch (rango) {
      case "7d":
        return [
          { dia: "Lun", despachados: 45 },
          { dia: "Mar", despachados: 52 },
          { dia: "Mié", despachados: 38 },
          { dia: "Jue", despachados: 65 },
          { dia: "Vie", despachados: 80 },
          { dia: "Sáb", despachados: 20 },
          { dia: "Dom", despachados: 5 },
        ];
      case "mes_actual":
        return [
          { dia: "Sem 1", despachados: 180 },
          { dia: "Sem 2", despachados: 210 },
          { dia: "Sem 3", despachados: 195 },
          { dia: "Sem 4", despachados: 240 },
        ];
      case "all":
      case "30d":
      default:
        return [
          { dia: "Ene", despachados: 850 },
          { dia: "Feb", despachados: 920 },
          { dia: "Mar", despachados: 1100 },
          { dia: "Abr", despachados: 1050 },
          { dia: "May", despachados: 1300 },
          { dia: "Jun", despachados: 1450 },
        ];
    }
  }

  try {
    const res = await fetch(
      `https://shipping-app.vercel.app/api/admin/metricas/volumen-diario?rango=${rango}`,
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}
