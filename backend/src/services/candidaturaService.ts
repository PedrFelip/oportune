import {
  candidaturaVaga,
  listarCadidaturasPorEstudante
} from '../repositories/candidaturaRepository.ts'

export const candidaturaVagaService = async (candidaturaData: {
  vagaId: string
  estudanteId: string
}) => {
  const candidatura = await candidaturaVaga(candidaturaData)

  if (!candidatura) {
    return new Error('Erro ao cadastrar candidatura')
  }

  return candidatura
}

export const listarCadidaturasPorEstudanteService = async (estudanteId: string) => {
  return await listarCadidaturasPorEstudante(estudanteId)
}
