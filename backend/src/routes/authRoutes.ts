import { FastifyInstance } from "fastify";
import { cadastrarUsuarioController, loginUsuarioController } from "../controllers/authController.ts";

export async function authRoutes(fastify: FastifyInstance) {
    fastify.post("/createuser", cadastrarUsuarioController)
    fastify.post("/loguser", loginUsuarioController)
}