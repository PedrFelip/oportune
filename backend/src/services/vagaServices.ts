import { createVaga, getVagaDetalhes, listarVagasPorResponsavel, listatodasVagas, updateVaga } from '../repositories/vagasRepository.ts'
import { VagaUpdateDTO } from '../schemas/vagasSchema.ts'

export const createServiceVaga = async (vagaData: any) => {
  try {
    const novaVaga = await createVaga(vagaData)
    return novaVaga
  } catch (error) {
    console.error('Erro ao criar vaga:', error)
    throw new Error('Erro ao criar vaga')
  }
}

export const listarServiceVagas = async (page: number, limit: number) => {
  try {
    const vagas = await listatodasVagas(page, limit)
    return vagas
  } catch (error) {
    console.error('Erro ao listar vagas:', error)
    throw new Error('Erro ao listar vagas')
  }
}

export const getVagaDetalhesService = async (vagaId: string) => {
  try {
    const vaga = await getVagaDetalhes(vagaId)
    return vaga
  } catch (error) {
    console.error('Erro ao obter detalhes da vaga:', error)
    throw new Error('Erro ao obter detalhes da vaga')
  }
}

export const updateServiceVaga = async (vagaId: string, dadosAtualizacao: VagaUpdateDTO) => {
  try {
    const vagaAtualizada = await updateVaga(vagaId, dadosAtualizacao)
    return vagaAtualizada
  } catch (error) {
    console.error('Erro ao atualizar vaga:', error)
    throw new Error('Erro ao atualizar vaga')
  }
}

export const listarVagasPorResponsavelService = async (responsavelId: string, tipoResponsavel: 'EMPRESA' | 'PROFESSOR') => {

  // Pra fazer Paginação depois

  try {
    const vagas = await listarVagasPorResponsavel(responsavelId, tipoResponsavel)

    if (!vagas || vagas.length === 0) {
      return {
        mensagem: 'Nenhuma vaga encontrada para este responsável',
        vagas: [],
      }
    }
    const vagasNormalizadas = vagas.map((vaga) => ({
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
        vaga.cursosAlvo && vaga.cursosAlvo.length > 0
          ? vaga.cursosAlvo.join(', ')
          : 'Qualquer',
      semestre: vaga.semestreMinimo ? vaga.semestreMinimo.toString() : 'Não informado',
      empresa: vaga.empresa?.nomeFantasia || vaga.professor?.user?.nome || 'Não informado',
      candidaturas: vaga.candidaturas || [],
    }))

    return {
      mensagem: 'Vagas encontradas com sucesso',
      vagas: vagasNormalizadas,
    }
  } catch (error) {
    console.error('Erro ao listar vagas por responsável:', error)
    throw new Error('Erro ao listar vagas por responsável')
  }
}