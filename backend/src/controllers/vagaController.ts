import { FastifyReply, FastifyRequest } from 'fastify'
import {
  createServiceVaga,
  encerrarServiceVaga,
  getVagaDetalhesService,
  listarServiceVagas,
  listarVagasPorResponsavelService,
  updateServiceVaga,
  obterEstatisticasVagaService,
  validarCandidaturaVagaService,
} from '../services/vagaServices.ts'
import { createVagaSchema, updateVagaSchema, VagaUpdateDTO } from '../schemas/vagasSchema.ts'
import { getVagaByIdForAuth } from '../repositories/vagasRepository.ts'
import { vagaValidador } from '../utils/vagaValidador.ts'

export const createVagaController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    // Validação de autenticação
    if (!request.user || !request.user.sub) {
      return reply.status(401).send({
        sucesso: false,
        error: 'Usuário não autenticado',
        codigo: 'NAO_AUTENTICADO',
      })
    }

    // Validação de role - apenas EMPRESA e PROFESSOR podem criar vagas
    if (request.user.role === 'ESTUDANTE') {
      return reply.status(403).send({
        sucesso: false,
        error: 'Estudantes não podem criar vagas',
        codigo: 'ACESSO_NEGADO',
      })
    }

    const vagaDataBody = request.body

    // Validação de schema
    let vagaData
    try {
      vagaData = createVagaSchema.parse(vagaDataBody)
    } catch (err: any) {
      return reply.status(400).send({
        sucesso: false,
        error: 'Dados de entrada inválidos',
        codigo: 'ENTRADA_INVALIDA',
        detalhes: err.errors,
      })
    }

    // Atribui responsável conforme o tipo de usuário
    if (request.user.role === 'EMPRESA') {
      vagaData.empresaId = request.user.sub
      vagaData.professorId = undefined
    } else if (request.user.role === 'PROFESSOR') {
      vagaData.professorId = request.user.sub
      vagaData.empresaId = undefined
    }

    const resultado = await createServiceVaga(vagaData)

    return reply.status(201).send(resultado)
  } catch (err: any) {
    const mensagem = err.message || 'Erro ao criar vaga'

    // Verifica se é erro de validação de negócio
    if (
      mensagem.includes('prazo') ||
      mensagem.includes('número de vagas') ||
      mensagem.includes('requisitos') ||
      mensagem.includes('título') ||
      mensagem.includes('descrição') ||
      mensagem.includes('tipo') ||
      mensagem.includes('semestre') ||
      mensagem.includes('curso') ||
      mensagem.includes('responsável')
    ) {
      return reply.status(400).send({
        sucesso: false,
        error: mensagem,
        codigo: 'VALIDACAO_NEGOCIO',
      })
    }

    return reply.status(500).send({
      sucesso: false,
      error: 'Erro ao criar vaga',
      codigo: 'ERRO_INTERNO',
    })
  }
}

export const listarVagasController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    // Validação de autenticação
    if (!request.user || !request.user.sub) {
      return reply.status(401).send({
        sucesso: false,
        error: 'Usuário não autenticado',
        codigo: 'NAO_AUTENTICADO',
      })
    }

    const { page = '1', limit = '10' } = request.query as { page?: string; limit?: string }

    // Validação de paginação
    let pageNum = parseInt(page)
    let limitNum = parseInt(limit)

    if (isNaN(pageNum) || pageNum < 1) pageNum = 1
    if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) limitNum = 10

    const resultado = await listarServiceVagas(pageNum, limitNum)

    return reply.status(200).send(resultado)
  } catch (err: any) {
    return reply.status(500).send({
      sucesso: false,
      error: err.message || 'Erro ao listar vagas',
      codigo: 'ERRO_LISTAGEM',
    })
  }
}

export const getVagaDetalhesController = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params

    // Validação de entrada
    if (!id || typeof id !== 'string') {
      return reply.status(400).send({
        sucesso: false,
        error: 'ID da vaga é obrigatório',
        codigo: 'ENTRADA_INVALIDA',
      })
    }

    const resultado = await getVagaDetalhesService(id)

    return reply.status(200).send(resultado)
  } catch (err: any) {
    if (err.message.includes('não encontrada')) {
      return reply.status(404).send({
        sucesso: false,
        error: err.message,
        codigo: 'NAO_ENCONTRADA',
      })
    }

    return reply.status(500).send({
      sucesso: false,
      error: err.message || 'Erro ao obter detalhes da vaga',
      codigo: 'ERRO_INTERNO',
    })
  }
}

export const updateVagaController = async (
  request: FastifyRequest<{ Params: { id: string }; Body: VagaUpdateDTO }>,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params

    // Validação de autenticação
    if (!request.user || !request.user.sub || !request.user.role) {
      return reply.status(401).send({
        sucesso: false,
        error: 'Usuário não autenticado',
        codigo: 'NAO_AUTENTICADO',
      })
    }

    // Validação de entrada
    if (!id || typeof id !== 'string') {
      return reply.status(400).send({
        sucesso: false,
        error: 'ID da vaga é obrigatório',
        codigo: 'ENTRADA_INVALIDA',
      })
    }

    // Validação de schema
    let dadosAtualizacao
    try {
      dadosAtualizacao = updateVagaSchema.parse(request.body)
    } catch (err: any) {
      return reply.status(400).send({
        sucesso: false,
        error: 'Dados de entrada inválidos',
        codigo: 'ENTRADA_INVALIDA',
        detalhes: err.errors,
      })
    }

    // Remove campos sensíveis que não devem ser atualizados
    delete (dadosAtualizacao as any).empresaId
    delete (dadosAtualizacao as any).professorId

    // Validação de autorização
    const authValidacao = await vagaValidador.validarAutorizacaoEditar(
      id,
      request.user.sub,
      request.user.role as 'EMPRESA' | 'PROFESSOR',
    )

    if (!authValidacao.isValid) {
      return reply.status(403).send({
        sucesso: false,
        error: authValidacao.error,
        codigo: authValidacao.errorCode,
      })
    }

    const resultado = await updateServiceVaga(
      id,
      dadosAtualizacao,
      request.user.sub,
      request.user.role as 'EMPRESA' | 'PROFESSOR',
    )

    return reply.status(200).send(resultado)
  } catch (err: any) {
    const mensagem = err.message || 'Erro ao atualizar vaga'

    if (
      mensagem.includes('não encontrada') ||
      mensagem.includes('encerrada') ||
      mensagem.includes('inativa')
    ) {
      return reply.status(400).send({
        sucesso: false,
        error: mensagem,
        codigo: 'ESTADO_INVALIDO',
      })
    }

    if (
      mensagem.includes('prazo') ||
      mensagem.includes('número de vagas') ||
      mensagem.includes('requisitos') ||
      mensagem.includes('título') ||
      mensagem.includes('descrição')
    ) {
      return reply.status(400).send({
        sucesso: false,
        error: mensagem,
        codigo: 'VALIDACAO_NEGOCIO',
      })
    }

    return reply.status(500).send({
      sucesso: false,
      error: 'Erro ao atualizar vaga',
      codigo: 'ERRO_INTERNO',
    })
  }
}

export const listarVagasPorResponsavelController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    // Validação de autenticação
    if (!request.user || !request.user.sub || !request.user.role) {
      return reply.status(401).send({
        sucesso: false,
        error: 'Usuário não autenticado',
        codigo: 'NAO_AUTENTICADO',
      })
    }

    // Apenas EMPRESA e PROFESSOR podem listar suas vagas
    if (request.user.role === 'ESTUDANTE') {
      return reply.status(403).send({
        sucesso: false,
        error: 'Estudantes não podem listar vagas desta forma',
        codigo: 'ACESSO_NEGADO',
      })
    }

    const resultado = await listarVagasPorResponsavelService(
      request.user.sub,
      request.user.role as 'EMPRESA' | 'PROFESSOR',
    )

    return reply.status(200).send(resultado)
  } catch (error: any) {
    return reply.status(500).send({
      sucesso: false,
      error: error.message || 'Erro ao listar vagas por responsável',
      codigo: 'ERRO_LISTAGEM',
    })
  }
}

export const encerrarVagaController = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params

    // Validação de autenticação
    if (!request.user || !request.user.sub || !request.user.role) {
      return reply.status(401).send({
        sucesso: false,
        error: 'Usuário não autenticado',
        codigo: 'NAO_AUTENTICADO',
      })
    }

    // Validação de entrada
    if (!id || typeof id !== 'string') {
      return reply.status(400).send({
        sucesso: false,
        error: 'ID da vaga é obrigatório',
        codigo: 'ENTRADA_INVALIDA',
      })
    }

    // Apenas EMPRESA e PROFESSOR podem encerrar vagas
    if (request.user.role === 'ESTUDANTE') {
      return reply.status(403).send({
        sucesso: false,
        error: 'Estudantes não podem encerrar vagas',
        codigo: 'ACESSO_NEGADO',
      })
    }

    // Validação de autorização
    const authValidacao = await vagaValidador.validarAutorizacaoEditar(
      id,
      request.user.sub,
      request.user.role as 'EMPRESA' | 'PROFESSOR',
    )

    if (!authValidacao.isValid) {
      return reply.status(403).send({
        sucesso: false,
        error: authValidacao.error,
        codigo: authValidacao.errorCode,
      })
    }

    const resultado = await encerrarServiceVaga(
      id,
      request.user.sub,
      request.user.role as 'EMPRESA' | 'PROFESSOR',
    )

    return reply.status(200).send(resultado)
  } catch (error: any) {
    const mensagem = error.message || 'Erro ao encerrar vaga'

    if (
      mensagem.includes('não encontrada') ||
      mensagem.includes('já está encerrada') ||
      mensagem.includes('não é possível')
    ) {
      return reply.status(400).send({
        sucesso: false,
        error: mensagem,
        codigo: 'ESTADO_INVALIDO',
      })
    }

    return reply.status(500).send({
      sucesso: false,
      error: 'Erro ao encerrar vaga',
      codigo: 'ERRO_INTERNO',
    })
  }
}

export const obterEstatisticasVagaController = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params

    // Validação de autenticação
    if (!request.user || !request.user.sub) {
      return reply.status(401).send({
        sucesso: false,
        error: 'Usuário não autenticado',
        codigo: 'NAO_AUTENTICADO',
      })
    }

    // Validação de entrada
    if (!id || typeof id !== 'string') {
      return reply.status(400).send({
        sucesso: false,
        error: 'ID da vaga é obrigatório',
        codigo: 'ENTRADA_INVALIDA',
      })
    }

    const resultado = await obterEstatisticasVagaService(id)

    return reply.status(200).send(resultado)
  } catch (err: any) {
    if (err.message.includes('não encontrada')) {
      return reply.status(404).send({
        sucesso: false,
        error: err.message,
        codigo: 'NAO_ENCONTRADA',
      })
    }

    return reply.status(500).send({
      sucesso: false,
      error: err.message || 'Erro ao obter estatísticas',
      codigo: 'ERRO_INTERNO',
    })
  }
}

export const validarCandidaturaVagaController = async (
  request: FastifyRequest<{ Body: { vagaId: string } }>,
  reply: FastifyReply,
) => {
  try {
    // Validação de autenticação
    if (!request.user || !request.user.sub) {
      return reply.status(401).send({
        sucesso: false,
        error: 'Usuário não autenticado',
        codigo: 'NAO_AUTENTICADO',
      })
    }

    // Apenas estudantes
    if (request.user.role !== 'ESTUDANTE') {
      return reply.status(403).send({
        sucesso: false,
        error: 'Apenas estudantes podem validar candidaturas',
        codigo: 'ACESSO_NEGADO',
      })
    }

    const { vagaId } = request.body

    // Validação de entrada
    if (!vagaId || typeof vagaId !== 'string') {
      return reply.status(400).send({
        sucesso: false,
        error: 'ID da vaga é obrigatório',
        codigo: 'ENTRADA_INVALIDA',
      })
    }

    const resultado = await validarCandidaturaVagaService(vagaId, request.user.sub)

    return reply.status(200).send({
      sucesso: true,
      ...resultado,
    })
  } catch (err: any) {
    return reply.status(500).send({
      sucesso: false,
      error: err.message || 'Erro ao validar candidatura',
      codigo: 'ERRO_INTERNO',
    })
  }
}

export const deletarVagaController = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params

    // Validação de autenticação
    if (!request.user || !request.user.sub || !request.user.role) {
      return reply.status(401).send({
        sucesso: false,
        error: 'Usuário não autenticado',
        codigo: 'NAO_AUTENTICADO',
      })
    }

    // Validação de entrada
    if (!id || typeof id !== 'string') {
      return reply.status(400).send({
        sucesso: false,
        error: 'ID da vaga é obrigatório',
        codigo: 'ENTRADA_INVALIDA',
      })
    }

    // Apenas EMPRESA e PROFESSOR podem deletar vagas
    if (request.user.role === 'ESTUDANTE') {
      return reply.status(403).send({
        sucesso: false,
        error: 'Estudantes não podem deletar vagas',
        codigo: 'ACESSO_NEGADO',
      })
    }

    // Validação de autorização para deletar
    const authValidacao = await vagaValidador.validarAutorizacaoDeletar(
      id,
      request.user.sub,
      request.user.role as 'EMPRESA' | 'PROFESSOR',
    )

    if (!authValidacao.isValid) {
      if (authValidacao.error?.includes('candidatos')) {
        return reply.status(400).send({
          sucesso: false,
          error: authValidacao.error,
          codigo: authValidacao.errorCode,
        })
      }

      return reply.status(403).send({
        sucesso: false,
        error: authValidacao.error,
        codigo: authValidacao.errorCode,
      })
    }

    // TODO: Implementar deleção real no repository
    // await deleteVagaService(id)

    return reply.status(200).send({
      sucesso: true,
      message: 'Vaga deletada com sucesso',
      id,
    })
  } catch (error: any) {
    const mensagem = error.message || 'Erro ao deletar vaga'

    if (mensagem.includes('candidatos') || mensagem.includes('encerrada')) {
      return reply.status(400).send({
        sucesso: false,
        error: mensagem,
        codigo: 'OPERACAO_INVALIDA',
      })
    }

    return reply.status(500).send({
      sucesso: false,
      error: 'Erro ao deletar vaga',
      codigo: 'ERRO_INTERNO',
    })
  }
}
