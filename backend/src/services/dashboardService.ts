import { getEstudanteData, getCandidaturasRecentes, getVagasRecomendadas } from '../repositories/dashboardRepository.ts'
import informacoes from '../utils/informacoes.json' with {type: "json"};

const formatarNomeCurso = (cursoValue: string): string => {
  const curso = informacoes.cursos.find(c => c.value === cursoValue);
  return curso ? curso.label : cursoValue;
};

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

// Serviço para buscar apenas dados do perfil (carregamento inicial)
export const getPerfilService = async (userId: string) => {
  const estudanteData = await getEstudanteData(userId);

  return {
    perfil: {
      nome: estudanteData.user.nome,
      curso: formatarNomeCurso(estudanteData.curso),
      semestre: estudanteData.semestre,
      fotoperfil: estudanteData.fotoPerfil,
      porcentagem: perfilPorcentagem(estudanteData)
    }
  };
};

// Serviço para buscar apenas candidaturas (carregamento assíncrono)
export const getCandidaturasService = async (userId: string) => {
  try {
    const candidaturasEstudante = await getCandidaturasRecentes(userId);

    // Se não houver candidaturas, retorna array vazio
    if (!candidaturasEstudante || candidaturasEstudante.length === 0) {
      return {
        candidaturasRecentes: []
      };
    }

    const candidaturasFormatadas = candidaturasEstudante.map((c: any) => ({
      titulo: c.vaga?.titulo || 'Título não disponível',
      empresa: c.vaga?.empresa?.nomeFantasia || c.vaga?.professor?.user?.nome || 'Não informado',
      status: c.status || 'PENDENTE',
      dataCandidatura: c.dataCandidatura,
    }));

    return {
      candidaturasRecentes: candidaturasFormatadas
    };
  } catch (error) {
    console.error('Erro ao buscar candidaturas:', error);
    return {
      candidaturasRecentes: []
    };
  }
};

// Serviço para buscar apenas vagas recomendadas (carregamento assíncrono)
export const getVagasRecomendadasService = async (userId: string) => {
  try {
    const VagasRecomendadas = await getVagasRecomendadas(userId);

    // Se não houver vagas recomendadas, retorna array vazio
    if (!VagasRecomendadas || VagasRecomendadas.length === 0) {
      return {
        vagasRecomendadas: []
      };
    }

    const vagasFormatadas = VagasRecomendadas.map((v: any) => ({
      id: v.id,
      titulo: v.titulo || 'Título não disponível',
      empresa: v.empresa?.nomeFantasia || v.professor?.user?.nome || 'Não informado',
      tipo: v.tipo || 'Não especificado',
      salario: v.salario ? `R$ ${v.salario}` : 'A negociar',
      local: v.local || 'Remoto'
    }));

    return {
      vagasRecomendadas: vagasFormatadas
    };
  } catch (error) {
    console.error('Erro ao buscar vagas recomendadas:', error);
    return {
      vagasRecomendadas: []
    };
  }
};

// Serviço completo (mantido para compatibilidade)
export const getDashboardService = async (userId: string) => {
  const estudanteData = await getEstudanteData(userId);
  const candidaturasEstudante = await getCandidaturasRecentes(userId);
  const VagasRecomendadas = await getVagasRecomendadas(userId);

  const perfil = {
    nome: estudanteData.user.nome,
    curso: formatarNomeCurso(estudanteData.curso),
    semestre: estudanteData.semestre,
    fotoperfil: estudanteData.fotoPerfil,
    porcentagem: perfilPorcentagem(estudanteData)
  }

  const candidaturasFormatadas = candidaturasEstudante.map((c: any) => ({
    titulo: c.vaga.titulo,
    empresa: c.vaga.empresa?.nomeFantasia || c.vaga.professor?.user?.nome || 'Não informado',
    status: c.status,
  }));

  const vagasFormatadas = VagasRecomendadas.map((v: any) => ({
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


