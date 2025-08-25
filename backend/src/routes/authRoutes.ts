import { FastifyInstance } from "fastify";
import { cadastrarUsuarioController } from "../controllers/authController.ts";

export async function authRoutes(fastify: FastifyInstance) {
    fastify.post("/users", cadastrarUsuarioController)
}