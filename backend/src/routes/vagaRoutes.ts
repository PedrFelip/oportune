import { createVagaController } from '../controllers/vagaController.ts'
import { FastifyInstance } from 'fastify'

export async function vagaRoutes(app: FastifyInstance) {
  app.post('/vagas', createVagaController)
}