FROM node:22-alpine AS prod

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3001

CMD ["npx", "tsx", "server.ts"]
