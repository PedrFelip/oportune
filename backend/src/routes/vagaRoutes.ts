import {
  createVagaController,
  getVagaDetalhesController,
  listarVagasController,
  listarVagasPorResponsavelController,
  updateVagaController,
} from '../controllers/vagaController.ts'
import { FastifyInstance } from 'fastify'
import Authentication from '../plugins/tokenValidator.ts'

export async function vagaRoutes(app: FastifyInstance) {
  app.post('/vagas', createVagaController)
  app.get('/vagas', listarVagasController)
  app.get('/vagas/:id', getVagaDetalhesController)
  app.put(
    '/vagas/:id',
    { preHandler: Authentication },
    (request, reply) => updateVagaController(request as any, reply as any),
  )
  app.get(
    '/vagas/responsavel',
    {
      preHandler: Authentication
    },
    listarVagasPorResponsavelController,
  )
}
