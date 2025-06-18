# Proyecto Frontend - Autonomax

Este proyecto es la interfaz de usuario del sistema **Autonomax**, diseñado para la gestión de facturas, gastos, clientes, agenda y otros aspectos relacionados con la administración de una empresa autónoma. Está desarrollado utilizando **Angular** como framework principal.

## Estructura del Proyecto

El directorio `src` contiene el código fuente del proyecto y está organizado de la siguiente manera:

- **`app/`**: Contiene los componentes principales, servicios, rutas y configuraciones de la aplicación.
  - **`auth/`**: Módulo de autenticación, incluye el componente de inicio de sesión (`login.component.ts`).
  - **`layout/`**: Componentes relacionados con el diseño, como el menú lateral (`menu.component.ts`).
  - **`pages/`**: Contiene las páginas principales de la aplicación, organizadas por funcionalidad:
    - **`agenda/`**: Gestión de la agenda y calendario anual (`agenda.component.ts`).
    - **`ajustes/`**: Configuración de la aplicación, como cambiar contraseña (`ajustes.component.ts`).
    - **`clientes/`**: Gestión de clientes, incluyendo creación y edición (`clientes.component.ts`).
    - **`facturas/`**: Gestión de facturas y detalles de las mismas (`crear-factura.component.ts`).
    - **`gastos/`**: Gestión de gastos y creación de nuevos (`gastos.component.ts`).
    - **`proveedores/`**: Gestión de proveedores, incluyendo creación y edición (`proveedores.component.ts`).
    - **`estadisticas/`**: Visualización de estadísticas y gráficos.
    - **`exportacion/`**: Exportación de datos.
    - **`inicio/`**: Página principal del dashboard (`inicio.component.ts`).
    - **`notificaciones/`**: Gestión de alertas y notificaciones (`notificaciones.component.ts`).
  - **`services/`**: Servicios para la comunicación con el backend, como:
    - `auth.service.ts`: Autenticación.
    - `factura.service.ts`: Gestión de facturas.
    - `clientes.service.ts`: Gestión de clientes.
    - `proveedores.service.ts`: Gestión de proveedores.
  - **`models/`**: Definiciones de tipos e interfaces utilizadas en la aplicación, como:
    - `Cliente.ts`
    - `Factura.ts`
    - `Proveedores.ts`

- **`assets/`**: Recursos estáticos como imágenes y estilos globales.
- **`styles.css`**: Archivo de estilos globales, incluye configuración de **Tailwind CSS**.
- **`index.html`**: Archivo principal HTML que carga la aplicación Angular.

## Tecnologías Utilizadas

- **Angular**: Framework para el desarrollo de aplicaciones web.
- **RxJS**: Librería para manejar programación reactiva.
- **Tailwind CSS**: Framework de estilos CSS para diseño responsivo.
- **TypeScript**: Lenguaje de programación utilizado en Angular.
- **Karma**: Framework para pruebas unitarias.

## Scripts Disponibles

En el archivo `package.json` se encuentran los siguientes scripts:

- `npm start`: Inicia el servidor de desarrollo.
- `npm test`: Ejecuta las pruebas unitarias.
- `npm build`: Genera una versión optimizada para producción.

## Configuración

- **`angular.json`**: Configuración del proyecto Angular.
- **`tsconfig.json`**: Configuración de TypeScript.
- **`karma.conf.js`**: Configuración para ejecutar pruebas con Karma.

## Cómo Ejecutar el Proyecto

1. Instalar las dependencias:
   ```bash
   npm install
   ```
2. Iniciar el servidor de desarrollo:
   ```bash
   npm start
   ```
3. Acceder a la aplicación en `http://localhost:4200/`.

## Funcionalidades Principales

- **Gestión de Agenda**: Visualización de un calendario anual con eventos interactivos.
- **Gestión de Clientes**: Creación, edición y eliminación de clientes.
- **Gestión de Facturas**: Creación de facturas y detalles asociados.
- **Gestión de Proveedores**: Administración de proveedores y sus datos.
- **Estadísticas**: Visualización de gráficos y métricas clave.
- **Exportación de Datos**: Exportación de información en formatos compatibles.
- **Notificaciones**: Alertas y notificaciones importantes.
- **Ajustes**: Configuración de usuario y seguridad, como cambio de contraseña.

## Licencia

Este proyecto está bajo la licencia **CC BY-NC-SA 4.0**. Para más información, visita [Creative Commons](https://creativecommons.org/licenses/by-nc-sa/4.0/).


