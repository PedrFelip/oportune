import { FastifyInstance } from 'fastify'
import { candidaturaVagaController } from '../controllers/candidaturaController.ts'
import Authentication from '../plugins/tokenValidator.ts'

export async function candidaturaRoutes(fastify: FastifyInstance) {
  fastify.post<{ 
    Body: { vagaId: string } 
  }>('/candidatar', {
    preHandler: Authentication
  }, candidaturaVagaController)
}