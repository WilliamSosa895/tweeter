# Etapa 1: Compilar la app
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --output-path=dist

# Etapa 2: Servir con Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
