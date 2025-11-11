import {
  createVaga,
  encerrarVaga,
  getVagaDetalhes,
  listarVagasPorResponsavel,
  listatodasVagas,
  updateVaga,
} from '../repositories/vagasRepository.ts'
import { VagaUpdateDTO } from '../schemas/vagasSchema.ts'
import { vagaValidador } from '../utils/vagaValidador.ts'

export const createServiceVaga = async (vagaData: any) => {
  try {
    // Validação completa de criação
    const validacao = await vagaValidador.validarCriacaoCompleta(vagaData)

    if (!validacao.isValid) {
      throw new Error(validacao.error || 'Validação de vaga falhou')
    }

    const novaVaga = await createVaga(vagaData)

    return {
      sucesso: true,
      id: novaVaga.id,
      titulo: novaVaga.titulo,
      tipo: novaVaga.tipo,
      message: 'Vaga criada com sucesso',
    }
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao criar vaga')
  }
}

export const listarServiceVagas = async (page: number, limit: number) => {
  try {
    // Validação de paginação
    if (page < 1) page = 1
    if (limit < 1 || limit > 100) limit = 10

    const vagas = await listatodasVagas(page, limit)

    const vagasNormalizadas = vagas.map(vaga => ({
      id: vaga.id,
      titulo: vaga.titulo,
      descricao: vaga.descricao,
      tipo: vaga.tipo,
      categorias: [vaga.tipo, ...(vaga.requisitos || [])],
      prazoInscricao:
        vaga.prazoInscricao instanceof Date
          ? vaga.prazoInscricao.toISOString()
          : String(vaga.prazoInscricao),
      curso:
        vaga.cursosAlvo && vaga.cursosAlvo.length > 0 ? vaga.cursosAlvo.join(', ') : 'Qualquer',
      semestre: vaga.semestreMinimo ? vaga.semestreMinimo.toString() : 'Não informado',
      empresa: vaga.empresa?.nomeFantasia || vaga.professor?.user?.nome || 'Não informado',
      status: vaga.statusVaga === 'ATIVA',
      numeroVagas: vaga.numeroVagas,
      numeroVagasPreenchidas: vaga.numeroVagasPreenchidas,
    }))

    return {
      sucesso: true,
      dados: vagasNormalizadas,
      paginacao: {
        pagina: page,
        limite: limit,
        total: vagasNormalizadas.length,
      },
    }
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao listar vagas')
  }
}

export const getVagaDetalhesService = async (vagaId: string) => {
  try {
    // Validação de existência
    const validacao = await vagaValidador.validarExistencia(vagaId)

    if (!validacao.isValid) {
      throw new Error(validacao.error)
    }

    const vaga = await getVagaDetalhes(vagaId)

    // Obtém estatísticas da vaga
    const stats = await vagaValidador.obterEstatisticas(vagaId)

    return {
      sucesso: true,
      dados: {
        ...vaga,
        estatisticas: stats,
      },
    }
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao obter detalhes da vaga')
  }
}

export const updateServiceVaga = async (vagaId: string, dadosAtualizacao: VagaUpdateDTO) => {
  try {
    // Validação completa de atualização
    const validacao = await vagaValidador.validarAtualizacaoCompleta(vagaId, dadosAtualizacao)

    if (!validacao.isValid) {
      throw new Error(validacao.error || 'Validação de atualização falhou')
    }

    const vagaAtualizada = await updateVaga(vagaId, dadosAtualizacao)

    return {
      sucesso: true,
      id: vagaAtualizada.id,
      titulo: vagaAtualizada.titulo,
      message: 'Vaga atualizada com sucesso',
    }
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao atualizar vaga')
  }
}

export const encerrarServiceVaga = async (vagaId: string) => {
  try {
    // Validação se pode encerrar
    const validacao = await vagaValidador.validarPodeEncerrar(vagaId)

    if (!validacao.isValid) {
      throw new Error(validacao.error || 'Não é possível encerrar esta vaga')
    }

    const vagaEncerrada = await encerrarVaga(vagaId)

    return {
      sucesso: true,
      id: vagaEncerrada.id,
      status: vagaEncerrada.statusVaga,
      message: 'Vaga encerrada com sucesso',
    }
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao encerrar vaga')
  }
}

export const listarVagasPorResponsavelService = async (
  responsavelId: string,
  tipoResponsavel: 'EMPRESA' | 'PROFESSOR',
) => {
  try {
    const vagas = await listarVagasPorResponsavel(responsavelId, tipoResponsavel)

    if (!vagas || vagas.length === 0) {
      return {
        sucesso: true,
        mensagem: 'Nenhuma vaga encontrada para este responsável',
        vagas: [],
      }
    }

    const vagasNormalizadas = vagas.map(vaga => ({
      id: vaga.id,
      titulo: vaga.titulo,
      descricao: vaga.descricao,
      tipo: vaga.tipo,
      categorias: [vaga.tipo, ...(vaga.requisitos || [])],
      prazoInscricao:
        vaga.prazoInscricao instanceof Date
          ? vaga.prazoInscricao.toISOString()
          : String(vaga.prazoInscricao),
      curso:
        vaga.cursosAlvo && vaga.cursosAlvo.length > 0 ? vaga.cursosAlvo.join(', ') : 'Qualquer',
      semestre: vaga.semestreMinimo ? vaga.semestreMinimo.toString() : 'Não informado',
      empresa: vaga.empresa?.nomeFantasia || vaga.professor?.user?.nome || 'Não informado',
      candidaturas: vaga.candidaturas || [],
      status: vaga.statusVaga,
      numeroVagas: vaga.numeroVagas,
      numeroVagasPreenchidas: vaga.numeroVagasPreenchidas,
      totalCandidatos: vaga.candidaturas?.length || 0,
    }))

    return {
      sucesso: true,
      mensagem: 'Vagas encontradas com sucesso',
      vagas: vagasNormalizadas,
      total: vagasNormalizadas.length,
    }
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao listar vagas por responsável')
  }
}

/**
 * Valida se um usuário pode editar uma vaga específica
 */
export const validarAutorizacaoEditarService = async (
  vagaId: string,
  usuarioId: string,
  tipoUsuario: 'EMPRESA' | 'PROFESSOR',
) => {
  try {
    const validacao = await vagaValidador.validarAutorizacaoEditar(vagaId, usuarioId, tipoUsuario)

    return {
      autorizado: validacao.isValid,
      erro: validacao.error,
      codigo: validacao.errorCode,
    }
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao validar autorização')
  }
}

/**
 * Valida se um usuário pode deletar uma vaga específica
 */
export const validarAutorizacaoDeletarService = async (
  vagaId: string,
  usuarioId: string,
  tipoUsuario: 'EMPRESA' | 'PROFESSOR',
) => {
  try {
    const validacao = await vagaValidador.validarAutorizacaoDeletar(vagaId, usuarioId, tipoUsuario)

    return {
      autorizado: validacao.isValid,
      erro: validacao.error,
      codigo: validacao.errorCode,
    }
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao validar autorização')
  }
}

/**
 * Obtém estatísticas de uma vaga
 */
export const obterEstatisticasVagaService = async (vagaId: string) => {
  try {
    const validacao = await vagaValidador.validarExistencia(vagaId)

    if (!validacao.isValid) {
      throw new Error(validacao.error)
    }

    const stats = await vagaValidador.obterEstatisticas(vagaId)

    return {
      sucesso: true,
      dados: stats,
    }
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao obter estatísticas da vaga')
  }
}

/**
 * Valida se um estudante pode se candidatar a uma vaga
 */
export const validarCandidaturaVagaService = async (vagaId: string, estudanteId: string) => {
  try {
    // Validar existência
    let validacao = await vagaValidador.validarExistencia(vagaId)
    if (!validacao.isValid) {
      return { podeCandidata: false, erro: validacao.error, codigo: validacao.errorCode }
    }

    // Validar status ativo
    validacao = await vagaValidador.validarStatusAtivo(vagaId)
    if (!validacao.isValid) {
      return { podeCandidatar: false, erro: validacao.error, codigo: validacao.errorCode }
    }

    // Validar prazo não expirou
    validacao = await vagaValidador.validarPrazoExpirado(vagaId)
    if (!validacao.isValid) {
      return { podeCandidatar: false, erro: validacao.error, codigo: validacao.errorCode }
    }

    return {
      podeCandidatar: true,
    }
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao validar candidatura')
  }
}
