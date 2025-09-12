import { FastifyInstance } from 'fastify'
import { alunoController, getPerfilController, getCandidaturasController, getVagasRecomendadasController } from '../controllers/alunoController.ts'
import Authentication from '../plugins/tokenValidator.ts'
import prisma from '../../prisma/client.ts'

export async function alunoRoutes(app: FastifyInstance) {
  // Rota de teste simples
  app.get('/test-db', async (request, reply) => {
    try {
      // Teste simples de conexão com o banco
      const userCount = await prisma.user.count()
      return { message: 'Database connection OK', userCount }
    } catch (error: any) {
      return reply.status(500).send({ error: 'Database connection failed', details: error.message })
    }
  })

  // Rota para carregamento completo (mantida para compatibilidade)
  app.get('/dashboard', { preHandler: Authentication }, alunoController)
  
  // Novas rotas para carregamento progressivo
  app.get('/dashboard/perfil', { preHandler: Authentication }, getPerfilController)
  app.get('/dashboard/candidaturas', { preHandler: Authentication }, getCandidaturasController)
  app.get('/dashboard/vagas-recomendadas', { preHandler: Authentication }, getVagasRecomendadasController)
}