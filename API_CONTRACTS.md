# Contratos de API - Analytics dashboard

Este documento define los endpoints que el **Analytics dashboard** necesita consumir de cada una de las aplicaciones individuales (Buyer, Seller, Shipping, Feedback) para funcionar correctamente.

---

## 1. Buyer App

### 1.1 Obtener Metricas generales

**Método:** `GET`  
**Ruta:** `/api/admin/ordenes/metricas`  
**Descripción:** Devuelve el total de ordenes con el revenueTotal junto a la tendencia en el rango seleccionado

**Headers Requeridos:**

- `api-key`: `[key]`

**Body Requerido (Request):**
_Ninguno._

**Parámetros de Consulta (Query Params):**

- `rango` _(opcional, string)_: Define el marco temporal para calcular las métricas. Si no se envía, el backend debe asumir `"30d"` por defecto.
  - **Valores válidos:**
    - `"7d"`: Últimos 7 días.
    - `"30d"`: Últimos 30 días.
    - `"mes_actual"`: Desde el día 1 del mes en curso hasta la fecha actual.
    - `"all"`: Histórico completo de la plataforma.

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  {
    "total": 320,
    "tendencia": 5.2,
    "revenue": 12500.5,
    "tendenciaRevenue": -2.1
  }
]
```

> [!NOTE]
> Si el rango es "all", los campos de tendencia deben venir como null

### 1.2 Obtener usuarios activos

**Método:** `GET`  
**Ruta:** `/api/admin/usuarios/activos`  
**Descripción:** Devuelve la cantidad de usuarios activos en el rango seleccionado (tienen una compra en ese rango) junto a la tendencia

**Headers Requeridos:**

- `api-key`: `[key]`

**Body Requerido (Request):**
_Ninguno._

**Parámetros de Consulta (Query Params):**

- `rango` _(opcional, string)_: Define el marco temporal para calcular las métricas. Si no se envía, el backend debe asumir `"30d"` por defecto.
  - **Valores válidos:**
    - `"7d"`: Últimos 7 días.
    - `"30d"`: Últimos 30 días.
    - `"mes_actual"`: Desde el día 1 del mes en curso hasta la fecha actual.
    - `"all"`: Histórico completo de la plataforma.

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  {
    "usuariosActivos": 342,
    "tendencia": 5.5
  }
]
```

> [!NOTE]
> Si el rango es "all", los campos de tendencia deben venir como null

### 1.3 Obtener Evolución de Ingresos

**Método:** `GET`  
**Ruta:** `/api/admin/ordenes/serie-temporal`  
**Descripción:** agrupados por períodos de tiempo para graficar la evolución. El nivel de agrupación debe ajustarse dinámicamente según el rango solicitado para no saturar el gráfico.

**Headers Requeridos:**

- `api-key`: `[key]`

**Body Requerido (Request):**
_Ninguno._

**Parámetros de Consulta (Query Params):**

- `rango` _(opcional, string)_: Define el marco temporal para calcular las métricas. Si no se envía, el backend debe asumir `"30d"` por defecto.
  - **Valores válidos:**
    - `"7d"`: Últimos 7 días. Agrupado por día de la semana (Ej: "Lun", "Mar").
    - `"30d"`: Últimos 30 días. Agrupado por bloques de fechas (Ej: "01-07", "08-14")
    - `"mes_actual"`: Desde el día 1 del mes en curso hasta la fecha actual. Desde el día 1 del mes hasta hoy. Agrupado por semanas (Ej: "Semana 1", "Semana 2").
    - `"all"`: Histórico completo de la plataforma. Agrupado por meses (Ej: "Ene", "Feb").

**Ejemplo de respuesta Exitosa (200 OK) si el cliente envía `?rango=7d`:**

```json
[
  {
    "fecha": "Lun",
    "revenue": 4500.0
  },
  {
    "fecha": "Mar",
    "revenue": 5200.5
  },
  {
    "fecha": "Mié",
    "revenue": 3800.0
  }
]
```

### 1.4 Obtener cantidad de ordenes en cada estado

**Método:** `GET`  
**Ruta:** `/api/admin/metricas/ordenes/por-estado`  
**Descripción:** Devuelve la cantidad de ordenes en cada estado en el periodo elegido

**Headers Requeridos:**

- `api-key`: `[key]`

**Body Requerido (Request):**
_Ninguno._

**Parámetros de Consulta (Query Params):**

- `rango` _(opcional, string)_: Define el marco temporal para calcular las métricas. Si no se envía, el backend debe asumir `"30d"` por defecto.
  - **Valores válidos:**
    - `"7d"`: Últimos 7 días.
    - `"30d"`: Últimos 30 días.
    - `"mes_actual"`: Desde el día 1 del mes en curso hasta la fecha actual.
    - `"all"`: Histórico completo de la plataforma.

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  { "estado": "completada", "cantidad": 350 },
  { "estado": "en_curso", "cantidad": 120 },
  { "estado": "cancelada", "cantidad": 30 }
]
```

### 1.5 Obtener informacion de transacciones

**Método:** `GET`  
**Ruta:** `/api/admin/metricas/transacciones/kpis`  
**Descripción:** Devuelve el promedio de gasto, cant de ordenes canceladas y tasa de conversion en el periodo elegido

**Headers Requeridos:**

- `api-key`: `[key]`

**Body Requerido (Request):**
_Ninguno._

**Parámetros de Consulta (Query Params):**

- `rango` _(opcional, string)_: Define el marco temporal para calcular las métricas. Si no se envía, el backend debe asumir `"30d"` por defecto.
  - **Valores válidos:**
    - `"7d"`: Últimos 7 días.
    - `"30d"`: Últimos 30 días.
    - `"mes_actual"`: Desde el día 1 del mes en curso hasta la fecha actual.
    - `"all"`: Histórico completo de la plataforma.

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[{ "ticketPromedio": 12500, "tasaConversion": 3.2, "ordenesCanceladas": 14 }]
```

### 1.6 Obtener acumulacion de revenue por fecha

**Método:** `GET`  
**Ruta:** `/api/admin/metricas/revenue-acumulado`  
**Descripción:** Devuelve el revenue acumulado en el periodo seleccionado

**Headers Requeridos:**

- `api-key`: `[key]`

**Body Requerido (Request):**
_Ninguno._

**Parámetros de Consulta (Query Params):**

- `rango` _(opcional, string)_: Define el marco temporal para calcular las métricas. Si no se envía, el backend debe asumir `"30d"` por defecto.
  - **Valores válidos:**
    - `"7d"`: Últimos 7 días. Agrupado por día de la semana (Ej: "Lun", "Mar").
    - `"30d"`: Últimos 30 días. Agrupado por bloques de fechas (Ej: "01-07", "08-14")
    - `"mes_actual"`: Desde el día 1 del mes en curso hasta la fecha actual. Desde el día 1 del mes hasta hoy. Agrupado por semanas (Ej: "Semana 1", "Semana 2").
    - `"all"`: Histórico completo de la plataforma. Agrupado por meses (Ej: "Ene", "Feb").

**Ejemplo de respuesta Exitosa (200 OK) si el cliente envía `?rango=30d`:**

```json
[
  { "fecha": "01/06", "acumulado": 15000 },
  { "fecha": "05/06", "acumulado": 32000 },
  { "fecha": "10/06", "acumulado": 54000 },
  { "fecha": "15/06", "acumulado": 89000 },
  { "fecha": "20/06", "acumulado": 112000 },
  { "fecha": "25/06", "acumulado": 145000 }
]
```

### 1.7 Obtener cant de ordenes diarias

**Método:** `GET`  
**Ruta:** `/api/admin/metricas/ordenes-por-dia`  
**Descripción:** Devuelve la cantidad de ordenes diarias en el periodo de tiempo seleccionado

**Headers Requeridos:**

- `api-key`: `[key]`

**Body Requerido (Request):**
_Ninguno._

**Parámetros de Consulta (Query Params):**

- `rango` _(opcional, string)_: Define el marco temporal para calcular las métricas. Si no se envía, el backend debe asumir `"30d"` por defecto.
  - **Valores válidos:**
    - `"7d"`: Últimos 7 días. Agrupado por día de la semana (Ej: "Lun", "Mar").
    - `"30d"`: Últimos 30 días. Agrupado por bloques de fechas (Ej: "01-07", "08-14")
    - `"mes_actual"`: Desde el día 1 del mes en curso hasta la fecha actual. Desde el día 1 del mes hasta hoy. Agrupado por semanas (Ej: "Semana 1", "Semana 2").
    - `"all"`: Histórico completo de la plataforma. Agrupado por meses (Ej: "Ene", "Feb").

**Ejemplo de respuesta Exitosa (200 OK) si el cliente envía `?rango=7d`:**

```json
[
  { "dia": "Lunes", "ordenes": 120 },
  { "dia": "Martes", "ordenes": 95 },
  { "dia": "Miércoles", "ordenes": 110 },
  { "dia": "Jueves", "ordenes": 140 },
  { "dia": "Viernes", "ordenes": 210 },
  { "dia": "Sábado", "ordenes": 250 },
  { "dia": "Domingo", "ordenes": 180 }
]
```

### 1.8 Obtener ultimas ordenes creadas

**Método:** `GET`  
**Ruta:** `api/admin/ordenes/ultimas`  
**Descripción:** Devuelve las ultimas ordenes

**Headers Requeridos:**

- `api-key`: `[key]`

**Body Requerido (Request):**
_Ninguno._

**Parámetros de Consulta (Query Params):**

- `rango` _(opcional, string)_: Define el marco temporal para calcular las métricas. Si no se envía, el backend debe asumir `"30d"` por defecto.
  - **Valores válidos:**
    - `"7d"`: Últimos 7 días.
    - `"30d"`: Últimos 30 días.
    - `"mes_actual"`: Desde el día 1 del mes en curso hasta la fecha actual.
    - `"all"`: Histórico completo de la plataforma.
- `limit` _(opcional, número)_: Cantidad máxima de registros a devolver.
  - Si no se envía, el backend debe asumir `10` por defecto.
  - Si se envía `-1`, el backend debe devolver **todos** los registros sin límite _(Nota: Usar con precaución en rangos muy amplios para evitar sobrecarga del servidor)._

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  {
    "id": "ORD-001",
    "cliente": "Juan Pérez",
    "fecha": "2026-06-25",
    "monto": 15400,
    "estado": "completada"
  },
  {
    "id": "ORD-002",
    "cliente": "María Gómez",
    "fecha": "2026-06-25",
    "monto": 8200,
    "estado": "en_curso"
  },
  {
    "id": "ORD-003",
    "cliente": "Carlos Ruiz",
    "fecha": "2026-06-24",
    "monto": 21000,
    "estado": "cancelada"
  }
]
```

### 1.9 Obtener informacion de usuarios

**Método:** `GET`  
**Ruta:** `/api/admin/metricas/usuarios/kpis`  
**Descripción:** Devuelve el total de usuarios, los usuarios nuevos y los compradores recurrentes en el rango seleccionado

**Headers Requeridos:**

- `api-key`: `[key]`

**Body Requerido (Request):**
_Ninguno._

**Parámetros de Consulta (Query Params):**

- `rango` _(opcional, string)_: Define el marco temporal para calcular las métricas. Si no se envía, el backend debe asumir `"30d"` por defecto.
  - **Valores válidos:**
    - `"7d"`: Últimos 7 días.
    - `"30d"`: Últimos 30 días.
    - `"mes_actual"`: Desde el día 1 del mes en curso hasta la fecha actual.
    - `"all"`: Histórico completo de la plataforma.

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  {
    "totalUsuarios": 1250,
    "nuevosUsuarios": 85,
    "compradoresRecurrentes": 340
  }
]
```

> [!NOTE]
> los usuarios los obtenemos de clerk y compradores recurrentes serian aquellos con al menos una 1 orden y una compra en el periodo seleccionado

### 1.10 Obtener cantidad de compradores

**Método:** `GET`  
**Ruta:** `/api/admin/metricas/usuarios/roles`  
**Descripción:** Devuelve la cantidad de compradores en el periodo seleccionado

**Headers Requeridos:**

- `api-key`: `[key]`

**Body Requerido (Request):**
_Ninguno._

**Parámetros de Consulta (Query Params):**

- `rango` _(opcional, string)_: Define el marco temporal para calcular las métricas. Si no se envía, el backend debe asumir `"30d"` por defecto.
  - **Valores válidos:**
    - `"7d"`: Últimos 7 días. Agrupado por día de la semana (Ej: "Lun", "Mar").
    - `"30d"`: Últimos 30 días. Agrupado por bloques de fechas (Ej: "01-07", "08-14")
    - `"mes_actual"`: Desde el día 1 del mes en curso hasta la fecha actual. Desde el día 1 del mes hasta hoy. Agrupado por semanas (Ej: "Semana 1", "Semana 2").
    - `"all"`: Histórico completo de la plataforma. Agrupado por meses (Ej: "Ene", "Feb").

**Ejemplo de respuesta Exitosa (200 OK) si el rango es `?rango=all`:**

```json
[
  { "mes": "Ene", "compradores": 300 },
  { "mes": "Feb", "compradores": 450 },
  { "mes": "Mar", "compradores": 580 },
  { "mes": "Abr", "compradores": 750 },
  { "mes": "May", "compradores": 820 },
  { "mes": "Jun", "compradores": 910 }
]
```

### 1.11 Obtener top compradores

**Método:** `GET`  
**Ruta:** `/api/admin/metricas/usuarios/top-compradores`  
**Descripción:** Devuelve los top compradores globales

**Headers Requeridos:**

- `api-key`: `[key]`

**Body Requerido (Request):**
_Ninguno._

**Parámetros de Consulta (Query Params):**

- `limit` _(opcional, número)_: Cantidad máxima de registros a devolver. Si no se envía, el backend debe asumir `20` por defecto.

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  {
    "id": "USR-01",
    "nombre": "Martín López",
    "email": "martin@email.com",
    "ordenes": 12,
    "gastado": 245000
  },
  {
    "id": "USR-02",
    "nombre": "Sofía Martínez",
    "email": "sofia@email.com",
    "ordenes": 8,
    "gastado": 180500
  },
  {
    "id": "USR-03",
    "nombre": "Diego Fernández",
    "email": "diego@email.com",
    "ordenes": 15,
    "gastado": 150000
  }
]
```

## 2. Seller App

### 2.1 Obtener detalles de productos

**Método:** `GET`  
**Ruta:** `/api/admin/metricas/productos/kpis`  
**Descripción:** Devuelve el total de productos y en que estado esta cada uno

**Headers Requeridos:**

- `api-key`: `[key]`

**Body Requerido (Request):**
_Ninguno._

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[{ "total": 3450, "activos": 2800, "pausados": 450 }]
```

### 2.2 Obtener productos mas vendidos

**Método:** `GET`  
**Ruta:** `/api/admin/metricas/productos/top`  
**Descripción:** Devuelve informacion de los ultimos productos mas vendidos en el periodo seleccionado

**Headers Requeridos:**

- `api-key`: `[key]`

**Body Requerido (Request):**
_Ninguno._

**Parámetros de Consulta (Query Params):**

- `limit` _(opcional, número)_: Cantidad máxima de registros a devolver. Si no se envía, el backend debe asumir `10` por defecto.

- `rango` _(opcional, string)_: Define el marco temporal para calcular las métricas. Si no se envía, el backend debe asumir `"30d"` por defecto.
  - **Valores válidos:**
    - `"7d"`: Últimos 7 días.
    - `"30d"`: Últimos 30 días.
    - `"mes_actual"`: Desde el día 1 del mes en curso hasta la fecha actual.
    - `"all"`: Histórico completo de la plataforma.

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  {
    "titulo": "Dior Sauvage",
    "vendidas": 145,
    "imagen": "/images/dior-sauvage.jpg"
  },
  { "titulo": "Chanel N°5", "vendidas": 120, "imagen": "images/chanel.jpg" },
  {
    "titulo": "Paco Rabanne 1 Million",
    "vendidas": 98,
    "imagen": "images/paco-rabanne.jpg"
  },
  {
    "titulo": "Carolina Herrera Good Girl",
    "vendidas": 85,
    "imagen": "images/carolina.jpg"
  },
  {
    "titulo": "Armani Code",
    "vendidas": 70,
    "imagen": "images/armani-code.jpg"
  }
]
```

### 2.3 Obtener categorias mas publicadas

**Método:** `GET`  
**Ruta:** `/api/admin/metricas/productos/categorias`  
**Descripción:** Devuelve informacion de las categorias mas usadas o vendidas en el periodo seleccionado

**Headers Requeridos:**

- `api-key`: `[key]`

**Body Requerido (Request):**
_Ninguno._

**Parámetros de Consulta (Query Params):**

- `rango` _(opcional, string)_: Define el marco temporal para calcular las métricas. Si no se envía, el backend debe asumir `"30d"` por defecto.
  - **Valores válidos:**
    - `"7d"`: Últimos 7 días.
    - `"30d"`: Últimos 30 días.
    - `"mes_actual"`: Desde el día 1 del mes en curso hasta la fecha actual.
    - `"all"`: Histórico completo de la plataforma.

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  { "categoria": "Mujer", "cantidad": 1500 },
  { "categoria": "Hombre", "cantidad": 1200 },
  { "categoria": "Cítrico", "cantidad": 750 }
]
```

### 2.4 Obtener ultimos productos publicados

**Método:** `GET`  
**Ruta:** `/api/admin/productos/ultimos`  
**Descripción:** Devuelve informacion de las ultimos productos publicados por los vendedores

**Headers Requeridos:**

- `api-key`: `[key]`

**Body Requerido (Request):**
_Ninguno._

**Parámetros de Consulta (Query Params):**

- `limit` _(opcional, número)_: Cantidad máxima de registros a devolver. Si no se envía, el backend debe asumir `10` por defecto.

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  {
    "producto_id": 101,
    "titulo": "Bleu de Chanel 100ml",
    "precio": 125000,
    "stock": 1,
    "estado": "activo",
    "imagen": "imagen/bleu-channel"
  },
  {
    "producto_id": 102,
    "titulo": "Versace Eros",
    "precio": 45000,
    "stock": 1,
    "estado": "activo",
    "imagen": "imagen/versace-eros"
  }
]
```

### 2.5 Obtener evolucion de usuarios por rol

**Método:** `GET`  
**Ruta:** `/api/admin/metricas/usuarios/roles`  
**Descripción:** Devuelve la cantidad de compradores y vendedores agrupado por fecha segun el rango

**Headers Requeridos:**

- `api-key`: `[key]`

**Body Requerido (Request):**
_Ninguno._

**Parámetros de Consulta (Query Params):**

- `rango` _(opcional, string)_: Define el marco temporal para calcular las métricas. Si no se envía, el backend debe asumir `"30d"` por defecto.
  - **Valores válidos:**
    - `"7d"`: Últimos 7 días. Agrupado por día de la semana (Ej: "Lun", "Mar").
    - `"30d"`: Últimos 30 días. Agrupado por bloques de fechas (Ej: "01-07", "08-14")
    - `"mes_actual"`: Desde el día 1 del mes en curso hasta la fecha actual. Desde el día 1 del mes hasta hoy. Agrupado por semanas (Ej: "Semana 1", "Semana 2").
    - `"all"`: Histórico completo de la plataforma. Agrupado por meses (Ej: "Ene", "Feb").

**Ejemplo de respuesta Exitosa (200 OK) si el rango es `?rango=all`:**

```json
[
  { "mes": "Ene", "vendedores": 300 },
  { "mes": "Feb", "vendedores": 450 },
  { "mes": "Mar", "vendedores": 580 },
  { "mes": "Abr", "vendedores": 750 },
  { "mes": "May", "vendedores": 820 },
  { "mes": "Jun", "vendedores": 910 }
]
```

## 3. Shipping App

### 3.1 Obtener KPIs de Envíos

**Método:** `GET`  
**Ruta:** `/api/admin/metricas/kpis`  
**Descripción:** Devuelve el resumen operativo: envíos en tránsito, entregas realizadas y tiempo promedio de entrega en el rango de fechas seleccionado

**Headers Requeridos:**

- `api-key`: `[key]`

**Body Requerido (Request):**
_Ninguno._

**Parámetros de Consulta (Query Params):**

- `rango` _(opcional, string)_: Define el marco temporal para calcular las métricas. Si no se envía, el backend debe asumir `"30d"` por defecto.
  - **Valores válidos:**
    - `"7d"`: Últimos 7 días.
    - `"30d"`: Últimos 30 días.
    - `"mes_actual"`: Desde el día 1 del mes en curso hasta la fecha actual.
    - `"all"`: Histórico completo de la plataforma.

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  {
    "enTransito": 142,
    "entregadosHoy": 38,
    "tiempoPromedio": 2.4
  }
]
```

> [!NOTE]
> El tiempo promedio lo medimos en dias

### 3.2 Obtener Distribución por Estados

**Método:** `GET`  
**Ruta:** `/api/admin/metricas/estados`  
**Descripción:** Devuelve la cantidad de envíos según su estado logístico en el periodo de tiempo seleccionado

**Headers Requeridos:**

- `api-key`: `[key]`

**Body Requerido (Request):**
_Ninguno._

**Parámetros de Consulta (Query Params):**

- `rango` _(opcional, string)_: Define el marco temporal para calcular las métricas. Si no se envía, el backend debe asumir `"30d"` por defecto.
  - **Valores válidos:**
    - `"7d"`: Últimos 7 días.
    - `"30d"`: Últimos 30 días.
    - `"mes_actual"`: Desde el día 1 del mes en curso hasta la fecha actual.
    - `"all"`: Histórico completo de la plataforma.

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  [
    { "estado": "En Preparación", "cantidad": 85 },
    { "estado": "Retirado", "cantidad": 40 },
    { "estado": "En Tránsito", "cantidad": 142 },
    { "estado": "Entregado", "cantidad": 320 }
  ]
]
```

### 3.3 Obtener Envíos por Operador

**Método:** `GET`  
**Ruta:** `/api/admin/metricas/operadores`  
**Descripción:** Devuelve el volumen de envíos segmentado por cada operador logístico en el rango seleccionado

**Headers Requeridos:**

- `api-key`: `[key]`

**Body Requerido (Request):**
_Ninguno._

**Parámetros de Consulta (Query Params):**

- `rango` _(opcional, string)_: Define el marco temporal para calcular las métricas. Si no se envía, el backend debe asumir `"30d"` por defecto.
  - **Valores válidos:**
    - `"7d"`: Últimos 7 días.
    - `"30d"`: Últimos 30 días.
    - `"mes_actual"`: Desde el día 1 del mes en curso hasta la fecha actual.
    - `"all"`: Histórico completo de la plataforma.

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  [
    { "operador": "Andreani", "envios": 310 },
    { "operador": "Correo Argentino", "envios": 185 },
    { "operador": "OCASA", "envios": 92 }
  ]
]
```

### 3.4 Obtener Volumen de Envíos

**Método:** `GET`  
**Ruta:** `/api/admin/metricas/volumen-diario`  
**Descripción:** Devuelve la cantidad de envíos despachados durante el periodo seleccionado

**Headers Requeridos:**

- `api-key`: `[key]`

**Body Requerido (Request):**
_Ninguno._

**Parámetros de Consulta (Query Params):**

- `rango` _(opcional, string)_: Define el marco temporal para calcular las métricas. Si no se envía, el backend debe asumir `"30d"` por defecto.
  - **Valores válidos:**
    - `"7d"`: Últimos 7 días. Agrupado por día de la semana (Ej: "Lun", "Mar").
    - `"30d"`: Últimos 30 días. Agrupado por bloques de fechas (Ej: "01-07", "08-14")
    - `"mes_actual"`: Desde el día 1 del mes en curso hasta la fecha actual. Desde el día 1 del mes hasta hoy. Agrupado por semanas (Ej: "Semana 1", "Semana 2").
    - `"all"`: Histórico completo de la plataforma. Agrupado por meses (Ej: "Ene", "Feb").

**Ejemplo de respuesta Exitosa (200 OK) si el rango es `?rango=all`:**

```json
[
  [
    { "dia": "Lun", "despachados": 45 },
    { "dia": "Mar", "despachados": 52 },
    { "dia": "Mié", "despachados": 38 },
    { "dia": "Jue", "despachados": 65 },
    { "dia": "Vie", "despachados": 80 },
    { "dia": "Sáb", "despachados": 20 },
    { "dia": "Dom", "despachados": 5 }
  ]
]
```

## 4. Feedback App

### 4.1 Obtener KPIs de Calificaciones

**Método:** `GET`  
**Ruta:** `/api/admin/metricas/calificaciones/kpis`  
**Descripción:** Devuelve el promedio global, total de reseñas y reportes pendientes en el periodo de tiempo seleccionado

**Headers Requeridos:**

- `api-key`: `[key]`

**Body Requerido (Request):**
_Ninguno._

**Parámetros de Consulta (Query Params):**

- `rango` _(opcional, string)_: Define el marco temporal para calcular las métricas. Si no se envía, el backend debe asumir `"30d"` por defecto.
  - **Valores válidos:**
    - `"7d"`: Últimos 7 días.
    - `"30d"`: Últimos 30 días.
    - `"mes_actual"`: Desde el día 1 del mes en curso hasta la fecha actual.
    - `"all"`: Histórico completo de la plataforma.

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  {
    "promedioResenas": 4.2,
    "totalResenas": 1845,
    "reportesPendientes": 12
  }
]
```

> [!NOTE]
> Los reportes pendientes seran los mismos independientemente del rango seleccionado

### 4.2 Obtener Distribución de Calificaciones

**Método:** `GET`  
**Ruta:** `/api/admin/metricas/calificaciones/distribucion`  
**Descripción:** Devuelve la cantidad de reseñas agrupadas por estrellas (1 a 5). En el tiempo seleccionado

**Headers Requeridos:**

- `api-key`: `[key]`

**Body Requerido (Request):**
_Ninguno._

**Parámetros de Consulta (Query Params):**

- `rango` _(opcional, string)_: Define el marco temporal para calcular las métricas. Si no se envía, el backend debe asumir `"30d"` por defecto.
  - **Valores válidos:**
    - `"7d"`: Últimos 7 días.
    - `"30d"`: Últimos 30 días.
    - `"mes_actual"`: Desde el día 1 del mes en curso hasta la fecha actual.
    - `"all"`: Histórico completo de la plataforma.

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  { "estrellas": 5, "cantidad": 1100 },
  { "estrellas": 4, "cantidad": 450 },
  { "estrellas": 3, "cantidad": 180 },
  { "estrellas": 2, "cantidad": 65 },
  { "estrellas": 1, "cantidad": 50 }
]
```

### 4.3 Obtener Evolución del Promedio

**Método:** `GET`  
**Ruta:** `/api/admin/metricas/calificaciones/evolucion`  
**Descripción:** Devuelve el promedio de calificaciones histórico agrupado segun el rango seleccionado

**Headers Requeridos:**

- `api-key`: `[key]`

**Body Requerido (Request):**
_Ninguno._

**Parámetros de Consulta (Query Params):**

- `rango` _(opcional, string)_: Define el marco temporal para calcular las métricas. Si no se envía, el backend debe asumir `"30d"` por defecto.
  - **Valores válidos:**
    - `"7d"`: Últimos 7 días. Agrupado por día de la semana (Ej: "Lun", "Mar").
    - `"30d"`: Últimos 30 días. Agrupado por bloques de fechas (Ej: "01-07", "08-14")
    - `"mes_actual"`: Desde el día 1 del mes en curso hasta la fecha actual. Desde el día 1 del mes hasta hoy. Agrupado por semanas (Ej: "Semana 1", "Semana 2").
    - `"all"`: Histórico completo de la plataforma. Agrupado por meses (Ej: "Ene", "Feb").

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  { "mes": "Ene", "promedio": 3.8 },
  { "mes": "Feb", "promedio": 3.9 },
  { "mes": "Mar", "promedio": 4.1 },
  { "mes": "Abr", "promedio": 4.0 },
  { "mes": "May", "promedio": 4.2 },
  { "mes": "Jun", "promedio": 4.2 }
]
```

### 4.4 Obtener Vendedores en Riesgo

**Método:** `GET`  
**Ruta:** `/api/admin/vendedores/riesgo`  
**Descripción:** Devuelve una lista de vendedores con promedio bajo, filtrados por un umbral (debajo de 3)

**Headers Requeridos:**

- `api-key`: `[key]`

**Body Requerido (Request):**
_Ninguno._

**Parámetros de Consulta (Query Params):**

- `limit` _(opcional, número)_: Cantidad máxima de registros a devolver. Si no se envía, el backend debe asumir `10` por defecto.

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  {
    "id": "VEND-104",
    "nombre": "Perfumes Express",
    "promedio": 2.1,
    "resenas": 45
  },
  {
    "id": "VEND-089",
    "nombre": "Aromas Baratos",
    "promedio": 2.4,
    "resenas": 12
  },
  {
    "id": "VEND-211",
    "nombre": "Juan Carlos Tester",
    "promedio": 2.8,
    "resenas": 8
  }
]
```

### 4.5 Obtener Calificacion promedio

**Método:** `GET`  
**Ruta:** `/api/admin/calificaciones/promedio`  
**Descripción:** Devuelve el promedio global de las calificaciones

**Headers Requeridos:**

- `api-key`: `[key]`

**Body Requerido (Request):**
_Ninguno._

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  {
    "calificacionPromedio": 4.3
  }
]
```
