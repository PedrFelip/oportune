import { FastifyReply, FastifyRequest } from 'fastify'
import {
  getPerfilService,
  getCandidaturasService,
  getVagasRecomendadasService,
  getDashboardService,
  updatePerfilEstudanteService,
} from '../services/dashboardService.ts'
import { updateEstudantePerfilSchema } from '../schemas/userSchemas.ts'
import { formatZodErrors } from '../utils/zodErrorFormatter.ts'

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

// Controller para atualizar o perfil do aluno
export const updatePerfilController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const userId = request.user?.sub

    if (!userId) {
      return reply.status(401).send({ message: 'Usuário não autenticado' })
    }

    const body = request.body as any

    // Validar se há dados para atualizar
    if (!body || Object.keys(body).length === 0) {
      return reply.status(400).send({
        message: 'Nenhum dado fornecido para atualização',
      })
    }

    console.log('Dados recebidos para atualização:', body)

    const validation = updateEstudantePerfilSchema.safeParse(body)

    if (!validation.success) {
      console.error('Erro de validação:', validation.error)
      return reply.status(400).send({
        message: 'Dados inválidos',
        errors: formatZodErrors(validation.error),
      })
    }

    console.log('Dados validados:', validation.data)

    const result = await updatePerfilEstudanteService(userId, validation.data)

    if (!result.success) {
      console.error('Erro no serviço:', result.error)
      return reply.status(400).send({
        message: result.error || 'Erro ao atualizar perfil',
      })
    }

    console.log('Perfil atualizado com sucesso:', result.perfil)

    return reply.status(200).send({
      message: result.message,
      perfil: result.perfil,
    })
  } catch (error: any) {
    console.error('Erro ao atualizar perfil do aluno:', error)
    return reply.status(500).send({
      message: 'Erro interno do servidor',
      error: error.message,
    })
  }
}
