# Desarrollo de Aplicaciones para Internet de las Cosas
Repositorio del proyecto final de la materia DAIoT de la CEIoT de la FiUBA.

## Descripción del Proyecto

![Logo Domotico](src/frontend/dam/myApp/src/assets/AppLogo.png)

Este proyecto consta de la programación de un dispositivo **Espressif ESP32 C3**, y de un *backend* actualizado que originalmente fue presentado en la materia DdA 2 (DAM). Además de las modificaciones al backend, se agregó al proyecto un contenedor con un *broker MQTT* (Eclipse Mosquitto) para el servidor *on premises*. El proyecto completo se inicia con *docker-compose*, y demuestra la interacción bidireccional del dispositivo con el broker y a su vez la interaccion del backend actualizado con el broker y la base de datos (MySQL). Todas las conexiones al broker MQTT se realizan con certificados TLS en el puerto 8883.

### Características del Sistema

![ESP32 C3 Pinout](https://pbs.twimg.com/media/EyXzMAvWEAEnZka.png)

- **ESP32 C3 DevkitC 02**: El prototipo se conecta a Wi-Fi, para posteriormente conectarse al broker MQTT en el puerto 8883 (TLS). Se subscribe al tópico que le corresponde, además, integra un pulsador en *GPIO9* que alterna en el sistema el consumo con el numero de ID correspondiente. El dispositivo muestra por la salida serial el cambio de estado cuando se aprieta el pulsador, o cuando el cambio se realiza desde el frontend.
- **Broker MQTT**: Integra un *broker MQTT* (Eclipse Mosquitto) configurado para conexión segura (TLS) mediante el puerto 8883. 
- **Base de datos**: Se realiza dump de datos de prueba la primera vez que se inicia el sistema. Además de la base de datos MySQL 5.7, se incluye phpMyAdmin.
- **Frontend**: Incluye acceso mediante login de ejemplo. También sección con el listado de los consumos donde se puede cambiar su estado (switch) y su intensidad (slider). 


#### Cambios en el Backend
- **MQTT en el Backend**: Integración del cliente MQTT en el backend para interactuar con el broker Mosquitto.
- **Rutas Actualizadas**: Actualización de las rutas para manejar los mensajes MQTT y actualizar el estado de los consumos en la base de datos.

## Tecnologías Utilizadas
- **Frontend**: Angular 11, Ionic 5
- **Backend**: Node.js, Express
- **Base de Datos**: MySQL
- **Orquestación**: Docker
- **Broker MQTT**: Mosquitto

## Configuración y Ejecución con Docker
Se utiliza Docker para facilitar la configuración y ejecución del proyecto. En la raíz se encuentra el `docker-compose.yml` utilizado para levantar los servicios necesarios.

### Instrucciones
1. **Clonar el repositorio**: `git clone https://github.com/gonzacarv/Final-DAIoT.git`
2. **Crear archivo de entorno**: `cp .env.example .env`
3. **Instalar dependencias**: `npm install`
4. **Ejecutar la aplicación**: `docker-compose up --build`

### Usuarios de Prueba
En frontend se inicia sesión con 2 usuarios creados para login:

**Username:** pedro

**Password:** 1234

ó

**Username:** gonza

**Password:** 1234

## Contacto

**Docentes:** Mariano Bustos - Leopoldo Zimperz

**Alumno:** Gonzalo Carvallo - gonzacarv@gmail.com

