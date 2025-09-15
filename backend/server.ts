import Fastify from "fastify";
import { authRoutes } from "./src/routes/authRoutes.ts";
import { cnpjRoutes } from "./src/routes/cnpjRoutes.ts";
import { alunoRoutes } from "./src/routes/alunoRoutes.ts";
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
  origin: ["http://localhost:8080", "http://localhost:5173", "http://frontend_oportune:8080"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
});

app.get("/healthcheck", async () => {
  return {
    status: "ok",
  };
});

app.register(authRoutes);

app.register(cnpjRoutes);

app.register(alunoRoutes);

await app.listen({ port: 3001, host: '0.0.0.0' });
console.log("Servidor iniciado na porta 3001");
