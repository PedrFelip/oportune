import { candidaturaRepository } from '../repositories/candidaturaRepository.ts'

export const candidaturaService = {
  async candidaturaVaga(candidaturaData: { vagaId: string; estudanteId: string }) {
    try {
      const candidatura = await candidaturaRepository.candidaturaVaga(candidaturaData)

      if (!candidatura) {
        throw new Error('Erro ao cadastrar candidatura')
      }

      return candidatura
    } catch (error) {
      throw new Error('Erro ao cadastrar candidatura: ' + error)
    }
  },

  async listarCadidaturasPorEstudante(estudanteId: string) {
    try {
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
    } catch (error) {
      throw new Error('Erro ao listar candidaturas: ' + error)
    }
  },

  async removerCandidatura(candidaturaId: string) {
    try {
      await candidaturaRepository.removerCandidatura(candidaturaId)
      return { success: true }
    } catch (error) {
      throw new Error('Erro ao remover candidatura: ' + error)
    }
  },

  async listarCandidatosPorVaga(vagaId: string) {
    try {
      const candidaturas = await candidaturaRepository.listarCandidatosPorVaga(vagaId)

      const candidatosFormatados = candidaturas.map(c => ({
        id: c.id,
        status: c.status,
        dataCandidatura: new Date(c.dataCandidatura).toLocaleDateString('pt-BR'),
        estudante: {
          id: c.estudante.id,
          nome: c.estudante.user.nome,
          email: c.estudante.user.email,
          curso: c.estudante.curso,
          semestre: c.estudante.semestre,
          matricula: c.estudante.matricula,
        },
      }))

      return candidatosFormatados
    } catch (error) {
      throw new Error('Erro ao listar candidatos da vaga: ' + error)
    }
  },
}
