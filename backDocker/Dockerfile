# Usa una imagen base de Node.js
FROM node:18.20.2

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el package.json y el package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código de la aplicación al directorio de trabajo
COPY . .

# Exponer el puerto en el que la aplicación va a escuchar
EXPOSE 3000

# Define el comando para ejecutar la aplicación
CMD ["npm", "start"]
