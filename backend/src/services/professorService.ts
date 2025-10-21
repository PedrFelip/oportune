import { vagasRecentesProfessorRepository } from '../repositories/professorRepository.ts'


export const vagasRecentesProfessorService = async (professorId: string) => {
  const vagas = await vagasRecentesProfessorRepository(professorId)

  const vagasFormatadas = vagas.map((vaga) => {
    const candidaturasAprovadas = vaga.candidaturas.filter(
      (candidatura) => candidatura.status === 'ACEITA'
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

    const porcentagemDasVagasComCandidaturasAprovadas = (candidaturasAprovadas / vaga.numeroVagas) * 100


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
