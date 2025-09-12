import { FastifyReply, FastifyRequest } from 'fastify'
import { getPerfilService, getCandidaturasService, getVagasRecomendadasService, getDashboardService } from '../services/dashboardService.ts'

// Controller para buscar apenas dados do perfil (carregamento inicial)
export const getPerfilController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const userId = request.user?.sub;
    
    if (!userId) {
      return reply.status(401).send({ message: 'Usuário não autenticado' })
    }

    const perfilData = await getPerfilService(userId)
    
    return reply.status(200).send(perfilData)
  } catch (error: any) {
    console.error('Erro ao buscar perfil do aluno:', error)
    return reply.status(500).send({ message: 'Erro interno do servidor' })
  }
};

// Controller para buscar apenas candidaturas
export const getCandidaturasController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const userId = request.user?.sub;
    
    if (!userId) {
      return reply.status(401).send({ message: 'Usuário não autenticado' })
    }

    const candidaturasData = await getCandidaturasService(userId)
    
    return reply.status(200).send(candidaturasData)
  } catch (error: any) {
    console.error('Erro ao buscar candidaturas do aluno:', error)
    return reply.status(500).send({ message: 'Erro interno do servidor' })
  }
};

// Controller para buscar apenas vagas recomendadas
export const getVagasRecomendadasController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const userId = request.user?.sub;
    
    if (!userId) {
      return reply.status(401).send({ message: 'Usuário não autenticado' })
    }

    const vagasData = await getVagasRecomendadasService(userId)
    
    return reply.status(200).send(vagasData)
  } catch (error: any) {
    console.error('Erro ao buscar vagas recomendadas:', error)
    return reply.status(500).send({ message: 'Erro interno do servidor' })
  }
};

// Controller completo (mantido para compatibilidade)
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