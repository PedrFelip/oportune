import { FastifyInstance } from 'fastify'
import { candidaturaController } from '../controllers/candidaturaController.ts'
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

  fastify.get<{
    Params: { vagaId: string }
  }>(
    '/vagas/:vagaId/candidatos',
    {
      preHandler: Authentication,
    },
    candidaturaController.listarCandidatosPorVaga,
  )

  fastify.post<{
    Body: { candidaturaId: string; estudanteId: string }
  }>(
    '/candidaturas/aprovar',
    {
      preHandler: Authentication,
    },
    candidaturaController.aprovarCandidatura,
  )

  fastify.post<{
    Body: { candidaturaId: string; estudanteId: string }
  }>(
    '/candidaturas/recusar',
    {
      preHandler: Authentication,
    },
    candidaturaController.recusarCandidatura,
  )
}
