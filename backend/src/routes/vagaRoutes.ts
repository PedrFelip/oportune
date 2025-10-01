import { createVagaController, listarVagasController } from '../controllers/vagaController.ts'
import { FastifyInstance } from 'fastify'

export async function vagaRoutes(app: FastifyInstance) {
  app.post('/vagas', createVagaController)
  app.get('/vagas', listarVagasController)
}