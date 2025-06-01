# Proyecto Frontend - Autonomax

Este proyecto es la interfaz de usuario del sistema **Autonomax**, diseñado para la gestión de facturas, gastos, clientes y otros aspectos relacionados con la administración de una empresa autónoma. Está desarrollado utilizando **Angular** como framework principal.

## Estructura del Proyecto

El directorio `src` contiene el código fuente del proyecto y está organizado de la siguiente manera:

- **`app/`**: Contiene los componentes principales, servicios, rutas y configuraciones de la aplicación.
  - **`auth/`**: Módulo de autenticación, incluye el componente de inicio de sesión.
  - **`layout/`**: Componentes relacionados con el diseño, como el menú lateral.
  - **`pages/`**: Contiene las páginas principales de la aplicación, como:
    - `agenda/`
    - `facturas/`
    - `gastos/`
    - `notificaciones/`
    - `dashboard/`
  - **`services/`**: Servicios para la comunicación con el backend, como `auth.service.ts` y `factura.service.ts`.
  - **`interfaces/`**: Definiciones de tipos e interfaces utilizadas en la aplicación.

- **`assets/`**: Recursos estáticos como imágenes y estilos globales.
- **`styles.css`**: Archivo de estilos globales.
- **`index.html`**: Archivo principal HTML que carga la aplicación Angular.

## Tecnologías Utilizadas

- **Angular**: Framework para el desarrollo de aplicaciones web.
- **RxJS**: Librería para manejar programación reactiva.
- **Tailwind CSS**: Framework de estilos CSS para diseño responsivo.

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


