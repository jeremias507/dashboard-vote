## Iniciar el proyecto Frontend (Next.js)

### Explicación de los pasos:
1. **Clonar el repositorio**: El comando `git clone` copia el repositorio de GitHub en tu máquina local.
2. **Navegar a la carpeta del proyecto**: Los comandos `cd` te llevan a la carpeta donde se encuentra el código del frontend (`participacion-ciudadana`).
3. **Instalar dependencias**: `npm install` descarga todas las dependencias necesarias para que el proyecto funcione.
4. **Ejecutar el servidor de desarrollo**: `npm run dev` ejecuta el servidor en modo de desarrollo, que puedes acceder desde tu navegador.
## nota
  En el archivo api, puedes configurar la ruta de la comunicacion con los microservicios
    
## Inicialización de los Microservicios
El proyecto utiliza una arquitectura basada en microservicios, y cada microservicio debe inicializarse y ejecutarse por separado. Sigue los pasos a continuación para configurar y ejecutar cada uno de ellos.

### 1. Microservicios incluidos
- **microservicioAuth**: Maneja la autenticación de usuarios.
- **microservicioEditor**: Gestión del editor de contenido.
- **microservicioVotaciones**: Gestión de las votaciones.

### 2. Pasos para inicializar cada microservicio

## a. Navegar a la carpeta del microservicio
Cada microservicio tiene su propia carpeta en el proyecto. Para inicializar un microservicio, debes navegar a su carpeta. Aquí tienes los comandos para cada uno:
 cd microservicioAuth
 cd microservicioEditor 
 cd microservicioVotaciones 
 
## b. Instalar dependencias
 npm install

## c. Configurar MongoDB (Local o Atlas)
Cada microservicio necesita una conexión a MongoDB. Deberás cambiar la ruta de tu MongoDB local o Atlas en las variables de entorno.
En el archivo .env de cada microservicio, define la URL de conexión a MongoDB. Por ejemplo:
MONGODB_URI=mongodb://localhost:27017/tu_base_de_datos
O si estás usando MongoDB Atlas:
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster0.mongodb.net/tu_base_de_datos

## d. Ejecutar el servidor
Una vez configuradas las variables de entorno y las dependencias, puedes ejecutar cada microservicio con el siguiente comando:
npm run dev

#### 3. Acceso a las rutas de cada microservicio
Cada microservicio expone sus propias rutas de API para interactuar con las funcionalidades específicas. Asegúrate de que el servidor esté en ejecución para poder acceder a las rutas.

microservicioAuth: Accede a las rutas de autenticación.
Ejemplo: http://localhost:<puerto>/api/auth/...

microservicioEditor: Accede a las rutas del editor.
Ejemplo: http://localhost:<puerto>/api/editor/...

microservicioVotaciones: Accede a las rutas de votaciones.
Ejemplo: http://localhost:<puerto>/api/votaciones/...

Asegúrate de verificar el archivo .env de cada microservicio para confirmar el puerto en el que están corriendo, o puedes especificar el puerto directamente en el archivo de configuración de cada servicio.

## Créditos
Este proyecto fue creado por estudiantes universitarios:

- **Jeremías Ameth Barrios Taborda**
- **María Milagro Pitti Bolaños**
- **Reinabel Cheril Ponce Arias**
- **Jean Carlos Melgar Aguilar**


