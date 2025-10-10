import { FastifyInstance } from 'fastify'
import { VagasAtivasController } from '../controllers/empresaController.ts'

export default async function empresaRoutes(fastify: FastifyInstance) {
  fastify.get('/dashboard/empresas/vagas-ativas/:id', VagasAtivasController)
}