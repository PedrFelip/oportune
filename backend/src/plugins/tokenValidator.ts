import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.ts";

export default function Authentication(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const authHeader = request.headers.authorization;
    console.log("Authorization header:", authHeader);
    
    const token = authHeader?.split(" ")[1];
    console.log("Token extraído:", token ? "Token presente" : "Token ausente");

    if (!token) {
      return reply.status(401).send({ err: "Token não encontrado" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Token decodificado:", decoded);

    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "sub" in decoded &&
      "role" in decoded &&
      (decoded.role === "ESTUDANTE" || decoded.role === "PROFESSOR" || decoded.role === "EMPRESA")
    ) {
      request.user = decoded as { sub: string; tipo: "ESTUDANTE" | "PROFESSOR" | "EMPRESA" };
      request.user.tipo = decoded.role as "ESTUDANTE" | "PROFESSOR" | "EMPRESA";
      console.log("Usuário autenticado:", request.user);
    } else {
      return reply.status(401).send({ error: "Token inválido" });
    }
  } catch (err: any) {
    console.error("Erro na validação do token:", err);
    if (err.message.includes("Chave secreta não informada")) {
      return reply.status(500).send({ error: err });
    }
    return reply.status(401).send({ error: "Token inválido" });
  }
}
