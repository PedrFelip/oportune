import { candidaturaService } from '../services/candidaturaService.ts'
import { FastifyRequest, FastifyReply } from 'fastify'

export const candidaturaController = {
  candidaturaVaga: async (
    request: FastifyRequest<{ Body: { vagaId: string } }>,
    reply: FastifyReply,
  ) => {
    try {
      const { vagaId } = request.body
      if (!request.user || !request.user.sub) {
        reply.status(401).send({ error: 'Usuário não autenticado' })
        return
      }

      const result = await candidaturaService.candidaturaVaga({
        vagaId,
        estudanteId: request.user.sub,
      })
      if (result) {
        reply.status(201).send(result)
      } else {
        reply.status(400).send({ error: 'Candidatura não pôde ser criada' })
      }
    } catch (error: any) {
      reply.status(500).send({ error: 'Erro ao processar candidatura: ' + error.message })
    }
  },

  listarCadidaturasPorEstudante: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      if (!request.user || !request.user.sub) {
        return reply.status(401).send({ error: 'Usuário não autenticado' })
      }

      const estudanteId = request.user.sub
      const candidaturas = await candidaturaService.listarCadidaturasPorEstudante(estudanteId)

      reply.status(200).send(candidaturas)
    } catch (error: any) {
      reply.status(500).send({ error: 'Erro ao listar candidaturas: ' + error.message })
    }
  },

  removerCandidatura: async (
    request: FastifyRequest<{ Params: { candidaturaId: string } }>,
    reply: FastifyReply,
  ) => {
    try {
      // Verifica se o usuário está autenticado
      const estudanteId = request.user?.sub

      if (!estudanteId) {
        reply.status(401).send({ error: 'Usuário não autenticado' })
        return
      }

      const { candidaturaId } = request.params
      if (!request.user || !request.user.sub) {
        reply.status(401).send({ error: 'Usuário não autenticado' })
        return
      }

      const resultado = await candidaturaService.removerCandidatura(candidaturaId)
      if (resultado) {
        reply.status(200).send(resultado)
      } else {
        reply.status(400).send({ error: 'Candidatura não pôde ser removida' })
      }
    } catch (error: any) {
      reply.status(500).send({ error: 'Erro ao remover candidatura: ' + error.message })
    }
  },

  listarCandidatosPorVaga: async (
    request: FastifyRequest<{ Params: { vagaId: string } }>,
    reply: FastifyReply,
  ) => {
    try {
      if (!request.user || !request.user.sub) {
        return reply.status(401).send({ error: 'Usuário não autenticado' })
      }

      const { vagaId } = request.params

      if (!vagaId) {
        return reply.status(400).send({ error: 'ID da vaga é obrigatório' })
      }

      const candidatos = await candidaturaService.listarCandidatosPorVaga(vagaId)

      reply.status(200).send(candidatos)
    } catch (error: any) {
      reply.status(500).send({ error: 'Erro ao listar candidatos: ' + error.message })
    }
  },
}
