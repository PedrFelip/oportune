import { FastifyInstance } from 'fastify'
import { alunoController } from '../controllers/alunoController.ts'
import Authentication from '../plugins/tokenValidator.ts'



export async function alunoRoutes(app: FastifyInstance) {
  app.get('/dashboard', { preHandler: Authentication }, alunoController)
}