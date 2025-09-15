import { FastifyInstance } from 'fastify'
import { alunoController, getPerfilController, getCandidaturasController, getVagasRecomendadasController } from '../controllers/alunoController.ts'
import Authentication from '../plugins/tokenValidator.ts'
import prisma from '../../prisma/client.ts'

export async function alunoRoutes(app: FastifyInstance) {
  // Rota para carregamento completo (mantida para compatibilidade)
  app.get('/dashboard', { preHandler: Authentication }, alunoController)
  
  // Novas rotas para carregamento progressivo
  app.get('/dashboard/perfil', { preHandler: Authentication }, getPerfilController)
  app.get('/dashboard/candidaturas', { preHandler: Authentication }, getCandidaturasController)
  app.get('/dashboard/vagas-recomendadas', { preHandler: Authentication }, getVagasRecomendadasController)
}