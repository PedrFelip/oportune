import { FastifyInstance } from 'fastify'
import { candidaturaVagaController } from '../controllers/candidaturaController.ts'

export async function candidaturaRoutes(fastify: FastifyInstance) {
  fastify.post('/candidatar', candidaturaVagaController)
}