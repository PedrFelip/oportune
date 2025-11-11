import prisma from '../../prisma/client.ts'
import { AprovarAlunoDTO, RecusarAlunoDTO } from '../schemas/canditadura.Schema.ts'
import { candidaturaValidador } from '../utils/candidaturaValidador.ts'

export const candidaturaRepository = {
  async candidaturaVaga(candidaturaData: { vagaId: string; estudanteId: string }) {
    try {
      // Validações de negócio antes de criar
      const validacao = await candidaturaValidador.validarCandidaturaCompleta(
        candidaturaData.vagaId,
        candidaturaData.estudanteId,
      )

      if (!validacao.isValid) {
        throw new Error(validacao.error || 'Validação falhou')
      }

      // Usa transação para garantir integridade dos dados
      const candidatura = await prisma.$transaction(async tx => {
        const novaCandidatura = await tx.candidatura.create({
          data: {
            vagaId: candidaturaData.vagaId,
            estudanteId: candidaturaData.estudanteId,
          },
          include: {
            vaga: {
              select: {
                id: true,
                titulo: true,
                tipo: true,
              },
            },
          },
        })

        return novaCandidatura
      })

      return candidatura
    } catch (error: any) {
      // Tratamento específico de erros de duplicação do banco de dados
      if (error.code === 'P2002') {
        throw new Error('Estudante já se candidatou para esta vaga')
      }

      throw error
    }
  },

  async listarCadidaturasPorEstudante(estudanteId: string) {
    try {
      const candidaturas = await prisma.candidatura.findMany({
        take: 10,
        where: {
          estudanteId,
        },
        include: {
          vaga: {
            select: {
              id: true,
              titulo: true,
              tipo: true,
              empresaId: true,
              empresa: {
                select: {
                  nomeFantasia: true,
                },
              },
              professorId: true,
              professor: {
                select: {
                  user: {
                    select: {
                      nome: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return candidaturas
    } catch (error) {
      throw new Error('Erro ao listar candidaturas: ' + error)
    }
  },

  async removerCandidatura(candidaturaId: string, estudanteId: string) {
    try {
      // Verifica se a candidatura pertence ao estudante
      const candidatura = await prisma.candidatura.findUnique({
        where: { id: candidaturaId },
        select: { estudanteId: true, status: true },
      })

      if (!candidatura) {
        throw new Error('Candidatura não encontrada')
      }

      // Só permite remover candidaturas pendentes
      if (candidatura.status !== 'PENDENTE') {
        throw new Error(`Não é possível remover uma candidatura ${candidatura.status}`)
      }

      // Verifica permissão - estudante só pode remover suas próprias candidaturas
      if (candidatura.estudanteId !== estudanteId) {
        throw new Error('Você não tem permissão para remover esta candidatura')
      }

      await prisma.candidatura.delete({
        where: {
          id: candidaturaId,
        },
      })
    } catch (error) {
      throw new Error('Erro ao remover candidatura: ' + error)
    }
  },

  async listarCandidatosPorVaga(vagaId: string) {
    try {
      const candidaturas = await prisma.candidatura.findMany({
        where: {
          vagaId,
        },
        include: {
          estudante: {
            include: {
              user: {
                select: {
                  nome: true,
                  email: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return candidaturas
    } catch (error) {
      throw new Error('Erro ao listar candidatos da vaga: ' + error)
    }
  },

  async aprovarCandidatura(dados: AprovarAlunoDTO) {
    try {
      // Valida se candidatura pode ser aprovada
      const validacao = await candidaturaValidador.validarCandidaturaPendente(dados.candidaturaId)

      if (!validacao.isValid) {
        throw new Error(validacao.error || 'Candidatura não pode ser aprovada')
      }

      // Valida se ainda há vagas disponíveis
      const vagasValidacao = await prisma.candidatura.findUnique({
        where: { id: dados.candidaturaId },
        select: {
          vagaId: true,
          vaga: {
            select: {
              numeroVagas: true,
              numeroVagasPreenchidas: true,
            },
          },
        },
      })

      if (
        vagasValidacao &&
        vagasValidacao.vaga.numeroVagasPreenchidas >= vagasValidacao.vaga.numeroVagas
      ) {
        throw new Error('Esta vaga não possui mais vagas disponíveis')
      }

      // Usa transação para garantir que ambas operações ocorram juntas
      const aceitacao = await prisma.$transaction(async tx => {
        const candidaturaAtualizada = await tx.candidatura.update({
          where: {
            id: dados.candidaturaId,
            estudanteId: dados.estudanteId,
          },
          data: {
            status: 'ACEITA',
          },
          include: {
            vaga: true,
            estudante: true,
          },
        })

        // Incrementa o número de vagas preenchidas
        await tx.vaga.update({
          where: { id: candidaturaAtualizada.vagaId },
          data: {
            numeroVagasPreenchidas: {
              increment: 1,
            },
          },
        })

        return candidaturaAtualizada
      })

      return aceitacao
    } catch (error: any) {
      // Tratamento específico de erros
      if (error.code === 'P2025') {
        throw new Error('Candidatura ou estudante não encontrado')
      }

      throw error
    }
  },

  async recusarCandidatura(dados: RecusarAlunoDTO) {
    try {
      // Valida se candidatura pode ser recusada
      const validacao = await candidaturaValidador.validarCandidaturaPendente(dados.candidaturaId)

      if (!validacao.isValid) {
        throw new Error(validacao.error || 'Candidatura não pode ser recusada')
      }

      const recusada = await prisma.candidatura.update({
        where: {
          id: dados.candidaturaId,
          estudanteId: dados.estudanteId,
        },
        data: {
          status: 'RECUSADA',
        },
        include: {
          vaga: true,
          estudante: true,
        },
      })

      return recusada
    } catch (error: any) {
      // Tratamento específico de erros
      if (error.code === 'P2025') {
        throw new Error('Candidatura ou estudante não encontrado')
      }

      throw error
    }
  },

  async verificarCandidaturaExistente(vagaId: string, estudanteId: string) {
    try {
      const candidatura = await prisma.candidatura.findFirst({
        where: {
          vagaId,
          estudanteId,
        },
        select: {
          id: true,
          status: true,
          dataCandidatura: true,
        },
      })

      return candidatura
    } catch (error) {
      throw new Error('Erro ao verificar candidatura existente: ' + error)
    }
  },

  async obterCandidaturaPorId(candidaturaId: string) {
    try {
      const candidatura = await prisma.candidatura.findUnique({
        where: { id: candidaturaId },
        include: {
          vaga: {
            include: {
              empresa: true,
              professor: true,
            },
          },
          estudante: {
            include: {
              user: true,
            },
          },
        },
      })

      return candidatura
    } catch (error) {
      throw new Error('Erro ao obter candidatura: ' + error)
    }
  },

  async listarCandidaturasComFiltros(
    estudanteId?: string,
    vagaId?: string,
    status?: 'PENDENTE' | 'ACEITA' | 'RECUSADA',
    limit: number = 10,
    offset: number = 0,
  ) {
    try {
      const where: any = {}

      if (estudanteId) {
        where.estudanteId = estudanteId
      }

      if (vagaId) {
        where.vagaId = vagaId
      }

      if (status) {
        where.status = status
      }

      const [candidaturas, total] = await Promise.all([
        prisma.candidatura.findMany({
          where,
          include: {
            vaga: true,
            estudante: {
              include: {
                user: true,
              },
            },
          },
          orderBy: {
            dataCandidatura: 'desc',
          },
          take: limit,
          skip: offset,
        }),
        prisma.candidatura.count({ where }),
      ])

      return {
        dados: candidaturas,
        total,
        pagina: Math.floor(offset / limit) + 1,
        totalPaginas: Math.ceil(total / limit),
      }
    } catch (error) {
      throw new Error('Erro ao listar candidaturas com filtros: ' + error)
    }
  },
}
