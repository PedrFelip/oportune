import { FastifyInstance } from 'fastify'
import { consultarCnpjController } from '../controllers/cnpjController.ts'

export async function cnpjRoutes(app: FastifyInstance) {
  app.get('/cnpj/:cnpj', consultarCnpjController)
}
