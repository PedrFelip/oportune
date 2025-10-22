import { FastifyReply, FastifyRequest } from 'fastify'
import {
  createServiceVaga,
  getVagaDetalhesService,
  listarServiceVagas,
} from '../services/vagaServices.ts'
import { createVagaSchema } from '../schemas/vagasSchema.ts'

export const createVagaController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const vagaDataBody = request.body
    console.log('Dados recebidos para criar vaga:', JSON.stringify(vagaDataBody, null, 2))

    const vagaData = createVagaSchema.parse(vagaDataBody)

    const novaVaga = await createServiceVaga(vagaData)
    return reply.status(201).send(novaVaga)
  } catch (err: any) {
    console.error('Erro ao criar vaga:', err)
    return reply
      .status(400)
      .send({ message: 'Erro ao criar vaga', error: err.message, details: err.errors || err })
  }
}

export const listarVagasController = async (request: FastifyRequest, reply: FastifyReply) => {
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

export const getVagaDetalhesController = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params
    const vaga = await getVagaDetalhesService(id)
    return reply.status(200).send(vaga)
  } catch (err: any) {
    return reply.status(400).send({ message: 'Erro ao obter detalhes da vaga', error: err.message })
  }
}
