import { FastifyReply, FastifyRequest } from 'fastify'
import {
  getPerfilService,
  getCandidaturasService,
  getVagasRecomendadasService,
  getDashboardService,
} from '../services/dashboardService.ts'

// Controller para buscar apenas dados do perfil (carregamento inicial)
export const getPerfilController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const userId = request.user?.sub

    if (!userId) {
      return reply.status(401).send({ message: 'Usuário não autenticado' })
    }

    const perfilData = await getPerfilService(userId)
    return reply.status(200).send(perfilData)
  } catch (error: any) {
    console.error('Erro ao buscar perfil do aluno:', error)
    return reply.status(500).send({ message: 'Erro interno do servidor', error: error.message })
  }
}

// Controller para buscar apenas candidaturas
export const getCandidaturasController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const userId = request.user?.sub

    if (!userId) {
      return reply.status(401).send({
        message: 'Usuário não autenticado',
        candidaturasRecentes: [],
      })
    }

    const candidaturasData = await getCandidaturasService(userId)

    // Se houver erro específico, retornar com status apropriado
    if (candidaturasData.error) {
      console.error('Erro no service de candidaturas:', candidaturasData.error)
      return reply.status(500).send({
        message: candidaturasData.message,
        candidaturasRecentes: [],
        error: candidaturasData.error,
      })
    }

    // Se não há candidaturas mas não é erro
    if (candidaturasData.candidaturasRecentes.length === 0) {
      return reply.status(200).send({
        candidaturasRecentes: [],
        message: candidaturasData.message || 'Você ainda não se candidatou a nenhuma vaga',
        isEmpty: true,
      })
    }

    return reply.status(200).send({
      candidaturasRecentes: candidaturasData.candidaturasRecentes,
      total: candidaturasData.total,
      isEmpty: false,
    })
  } catch (error: any) {
    console.error('Erro ao buscar candidaturas do aluno:', error)
    return reply.status(500).send({
      message: 'Erro interno do servidor',
      candidaturasRecentes: [],
      error: 'Erro inesperado ao carregar candidaturas',
    })
  }
}

// Controller para buscar apenas vagas recomendadas
export const getVagasRecomendadasController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const userId = request.user?.sub

    if (!userId) {
      return reply.status(401).send({
        message: 'Usuário não autenticado',
        vagasRecomendadas: [],
      })
    }

    const vagasData = await getVagasRecomendadasService(userId)

    // Se houver erro específico, retornar com status apropriado
    if (vagasData.error) {
      console.error('Erro no service de vagas recomendadas:', vagasData.error)
      return reply.status(500).send({
        message: vagasData.message,
        vagasRecomendadas: [],
        error: vagasData.error,
      })
    }

    // Se não há vagas mas não é erro
    if (vagasData.vagasRecomendadas.length === 0) {
      return reply.status(200).send({
        vagasRecomendadas: [],
        message: vagasData.message || 'Nenhuma vaga disponível no momento',
        sugestao: vagasData.sugestao || 'Verifique novamente em breve',
        isEmpty: true,
      })
    }

    return reply.status(200).send({
      vagasRecomendadas: vagasData.vagasRecomendadas,
      total: vagasData.total,
      message: vagasData.message,
      isEmpty: false,
    })
  } catch (error: any) {
    console.error('Erro ao buscar vagas recomendadas:', error)
    return reply.status(500).send({
      message: 'Erro interno do servidor',
      vagasRecomendadas: [],
      error: 'Erro inesperado ao carregar vagas',
    })
  }
}

// Controller completo (mantido para compatibilidade)
export const alunoController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const userId = request.user?.sub

    if (!userId) {
      return reply.status(401).send({ message: 'Usuário não autenticado' })
    }

    const dashboardData = await getDashboardService(userId)

    return reply.status(200).send(dashboardData)
  } catch (error: any) {
    console.error('Erro no dashboard do aluno:', error)
    return reply.status(500).send({ message: 'Erro interno do servidor' })
  }
}
