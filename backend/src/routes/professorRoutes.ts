import { FastifyInstance } from 'fastify'
import {
  vagasRecentesProfessorController,
  getProfessorPerfilController,
  getAlunosDashboardController,
} from '../controllers/professorController.ts'
import Authentication from '../plugins/tokenValidator.ts'

export default async function professorRoutes(app: FastifyInstance) {
  app.get(
    '/dashboard/professor/perfil',
    { preHandler: Authentication },
    getProfessorPerfilController,
  )

  app.get(
    '/dashboard/professor/vagas-recentes',
    { preHandler: Authentication },
    vagasRecentesProfessorController,
  )

  app.get(
    '/dashboard/professor/alunos',
    { preHandler: Authentication },
    getAlunosDashboardController,
  )
}
