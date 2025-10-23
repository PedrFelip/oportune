import { FastifyInstance } from 'fastify'
import { VagasAtivasController } from '../controllers/empresaController.ts'
import Authentication from '../plugins/tokenValidator.ts'

export default async function empresaRoutes(app: FastifyInstance) {
  app.get(
    '/dashboard/empresa/vagas-ativas',
    { preHandler: Authentication },
    VagasAtivasController,
  )

  app.get(
    '/dashboard/empresa/total-candidaturas',
    { preHandler: Authentication },
    VagasAtivasController,
  )
}
