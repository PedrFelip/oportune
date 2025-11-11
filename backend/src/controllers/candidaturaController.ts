import { candidaturaService } from '../services/candidaturaService.ts'
import { FastifyRequest, FastifyReply } from 'fastify'
import { candidaturaValidador } from '../utils/candidaturaValidador.ts'

export const candidaturaController = {
  candidaturaVaga: async (
    request: FastifyRequest<{ Body: { vagaId: string } }>,
    reply: FastifyReply,
  ) => {
    try {
      const { vagaId } = request.body

      // Validação de autenticação
      if (!request.user || !request.user.sub) {
        return reply.status(401).send({
          error: 'Usuário não autenticado',
          codigo: 'NAO_AUTENTICADO',
        })
      }

      // Validação de input
      if (!vagaId || typeof vagaId !== 'string') {
        return reply.status(400).send({
          error: 'ID da vaga é obrigatório e deve ser uma string válida',
          codigo: 'INPUT_INVALIDO',
        })
      }

      const estudanteId = request.user.sub

      // Primeira validação: checar se todas as regras de negócio são atendidas
      const validacaoPrevia = await candidaturaValidador.validarCandidaturaCompleta(
        vagaId,
        estudanteId,
      )

      if (!validacaoPrevia.isValid) {
        return reply.status(400).send({
          error: validacaoPrevia.error,
          codigo: validacaoPrevia.errorCode,
        })
      }

      // Se passou na validação, tenta criar a candidatura
      const result = await candidaturaService.candidaturaVaga({
        vagaId,
        estudanteId,
      })

      return reply.status(201).send({
        sucesso: true,
        dados: result,
        message: 'Candidatura realizada com sucesso',
      })
    } catch (error: any) {
      const mensagem = error.message || 'Erro ao processar candidatura'

      // Verifica se é um erro específico de negócio
      if (
        mensagem.includes('já se candidatou') ||
        mensagem.includes('prazo de inscrição') ||
        mensagem.includes('não possui mais vagas') ||
        mensagem.includes('não está mais ativa') ||
        mensagem.includes('foi encerrada') ||
        mensagem.includes('não atende') ||
        mensagem.includes('curso não está')
      ) {
        return reply.status(400).send({
          error: mensagem,
          codigo: 'VALIDACAO_NEGOCIO',
        })
      }

      return reply.status(500).send({
        error: 'Erro ao processar candidatura',
        codigo: 'ERRO_INTERNO',
      })
    }
  },

  listarCadidaturasPorEstudante: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Validação de autenticação
      if (!request.user || !request.user.sub) {
        return reply.status(401).send({
          error: 'Usuário não autenticado',
          codigo: 'NAO_AUTENTICADO',
        })
      }

      // Validação de role
      if (request.user.role !== 'ESTUDANTE') {
        return reply.status(403).send({
          error: 'Apenas estudantes podem listar suas candidaturas',
          codigo: 'ACESSO_NEGADO',
        })
      }

      const estudanteId = request.user.sub
      const candidaturas = await candidaturaService.listarCadidaturasPorEstudante(estudanteId)

      return reply.status(200).send({
        sucesso: true,
        dados: candidaturas,
        total: candidaturas.length,
      })
    } catch (error: any) {
      return reply.status(500).send({
        error: error.message || 'Erro ao listar candidaturas',
        codigo: 'ERRO_LISTAGEM',
      })
    }
  },

  removerCandidatura: async (
    request: FastifyRequest<{ Params: { candidaturaId: string } }>,
    reply: FastifyReply,
  ) => {
    try {
      // Validação de autenticação
      const estudanteId = request.user?.sub

      if (!estudanteId) {
        return reply.status(401).send({
          error: 'Usuário não autenticado',
          codigo: 'NAO_AUTENTICADO',
        })
      }

      // Validação de role
      if (request.user?.role !== 'ESTUDANTE') {
        return reply.status(403).send({
          error: 'Apenas estudantes podem remover suas candidaturas',
          codigo: 'ACESSO_NEGADO',
        })
      }

      const { candidaturaId } = request.params

      // Validação de input
      if (!candidaturaId || typeof candidaturaId !== 'string') {
        return reply.status(400).send({
          error: 'ID da candidatura é obrigatório e deve ser uma string válida',
          codigo: 'INPUT_INVALIDO',
        })
      }

      const resultado = await candidaturaService.removerCandidatura(candidaturaId, estudanteId)

      return reply.status(200).send({
        sucesso: true,
        dados: resultado,
        message: 'Candidatura removida com sucesso',
      })
    } catch (error: any) {
      const mensagem = error.message || 'Erro ao remover candidatura'

      // Verifica se é erro de permissão
      if (mensagem.includes('Você não tem permissão')) {
        return reply.status(403).send({
          error: mensagem,
          codigo: 'ACESSO_NEGADO',
        })
      }

      // Verifica se é erro de estado inválido
      if (mensagem.includes('Não é possível remover')) {
        return reply.status(400).send({
          error: mensagem,
          codigo: 'ESTADO_INVALIDO',
        })
      }

      // Verifica se não foi encontrada
      if (mensagem.includes('não encontrada')) {
        return reply.status(404).send({
          error: mensagem,
          codigo: 'NAO_ENCONTRADA',
        })
      }

      return reply.status(500).send({
        error: 'Erro ao remover candidatura',
        codigo: 'ERRO_INTERNO',
      })
    }
  },

  listarCandidatosPorVaga: async (
    request: FastifyRequest<{ Params: { vagaId: string } }>,
    reply: FastifyReply,
  ) => {
    try {
      // Validação de autenticação
      if (!request.user || !request.user.sub) {
        return reply.status(401).send({
          error: 'Usuário não autenticado',
          codigo: 'NAO_AUTENTICADO',
        })
      }

      // Validação de role - apenas empresas e professores podem listar candidatos
      if (request.user.role === 'ESTUDANTE') {
        return reply.status(403).send({
          error: 'Estudantes não podem acessar esta funcionalidade',
          codigo: 'ACESSO_NEGADO',
        })
      }

      const { vagaId } = request.params

      // Validação de input
      if (!vagaId || typeof vagaId !== 'string') {
        return reply.status(400).send({
          error: 'ID da vaga é obrigatório e deve ser uma string válida',
          codigo: 'INPUT_INVALIDO',
        })
      }

      const candidatos = await candidaturaService.listarCandidatosPorVaga(vagaId)

      return reply.status(200).send({
        sucesso: true,
        dados: candidatos,
        total: candidatos.length,
      })
    } catch (error: any) {
      return reply.status(500).send({
        error: error.message || 'Erro ao listar candidatos',
        codigo: 'ERRO_LISTAGEM',
      })
    }
  },

  aprovarCandidatura: async (
    request: FastifyRequest<{ Body: { candidaturaId: string; estudanteId: string } }>,
    reply: FastifyReply,
  ) => {
    try {
      // Validação de autenticação
      if (!request.user || !request.user.sub) {
        return reply.status(401).send({
          error: 'Usuário não autenticado',
          codigo: 'NAO_AUTENTICADO',
        })
      }

      // Validação de role - apenas empresas e professores podem aprovar
      if (request.user.role === 'ESTUDANTE') {
        return reply.status(403).send({
          error: 'Estudantes não podem aprovar candidaturas',
          codigo: 'ACESSO_NEGADO',
        })
      }

      const { candidaturaId, estudanteId } = request.body

      // Validação de input
      if (!candidaturaId || typeof candidaturaId !== 'string') {
        return reply.status(400).send({
          error: 'ID da candidatura é obrigatório e deve ser uma string válida',
          codigo: 'INPUT_INVALIDO',
        })
      }

      if (!estudanteId || typeof estudanteId !== 'string') {
        return reply.status(400).send({
          error: 'ID do estudante é obrigatório e deve ser uma string válida',
          codigo: 'INPUT_INVALIDO',
        })
      }

      // Validação de status antes de tentar aprovar
      const validacao = await candidaturaValidador.validarCandidaturaPendente(candidaturaId)

      if (!validacao.isValid) {
        return reply.status(400).send({
          error: validacao.error,
          codigo: validacao.errorCode,
        })
      }

      const resultado = await candidaturaService.aprovarCandidatura({
        candidaturaId,
        estudanteId,
      })

      return reply.status(200).send({
        sucesso: true,
        dados: resultado,
        message: 'Candidato aprovado com sucesso',
      })
    } catch (error: any) {
      const mensagem = error.message || 'Erro ao aprovar candidatura'

      // Verifica se é erro de estado
      if (
        mensagem.includes('já foi aprovada') ||
        mensagem.includes('já foi recusada') ||
        mensagem.includes('não pode ser aprovada')
      ) {
        return reply.status(400).send({
          error: mensagem,
          codigo: 'ESTADO_INVALIDO',
        })
      }

      // Verifica se é erro de vagas
      if (mensagem.includes('não possui mais vagas')) {
        return reply.status(400).send({
          error: mensagem,
          codigo: 'VAGA_CHEIA',
        })
      }

      // Verifica se não foi encontrada
      if (mensagem.includes('não encontrado')) {
        return reply.status(404).send({
          error: mensagem,
          codigo: 'NAO_ENCONTRADA',
        })
      }

      return reply.status(500).send({
        error: 'Erro ao aprovar candidatura',
        codigo: 'ERRO_INTERNO',
      })
    }
  },

  recusarCandidatura: async (
    request: FastifyRequest<{ Body: { candidaturaId: string; estudanteId: string } }>,
    reply: FastifyReply,
  ) => {
    try {
      // Validação de autenticação
      if (!request.user || !request.user.sub) {
        return reply.status(401).send({
          error: 'Usuário não autenticado',
          codigo: 'NAO_AUTENTICADO',
        })
      }

      // Validação de role - apenas empresas e professores podem recusar
      if (request.user.role === 'ESTUDANTE') {
        return reply.status(403).send({
          error: 'Estudantes não podem recusar candidaturas',
          codigo: 'ACESSO_NEGADO',
        })
      }

      const { candidaturaId, estudanteId } = request.body

      // Validação de input
      if (!candidaturaId || typeof candidaturaId !== 'string') {
        return reply.status(400).send({
          error: 'ID da candidatura é obrigatório e deve ser uma string válida',
          codigo: 'INPUT_INVALIDO',
        })
      }

      if (!estudanteId || typeof estudanteId !== 'string') {
        return reply.status(400).send({
          error: 'ID do estudante é obrigatório e deve ser uma string válida',
          codigo: 'INPUT_INVALIDO',
        })
      }

      // Validação de status antes de tentar recusar
      const validacao = await candidaturaValidador.validarCandidaturaPendente(candidaturaId)

      if (!validacao.isValid) {
        return reply.status(400).send({
          error: validacao.error,
          codigo: validacao.errorCode,
        })
      }

      const resultado = await candidaturaService.recusarCandidatura({
        candidaturaId,
        estudanteId,
      })

      return reply.status(200).send({
        sucesso: true,
        dados: resultado,
        message: 'Candidatura recusada com sucesso',
      })
    } catch (error: any) {
      const mensagem = error.message || 'Erro ao recusar candidatura'

      // Verifica se é erro de estado
      if (
        mensagem.includes('já foi aprovada') ||
        mensagem.includes('já foi recusada') ||
        mensagem.includes('não pode ser recusada')
      ) {
        return reply.status(400).send({
          error: mensagem,
          codigo: 'ESTADO_INVALIDO',
        })
      }

      // Verifica se não foi encontrada
      if (mensagem.includes('não encontrado')) {
        return reply.status(404).send({
          error: mensagem,
          codigo: 'NAO_ENCONTRADA',
        })
      }

      return reply.status(500).send({
        error: 'Erro ao recusar candidatura',
        codigo: 'ERRO_INTERNO',
      })
    }
  },

  obterDetalhes: async (
    request: FastifyRequest<{ Params: { candidaturaId: string } }>,
    reply: FastifyReply,
  ) => {
    try {
      // Validação de autenticação
      if (!request.user || !request.user.sub) {
        return reply.status(401).send({
          error: 'Usuário não autenticado',
          codigo: 'NAO_AUTENTICADO',
        })
      }

      const { candidaturaId } = request.params

      // Validação de input
      if (!candidaturaId || typeof candidaturaId !== 'string') {
        return reply.status(400).send({
          error: 'ID da candidatura é obrigatório e deve ser uma string válida',
          codigo: 'INPUT_INVALIDO',
        })
      }

      const detalhes = await candidaturaService.obterDetalhes(candidaturaId)

      return reply.status(200).send({
        sucesso: true,
        dados: detalhes,
      })
    } catch (error: any) {
      if (error.message.includes('não encontrada')) {
        return reply.status(404).send({
          error: error.message,
          codigo: 'NAO_ENCONTRADA',
        })
      }

      return reply.status(500).send({
        error: 'Erro ao obter detalhes da candidatura',
        codigo: 'ERRO_INTERNO',
      })
    }
  },

  validarCandidatura: async (
    request: FastifyRequest<{ Body: { vagaId: string } }>,
    reply: FastifyReply,
  ) => {
    try {
      // Validação de autenticação
      if (!request.user || !request.user.sub) {
        return reply.status(401).send({
          error: 'Usuário não autenticado',
          codigo: 'NAO_AUTENTICADO',
        })
      }

      const { vagaId } = request.body

      // Validação de input
      if (!vagaId || typeof vagaId !== 'string') {
        return reply.status(400).send({
          error: 'ID da vaga é obrigatório',
          codigo: 'INPUT_INVALIDO',
        })
      }

      const validacao = await candidaturaValidador.validarCandidaturaCompleta(
        vagaId,
        request.user.sub,
      )

      return reply.status(200).send({
        sucesso: true,
        valido: validacao.isValid,
        ...(validacao.error && { erro: validacao.error, codigo: validacao.errorCode }),
      })
    } catch (error: any) {
      return reply.status(500).send({
        error: 'Erro ao validar candidatura',
        codigo: 'ERRO_INTERNO',
      })
    }
  },
}
