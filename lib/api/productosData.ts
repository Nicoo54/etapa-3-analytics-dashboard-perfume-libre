export async function getProductosKPIs() {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      total: 3450,
      activos: 2800,
      pausados: 450,
    };
  }

  try {
    const res = await fetch(
      "https://seller-app.vercel.app/api/admin/metricas/productos/kpis",
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return { total: 0, activos: 0, pausados: 0 };
  }
}

export async function getTopProductos(rango: string = "30d") {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    switch (rango) {
      case "7d":
        return [
          { titulo: "Dior Sauvage", vendidas: 45 },
          { titulo: "Carolina Herrera Good Girl", vendidas: 38 },
          { titulo: "Chanel N°5", vendidas: 22 },
        ];
      case "mes_actual":
        return [
          { titulo: "Dior Sauvage", vendidas: 110 },
          { titulo: "Chanel N°5", vendidas: 90 },
          { titulo: "Paco Rabanne 1 Million", vendidas: 85 },
          { titulo: "Armani Code", vendidas: 65 },
        ];
      case "all":
        return [
          { titulo: "Dior Sauvage", vendidas: 245 },
          { titulo: "Chanel N°5", vendidas: 185 },
          { titulo: "Paco Rabanne 1 Million", vendidas: 147 },
          { titulo: "Carolina Herrera Good Girl", vendidas: 125 },
          { titulo: "Armani Code", vendidas: 95 },
        ];
      case "30d":
      default:
        return [
          { titulo: "Dior Sauvage", vendidas: 130 },
          { titulo: "Chanel N°5", vendidas: 95 },
          { titulo: "Paco Rabanne 1 Million", vendidas: 85 },
          { titulo: "Armani Code", vendidas: 83 },
        ];
    }
  }

  try {
    const res = await fetch(
      `https://seller-app.vercel.app/api/admin/metricas/productos/top?rango=${rango}`,
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}

export async function getDistribucionCategorias(rango: string = "30d") {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    switch (rango) {
      case "7d":
        return [
          { categoria: "Hombre", cantidad: 120 },
          { categoria: "Mujer", cantidad: 90 },
          { categoria: "Cítrica", cantidad: 15 },
        ];
      case "all":
        return [
          { categoria: "Hombre", cantidad: 4500 },
          { categoria: "Mujer", cantidad: 5200 },
          { categoria: "Cítrica", cantidad: 800 },
          { categoria: "Floral", cantidad: 150 },
        ];
      case "30d":
      case "mes_actual":
      default:
        return [
          { categoria: "Hombre", cantidad: 1200 },
          { categoria: "Mujer", cantidad: 1450 },
          { categoria: "Cítrico", cantidad: 300 },
          { categoria: "Floral", cantidad: 50 },
        ];
    }
  }

  try {
    const res = await fetch(
      `https://seller-app.vercel.app/api/admin/metricas/productos/categorias?rango=${rango}`,
    );
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return data.map((d: any) => ({
      ...d,
      fill: `var(--color-${d.categoria.toLowerCase()})`,
    }));
  } catch (error) {
    return [];
  }
}

export async function getUltimosProductos() {
  const useRealApi = process.env.USE_REAL_API === "true";

  if (!useRealApi) {
    const baseMock = [
      {
        producto_id: 101,
        titulo: "Bleu de Chanel 100ml",
        precio: 125000,
        stock: 1,
        estado: "activo",
      },
      {
        producto_id: 102,
        titulo: "Versace Eros",
        precio: 45000,
        stock: 1,
        estado: "activo",
      },
      {
        producto_id: 103,
        titulo: "Givenchy My Way",
        precio: 95000,
        stock: 0,
        estado: "pausado",
      },
      {
        producto_id: 104,
        titulo: "Natura Homem",
        precio: 22000,
        stock: 5,
        estado: "activo",
      },
      {
        producto_id: 105,
        titulo: "Dior Fahrenheit",
        precio: 110000,
        stock: 2,
        estado: "activo",
      },
    ];

    return baseMock;
  }

  try {
    const res = await fetch(
      `https://seller-app.vercel.app/api/admin/productos/ultimos?limit=10`,
    );
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    return [];
  }
}
