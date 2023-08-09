##Crear el build de React
FROM node:18.7.0 as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

##Crear servidor para el build de React


# Dockerfile
FROM nginx:latest

# Definir variables de entorno
ENV REACT_APP_API_KEY="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"

# Copiar los archivos del directorio "build" al directorio de contenido de NGINX
COPY ./build /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Inicia NGINX al arrancar el contenedor
CMD ["nginx", "-g", "daemon off;"]