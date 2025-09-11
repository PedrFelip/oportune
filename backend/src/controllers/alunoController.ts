import { FastifyReply, FastifyRequest } from 'fastify'
import { getDashboardService } from '../services/dashboardService.ts'

export const alunoController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const userId = request.user?.sub;
    
    if (!userId) {
      return reply.status(401).send({ message: 'Usuário não autenticado' })
    }

    const dashboardData = await getDashboardService(userId)
    
    return reply.status(200).send(dashboardData)
  } catch (error: any) {
    console.error('Erro no dashboard do aluno:', error)
    return reply.status(500).send({ message: 'Erro interno do servidor' })
  }
};