
# Proyecto de Envío de Correos

Este es un proyecto que automatiza el envío de correos electrónicos. Para ejecutarlo, se necesita tener instalado Node.js y pnpm. 

## Requisitos

Antes de ejecutar el proyecto, asegúrate de tener las siguientes herramientas instaladas:

- [Node.js](https://nodejs.org/) (v16 o superior)
- [pnpm](https://pnpm.io/)

## Instalación

1. Clona el repositorio a tu máquina local:
   ```bash
   git clone <url-del-repositorio>
   ```

2. Navega a la carpeta del proyecto:
   ```bash
   cd <nombre-del-directorio>
   ```

3. Instala las dependencias con pnpm:
   ```bash
   pnpm install
   ```

4. Inicia el proyecto:
   ```bash
   pnpm start
   ```

## Configuración

Para trabajar con el proyecto, debes configurar el archivo `.env` con tus datos personales:

1. Crea un archivo `.env` en la raíz del proyecto.
2. Agrega las siguientes variables de entorno, reemplazando con tus datos (para el sender_password puedes crear contraseñas de aplicación en gmail):
   ```env
   SENDER_EMAIL=<tu-correo>
   SENDER_PASSWORD=<tu-contraseña>
   ```

3. Los correos electrónicos a los que se enviarán los mensajes están listados en el archivo `data.csv`.

## Próximas Implementaciones

- **Mejorar el template del mensaje**: Crear un template más atractivo y funcional para los correos enviados.
- **Mandar la estadística de la votación que ganó**: Modificar la lógica para enviar solo la categoría ganadora y sus estadísticas correspondientes.
- **Crear un mejor algoritmo de shuffle**: Mejorar el algoritmo para mezclar los elementos de manera más eficiente y evitar patrones circulares.

## Contribuciones

Si deseas contribuir al proyecto, por favor abre un "issue" o crea un "pull request". ¡Cualquier ayuda será bienvenida!

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
