import { FastifyInstance } from 'fastify'
import { alunoController } from '../controllers/alunoController.ts'
import tokenValidator from '../plugins/tokenValidator.ts'



export async function alunoRoutes(app: FastifyInstance) {
  app.get('/dashboard', { preHandler: tokenValidator }, alunoController)
}