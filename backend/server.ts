import Fastify from "fastify";
import { authRoutes } from "./src/routes/authRoutes";
import { cnpjRoutes } from "./src/routes/cnpjRoutes"; // <--- 1. IMPORTE AS NOVAS ROTAS
import cors from "@fastify/cors";
import 'dotenv/config';

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

// A sua configuração de CORS já está ótima e vai funcionar para a nova rota.
await app.register(cors, {
  origin: ["http://localhost:5173"], // O endereço do seu front-end React/Vite
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
} );

// Rotas existentes
app.register(authRoutes);

// --- ADICIONE A NOVA ROTA AQUI ---
app.register(cnpjRoutes); // <--- 2. REGISTRE AS NOVAS ROTAS

// Inicia o servidor
await app.listen({ port: 3001 }).then(() => {
  console.log("Servidor iniciado na porta 3001");
});
