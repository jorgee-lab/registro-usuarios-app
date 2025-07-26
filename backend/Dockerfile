# Usar una imagen oficial de Node.js
FROM node:16

#Actualizar y agregar herramienta dockerrize para espera de servicio mysql
RUN apt-get update && apt-get install -y wget
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Espera que MySQL esté disponible antes de correr el servidor
CMD ["/usr/local/bin/wait-for-it.sh", "mysql_host:3306", "--timeout=30", "--strict", "--", "node", "server.js"]

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


