import { FastifyInstance } from 'fastify'
import {
  candidaturaVagaController,
  listarCadidaturasPorEstudanteController,
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
    candidaturaVagaController,
  )

  fastify.get(
    '/candidaturas',
    {
      preHandler: Authentication,
    },
    listarCadidaturasPorEstudanteController,
  )
}
