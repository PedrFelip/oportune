import { candidaturaVagaService } from '../services/candidaturaService.ts'
import { FastifyReply, FastifyRequest } from 'fastify'

export const candidaturaVagaController = async (
  request: FastifyRequest<{ Body: { vagaId: string; estudanteId: string } }>,
  reply: FastifyReply
) => {
  try {
    const { vagaId, estudanteId } = request.body

    const result = await candidaturaVagaService({ vagaId, estudanteId })

    if (result) {
    reply.status(201).send(result)
    } else {
      reply.status(400).send({ error: 'Candidatura não pôde ser criada' })
    }
  } catch (error: any) {
    reply.status(500).send({ error: 'Erro ao processar candidatura: ' + error.message })
  }
  
}
