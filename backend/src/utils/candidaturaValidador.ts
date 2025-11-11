import prisma from '../../prisma/client.ts'
import { CANDIDATURA_VALIDATION_ERRORS } from '../schemas/canditadura.Schema.ts'

export interface ValidationResult {
  isValid: boolean
  error?: string
  errorCode?: string
}

export const candidaturaValidador = {
  /**
   * Valida se o prazo de inscrição da vaga ainda está ativo
   */
  async validarPrazoInscricao(vagaId: string): Promise<ValidationResult> {
    try {
      const vaga = await prisma.vaga.findUnique({
        where: { id: vagaId },
        select: { prazoInscricao: true },
      })

      if (!vaga) {
        return { isValid: false, error: 'Vaga não encontrada', errorCode: 'VAGA_NAO_ENCONTRADA' }
      }

      const agora = new Date()
      const prazoExpirado = new Date(vaga.prazoInscricao) < agora

      if (prazoExpirado) {
        return {
          isValid: false,
          error: CANDIDATURA_VALIDATION_ERRORS.VAGA_EXPIRADA,
          errorCode: 'VAGA_EXPIRADA',
        }
      }

      return { isValid: true }
    } catch (error) {
      return {
        isValid: false,
        error: 'Erro ao validar prazo de inscrição',
        errorCode: 'ERRO_VALIDACAO_PRAZO',
      }
    }
  },

  /**
   * Valida se a vaga está ativa e não encerrada
   */
  async validarStatusVaga(vagaId: string): Promise<ValidationResult> {
    try {
      const vaga = await prisma.vaga.findUnique({
        where: { id: vagaId },
        select: { statusVaga: true },
      })

      if (!vaga) {
        return { isValid: false, error: 'Vaga não encontrada', errorCode: 'VAGA_NAO_ENCONTRADA' }
      }

      if (vaga.statusVaga === 'ENCERRADA') {
        return {
          isValid: false,
          error: CANDIDATURA_VALIDATION_ERRORS.VAGA_ENCERRADA,
          errorCode: 'VAGA_ENCERRADA',
        }
      }

      if (vaga.statusVaga === 'INATIVA') {
        return {
          isValid: false,
          error: CANDIDATURA_VALIDATION_ERRORS.VAGA_INATIVA,
          errorCode: 'VAGA_INATIVA',
        }
      }

      return { isValid: true }
    } catch (error) {
      return {
        isValid: false,
        error: 'Erro ao validar status da vaga',
        errorCode: 'ERRO_VALIDACAO_STATUS',
      }
    }
  },

  /**
   * Valida se ainda há vagas disponíveis
   */
  async validarVagasDisponiveis(vagaId: string): Promise<ValidationResult> {
    try {
      const vaga = await prisma.vaga.findUnique({
        where: { id: vagaId },
        select: { numeroVagas: true, numeroVagasPreenchidas: true },
      })

      if (!vaga) {
        return { isValid: false, error: 'Vaga não encontrada', errorCode: 'VAGA_NAO_ENCONTRADA' }
      }

      const vagasDisponiveis = vaga.numeroVagas - vaga.numeroVagasPreenchidas

      if (vagasDisponiveis <= 0) {
        return {
          isValid: false,
          error: CANDIDATURA_VALIDATION_ERRORS.VAGA_SEM_VAGAS,
          errorCode: 'VAGA_SEM_VAGAS',
        }
      }

      return { isValid: true }
    } catch (error) {
      return {
        isValid: false,
        error: 'Erro ao validar disponibilidade de vagas',
        errorCode: 'ERRO_VALIDACAO_VAGAS',
      }
    }
  },

  /**
   * Valida se o estudante já se candidatou para esta vaga
   */
  async validarDuplicacao(vagaId: string, estudanteId: string): Promise<ValidationResult> {
    try {
      const candidaturaExistente = await prisma.candidatura.findFirst({
        where: {
          vagaId,
          estudanteId,
        },
        select: { id: true, status: true },
      })

      if (candidaturaExistente) {
        return {
          isValid: false,
          error: CANDIDATURA_VALIDATION_ERRORS.CANDIDATURA_DUPLICADA,
          errorCode: 'CANDIDATURA_DUPLICADA',
        }
      }

      return { isValid: true }
    } catch (error) {
      return {
        isValid: false,
        error: 'Erro ao validar duplicação de candidatura',
        errorCode: 'ERRO_VALIDACAO_DUPLICACAO',
      }
    }
  },

  /**
   * Valida se o estudante atende aos requisitos de semestre mínimo
   */
  async validarSemestreMinimo(
    vagaId: string,
    estudanteId: string,
  ): Promise<ValidationResult> {
    try {
      const [vaga, estudante] = await Promise.all([
        prisma.vaga.findUnique({
          where: { id: vagaId },
          select: { semestreMinimo: true },
        }),
        prisma.estudante.findUnique({
          where: { id: estudanteId },
          select: { semestre: true },
        }),
      ])

      if (!vaga || !estudante) {
        return {
          isValid: false,
          error: 'Vaga ou estudante não encontrado',
          errorCode: 'NAO_ENCONTRADO',
        }
      }

      if (vaga.semestreMinimo && estudante.semestre < vaga.semestreMinimo) {
        return {
          isValid: false,
          error: CANDIDATURA_VALIDATION_ERRORS.ESTUDANTE_NAO_ATENDE_SEMESTRE,
          errorCode: 'SEMESTRE_INSUFICIENTE',
        }
      }

      return { isValid: true }
    } catch (error) {
      return {
        isValid: false,
        error: 'Erro ao validar semestre mínimo',
        errorCode: 'ERRO_VALIDACAO_SEMESTRE',
      }
    }
  },

  /**
   * Valida se o curso do estudante está entre os cursos alvo da vaga
   */
  async validarCursoAlvo(vagaId: string, estudanteId: string): Promise<ValidationResult> {
    try {
      const [vaga, estudante] = await Promise.all([
        prisma.vaga.findUnique({
          where: { id: vagaId },
          select: { cursosAlvo: true },
        }),
        prisma.estudante.findUnique({
          where: { id: estudanteId },
          select: { curso: true },
        }),
      ])

      if (!vaga || !estudante) {
        return {
          isValid: false,
          error: 'Vaga ou estudante não encontrado',
          errorCode: 'NAO_ENCONTRADO',
        }
      }

      // Se cursosAlvo está vazio, aceita qualquer curso
      if (!vaga.cursosAlvo || vaga.cursosAlvo.length === 0) {
        return { isValid: true }
      }

      const cursoValido = vaga.cursosAlvo.some(
        cursoAlvo =>
          cursoAlvo.toLowerCase().trim() === estudante.curso.toLowerCase().trim(),
      )

      if (!cursoValido) {
        return {
          isValid: false,
          error: CANDIDATURA_VALIDATION_ERRORS.ESTUDANTE_NAO_ATENDE_CURSO,
          errorCode: 'CURSO_INVALIDO',
        }
      }

      return { isValid: true }
    } catch (error) {
      return {
        isValid: false,
        error: 'Erro ao validar curso alvo',
        errorCode: 'ERRO_VALIDACAO_CURSO',
      }
    }
  },

  /**
   * Valida se a candidatura existe e está no status pendente
   */
  async validarCandidaturaPendente(candidaturaId: string): Promise<ValidationResult> {
    try {
      const candidatura = await prisma.candidatura.findUnique({
        where: { id: candidaturaId },
        select: { id: true, status: true },
      })

      if (!candidatura) {
        return {
          isValid: false,
          error: CANDIDATURA_VALIDATION_ERRORS.CANDIDATURA_NAO_ENCONTRADA,
          errorCode: 'CANDIDATURA_NAO_ENCONTRADA',
        }
      }

      if (candidatura.status === 'ACEITA') {
        return {
          isValid: false,
          error: CANDIDATURA_VALIDATION_ERRORS.CANDIDATURA_JA_APROVADA,
          errorCode: 'JA_APROVADA',
        }
      }

      if (candidatura.status === 'RECUSADA') {
        return {
          isValid: false,
          error: CANDIDATURA_VALIDATION_ERRORS.CANDIDATURA_JA_RECUSADA,
          errorCode: 'JA_RECUSADA',
        }
      }

      return { isValid: true }
    } catch (error) {
      return {
        isValid: false,
        error: 'Erro ao validar status da candidatura',
        errorCode: 'ERRO_VALIDACAO_CANDIDATURA',
      }
    }
  },

  /**
   * Valida se o usuário é o responsável pela vaga (empresa ou professor)
   */
  async validarAutorizacaoVaga(
    vagaId: string,
    usuarioId: string,
    tipoUsuario: string,
  ): Promise<ValidationResult> {
    try {
      const vaga = await prisma.vaga.findUnique({
        where: { id: vagaId },
        include: {
          empresa: { select: { userId: true } },
          professor: { select: { userId: true } },
        },
      })

      if (!vaga) {
        return { isValid: false, error: 'Vaga não encontrada', errorCode: 'VAGA_NAO_ENCONTRADA' }
      }

      const ehResponsavel =
        (tipoUsuario === 'EMPRESA' && vaga.empresa?.userId === usuarioId) ||
        (tipoUsuario === 'PROFESSOR' && vaga.professor?.userId === usuarioId)

      if (!ehResponsavel) {
        return {
          isValid: false,
          error: CANDIDATURA_VALIDATION_ERRORS.USUARIO_NAO_AUTORIZADO,
          errorCode: 'NAO_AUTORIZADO',
        }
      }

      return { isValid: true }
    } catch (error) {
      return {
        isValid: false,
        error: 'Erro ao validar autorização',
        errorCode: 'ERRO_VALIDACAO_AUTORIZACAO',
      }
    }
  },

  /**
   * Realiza todas as validações para candidatura
   */
  async validarCandidaturaCompleta(
    vagaId: string,
    estudanteId: string,
  ): Promise<ValidationResult> {
    // Valida prazo
    let validacao = await this.validarPrazoInscricao(vagaId)
    if (!validacao.isValid) return validacao

    // Valida status da vaga
    validacao = await this.validarStatusVaga(vagaId)
    if (!validacao.isValid) return validacao

    // Valida vagas disponíveis
    validacao = await this.validarVagasDisponiveis(vagaId)
    if (!validacao.isValid) return validacao

    // Valida duplicação
    validacao = await this.validarDuplicacao(vagaId, estudanteId)
    if (!validacao.isValid) return validacao

    // Valida semestre mínimo
    validacao = await this.validarSemestreMinimo(vagaId, estudanteId)
    if (!validacao.isValid) return validacao

    // Valida curso alvo
    validacao = await this.validarCursoAlvo(vagaId, estudanteId)
    if (!validacao.isValid) return validacao

    return { isValid: true }
  },
}
