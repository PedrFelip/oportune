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
import { getVagaByIdForAuth } from '../repositories/vagasRepository.ts'

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

export const updateVagaController = async (
  request: FastifyRequest<{ Params: { id: string }; Body: VagaUpdateDTO }>,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params
    const dadosAtualizacao = updateVagaSchema.parse(request.body)

    // Requer autenticação e autorização
    const user = (request as any).user
    if (!user?.sub || !user?.role) {
      return reply.status(401).send({ message: 'Usuário não autenticado' })
    }

    // Buscar vaga e verificar propriedade de acordo com o tipo do responsável
    const vaga = await getVagaByIdForAuth(id)
    if (!vaga) {
      return reply.status(404).send({ message: 'Vaga não encontrada' })
    }

    if (user.role === 'PROFESSOR') {
      if (!vaga.professor || vaga.professor.userId !== user.sub) {
        return reply.status(403).send({ message: 'Sem permissão para editar esta vaga' })
      }
    } else if (user.role === 'EMPRESA') {
      if (!vaga.empresa || vaga.empresa.userId !== user.sub) {
        return reply.status(403).send({ message: 'Sem permissão para editar esta vaga' })
      }
    }

    // Impedir alteração de proprietário via atualização (remoção defensiva)
    delete (dadosAtualizacao as any).empresaId
    delete (dadosAtualizacao as any).professorId

    if (!Object.keys(dadosAtualizacao).length) {
      return reply.status(400).send({ message: 'Nenhum campo fornecido para atualização' })
    }

    const vagaAtualizada = await updateServiceVaga(id, dadosAtualizacao)
    return reply.status(200).send(vagaAtualizada)
  } catch (err: any) {
    return reply
      .status(400)
      .send({ message: 'Erro ao atualizar vaga', error: err.message, details: err.errors || err })
  }
}

export const listarVagasPorResponsavelController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const tipoResponsavel = request.user?.role
    const responsavelId = request.user?.sub

    if (!tipoResponsavel || !responsavelId) {
      return reply.status(401).send({ message: 'Usuário não autenticado' })
    }

    const resultado = await listarVagasPorResponsavelService(
      responsavelId,
      tipoResponsavel as 'EMPRESA' | 'PROFESSOR',
    )

    return reply.status(200).send(resultado)
  } catch (error: any) {
    return reply
      .status(400)
      .send({ message: 'Erro ao listar vagas por responsável', error: error.message })
  }
}

export const encerrarVagaController = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params
    const user = (request as any).user

    if (!user?.sub || !user?.role) {
      return reply.status(401).send({ message: 'Usuário não autenticado' })
    }

    const vaga = await getVagaByIdForAuth(id)

    if (!vaga) {
      return reply.status(404).send({ message: 'Vaga não encontrada' })
    }

    if (vaga.statusVaga === 'ENCERRADA') {
      return reply.status(400).send({ message: 'Vaga já está encerrada' })
    }

    if (user.role === 'PROFESSOR') {
      if (!vaga.professor || vaga.professor.userId !== user.sub) {
        return reply.status(403).send({ message: 'Sem permissão para encerrar esta vaga' })
      }
    } else if (user.role === 'EMPRESA') {
      if (!vaga.empresa || vaga.empresa.userId !== user.sub) {
        return reply.status(403).send({ message: 'Sem permissão para encerrar esta vaga' })
      }
    }

    const vagaEncerrada = await encerrarServiceVaga(id)

    return reply.status(200).send({ message: 'Vaga encerrada com sucesso', vaga: vagaEncerrada })
  } catch (error: any) {
    return reply
      .status(400)
      .send({ message: 'Erro ao encerrar vaga', error: error.message || 'Erro desconhecido' })
  }
}
