import Fastify, { fastify } from "fastify";
import { authRoutes } from "./src/routes/authRoutes";
import cors from "@fastify/cors";

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

await app.register(cors, {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
});

app.register(authRoutes);

await app.listen({ port: 3001 }).then(() => {
  console.log("Servidor iniciado na porta 3001");
});
