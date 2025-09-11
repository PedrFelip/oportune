import { getDashboardData } from '../repositories/dashboardRepository.ts'

const perfilPorcentagem = (estudante: any): number => {
  let score = 0
  const totalPontos = 7

  if (estudante.telefone) score++
  if (estudante.faculdade) score++
  if (estudante.dataFormatura) score++
  if (estudante.fotoPerfil) score++
  if (estudante.genero) score++
  if (estudante.dataNascimento) score++
  if (estudante.curso) score++

  return Math.round((score / totalPontos) * 100)
}

export const getDashboardService = async (userId: string) => {
  const { estudanteData, candidaturasEstudante, VagasRecomendadas } = await getDashboardData(userId)

  //formtar para o frontend
  const perfil = {
    nome: estudanteData.user.nome,
    curso: estudanteData.curso,
    semestre: estudanteData.semestre,
    fotoperfil: estudanteData.fotoPerfil,
    porcentagem: perfilPorcentagem(estudanteData)
  }
  const candidaturasFormatadas = candidaturasEstudante.map(c => ({
    titulo: c.vaga.titulo,
    empresa: c.vaga.empresa?.nomeFantasia || c.vaga.professor?.user?.nome || 'Não informado',
    status: c.status,
  }));

  const vagasFormatadas = VagasRecomendadas.map(v => ({
    id: v.id,
    titulo: v.titulo,
    empresa: v.empresa?.nomeFantasia || v.professor?.user?.nome || 'Não informado'
  }));

  return{
    perfil,
    candidaturasRecentes: candidaturasFormatadas,
    vagasRecomendadas: vagasFormatadas
  }
}


