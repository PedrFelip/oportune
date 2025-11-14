import { candidaturaService } from '../services/candidaturaService.ts'
import { FastifyRequest, FastifyReply } from 'fastify'

export const candidaturaController = {
  candidaturaVaga: async (
    request: FastifyRequest<{ Body: { vagaId: string } }>,
    reply: FastifyReply,
  ) => {
    try {
      const { vagaId } = request.body
      const result = await candidaturaService.candidaturaVaga({
        vagaId,
        estudanteId: request.user!.sub,
      })
      reply.status(201).send(result)
    } catch (error: any) {
      reply.status(400).send({ error: error.message })
    }
  },

  listarCadidaturasPorEstudante: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const candidaturas = await candidaturaService.listarCadidaturasPorEstudante(request.user!.sub)
      reply.status(200).send(candidaturas)
    } catch (error: any) {
      reply.status(500).send({ error: error.message })
    }
  },

  removerCandidatura: async (
    request: FastifyRequest<{ Params: { candidaturaId: string } }>,
    reply: FastifyReply,
  ) => {
    try {
      const { candidaturaId } = request.params
      const resultado = await candidaturaService.removerCandidatura(candidaturaId)
      reply.status(200).send(resultado)
    } catch (error: any) {
      reply.status(400).send({ error: error.message })
    }
  },

  listarCandidatosPorVaga: async (
    request: FastifyRequest<{ Params: { vagaId: string } }>,
    reply: FastifyReply,
  ) => {
    try {
      const { vagaId } = request.params
      const candidatos = await candidaturaService.listarCandidatosPorVaga(vagaId)
      reply.status(200).send(candidatos)
    } catch (error: any) {
      reply.status(500).send({ error: error.message })
    }
  },

  aprovarCandidatura: async (
    request: FastifyRequest<{ Body: { candidaturaId: string; estudanteId: string } }>,
    reply: FastifyReply,
  ) => {
    try {
      const { candidaturaId, estudanteId } = request.body
      const resultado = await candidaturaService.aprovarCandidatura({ candidaturaId, estudanteId })
      reply.status(200).send(resultado)
    } catch (error: any) {
      reply.status(400).send({ error: error.message })
    }
  },

  recusarCandidatura: async (
    request: FastifyRequest<{ Body: { candidaturaId: string; estudanteId: string } }>,
    reply: FastifyReply,
  ) => {
    try {
      const { candidaturaId, estudanteId } = request.body
      const resultado = await candidaturaService.recusarCandidatura({ candidaturaId, estudanteId })
      reply.status(200).send(resultado)
    } catch (error: any) {
      reply.status(400).send({ error: error.message })
    }
  },
}
