import { candidaturaRepository } from '../repositories/candidaturaRepository.ts'
import { candidaturaValidador } from '../utils/candidaturaValidador.ts'
import { AprovarAlunoDTO, RecusarAlunoDTO } from '../schemas/canditadura.Schema.ts'
import { notificationService } from './notificationService.ts'

export const candidaturaService = {
  async candidaturaVaga(candidaturaData: { vagaId: string; estudanteId: string }) {
    try {
      // Validações de negócio
      let validacao = await candidaturaValidador.validarCandidaturaCompleta(
        candidaturaData.vagaId,
        candidaturaData.estudanteId,
      )

      if (!validacao.isValid) {
        throw new Error(validacao.error || 'Validação da candidatura falhou')
      }

      const candidatura = await candidaturaRepository.candidaturaVaga(candidaturaData)

      if (!candidatura) {
        throw new Error('Erro ao criar candidatura')
      }

      return {
        id: candidatura.id,
        vagaId: candidatura.vagaId,
        status: candidatura.status,
        dataCandidatura: new Date(candidatura.dataCandidatura).toLocaleDateString('pt-BR'),
        vaga: {
          id: candidatura.vaga.id,
          titulo: candidatura.vaga.titulo,
          tipo: candidatura.vaga.tipo,
        },
      }
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao processar candidatura')
    }
  },

  async listarCadidaturasPorEstudante(estudanteId: string) {
    try {
      const candidaturas = await candidaturaRepository.listarCadidaturasPorEstudante(estudanteId)

      const candidaturasFormatada = candidaturas.map(c => ({
        id: c.id,
        status: c.status,
        dataCandidatura: new Date(c.dataCandidatura).toLocaleDateString('pt-BR'),
        vaga: {
          id: c.vaga.id,
          titulo: c.vaga.titulo,
          tipo: c.vaga.tipo,
        },
        responsavel: {
          idResponsavel: c.vaga.empresaId || c.vaga.professorId || ' ',
          nome: c.vaga.empresa?.nomeFantasia || c.vaga.professor?.user?.nome || ' ',
          tipo: c.vaga.empresa ? 'EMPRESA' : 'PROFESSOR',
        },
      }))

      return candidaturasFormatada
    } catch (error: any) {
      throw new Error('Erro ao listar candidaturas: ' + error.message)
    }
  },

  async removerCandidatura(candidaturaId: string, estudanteId: string) {
    try {
      const resultado = await candidaturaRepository.removerCandidatura(candidaturaId, estudanteId)
      return { success: true, message: 'Candidatura removida com sucesso' }
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao remover candidatura')
    }
  },

  async listarCandidatosPorVaga(vagaId: string) {
    try {
      const candidaturas = await candidaturaRepository.listarCandidatosPorVaga(vagaId)

      const candidatosFormatados = candidaturas.map(c => ({
        id: c.id,
        status: c.status,
        dataCandidatura: new Date(c.dataCandidatura).toLocaleDateString('pt-BR'),
        estudante: {
          id: c.estudante.userId,
          nome: c.estudante.user.nome,
          email: c.estudante.user.email,
          curso: c.estudante.curso,
          semestre: c.estudante.semestre,
          matricula: c.estudante.matricula,
        },
      }))

      return candidatosFormatados
    } catch (error: any) {
      throw new Error('Erro ao listar candidatos da vaga: ' + error.message)
    }
  },

  async aprovarCandidatura(dados: AprovarAlunoDTO) {
    try {
      // Validação se candidatura está pendente
      const validacao = await candidaturaValidador.validarCandidaturaPendente(dados.candidaturaId)

      if (!validacao.isValid) {
        throw new Error(validacao.error || 'Candidatura não pode ser aprovada')
      }

      const candidaturaAprovada = await candidaturaRepository.aprovarCandidatura(dados)

      // Enviar notificação de aprovação (de forma assíncrona, sem bloquear)
      setImmediate(async () => {
        try {
          const detalhes = await candidaturaRepository.obterCandidaturaPorId(candidaturaAprovada.id)
          if (detalhes) {
            const responsavelNome =
              detalhes.vaga.empresa?.nomeFantasia ||
              detalhes.vaga.professor?.user?.nome ||
              'Responsável'
            const vagaTipo = detalhes.vaga.tipo

            await notificationService.enviarCandidaturaAprovada({
              name: detalhes.estudante.user.nome,
              email: detalhes.estudante.user.email,
              vagaTitulo: detalhes.vaga.titulo,
              responsavelNome: responsavelNome,
              vagaTipo: vagaTipo,
              dataCandidatura: new Date(detalhes.dataCandidatura).toLocaleDateString('pt-BR'),
              dashboardURL: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/aluno/candidaturas`,
            })
          }
        } catch (error) {
          console.error('Erro ao enviar notificação de aprovação:', error)
        }
      })

      return {
        id: candidaturaAprovada.id,
        status: candidaturaAprovada.status,
        message: 'Candidatura aprovada com sucesso',
      }
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao aprovar candidatura')
    }
  },

  async recusarCandidatura(dados: RecusarAlunoDTO) {
    try {
      // Validação se candidatura está pendente
      const validacao = await candidaturaValidador.validarCandidaturaPendente(dados.candidaturaId)

      if (!validacao.isValid) {
        throw new Error(validacao.error || 'Candidatura não pode ser recusada')
      }

      const candidaturaRecusada = await candidaturaRepository.recusarCandidatura(dados)

      // Enviar notificação de recusa (de forma assíncrona, sem bloquear)
      setImmediate(async () => {
        try {
          const detalhes = await candidaturaRepository.obterCandidaturaPorId(candidaturaRecusada.id)
          if (detalhes) {
            const responsavelNome =
              detalhes.vaga.empresa?.nomeFantasia ||
              detalhes.vaga.professor?.user?.nome ||
              'Responsável'
            const vagaTipo = detalhes.vaga.tipo

            await notificationService.enviarCandidaturaRecusada({
              name: detalhes.estudante.user.nome,
              email: detalhes.estudante.user.email,
              vagaTitulo: detalhes.vaga.titulo,
              responsavelNome: responsavelNome,
              vagaTipo: vagaTipo,
              dataCandidatura: new Date(detalhes.dataCandidatura).toLocaleDateString('pt-BR'),
              dashboardURL: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/aluno/candidaturas`,
            })
          }
        } catch (error) {
          console.error('Erro ao enviar notificação de recusa:', error)
        }
      })

      return {
        id: candidaturaRecusada.id,
        status: candidaturaRecusada.status,
        message: 'Candidatura recusada com sucesso',
      }
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao recusar candidatura')
    }
  },

  async obterDetalhes(candidaturaId: string) {
    try {
      const candidatura = await candidaturaRepository.obterCandidaturaPorId(candidaturaId)

      if (!candidatura) {
        throw new Error('Candidatura não encontrada')
      }

      return {
        id: candidatura.id,
        status: candidatura.status,
        dataCandidatura: new Date(candidatura.dataCandidatura).toLocaleDateString('pt-BR'),
        vaga: {
          id: candidatura.vaga.id,
          titulo: candidatura.vaga.titulo,
          tipo: candidatura.vaga.tipo,
          descricao: candidatura.vaga.descricao,
          requisitos: candidatura.vaga.requisitos,
          prazoInscricao: new Date(candidatura.vaga.prazoInscricao).toLocaleDateString('pt-BR'),
        },
        estudante: {
          id: candidatura.estudante.userId,
          nome: candidatura.estudante.user.nome,
          email: candidatura.estudante.user.email,
          curso: candidatura.estudante.curso,
          semestre: candidatura.estudante.semestre,
          matricula: candidatura.estudante.matricula,
        },
      }
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao obter detalhes da candidatura')
    }
  },

  async listarComFiltros(filtros: {
    estudanteId?: string
    vagaId?: string
    status?: 'PENDENTE' | 'ACEITA' | 'RECUSADA'
    limit?: number
    offset?: number
  }) {
    try {
      const limit = filtros.limit || 10
      const offset = filtros.offset || 0

      const resultado = await candidaturaRepository.listarCandidaturasComFiltros(
        filtros.estudanteId,
        filtros.vagaId,
        filtros.status,
        limit,
        offset,
      )

      return {
        candidaturas: resultado.dados.map(c => ({
          id: c.id,
          status: c.status,
          dataCandidatura: new Date(c.dataCandidatura).toLocaleDateString('pt-BR'),
          vaga: {
            id: c.vaga.id,
            titulo: c.vaga.titulo,
            tipo: c.vaga.tipo,
          },
          estudante: {
            id: c.estudante.userId,
            nome: c.estudante.user.nome,
            email: c.estudante.user.email,
          },
        })),
        paginacao: {
          total: resultado.total,
          pagina: resultado.pagina,
          totalPaginas: resultado.totalPaginas,
          limite: limit,
        },
      }
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao listar candidaturas com filtros')
    }
  },
}
