import z from "zod";
import { formatZodErrors } from "../utils/zodErrorFormatter.ts";
import { cadastrarUsuarioService, logarUsuarioService } from "../services/authServices.ts";
import { createUserSchema, logUserSchema, createUserDTO, loginUserDTO } from "../schemas/userSchemas.ts";
import { FastifyReply, FastifyRequest } from "fastify";

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

export const loginUsuarioController = async (
  request: FastifyRequest<{ Body: loginUserDTO }>,
  reply: FastifyReply
) => {
  try {
    const logUsuario = logUserSchema.parse(request.body);
    const usuarioLogado = await logarUsuarioService(logUsuario);

    return reply.status(200).send({
      token: usuarioLogado.token,
      user: usuarioLogado.safeUser
    })
  } catch (err: any) {
    return reply.status(400).send({message: "Credenciais inválidas"})
  }
};
