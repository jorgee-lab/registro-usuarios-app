# Usar una imagen oficial de Node.js
FROM node:16

#Agregar herramienta dockerrize para espera de servicio mysql
RUN apt-get update && apt-get install -y wget

# Configurar el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos del proyecto al contenedor
COPY package*.json ./
COPY server.js ./

# Instalar las dependencias
RUN npm install

# Exponer el puerto 300
EXPOSE 3000

# Comando para ejecutar el servidor
CMD ["node", "server.js"]


