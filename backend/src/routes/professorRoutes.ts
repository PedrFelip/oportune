import { FastifyInstance } from 'fastify'
import { vagasRecentesProfessorController } from '../controllers/professorController.ts'
import Authentication from '../plugins/tokenValidator.ts'

export default async function professorRoutes(app: FastifyInstance) {
  app.get(
    '/dashboard/professor/vagas-recentes',
    { preHandler: Authentication },
    vagasRecentesProfessorController,
  )
}
