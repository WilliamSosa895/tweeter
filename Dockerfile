# 1) Build de Angular
FROM node:20 AS build

WORKDIR /app

# Copiamos sólo package.json y lock
COPY package*.json ./

# Instalamos dependencias
RUN npm ci

# Copiamos el resto del código y hacemos el build
COPY . .
# IMPORTANTE: el primer “--” le dice a npm que lo pase a ng CLI
#           y el segundo “--output-path=dist” indica la carpeta destino.
RUN npm run build -- --output-path=dist

# 2) Servir con Nginx
FROM nginx:alpine

# Copia TODO el contenido de /app/dist (tu build) a la carpeta estática de nginx
COPY --from=build /app/dist/ /usr/share/nginx/html/

# (Opcional) Elimina la página default de nginx para evitar confusiones
RUN rm /usr/share/nginx/html/50x.html /usr/share/nginx/html/index.html || true

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
