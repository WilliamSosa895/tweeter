# Etapa 1: Compilar la app
FROM node:20 AS build
WORKDIR /app

# Copia package.json y package-lock.json (si existe) e instala dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del código y construye el bundle de Angular
COPY . .
RUN npm run build -- --output-path=dist

# Etapa 2: Servir con Nginx
FROM nginx:alpine
# Copia el contenido compilado al directorio que Nginx servirá
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto al arrancar el contenedor
CMD ["nginx", "-g", "daemon off;"]
