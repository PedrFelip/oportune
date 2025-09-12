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

  if (!estudanteData) {
    return {
      perfil: null,
      error: "Estudante não encontrado"
    }
  }

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
    console.log(`Iniciando busca de candidaturas para userId: ${userId}`)
    const candidaturasEstudante = await getCandidaturasRecentes(userId);

    // Se não houver candidaturas, retorna array vazio com log
    if (!candidaturasEstudante || candidaturasEstudante.length === 0) {
      console.log(`Nenhuma candidatura encontrada para userId: ${userId}`)
      return {
        candidaturasRecentes: [],
        message: "Nenhuma candidatura encontrada"
      };
    }

    const candidaturasFormatadas = candidaturasEstudante.map((c: any) => ({
      titulo: c.vaga?.titulo || 'Título não disponível',
      empresa: c.vaga?.empresa?.nomeFantasia || c.vaga?.professor?.user?.nome || 'Não informado',
      status: c.status || 'PENDENTE',
      dataCandidatura: c.dataCandidatura,
    })).filter(c => c.titulo !== 'Título não disponível'); // Filtrar candidaturas inválidas

    console.log(`${candidaturasFormatadas.length} candidaturas formatadas para userId: ${userId}`)
    
    return {
      candidaturasRecentes: candidaturasFormatadas,
      total: candidaturasFormatadas.length
    };
  } catch (error) {
    console.error('Erro ao buscar candidaturas:', error);
    return {
      candidaturasRecentes: [],
      error: "Erro ao carregar candidaturas",
      message: "Ocorreu um erro ao buscar suas candidaturas"
    };
  }
};

// Serviço para buscar apenas vagas recomendadas (carregamento assíncrono)
export const getVagasRecomendadasService = async (userId: string) => {
  try {
    console.log(`Iniciando busca de vagas recomendadas para userId: ${userId}`)
    const VagasRecomendadas = await getVagasRecomendadas(userId);

    // Se não houver vagas recomendadas, retorna array vazio com contexto
    if (!VagasRecomendadas || VagasRecomendadas.length === 0) {
      console.log(`Nenhuma vaga recomendada encontrada para userId: ${userId}`)
      return {
        vagasRecomendadas: [],
        message: "Nenhuma vaga disponível no momento",
        sugestao: "Complete seu perfil para receber recomendações personalizadas"
      };
    }

    const vagasFormatadas = VagasRecomendadas.map((v: any) => ({
      id: v.id,
      titulo: v.titulo || 'Título não disponível',
      empresa: v.empresa?.nomeFantasia || v.professor?.user?.nome || 'Não informado',
      tipo: v.tipo || 'Não especificado',
      descricao: v.descricao ? v.descricao.substring(0, 100) + '...' : 'Descrição não disponível'
    })).filter(v => v.titulo !== 'Título não disponível'); // Filtrar vagas inválidas

    console.log(`${vagasFormatadas.length} vagas formatadas para userId: ${userId}`)

    return {
      vagasRecomendadas: vagasFormatadas,
      total: vagasFormatadas.length,
      message: `Encontramos ${vagasFormatadas.length} vagas para você`
    };
  } catch (error) {
    console.error('Erro ao buscar vagas recomendadas:', error);
    return {
      vagasRecomendadas: [],
      error: "Erro ao carregar vagas",
      message: "Ocorreu um erro ao buscar vagas recomendadas"
    };
  }
};

// Serviço completo (mantido para compatibilidade)
export const getDashboardService = async (userId: string) => {
  const estudanteData = await getEstudanteData(userId);

  if (!estudanteData) {
    return {
      perfil: null,
      candidaturasRecentes: [],
      vagasRecomendadas: [],
      error: "Estudante não encontrado"
    }
  }

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


