import z from "zod";
import { formatZodErrors } from "../utils/zodErrorFormatter.ts";
import { cadastrarUsuarioService } from "../services/authServices.ts";
import { createUserSchema } from "../schemas/userSchemas.ts";
import { FastifyReply, FastifyRequest } from "fastify";
import { createUserDTO } from "../interfaces/createUserDTO.ts";

export const cadastrarUsuarioController = async (
  request: FastifyRequest<{ Body: createUserDTO }>,
  reply: FastifyReply
) => {
  try {
    const novoUsuario = createUserSchema.parse(request.body);
    const usuarioCriado = await cadastrarUsuarioService(novoUsuario);

    return reply.status(201).send(usuarioCriado);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      const MensagensError = formatZodErrors(err);

      return reply.status(400).send({ errors: MensagensError });
    }

    if (err.message.includes("Já cadastrado")) {
      return reply.status(409).send({ message: err.message });
    }

    console.error(err);
    return reply.status(500).send({ message: "Erro interno do servidor" });
  }
};
