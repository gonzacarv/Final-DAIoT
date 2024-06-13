# Usar una versión específica de node para garantizar compatibilidad
FROM node:16-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /home/node/app

# Instalar dependencias
# Copiar solo los archivos necesarios para instalar dependencias primero
# Esto aprovecha la caché de capas de Docker cuando los archivos de dependencias no cambian
COPY package*.json ./
RUN npm install

# Instalar nodemon globalmente
RUN npm install -g nodemon

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto que nodemon usará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["nodemon", "index.js"]
