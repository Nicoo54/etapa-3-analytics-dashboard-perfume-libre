[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/8-wwxMvS)

# Analytics Dashboard — Perfume Libre

## 1. Link al Deploy de Producción

🚀 **URL del proyecto en producción:** [https://perfume-libre-analytics.vercel.app/]

---

## 2. Listado de Usuarios Disponibles para Pruebas

Para evaluar la aplicación y verificar el control de acceso basado en roles con Clerk, utilice las siguientes credenciales:

### ⚙️ Perfil Administrador (Acceso Permitido)

- **Email:** `admin+clerk_test@iaw.com`
- **Contraseña:** `iawuser#`
- **Rol:** `admin` _(Acceso completo a todas las vistas de Analytics)_

### 👤 Perfil Usuario Común (Acceso Denegado - Prueba 403)

- **Email:** `buyer+clerk_test@iaw.com`
- **Contraseña:** `iawuser#`
- **Rol:** `user` _(Simula un usuario sin permisos para probar la pantalla de restricción)_

---

## 3. Instrucciones para Evaluar la Aplicación

1. **Autenticación Obligatoria:** Al ingresar a cualquier ruta de la aplicación sin una sesión activa, el sistema lo redirigirá automáticamente a la pantalla de Login administrada por Clerk.
2. **Navegación del Dashboard:** Una vez autenticado como Administrador, utilice la barra lateral (_Sidebar_) para navegar entre los 6 módulos principales de análisis: **General**, **Transacciones**, **Usuarios**, **Productos**, **Calificaciones** y **Envíos**.
3. **Filtro Temporal Global (`rango`):** Utilice el selector de fechas ubicado en la cabecera (_Header_) para cambiar el rango de análisis (`Últimos 7 días`, `Últimos 30 días`, `Mes Actual`, `Histórico Completo`). Observe cómo los gráficos, KPIs y tablas se adaptan dinámicamente.
4. **Sistema de Exportación a Excel (`.xlsx`):** Haga clic en el botón "Exportar" del Header y pruebe ambas modalidades:
   - **Exportar página actual:** Genera un libro de Excel con los datos tabulados y filtrados de la pantalla en la que se encuentra.
   - **Exportar reporte completo:** Consolida la información de todo el ecosistema en un único archivo con múltiples pestañas y una hoja de _Resumen Ejecutivo_.
5. **Prueba de Seguridad (Página 403):** Cierre sesión desde el botón de perfil del Sidebar e intente ingresar con la cuenta de usuario común (`buyer+clerk_test@iaw.com`). Verifique cómo el middleware intercepta el acceso y muestra la vista personalizada de **Acceso Restringido (`/unauthorized`)**.

---

## 4. Descripción del Proyecto

El **Analytics Dashboard** es una plataforma web de lectura y análisis de datos diseñada para proporcionar una visión consolidada, estratégica y en tiempo real sobre la salud operativa y financiera del ecosistema de _Perfume Libre_.

Su objetivo principal es transformar datos crudos provenientes de las distintas aplicaciones del sistema (Buyer App, Seller App, Shipping App y Feedback App) en indicadores clave de rendimiento (KPIs) y visualizaciones gráficas interactivas que faciliten la toma de decisiones empresariales.

La herramienta no funciona como un CRUD tradicional, sino como un panel de inteligencia de negocios (_BI_) que abarca el volumen de ingresos, retención de compradores, métricas de catálogo, desempeño de la logística de envíos y detección temprana de vendedores con baja calificación.

---

## 5. Notas y Comentarios para la Corrección

- **Control de Acceso de Baja Latencia:** La protección de rutas se implementó mediante `clerkMiddleware`. Para optimizar la performance y evitar consultas de red repetitivas a la API de Clerk en cada petición, el rol del usuario se inyecta directamente dentro de los _Claims_ del Token de Sesión (JWT), permitiendo una validación en memoria.
- **Manejo Profesional de Permisos (Página 403):** Si un usuario autenticado no posee el rol de `admin`, el sistema lo redirige formalmente a una vista dedicada de **Acceso Restringido (`/unauthorized`)**, la cual le ofrece accesos directos para cerrar sesión.
- **Sistema Modular de Exportación:** Toda la lógica de armado de archivos Excel se desacopló del hilo de la interfaz de usuario en un gestor independiente (`lib/utils/`). Los reportes generados incluyen un algoritmo automático de ajuste de ancho de celdas (`autoFitColumns`), nombres de columnas formateados para contabilidad y generación condicional de hojas según el rango temporal seleccionado.
- **Adaptación Dinámica de Métricas:** En el módulo de usuarios, la métrica de "Nuevos Usuarios" se adapta de manera inteligente: cuando el filtro seleccionado es "Histórico Completo (`all`)", la interfaz reemplaza automáticamente dicha tarjeta por el cálculo del **Valor de Vida del Cliente (LTV)**, evitando redundancias métricas y aportando mayor valor analítico.
- **Experiencia de Usuario (Loading States):** Al tratarse de un Dashboard Analítico que consolida grandes volúmenes de datos, se priorizó la percepción de velocidad. En lugar de desarrollar _skeletons_ pixel-perfect individuales para cada gráfico (como sí se hizo en la Buyer App), se implementó un `loading.tsx` genérico con bloques estructurales. Esta decisión arquitectónica mantiene el código limpio, es 100% reutilizable si se añaden nuevas vistas en el futuro y evita que la pantalla quede "congelada" mientras se resuelven las peticiones al backend.
- **Inicialización Fluida (Clerk):** En componentes que dependen de la carga asíncrona de credenciales (como el perfil del usuario en el Sidebar), se implementaron combinaciones de `<ClerkLoading>` y `<ClerkLoaded>` con _skeletons_ animados en CSS para prevenir saltos de diseño (_Layout Shift_).

_Enunciado completo: <https://iaw-2026.github.io/proyecto/>_
