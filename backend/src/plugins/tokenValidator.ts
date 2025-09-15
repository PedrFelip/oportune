import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.ts";

export default function Authentication(
  request: FastifyRequest,
  reply: FastifyReply
) {
  return new Promise<void>((resolve, reject) => {
    try {
      const authHeader = request.headers.authorization;
      
      if (!authHeader) {
        reply.status(401).send({ message: "Token não encontrado" });
        return reject(new Error("Token não encontrado"));
      }

      if (!authHeader.startsWith("Bearer ")) {
        reply.status(401).send({ message: "Formato de token inválido" });
        return reject(new Error("Formato de token inválido"));
      }

      const token = authHeader.split(" ")[1];
      
      if (!token) {
        reply.status(401).send({ message: "Token não encontrado" });
        return reject(new Error("Token não encontrado"));
      }

      const decoded = jwt.verify(token, JWT_SECRET);

      if (
        typeof decoded === "object" &&
        decoded !== null &&
        "sub" in decoded &&
        "role" in decoded &&
        (decoded.role === "ESTUDANTE" || decoded.role === "PROFESSOR" || decoded.role === "EMPRESA")
      ) {
        request.user = {
          sub: decoded.sub as string,
          role: decoded.role as "ESTUDANTE" | "PROFESSOR" | "EMPRESA"
        };
        resolve();
      } else {
        reply.status(401).send({ message: "Token inválido" });
        reject(new Error("Token inválido"));
      }
    } catch (err: any) {
      console.error("Erro na validação do token:", err?.message || err);
      if (err.message.includes("Chave secreta não informada")) {
        reply.status(500).send({ message: err.message });
        return reject(err);
      }
      if (err.name === "TokenExpiredError") {
        reply.status(401).send({ message: "Token expirado" });
        return reject(err);
      }
      reply.status(401).send({ message: "Token inválido" });
      reject(err);
    }
  });
}
