import z from 'zod'
import { formatZodErrors } from '../utils/zodErrorFormatter.ts'
import {
  cadastrarUsuarioService,
  logarUsuarioService,
  confirmarEmailService,
  isVerifiedService,
  solicitarRecuperacaoSenhaService,
  redefinirSenhaService,
  profileService,
} from '../services/authServices.ts'
import {
  createUserCleanSchema,
  logUserSchema,
  createUserDTO,
  loginUserDTO,
  requestPasswordResetSchema,
  requestPasswordResetDTO,
  resetPasswordSchema,
  resetPasswordDTO,
} from '../schemas/userSchemas.ts'
import axios from 'axios'
import { FastifyReply, FastifyRequest } from 'fastify'
import { prepareDataForZod } from '../schemas/prepareDataUserSchema.ts'

export const cadastrarUsuarioController = async (
  request: FastifyRequest<{ Body: createUserDTO }>,
  reply: FastifyReply,
) => {
  try {
    const dados = prepareDataForZod(request.body)
    console.log(dados)

    const novoUsuario = createUserCleanSchema.parse(dados)
    console.log(novoUsuario)

    const usuarioCriado = await cadastrarUsuarioService(novoUsuario)

    try {
      await axios.post('http://go-service:3002/api/enviar-confirmacao', {
        name: usuarioCriado.nome,
        email: usuarioCriado.email,
        userID: usuarioCriado.id,
      })
    } catch (err: any) {
      console.error('erro ao enviar email:', err)
    }

    console.log(usuarioCriado) // Só pra validar os dados no console

    return reply.status(201).send(usuarioCriado)
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      const MensagensError = formatZodErrors(err)

      return reply.status(400).send({ errors: MensagensError })
    }

    if (err.message.includes('Já cadastrado')) {
      return reply.status(409).send({ message: err.message })
    }

    console.error(err)
    return reply.status(500).send({ message: 'Erro interno do servidor' })
  }
}

export const loginUsuarioController = async (
  request: FastifyRequest<{ Body: loginUserDTO }>,
  reply: FastifyReply,
) => {
  try {
    const logUsuario = logUserSchema.parse(request.body)
    const usuarioLogado = await logarUsuarioService(logUsuario)

    return reply.status(200).send({
      token: usuarioLogado.token,
      user: usuarioLogado.safeUser,
    })
  } catch (err: any) {
    console.log('Falha no login:', err.message)
    return reply.status(400).send({ message: 'Credenciais inválidas' })
  }
}

export const confirmarEmailController = async (
  request: FastifyRequest<{ Body: { token: string } }>,
  reply: FastifyReply,
) => {
  try {
    const { token } = request.body
    if (!token) {
      return reply.status(400).send({ message: 'token não fornecido' })
    }

    const result = await confirmarEmailService(token)

    return reply.status(200).send(result)
  } catch (err: any) {
    console.error(err)
    return reply.status(500).send({ message: 'Erro ao confirmar email' })
  }
}

export const isVerifiedController = async (
  request: FastifyRequest<{ Body: { email: string } }>,
  reply: FastifyReply,
) => {
  try {
    const { email } = request.body
    if (!email) {
      return reply.status(400).send({ message: 'Email não fornecido' })
    }

    const isVerified = await isVerifiedService(email)
    return reply.status(200).send({ isVerified })
  } catch (err: any) {
    console.error('Erro ao verificar status de email:', err)
    return reply.status(500).send({ message: 'Erro ao verificar status de email' })
  }
}

export const solicitarRecuperacaoSenhaController = async (
  request: FastifyRequest<{ Body: requestPasswordResetDTO }>,
  reply: FastifyReply,
) => {
  try {
    const dados = requestPasswordResetSchema.parse(request.body)
    const result = await solicitarRecuperacaoSenhaService(dados)

    // Se o usuário existe, enviar email
    if (result.userId) {
      try {
        await axios.post('http://go-service:3002/api/enviar-recuperacao-senha', {
          name: result.nome,
          email: result.email,
          userID: result.userId,
        })
      } catch (err: any) {
        console.error('Erro ao enviar email de recuperação:', err)
      }
    }

    return reply.status(200).send({
      message: 'Se o email estiver cadastrado, você receberá um link de recuperação',
    })
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      const MensagensError = formatZodErrors(err)
      return reply.status(400).send({ errors: MensagensError })
    }

    console.error('Erro ao solicitar recuperação de senha:', err)
    return reply.status(500).send({ message: 'Erro interno do servidor' })
  }
}

export const redefinirSenhaController = async (
  request: FastifyRequest<{ Body: resetPasswordDTO }>,
  reply: FastifyReply,
) => {
  try {
    const dados = resetPasswordSchema.parse(request.body)
    const result = await redefinirSenhaService(dados)

    return reply.status(200).send(result)
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      const MensagensError = formatZodErrors(err)
      return reply.status(400).send({ errors: MensagensError })
    }

    if (err.message.includes('Token')) {
      return reply.status(401).send({ message: err.message })
    }

    console.error('Erro ao redefinir senha:', err)
    return reply.status(500).send({ message: 'Erro interno do servidor' })
  }
}

export const profileController = async (
  request: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply,
) => {
  try {
    const { userId } = request.params
    const profile = await profileService(userId)
    return reply.status(200).send(profile)
  } catch (err: any) {
    console.error('Erro ao obter perfil do usuário:', err)
    return reply.status(500).send({ message: 'Erro interno do servidor' })
  }
}
