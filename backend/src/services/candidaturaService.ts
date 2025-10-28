import { candidaturaRepository } from '../repositories/candidaturaRepository.ts'

export const candidaturaVagaService = async (candidaturaData: {
  vagaId: string
  estudanteId: string
}) => {
  const candidatura = await candidaturaRepository.candidaturaVaga(candidaturaData)

  if (!candidatura) {
    return new Error('Erro ao cadastrar candidatura')
  }

  return candidatura
}

export const listarCadidaturasPorEstudanteService = async (estudanteId: string) => {
  const candidaturas = await candidaturaRepository.listarCadidaturasPorEstudante(estudanteId)

  const candidaturasFormatada = candidaturas.map(c => ({
    id: c.id,
    status: c.status,
    dataCandidatura: new Date(c.dataCandidatura).toLocaleDateString('pt-BR'),
    vaga: {
      id: c.vaga.id,
      titulo: c.vaga.titulo,
      tipo: c.vaga.tipo,
    },
    responsavel: {
      idResponsavel: c.vaga.empresaId || c.vaga.professorId || ' ',
      nome: c.vaga.empresa?.nomeFantasia || c.vaga.professor?.user?.nome || ' ',
      tipo: c.vaga.empresa ? 'EMPRESA' : 'PROFESSOR',
    },
  }))

  return candidaturasFormatada
}
