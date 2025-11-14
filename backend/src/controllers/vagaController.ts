import { FastifyReply, FastifyRequest } from 'fastify'
import {
  createServiceVaga,
  encerrarServiceVaga,
  getVagaDetalhesService,
  listarServiceVagas,
  listarVagasPorResponsavelService,
  updateServiceVaga,
} from '../services/vagaServices.ts'
import { createVagaSchema, updateVagaSchema, VagaUpdateDTO } from '../schemas/vagasSchema.ts'
import {
  getVagaByIdForAuth,
  getProfessorIdByUserId,
  getEmpresaIdByUserId,
} from '../repositories/vagasRepository.ts'

export const createVagaController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const vagaData = createVagaSchema.parse(request.body)

    if (request.user!.role === 'EMPRESA') {
      const empresaId = await getEmpresaIdByUserId(request.user!.sub)
      if (!empresaId) return reply.status(404).send({ error: 'Empresa não encontrada' })
      vagaData.empresaId = empresaId
      vagaData.professorId = undefined
    } else if (request.user!.role === 'PROFESSOR') {
      const professorId = await getProfessorIdByUserId(request.user!.sub)
      if (!professorId) return reply.status(404).send({ error: 'Professor não encontrado' })
      vagaData.professorId = professorId
      vagaData.empresaId = undefined
    }

    const resultado = await createServiceVaga(vagaData)
    return reply.status(201).send(resultado)
  } catch (err: any) {
    return reply.status(400).send({ error: err.message || 'Erro ao criar vaga' })
  }
}

export const listarVagasController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { page = '1', limit = '10' } = request.query as { page?: string; limit?: string }
    let pageNum = parseInt(page)
    let limitNum = parseInt(limit)

    if (isNaN(pageNum) || pageNum < 1) pageNum = 1
    if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) limitNum = 10

    const resultado = await listarServiceVagas(pageNum, limitNum)
    return reply.status(200).send(resultado)
  } catch (err: any) {
    return reply.status(500).send({ error: err.message || 'Erro ao listar vagas' })
  }
}

export const getVagaDetalhesController = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params
    const resultado = await getVagaDetalhesService(id)
    return reply.status(200).send(resultado)
  } catch (err: any) {
    const status = err.message.includes('não encontrada') ? 404 : 500
    return reply.status(status).send({ error: err.message || 'Erro ao obter detalhes da vaga' })
  }
}

export const updateVagaController = async (
  request: FastifyRequest<{ Params: { id: string }; Body: VagaUpdateDTO }>,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params
    const dadosAtualizacao = updateVagaSchema.parse(request.body)
    
    delete (dadosAtualizacao as any).empresaId
    delete (dadosAtualizacao as any).professorId

    const resultado = await updateServiceVaga(
      id,
      dadosAtualizacao,
      request.user!.sub,
      request.user!.role as 'EMPRESA' | 'PROFESSOR',
    )

    return reply.status(200).send(resultado)
  } catch (err: any) {
    return reply.status(400).send({ error: err.message || 'Erro ao atualizar vaga' })
  }
}

export const listarVagasPorResponsavelController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const resultado = await listarVagasPorResponsavelService(
      request.user!.sub,
      request.user!.role as 'EMPRESA' | 'PROFESSOR',
    )
    return reply.status(200).send(resultado)
  } catch (error: any) {
    return reply.status(500).send({ error: error.message || 'Erro ao listar vagas' })
  }
}

export const encerrarVagaController = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params
    const resultado = await encerrarServiceVaga(
      id,
      request.user!.sub,
      request.user!.role as 'EMPRESA' | 'PROFESSOR',
    )
    return reply.status(200).send(resultado)
  } catch (error: any) {
    return reply.status(400).send({ error: error.message || 'Erro ao encerrar vaga' })
  }
}
