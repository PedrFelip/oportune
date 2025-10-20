import { FastifyInstance } from "fastify";
import {
  cadastrarUsuarioController,
  loginUsuarioController,
  confirmarEmailController,
  isVerifiedController,
  solicitarRecuperacaoSenhaController,
  redefinirSenhaController,
  profileController,
} from "../controllers/authController.ts";
import Authentication from "../plugins/tokenValidator.ts";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/createuser", cadastrarUsuarioController);
  fastify.post("/loguser", loginUsuarioController);
  fastify.post("/confirm-email", confirmarEmailController);
  fastify.post("/is-verified", isVerifiedController);
  fastify.post("/request-password-reset", solicitarRecuperacaoSenhaController);
  fastify.post("/reset-password", redefinirSenhaController);
  fastify.get("/profile/:userId", profileController);
}
