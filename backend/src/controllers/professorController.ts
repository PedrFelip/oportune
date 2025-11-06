import { FastifyReply, FastifyRequest } from 'fastify'
import {
  vagasRecentesProfessorService,
  perfilProfessorDashboardService,
  getAlunosDashboardService,
} from '../services/professorService.ts'

export const vagasRecentesProfessorController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const professorId = request.user?.sub

    if (!professorId) {
      return reply.status(401).send({ message: 'Usuário não autenticado' })
    }

    const vaga = await vagasRecentesProfessorService(professorId)

    return reply.status(200).send(vaga)
  } catch (err: any) {
    return reply
      .status(500)
      .send({ message: 'Erro ao buscar vagas recentes do professor', error: err })
  }
}

export const getProfessorPerfilController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const professorId = request.user?.sub

    if (!professorId) {
      return reply.status(401).send({ message: 'Usuário não autenticado' })
    }

    const perfil = await perfilProfessorDashboardService(professorId)

    return reply.status(200).send(perfil)
  } catch (err: any) {
    return reply
      .status(500)
      .send({ message: 'Erro ao buscar dados do dashboard do professor', error: err })
  }
}

export const getAlunosDashboardController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const professorId = request.user?.sub

    if (!professorId) {
      return reply.status(401).send({ message: 'Usuário não autenticado' })
    }

    const alunos = await getAlunosDashboardService(professorId)

    return reply.status(200).send(alunos)
  } catch (err: any) {
    return reply
      .status(500)
      .send({ message: 'Erro ao buscar alunos orientados', error: err })
  }
}
