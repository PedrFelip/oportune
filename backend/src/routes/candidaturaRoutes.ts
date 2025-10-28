import { FastifyInstance } from 'fastify'
import {
  candidaturaController
} from '../controllers/candidaturaController.ts'
import Authentication from '../plugins/tokenValidator.ts'

export async function candidaturaRoutes(fastify: FastifyInstance) {
  fastify.post<{
    Body: { vagaId: string }
  }>(
    '/candidatar',
    {
      preHandler: Authentication,
    },
    candidaturaController.candidaturaVaga,
  )

  fastify.get(
    '/candidaturas',
    {
      preHandler: Authentication,
    },
    candidaturaController.listarCadidaturasPorEstudante,
  )

  fastify.delete<{
    Params: { candidaturaId: string }
  }>(
    '/candidaturas/:candidaturaId',
    {
      preHandler: Authentication,
    },
    candidaturaController.removerCandidatura,
  )
}
