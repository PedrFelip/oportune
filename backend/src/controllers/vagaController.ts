import { FastifyRequest } from 'fastify'
import { createServiceVaga, listarServiceVagas } from '../services/vagaServices.ts'
import { createVagaSchema } from '../schemas/vagasSchema.ts'

export const createVagaController = async (
  request: FastifyRequest,
  reply: any,
) => {
  try {
    const vagaDataBody = request.body;

    const vagaData = createVagaSchema.parse(vagaDataBody)

    const novaVaga = await createServiceVaga(vagaData);
    return reply.status(201).send(novaVaga);

  } catch (err: any) {
    return reply.status(400).send({ message: 'Erro ao criar vaga', error: err.message });
  }
}

listarServiceVagas
export const listarVagasController = async (
  request: FastifyRequest,
  reply: any,
) => {
  try {
    // Paginação de forma simples via query params
    if (!request.query) {
      return reply.status(400).send({ message: 'Parâmetros de consulta ausentes' })
    }

    const { page = 1, limit = 10 } = request.query as { page?: number; limit?: number }

    const vagas = await listarServiceVagas(Number(page), Number(limit))
    return reply.status(200).send(vagas)
  } catch (err: any) {
    return reply.status(400).send({ message: 'Erro ao listar vagas', error: err.message })
  }
}