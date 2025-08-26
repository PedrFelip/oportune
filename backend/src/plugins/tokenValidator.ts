// import { FastifyReply, FastifyRequest } from "fastify";
// import jwt from "jsonwebtoken";
// import { JWT_SECRET } from "../config/config.ts";

// export default function Authentication(
//   request: FastifyRequest,
//   reply: FastifyReply
// ) {
//   try {
//     const token = request.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return reply.status(401).send({ err: "Token não encontrado" });
//     }

//     const decoded = jwt.verify(token, JWT_SECRET);
//     request.user = decoded;
//   } catch (err: any) {
//     if (err.message.includes("Chave secreta não informada")) {
//       return reply.status(500).send({ error: err });
//     }
//     return reply.status(401).send({ error: "Token inválido" });
//   }
// }
