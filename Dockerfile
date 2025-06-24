# === ETAPA 1: Build de Angular ===
FROM node:20 AS build
WORKDIR /app

# 1) Instala dependencias
COPY package*.json ./
RUN npm ci

# 2) Copia el resto del código y construye en modo producción
COPY . .
RUN npm run build -- --configuration=production

# === ETAPA 2: Servir con nginx ===
FROM nginx:alpine

# 3) Configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 4) Copia la carpeta `browser` resultante del build de Angular
#    (ahora es donde están tus archivos estáticos)
COPY --from=build /app/dist/tweeter/browser /usr/share/nginx/html

# 5) Exponer el puerto 80
EXPOSE 80

# 6) Arrancar nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
