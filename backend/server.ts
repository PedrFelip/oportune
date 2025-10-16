import Fastify from "fastify";
import { authRoutes } from "./src/routes/authRoutes.ts";
import { cnpjRoutes } from "./src/routes/cnpjRoutes.ts";
import { alunoRoutes } from "./src/routes/alunoRoutes.ts";
import cors from "@fastify/cors";
import { vagaRoutes } from "./src/routes/vagaRoutes.ts";
import empresaRoutes from "./src/routes/empresaRoutes.ts";
import { candidaturaRoutes } from "./src/routes/candidaturaRoutes.ts";

const app = Fastify({
  logger: {
    file: "./logs/server.log",
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss Z",
        ignore: "pid, hostname",
      },
    },
  },
});

await app.register(cors, {
  origin: (origin, cb) => {
    // Permite qualquer origem em desenvolvimento
    cb(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  credentials: true,
  strictPreflight: false,
  optionsSuccessStatus: 200,
});

app.get("/healthcheck", async () => {
  return {
    status: "ok",
  };
});

app.register(authRoutes);

app.register(cnpjRoutes);

app.register(empresaRoutes);

app.register(alunoRoutes);

app.register(vagaRoutes);

app.register(candidaturaRoutes);

await app.listen({ port: 3001, host: "0.0.0.0" });
console.log("Servidor iniciado na porta 3001");
