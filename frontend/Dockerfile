# build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build  # gera /dist

# server stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# copy da configuração do nginx 
COPY src/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# expõe porta do Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]