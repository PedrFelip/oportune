import { FastifyInstance } from 'fastify'
import {
  totalCandidaturasVagasController,
  VagasAtivasController,
  VagasRecentesEmpresaController,
} from '../controllers/empresaController.ts'
import Authentication from '../plugins/tokenValidator.ts'

export default async function empresaRoutes(app: FastifyInstance) {
  app.get('/dashboard/empresa/vagas-ativas', { preHandler: Authentication }, VagasAtivasController)

  app.get(
    '/dashboard/empresa/total-candidaturas',
    { preHandler: Authentication },
    totalCandidaturasVagasController,
  )

  app.get(
    '/dashboard/empresa/vagas-recentes',
    { preHandler: Authentication },
    VagasRecentesEmpresaController,
  )
}
