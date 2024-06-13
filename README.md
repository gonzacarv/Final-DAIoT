# Desarrollo de Aplicaciones para Internet de las Cosas
Repositorio con el proyecto final de la materia DAIoT de la CEIoT de la FiUBA.

## Descripción del Proyecto

![Logo Domotico](src/frontend/dam/myApp/src/assets/AppLogo.png)

Este proyecto consta de una aplicación de un sistema domótico desarrollado con Angular e Ionic que permite controlar dispositivos electrónicos del hogar, ya sea el estado (encendido/apagado) como en intensidad (de 0% a 100%). Permite a los usuarios visualizar, controlar y programar (mediante un modal) dispositivos. También ver los detalles de los grupos.

### Características del Sistema
- **Visualización y Control**: Los usuarios pueden listar consumos o grupos de dispositivos. Pueden controlar tanto el estado de encendido como la intensidad de 0% a 100%. Tanto los consumos como los grupos tienen opciones para ver detalles.
- **Programación de Dispositivos**: Interfaz para programar los horarios de operación usando modales de Ionic.
- **Gestión de Usuarios**: Control y acceso seguro mediante una base de datos de usuarios.

### Actualizaciones y Cambios Realizados
#### Integración del Broker Mosquitto
- **Broker MQTT**: Integración de un broker Mosquitto configurado con TLS para asegurar la comunicación.
- **Docker Compose**: Actualización del `docker-compose.yml` para incluir el servicio del broker Mosquitto.
  
#### Programación del Dispositivo ESP32-C3
- **Control del Dispositivo**: El ESP32-C3 se programa para conectarse al broker Mosquitto mediante TLS y publicar/recibir mensajes MQTT.
- **Interacción con un Switch**: El dispositivo ESP32-C3 se programa para cambiar el estado de un consumo específico al presionar un switch conectado al pin GPIO9.
- **Mensajes por Consola**: El dispositivo ESP32-C3 muestra en la consola el estado del consumo al presionar el switch.

#### Cambios en el Backend
- **MQTT en el Backend**: Integración del cliente MQTT en el backend para interactuar con el broker Mosquitto.
- **Rutas Actualizadas**: Actualización de las rutas para manejar los mensajes MQTT y actualizar el estado de los consumos en la base de datos.

## Tecnologías Utilizadas
- **Frontend**: Angular 11, Ionic 5
- **Backend**: Node.js, Express
- **Base de Datos**: MySQL
- **Orquestación**: Docker
- **Broker MQTT**: Mosquitto

### Cumplimiento de Requisitos
- **Directivas Estructurales**: Implementadas con `ngIf` y `ngFor` en varios componentes del sistema para renderizado condicional y listas dinámicas.
- **Directiva de Atributo**: `CustomHighlightDirective` en `/src/app/directives` para cambiar estilos dinámicamente basados en el estado del dispositivo. En este caso se muestran de color verde los consumos que se encuentran encendidos.
- **Pipe Custom**: `MayusculasPipe` en `/src/app/pipes` para transformar textos a mayúsculas. Se usa para colocar el nombre de usuario en mayúscula en el mensaje de bienvenida.
- **Servicio para la API**: `ApiService` en `/src/app/services` para manejar todas las interacciones con el backend.
- **API en Express**: Backend en Node.js que maneja la lógica de negocio y la comunicación con la base de datos MySQL.

## Configuración y Ejecución con Docker
Se utiliza Docker para facilitar la configuración y ejecución del proyecto. En la raíz se encuentra el `docker-compose.yml` utilizado para levantar los servicios necesarios.

### Instrucciones
1. **Clonar el repositorio**: `git clone https://github.com/tu_usuario/tu_repositorio.git`
2. **Crear archivo de entorno**: `cp .env.example .env`
3. **Instalar dependencias**: `npm install`
4. **Ejecutar la aplicación**: `docker-compose up --build`

### Usuarios de Prueba
Inicia con 2 usuarios creados para login:

**Username:** pedro

**Password:** 1234

ó

**Username:** gonza

**Password:** 1234

## Contacto
**Alumno:** Gonzalo Carvallo - gonzacarv@gmail.com

