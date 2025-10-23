import { FastifyReply, FastifyRequest } from 'fastify'
import { VagasAtivasService } from '../services/empresaService.ts'

export const VagasAtivasController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const id = request.user?.sub

    if (!id || typeof id !== 'string') {
      return reply.status(400).send({ message: 'Identificador da empresa inválido.' })
    }

    const resultado = await VagasAtivasService(id)
    return reply.status(200).send(resultado)
  } catch (err: any) {
    request.log.error({ err }, 'Erro ao buscar vagas ativas da empresa')
    return reply.status(500).send({
      message: 'Erro interno do servidor',
    })
  }
}
