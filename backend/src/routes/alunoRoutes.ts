import { FastifyInstance } from 'fastify'
import { getPerfilController, getCandidaturasController, getVagasRecomendadasController } from '../controllers/alunoController.ts'
import Authentication from '../plugins/tokenValidator.ts'

export async function alunoRoutes(app: FastifyInstance) {
  app.get('/dashboard/perfil', { preHandler: Authentication }, getPerfilController)
  app.get('/dashboard/candidaturas', { preHandler: Authentication }, getCandidaturasController)
  app.get('/dashboard/vagas-recomendadas', { preHandler: Authentication }, getVagasRecomendadasController)
}
