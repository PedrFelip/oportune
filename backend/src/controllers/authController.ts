import z, { email } from "zod";
import { formatZodErrors } from "../utils/zodErrorFormatter.ts";
import {
  cadastrarUsuarioService,
  logarUsuarioService,
  confirmarEmailService,
} from "../services/authServices.ts";
import {
  createUserCleanSchema,
  logUserSchema,
  createUserDTO,
  loginUserDTO,
} from "../schemas/userSchemas.ts";
import axios from "axios";
import { FastifyReply, FastifyRequest } from "fastify";
import { prepareDataForZod } from "../schemas/prepareDataUserSchema.ts";

export const cadastrarUsuarioController = async (
  request: FastifyRequest<{ Body: createUserDTO }>,
  reply: FastifyReply,
) => {
  try {
    const dados = prepareDataForZod(request.body);
    console.log(dados);

    const novoUsuario = createUserCleanSchema.parse(dados);
    console.log(novoUsuario);

    const usuarioCriado = await cadastrarUsuarioService(novoUsuario);

    try {
      await axios.post("http://localhost:3002/api/enviar-confimacao", {
        name: usuarioCriado.nome,
        email: usuarioCriado.email,
        userID: usuarioCriado.id,
      });
    } catch (err: any) {
      console.error("erro ao enviar email:", err);
    }

    console.log(usuarioCriado); // Só pra validar os dados no console

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
  reply: FastifyReply,
) => {
  try {
    const logUsuario = logUserSchema.parse(request.body);
    const usuarioLogado = await logarUsuarioService(logUsuario);

    return reply.status(200).send({
      token: usuarioLogado.token,
      user: usuarioLogado.safeUser,
    });
  } catch (err: any) {
    return reply.status(400).send({ message: "Credenciais inválidas" });
  }
};

export const confirmarEmailController = async (
  request: FastifyRequest<{ Body: { token: string } }>,
  reply: FastifyReply,
) => {
  try {
    const { token } = request.body;
    if (!token) {
      return reply.status(400).send({ message: "token não fornecido" });
    }

    const result = await confirmarEmailService(token);

    return reply.status(200).send(result);
  } catch (err: any) {
    console.error(err);
    return reply.status(500).send({ message: "Erro ao confirmar email" });
  }
};
