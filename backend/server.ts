import Fastify from "fastify";
import { authRoutes } from "./src/routes/authRoutes";

const app = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid, hostname",
      },
    },
  },
});

app.register(authRoutes)

app.listen({ port: 3001 }).then(() => {
  console.log("Servidor iniciado na porta 3001");
});
