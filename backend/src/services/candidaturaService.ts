import { candidaturaVaga } from '../repositories/candidaturaRepository.ts'

export const candidaturaVagaService = async (candidaturaData: any) => {
  return await candidaturaVaga(candidaturaData)
}
