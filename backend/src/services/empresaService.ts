import {
  totalCandidaturasVagasEmpresaRepository,
  VagasAtivasEmpresaRepository,
  vagasRecentesEmpresaRepository,
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

export const vagasRecentesEmpresaService = async (empresaId: string) => {
  const vagas = await vagasRecentesEmpresaRepository(empresaId)

  const vagasFormatadas = vagas.map(vaga => {
    const candidaturasAprovadas = vaga.candidaturas.filter(
      candidatura => candidatura.status === 'ACEITA',
    ).length
    if (candidaturasAprovadas === 0) {
      return {
        id: vaga.id,
        titulo: vaga.titulo,
        dataLimite: vaga.prazoInscricao,
        tipo: vaga.tipo,
        porcentagem: 0,
      }
    }

    const porcentagemDasVagasComCandidaturasAprovadas =
      (candidaturasAprovadas / vaga.numeroVagas) * 100

    return {
      id: vaga.id,
      titulo: vaga.titulo,
      dataLimite: vaga.prazoInscricao,
      tipo: vaga.tipo,
      porcentagem: porcentagemDasVagasComCandidaturasAprovadas,
    }
  })

  return vagasFormatadas
}
