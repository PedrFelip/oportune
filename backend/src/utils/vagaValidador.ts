import prisma from '../../prisma/client.ts'

export interface ValidationResult {
  isValid: boolean
  error?: string
  errorCode?: string
}

export const VAGA_VALIDATION_ERRORS = {
  VAGA_NAO_ENCONTRADA: 'Vaga não encontrada',
  VAGA_JA_ENCERRADA: 'Esta vaga já foi encerrada',
  VAGA_INATIVA: 'Esta vaga não está mais ativa',
  PRAZO_INVALIDO: 'O prazo de inscrição deve ser uma data futura',
  PRAZO_JA_PASSOU: 'O prazo de inscrição para esta vaga já passou',
  NUMERO_VAGAS_INVALIDO: 'O número de vagas deve ser maior que zero',
  VAGAS_PREENCHIDAS_EXCESSO: 'Não é possível atualizar: número de vagas preenchidas excede o total',
  REQUISITOS_VAZIOS: 'A vaga deve ter pelo menos um requisito',
  REQUISITOS_INVALIDOS: 'Cada requisito deve ser uma string válida',
  CURSO_INVALIDO: 'Todos os cursos alvo devem ser strings válidas',
  SEMESTRE_INVALIDO: 'O semestre mínimo deve ser um número positivo',
  TITULO_OBRIGATORIO: 'O título da vaga é obrigatório',
  TITULO_MUITO_CURTO: 'O título deve ter no mínimo 2 caracteres',
  TITULO_MUITO_LONGO: 'O título não pode exceder 100 caracteres',
  DESCRICAO_OBRIGATORIA: 'A descrição da vaga é obrigatória',
  DESCRICAO_MUITO_CURTA: 'A descrição deve ter no mínimo 10 caracteres',
  DESCRICAO_MUITO_LONGA: 'A descrição não pode exceder 1000 caracteres',
  TIPO_INVALIDO: 'O tipo de vaga deve ser ESTAGIO, PESQUISA ou EXTENSAO',
  SEM_RESPONSAVEL: 'A vaga deve ter um responsável (empresa ou professor)',
  RESPONSAVEL_INVALIDO: 'O responsável especificado não existe',
  NAO_AUTORIZADO: 'Você não tem permissão para realizar esta ação',
  VAGA_TEM_CANDIDATOS: 'Não é possível deletar uma vaga que tem candidatos',
  NUMERO_VAGAS_INSUFICIENTE: 'Não é possível reduzir o número de vagas abaixo do número já preenchido',
  OPERACAO_INVALIDA_VAGA_ENCERRADA: 'Não é possível modificar uma vaga encerrada',
  CRITERIOS_FILTRO_INVALIDOS: 'Critérios de filtro inválidos',
}

export const vagaValidador = {
  /**
   * Valida se a vaga existe
   */
  async validarExistencia(vagaId: string): Promise<ValidationResult> {
    try {
      const vaga = await prisma.vaga.findUnique({
        where: { id: vagaId },
        select: { id: true },
      })

      if (!vaga) {
        return {
          isValid: false,
          error: VAGA_VALIDATION_ERRORS.VAGA_NAO_ENCONTRADA,
          errorCode: 'VAGA_NAO_ENCONTRADA',
        }
      }

      return { isValid: true }
    } catch (error) {
      return {
        isValid: false,
        error: 'Erro ao validar existência da vaga',
        errorCode: 'ERRO_VALIDACAO',
      }
    }
  },

  /**
   * Valida se a vaga não está encerrada
   */
  async validarStatusAtivo(vagaId: string): Promise<ValidationResult> {
    try {
      const vaga = await prisma.vaga.findUnique({
        where: { id: vagaId },
        select: { statusVaga: true },
      })

      if (!vaga) {
        return {
          isValid: false,
          error: VAGA_VALIDATION_ERRORS.VAGA_NAO_ENCONTRADA,
          errorCode: 'VAGA_NAO_ENCONTRADA',
        }
      }

      if (vaga.statusVaga === 'ENCERRADA') {
        return {
          isValid: false,
          error: VAGA_VALIDATION_ERRORS.VAGA_JA_ENCERRADA,
          errorCode: 'VAGA_ENCERRADA',
        }
      }

      if (vaga.statusVaga === 'INATIVA') {
        return {
          isValid: false,
          error: VAGA_VALIDATION_ERRORS.VAGA_INATIVA,
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
   * Valida o prazo de inscrição
   */
  async validarPrazoInscricao(prazoInscricao: Date): Promise<ValidationResult> {
    try {
      if (!(prazoInscricao instanceof Date) && typeof prazoInscricao === 'string') {
        prazoInscricao = new Date(prazoInscricao)
      }

      if (!prazoInscricao || isNaN(prazoInscricao.getTime())) {
        return {
          isValid: false,
          error: VAGA_VALIDATION_ERRORS.PRAZO_INVALIDO,
          errorCode: 'PRAZO_INVALIDO',
        }
      }

      const agora = new Date()
      if (prazoInscricao <= agora) {
        return {
          isValid: false,
          error: VAGA_VALIDATION_ERRORS.PRAZO_INVALIDO,
          errorCode: 'PRAZO_INVALIDO',
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
   * Valida o número de vagas
   */
  validarNumeroVagas(numeroVagas: number): ValidationResult {
    if (!Number.isInteger(numeroVagas) || numeroVagas <= 0) {
      return {
        isValid: false,
        error: VAGA_VALIDATION_ERRORS.NUMERO_VAGAS_INVALIDO,
        errorCode: 'NUMERO_VAGAS_INVALIDO',
      }
    }

    return { isValid: true }
  },

  /**
   * Valida se o número de vagas preenchidas não excede o total
   */
  async validarVagasPreenchidas(
    vagaId: string,
    numeroVagas: number,
  ): Promise<ValidationResult> {
    try {
      const vaga = await prisma.vaga.findUnique({
        where: { id: vagaId },
        select: {
          numeroVagasPreenchidas: true,
        },
      })

      if (!vaga) {
        return {
          isValid: false,
          error: VAGA_VALIDATION_ERRORS.VAGA_NAO_ENCONTRADA,
          errorCode: 'VAGA_NAO_ENCONTRADA',
        }
      }

      if (vaga.numeroVagasPreenchidas > numeroVagas) {
        return {
          isValid: false,
          error: VAGA_VALIDATION_ERRORS.NUMERO_VAGAS_INSUFICIENTE,
          errorCode: 'NUMERO_VAGAS_INSUFICIENTE',
        }
      }

      return { isValid: true }
    } catch (error) {
      return {
        isValid: false,
        error: 'Erro ao validar vagas preenchidas',
        errorCode: 'ERRO_VALIDACAO_VAGAS_PREENCHIDAS',
      }
    }
  },

  /**
   * Valida os requisitos
   */
  validarRequisitos(requisitos: string[]): ValidationResult {
    if (!Array.isArray(requisitos) || requisitos.length === 0) {
      return {
        isValid: false,
        error: VAGA_VALIDATION_ERRORS.REQUISITOS_VAZIOS,
        errorCode: 'REQUISITOS_VAZIOS',
      }
    }

    const requisitosValidos = requisitos.every(req => typeof req === 'string' && req.trim().length > 0)

    if (!requisitosValidos) {
      return {
        isValid: false,
        error: VAGA_VALIDATION_ERRORS.REQUISITOS_INVALIDOS,
        errorCode: 'REQUISITOS_INVALIDOS',
      }
    }

    return { isValid: true }
  },

  /**
   * Valida os cursos alvo
   */
  validarCursosAlvo(cursosAlvo?: string[]): ValidationResult {
    if (!cursosAlvo || cursosAlvo.length === 0) {
      return { isValid: true } // Cursos alvo é opcional
    }

    if (!Array.isArray(cursosAlvo)) {
      return {
        isValid: false,
        error: VAGA_VALIDATION_ERRORS.CURSO_INVALIDO,
        errorCode: 'CURSO_INVALIDO',
      }
    }

    const cursosValidos = cursosAlvo.every(curso => typeof curso === 'string' && curso.trim().length > 0)

    if (!cursosValidos) {
      return {
        isValid: false,
        error: VAGA_VALIDATION_ERRORS.CURSO_INVALIDO,
        errorCode: 'CURSO_INVALIDO',
      }
    }

    return { isValid: true }
  },

  /**
   * Valida o semestre mínimo
   */
  validarSemestreMinimo(semestreMinimo?: number): ValidationResult {
    if (semestreMinimo === undefined || semestreMinimo === null) {
      return { isValid: true } // Semestre mínimo é opcional
    }

    if (!Number.isInteger(semestreMinimo) || semestreMinimo < 1) {
      return {
        isValid: false,
        error: VAGA_VALIDATION_ERRORS.SEMESTRE_INVALIDO,
        errorCode: 'SEMESTRE_INVALIDO',
      }
    }

    return { isValid: true }
  },

  /**
   * Valida o título da vaga
   */
  validarTitulo(titulo: string): ValidationResult {
    if (!titulo || typeof titulo !== 'string') {
      return {
        isValid: false,
        error: VAGA_VALIDATION_ERRORS.TITULO_OBRIGATORIO,
        errorCode: 'TITULO_OBRIGATORIO',
      }
    }

    const tituloTrimmed = titulo.trim()

    if (tituloTrimmed.length < 2) {
      return {
        isValid: false,
        error: VAGA_VALIDATION_ERRORS.TITULO_MUITO_CURTO,
        errorCode: 'TITULO_MUITO_CURTO',
      }
    }

    if (tituloTrimmed.length > 100) {
      return {
        isValid: false,
        error: VAGA_VALIDATION_ERRORS.TITULO_MUITO_LONGO,
        errorCode: 'TITULO_MUITO_LONGO',
      }
    }

    return { isValid: true }
  },

  /**
   * Valida a descrição da vaga
   */
  validarDescricao(descricao: string): ValidationResult {
    if (!descricao || typeof descricao !== 'string') {
      return {
        isValid: false,
        error: VAGA_VALIDATION_ERRORS.DESCRICAO_OBRIGATORIA,
        errorCode: 'DESCRICAO_OBRIGATORIA',
      }
    }

    const descricaoTrimmed = descricao.trim()

    if (descricaoTrimmed.length < 10) {
      return {
        isValid: false,
        error: VAGA_VALIDATION_ERRORS.DESCRICAO_MUITO_CURTA,
        errorCode: 'DESCRICAO_MUITO_CURTA',
      }
    }

    if (descricaoTrimmed.length > 1000) {
      return {
        isValid: false,
        error: VAGA_VALIDATION_ERRORS.DESCRICAO_MUITO_LONGA,
        errorCode: 'DESCRICAO_MUITO_LONGA',
      }
    }

    return { isValid: true }
  },

  /**
   * Valida o tipo de vaga
   */
  validarTipo(tipo: string): ValidationResult {
    const tiposValidos = ['ESTAGIO', 'PESQUISA', 'EXTENSAO']

    if (!tipo || !tiposValidos.includes(tipo)) {
      return {
        isValid: false,
        error: VAGA_VALIDATION_ERRORS.TIPO_INVALIDO,
        errorCode: 'TIPO_INVALIDO',
      }
    }

    return { isValid: true }
  },

  /**
   * Valida se existe um responsável (empresa ou professor)
   */
  validarResponsavel(empresaId?: string, professorId?: string): ValidationResult {
    if (!empresaId && !professorId) {
      return {
        isValid: false,
        error: VAGA_VALIDATION_ERRORS.SEM_RESPONSAVEL,
        errorCode: 'SEM_RESPONSAVEL',
      }
    }

    if (empresaId && professorId) {
      return {
        isValid: false,
        error: 'Uma vaga não pode ter duas empresas ou professores como responsáveis',
        errorCode: 'MULTIPLOS_RESPONSAVEIS',
      }
    }

    return { isValid: true }
  },

  /**
   * Valida se o responsável existe no banco de dados
   */
  async validarResponsavelExiste(
    empresaId?: string,
    professorId?: string,
  ): Promise<ValidationResult> {
    try {
      if (empresaId) {
        const empresa = await prisma.empresa.findUnique({
          where: { id: empresaId },
          select: { id: true },
        })

        if (!empresa) {
          return {
            isValid: false,
            error: VAGA_VALIDATION_ERRORS.RESPONSAVEL_INVALIDO,
            errorCode: 'RESPONSAVEL_INVALIDO',
          }
        }
      }

      if (professorId) {
        const professor = await prisma.professor.findUnique({
          where: { id: professorId },
          select: { id: true },
        })

        if (!professor) {
          return {
            isValid: false,
            error: VAGA_VALIDATION_ERRORS.RESPONSAVEL_INVALIDO,
            errorCode: 'RESPONSAVEL_INVALIDO',
          }
        }
      }

      return { isValid: true }
    } catch (error) {
      return {
        isValid: false,
        error: 'Erro ao validar responsável',
        errorCode: 'ERRO_VALIDACAO_RESPONSAVEL',
      }
    }
  },

  /**
   * Valida autorização para editar vaga
   */
  async validarAutorizacaoEditar(
    vagaId: string,
    usuarioId: string,
    tipoUsuario: 'EMPRESA' | 'PROFESSOR',
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
        return {
          isValid: false,
          error: VAGA_VALIDATION_ERRORS.VAGA_NAO_ENCONTRADA,
          errorCode: 'VAGA_NAO_ENCONTRADA',
        }
      }

      const ehAutorizado =
        (tipoUsuario === 'EMPRESA' && vaga.empresa?.userId === usuarioId) ||
        (tipoUsuario === 'PROFESSOR' && vaga.professor?.userId === usuarioId)

      if (!ehAutorizado) {
        return {
          isValid: false,
          error: VAGA_VALIDATION_ERRORS.NAO_AUTORIZADO,
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
   * Valida autorização para deletar vaga
   */
  async validarAutorizacaoDeletar(
    vagaId: string,
    usuarioId: string,
    tipoUsuario: 'EMPRESA' | 'PROFESSOR',
  ): Promise<ValidationResult> {
    try {
      const vaga = await prisma.vaga.findUnique({
        where: { id: vagaId },
        include: {
          empresa: { select: { userId: true } },
          professor: { select: { userId: true } },
          candidaturas: { select: { id: true } },
        },
      })

      if (!vaga) {
        return {
          isValid: false,
          error: VAGA_VALIDATION_ERRORS.VAGA_NAO_ENCONTRADA,
          errorCode: 'VAGA_NAO_ENCONTRADA',
        }
      }

      const ehAutorizado =
        (tipoUsuario === 'EMPRESA' && vaga.empresa?.userId === usuarioId) ||
        (tipoUsuario === 'PROFESSOR' && vaga.professor?.userId === usuarioId)

      if (!ehAutorizado) {
        return {
          isValid: false,
          error: VAGA_VALIDATION_ERRORS.NAO_AUTORIZADO,
          errorCode: 'NAO_AUTORIZADO',
        }
      }

      // Não permite deletar vaga que tem candidatos
      if (vaga.candidaturas && vaga.candidaturas.length > 0) {
        return {
          isValid: false,
          error: VAGA_VALIDATION_ERRORS.VAGA_TEM_CANDIDATOS,
          errorCode: 'VAGA_TEM_CANDIDATOS',
        }
      }

      return { isValid: true }
    } catch (error) {
      return {
        isValid: false,
        error: 'Erro ao validar autorização para deletar',
        errorCode: 'ERRO_VALIDACAO_AUTORIZACAO',
      }
    }
  },

  /**
   * Valida se pode encerrar a vaga
   */
  async validarPodeEncerrar(vagaId: string): Promise<ValidationResult> {
    try {
      const vaga = await prisma.vaga.findUnique({
        where: { id: vagaId },
        select: { statusVaga: true },
      })

      if (!vaga) {
        return {
          isValid: false,
          error: VAGA_VALIDATION_ERRORS.VAGA_NAO_ENCONTRADA,
          errorCode: 'VAGA_NAO_ENCONTRADA',
        }
      }

      if (vaga.statusVaga === 'ENCERRADA') {
        return {
          isValid: false,
          error: VAGA_VALIDATION_ERRORS.VAGA_JA_ENCERRADA,
          errorCode: 'VAGA_JA_ENCERRADA',
        }
      }

      return { isValid: true }
    } catch (error) {
      return {
        isValid: false,
        error: 'Erro ao validar se pode encerrar vaga',
        errorCode: 'ERRO_VALIDACAO_ENCERRAMENTO',
      }
    }
  },

  /**
   * Valida criação completa de vaga
   */
  async validarCriacaoCompleta(vagaData: any): Promise<ValidationResult> {
    // Valida título
    let validacao = this.validarTitulo(vagaData.titulo)
    if (!validacao.isValid) return validacao

    // Valida descrição
    validacao = this.validarDescricao(vagaData.descricao)
    if (!validacao.isValid) return validacao

    // Valida tipo
    validacao = this.validarTipo(vagaData.tipo)
    if (!validacao.isValid) return validacao

    // Valida requisitos
    validacao = this.validarRequisitos(vagaData.requisitos)
    if (!validacao.isValid) return validacao

    // Valida prazo
    validacao = await this.validarPrazoInscricao(vagaData.prazoInscricao)
    if (!validacao.isValid) return validacao

    // Valida número de vagas
    if (vagaData.numeroVagas) {
      validacao = this.validarNumeroVagas(vagaData.numeroVagas)
      if (!validacao.isValid) return validacao
    }

    // Valida cursos alvo
    validacao = this.validarCursosAlvo(vagaData.cursosAlvo)
    if (!validacao.isValid) return validacao

    // Valida semestre mínimo
    validacao = this.validarSemestreMinimo(vagaData.semestreMinimo)
    if (!validacao.isValid) return validacao

    // Valida responsável
    validacao = this.validarResponsavel(vagaData.empresaId, vagaData.professorId)
    if (!validacao.isValid) return validacao

    // Valida se responsável existe
    validacao = await this.validarResponsavelExiste(vagaData.empresaId, vagaData.professorId)
    if (!validacao.isValid) return validacao

    return { isValid: true }
  },

  /**
   * Valida atualização de vaga
   */
  async validarAtualizacaoCompleta(
    vagaId: string,
    dadosAtualizacao: any,
  ): Promise<ValidationResult> {
    // Valida se vaga existe
    let validacao = await this.validarExistencia(vagaId)
    if (!validacao.isValid) return validacao

    // Valida se vaga não está encerrada
    validacao = await this.validarStatusAtivo(vagaId)
    if (!validacao.isValid) return validacao

    // Valida campos que foram informados
    if (dadosAtualizacao.titulo) {
      validacao = this.validarTitulo(dadosAtualizacao.titulo)
      if (!validacao.isValid) return validacao
    }

    if (dadosAtualizacao.descricao) {
      validacao = this.validarDescricao(dadosAtualizacao.descricao)
      if (!validacao.isValid) return validacao
    }

    if (dadosAtualizacao.tipo) {
      validacao = this.validarTipo(dadosAtualizacao.tipo)
      if (!validacao.isValid) return validacao
    }

    if (dadosAtualizacao.requisitos) {
      validacao = this.validarRequisitos(dadosAtualizacao.requisitos)
      if (!validacao.isValid) return validacao
    }

    if (dadosAtualizacao.prazoInscricao) {
      validacao = await this.validarPrazoInscricao(dadosAtualizacao.prazoInscricao)
      if (!validacao.isValid) return validacao
    }

    if (dadosAtualizacao.numeroVagas) {
      validacao = this.validarNumeroVagas(dadosAtualizacao.numeroVagas)
      if (!validacao.isValid) return validacao

      // Valida se o novo número não é menor que vagas preenchidas
      validacao = await this.validarVagasPreenchidas(vagaId, dadosAtualizacao.numeroVagas)
      if (!validacao.isValid) return validacao
    }

    if (dadosAtualizacao.cursosAlvo) {
      validacao = this.validarCursosAlvo(dadosAtualizacao.cursosAlvo)
      if (!validacao.isValid) return validacao
    }

    if (dadosAtualizacao.semestreMinimo !== undefined) {
      validacao = this.validarSemestreMinimo(dadosAtualizacao.semestreMinimo)
      if (!validacao.isValid) return validacao
    }

    return { isValid: true }
  },

  /**
   * Obtém estatísticas da vaga
   */
  async obterEstatisticas(vagaId: string) {
    try {
      const vaga = await prisma.vaga.findUnique({
        where: { id: vagaId },
        select: {
          numeroVagas: true,
          numeroVagasPreenchidas: true,
          prazoInscricao: true,
          candidaturas: {
            select: {
              status: true,
            },
          },
        },
      })

      if (!vaga) {
        return null
      }

      const total = vaga.candidaturas.length
      const pendentes = vaga.candidaturas.filter(c => c.status === 'PENDENTE').length
      const aceitas = vaga.candidaturas.filter(c => c.status === 'ACEITA').length
      const recusadas = vaga.candidaturas.filter(c => c.status === 'RECUSADA').length
      const vagasDisponiveis = vaga.numeroVagas - vaga.numeroVagasPreenchidas

      const agora = new Date()
      const prazoPassou = new Date(vaga.prazoInscricao) < agora

      return {
        totalCandidaturas: total,
        candidaturasPendentes: pendentes,
        candidaturasAceitas: aceitas,
        candidaturasRecusadas: recusadas,
        numeroVagas: vaga.numeroVagas,
        numeroVagasPreenchidas: vaga.numeroVagasPreenchidas,
        vagasDisponiveis,
        prazoInscricao: vaga.prazoInscricao,
        prazoPassou,
        percentualOcupacao: Math.round((vaga.numeroVagasPreenchidas / vaga.numeroVagas) * 100),
      }
    } catch (error) {
      return null
    }
  },
}
