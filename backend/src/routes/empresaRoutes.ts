import { FastifyInstance } from 'fastify'
import { VagasAtivasController } from '../controllers/empresaController.ts'
import Authentication from '../plugins/tokenValidator.ts'

export default async function empresaRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/dashboard/empresa/vagas-ativas',
    { preHandler: Authentication },
    VagasAtivasController,
  )
}
