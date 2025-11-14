import {
  createVaga,
  encerrarVaga,
  getVagaDetalhes,
  listarVagasPorResponsavel,
  listatodasVagas,
  updateVaga,
} from '../repositories/vagasRepository.ts'
import { VagaUpdateDTO } from '../schemas/vagasSchema.ts'

export const createServiceVaga = async (vagaData: any) => {
  try {
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
    const vaga = await getVagaDetalhes(vagaId)

    return {
      sucesso: true,
      dados: vaga,
    }
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao obter detalhes da vaga')
  }
}

export const updateServiceVaga = async (
  vagaId: string,
  dadosAtualizacao: VagaUpdateDTO,
  usuarioId: string,
  tipoUsuario: 'EMPRESA' | 'PROFESSOR',
) => {
  try {
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

export const encerrarServiceVaga = async (
  vagaId: string,
  usuarioId: string,
  tipoUsuario: 'EMPRESA' | 'PROFESSOR',
) => {
  try {
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
