import {
  totalCandidaturasVagasEmpresaRepository,
  VagasAtivasEmpresaRepository,
} from '../repositories/empresaRepository.ts'

export const VagasAtivasService = async (empresaId: string) => {
  const vagasAtivas = await VagasAtivasEmpresaRepository(empresaId)

  return { message: 'Vagas ativas encontradas.', count: vagasAtivas }
}

export const totalCandidaturasVagasService = async (empresaId: string) => {
  const totalCandidaturas = await totalCandidaturasVagasEmpresaRepository(empresaId)
  if (totalCandidaturas === 0) {
    return {
      message: 'Nenhuma candidatura encontrada para as vagas desta empresa.',
      count: 0,
    }
  }
  return {
    message: 'Candidaturas encontradas para as vagas desta empresa.',
    count: totalCandidaturas,
  }
}
