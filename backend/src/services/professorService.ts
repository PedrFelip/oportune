import {
  vagasRecentesProfessorRepository,
  getProfessorProfileRepository,
  getAlunosRepository,
  getProfessorIdByUserId,
} from '../repositories/professorRepository.ts'

const calculaPercentualPerfil = (perfil: any) => {
  let score = 0
  const totalPontos = 7

  if (perfil.fotoPerfil) score++
  if (perfil.departamento) score++
  if (perfil.telefone) score++
  if (perfil.user?.nome) score++
  if (perfil.user?.email) score++
  if (perfil.lattes) score++
  if (perfil.areasInteresse && perfil.areasInteresse.length > 0) score++

  return Math.round((score / totalPontos) * 100)
}

export const vagasRecentesProfessorService = async (userId: string) => {
  const professorId = await getProfessorIdByUserId(userId)
  
  if (!professorId) {
    return []
  }

  const vagas = await vagasRecentesProfessorRepository(professorId)

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

export const perfilProfessorDashboardService = async (professorId: string) => {
  const perfil = await getProfessorProfileRepository(professorId)

  if (!perfil || !perfil.professor) {
    throw new Error('Perfil do professor não encontrado')
  }

  const porcentagemDoPerfil = calculaPercentualPerfil(perfil.professor)

  const perfilFormatado = {
    id: perfil.professor.userId,
    nome: perfil.professor.user.nome,
    email: perfil.professor.user.email,
    departamento: perfil.professor.departamento || '',
    telefone: perfil.professor.telefone || '',
    fotoPerfil: perfil.professor.fotoPerfil || '',
    lattes: perfil.professor.lattes || '',
    areasInteresse: perfil.professor.areasInteresse || [],
    percentualPerfilCompleto: porcentagemDoPerfil || 0,
  }

  return {
    message: 'Dados do perfil do professor no dashboard',
    perfil: perfilFormatado,
  }
}

export const getAlunosDashboardService = async (userId: string) => {
  const professorId = await getProfessorIdByUserId(userId)
  
  if (!professorId) {
    return {
      message: 'Alunos sugeridos para o professor',
      alunos: [],
    }
  }

  const alunos = await getAlunosRepository(professorId)

  const alunosFormatados = alunos.map(aluno => ({
    id: aluno.id,
    nome: aluno.user.nome,
    email: aluno.user.email,
    curso: aluno.curso || '',
    semestre: aluno.semestre || 0,
    habilidadesTecnicas: aluno.habilidadesTecnicas || [],
    fotoPerfil: aluno.fotoPerfil || '',
  }))

  return {
    message: 'Alunos sugeridos para o professor',
    alunos: alunosFormatados,
  }
}
