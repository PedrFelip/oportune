import { candidaturaVagaService } from '../services/candidaturaService.ts'
import { FastifyReply, FastifyRequest } from 'fastify'

export const candidaturaVagaController = async (
  request: FastifyRequest<{ Body: { vagaId: string; } }>,
  reply: FastifyReply
) => {
  try {
    const { vagaId } = request.body

    if (!request.user || !request.user.sub) {
      reply.status(401).send({ error: 'Usuário não autenticado' })
      return
    }

    const result = await candidaturaVagaService({ vagaId, userId: request.user.sub })

    if (result) {
    reply.status(201).send(result)
    } else {
      reply.status(400).send({ error: 'Candidatura não pôde ser criada' })
    }
  } catch (error: any) {
    reply.status(500).send({ error: 'Erro ao processar candidatura: ' + error.message })
  }
  
}
