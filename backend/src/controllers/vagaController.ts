import { FastifyRequest } from 'fastify'
import { createServiceVaga } from '../services/vagaServices.ts'
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