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
    // pra ajustar a resposta do que retornar

    return {
      mensagem: 'Vagas encontradas com sucesso',
      vagas,
    }
  } catch (error) {
    console.error('Erro ao listar vagas por responsável:', error)
    throw new Error('Erro ao listar vagas por responsável')
  }
}