import {
  getEstudanteData,
  getCandidaturasRecentes,
  getVagasRecomendadas,
  updateEstudanteProfile,
} from '../repositories/dashboardRepository.ts'
import informacoes from '../utils/informacoes.json' with { type: 'json' }

const formatarNomeCurso = (cursoValue: string): string => {
  const curso = informacoes.cursos.find(c => c.value === cursoValue)
  return curso ? curso.label : cursoValue
}

const perfilPorcentagem = (estudante: any): number => {
  let score = 0
  const totalPontos = 10 // Total de pontos possíveis

  // Verifica cada campo relevante e incrementa o score
  if (estudante.telefone) score++
  if (estudante.faculdade) score++
  if (estudante.areasInteresse && estudante.areasInteresse.length > 0) score++
  if (estudante.habilidadesComportamentais && estudante.habilidadesComportamentais.length > 0)
    score++
  if (estudante.habilidadesTecnicas && estudante.habilidadesTecnicas.length > 0) score++
  if (estudante.dataFormatura) score++
  if (estudante.fotoPerfil) score++
  if (estudante.genero) score++
  if (estudante.dataNascimento) score++
  if (estudante.curso) score++

  return Math.round((score / totalPontos) * 100)
}

// Serviço para buscar apenas dados do perfil (carregamento inicial)
export const getPerfilService = async (userId: string) => {
  const estudanteData = await getEstudanteData(userId)

  if (!estudanteData) {
    return {
      perfil: null,
      error: 'Estudante não encontrado',
    }
  }

  return {
    perfil: {
      nome: estudanteData.user.nome,
      curso: formatarNomeCurso(estudanteData.curso),
      semestre: estudanteData.semestre,
      fotoperfil: estudanteData.fotoPerfil,
      porcentagem: perfilPorcentagem(estudanteData),
    },
  }
}

// Serviço para buscar apenas candidaturas (carregamento assíncrono)
export const getCandidaturasService = async (userId: string) => {
  try {
    console.log(`Iniciando busca de candidaturas para userId: ${userId}`)
    const candidaturasEstudante = await getCandidaturasRecentes(userId)

    // Se não houver candidaturas, retorna array vazio com log
    if (!candidaturasEstudante || candidaturasEstudante.length === 0) {
      console.log(`Nenhuma candidatura encontrada para userId: ${userId}`)
      return {
        candidaturasRecentes: [],
        message: 'Nenhuma candidatura encontrada',
      }
    }

    const candidaturasFormatadas = candidaturasEstudante
      .map((c: any) => ({
        id: c.id,
        tituloVaga: c.vaga?.titulo || 'Título não disponível',
        nomeEmpresa:
          c.vaga?.empresa?.nomeFantasia || c.vaga?.professor?.user?.nome || 'Não informado',
        status: c.status || 'PENDENTE',
        dataCandidatura: c.dataCandidatura,
      }))
      .filter(c => c.tituloVaga !== 'Título não disponível') // Filtrar candidaturas inválidas

    console.log(`${candidaturasFormatadas.length} candidaturas formatadas para userId: ${userId}`)

    return {
      candidaturasRecentes: candidaturasFormatadas,
      total: candidaturasFormatadas.length,
    }
  } catch (error) {
    console.error('Erro ao buscar candidaturas:', error)
    return {
      candidaturasRecentes: [],
      error: 'Erro ao carregar candidaturas',
      message: 'Ocorreu um erro ao buscar suas candidaturas',
    }
  }
}

// Serviço para buscar apenas vagas recomendadas (carregamento assíncrono)
export const getVagasRecomendadasService = async (userId: string) => {
  try {
    console.log(`Iniciando busca de vagas recomendadas para userId: ${userId}`)
    const VagasRecomendadas = await getVagasRecomendadas(userId)

    // Se não houver vagas recomendadas, retorna array vazio com contexto
    if (!VagasRecomendadas || VagasRecomendadas.length === 0) {
      console.log(`Nenhuma vaga recomendada encontrada para userId: ${userId}`)
      return {
        vagasRecomendadas: [],
        message: 'Nenhuma vaga disponível no momento',
        sugestao: 'Complete seu perfil para receber recomendações personalizadas',
      }
    }

    const vagasFormatadas = VagasRecomendadas.map((v: any) => ({
      id: v.id,
      titulo: v.titulo || 'Título não disponível',
      empresa: v.empresa?.nomeFantasia || v.professor?.user?.nome || 'Não informado',
      tipo: v.tipo || 'Não especificado',
      descricao: v.descricao ? v.descricao.substring(0, 100) + '...' : 'Descrição não disponível',
    })).filter(v => v.titulo !== 'Título não disponível') // Filtrar vagas inválidas

    console.log(`${vagasFormatadas.length} vagas formatadas para userId: ${userId}`)

    return {
      vagasRecomendadas: vagasFormatadas,
      total: vagasFormatadas.length,
      message: `Encontramos ${vagasFormatadas.length} vagas para você`,
    }
  } catch (error) {
    console.error('Erro ao buscar vagas recomendadas:', error)
    return {
      vagasRecomendadas: [],
      error: 'Erro ao carregar vagas',
      message: 'Ocorreu um erro ao buscar vagas recomendadas',
    }
  }
}

// Serviço completo (mantido para compatibilidade)
export const getDashboardService = async (userId: string) => {
  const estudanteData = await getEstudanteData(userId)

  if (!estudanteData) {
    return {
      perfil: null,
      candidaturasRecentes: [],
      vagasRecomendadas: [],
      error: 'Estudante não encontrado',
    }
  }

  const candidaturasEstudante = await getCandidaturasRecentes(userId)
  const VagasRecomendadas = await getVagasRecomendadas(userId)

  const perfil = {
    nome: estudanteData.user.nome,
    curso: formatarNomeCurso(estudanteData.curso),
    semestre: estudanteData.semestre,
    fotoperfil: estudanteData.fotoPerfil,
    porcentagem: perfilPorcentagem(estudanteData),
  }

  const candidaturasFormatadas = candidaturasEstudante.map((c: any) => ({
    id: c.id,
    tituloVaga: c.vaga.titulo,
    nomeEmpresa: c.vaga.empresa?.nomeFantasia || c.vaga.professor?.user?.nome || 'Não informado',
    status: c.status,
    dataCandidatura: c.dataCandidatura,
  }))

  const vagasFormatadas = VagasRecomendadas.map((v: any) => ({
    id: v.id,
    titulo: v.titulo,
    empresa: v.empresa?.nomeFantasia || v.professor?.user?.nome || 'Não informado',
  }))

  return {
    perfil,
    candidaturasRecentes: candidaturasFormatadas,
    vagasRecomendadas: vagasFormatadas,
  }
}

export const updatePerfilEstudanteService = async (userId: string, data: any) => {
  try {
    // Validar se o estudante existe
    const estudanteExistente = await getEstudanteData(userId)
    if (!estudanteExistente) {
      return {
        success: false,
        error: 'Estudante não encontrado',
      }
    }

    // Preparar dados para atualização (apenas campos que podem ser editados)
    const dadosAtualizacao: any = {}

    if (data.telefone !== undefined) dadosAtualizacao.telefone = data.telefone
    if (data.fotoPerfil !== undefined) dadosAtualizacao.fotoPerfil = data.fotoPerfil
    if (data.dataNascimento !== undefined) {
      dadosAtualizacao.dataNascimento = new Date(data.dataNascimento)
    }
    if (data.genero !== undefined) dadosAtualizacao.genero = data.genero
    if (data.faculdade !== undefined) dadosAtualizacao.faculdade = data.faculdade
    if (data.areasInteresse !== undefined) dadosAtualizacao.areasInteresse = data.areasInteresse
    if (data.habilidadesComportamentais !== undefined) {
      dadosAtualizacao.habilidadesComportamentais = data.habilidadesComportamentais
    }
    if (data.habilidadesTecnicas !== undefined) {
      dadosAtualizacao.habilidadesTecnicas = data.habilidadesTecnicas
    }
    if (data.semestre !== undefined) dadosAtualizacao.semestre = parseInt(data.semestre)
    if (data.periodo !== undefined) dadosAtualizacao.periodo = data.periodo
    if (data.dataFormatura !== undefined) {
      dadosAtualizacao.dataFormatura = data.dataFormatura ? new Date(data.dataFormatura) : null
    }

    // Atualizar perfil
    const estudanteAtualizado = await updateEstudanteProfile(userId, dadosAtualizacao)

    return {
      success: true,
      perfil: {
        nome: estudanteAtualizado.user.nome,
        email: estudanteAtualizado.user.email,
        telefone: estudanteAtualizado.telefone,
        fotoPerfil: estudanteAtualizado.fotoPerfil,
        dataNascimento: estudanteAtualizado.dataNascimento,
        genero: estudanteAtualizado.genero,
        faculdade: estudanteAtualizado.faculdade,
        areasInteresse: estudanteAtualizado.areasInteresse,
        habilidadesComportamentais: estudanteAtualizado.habilidadesComportamentais,
        habilidadesTecnicas: estudanteAtualizado.habilidadesTecnicas,
        matricula: estudanteAtualizado.matricula,
        curso: formatarNomeCurso(estudanteAtualizado.curso),
        cursoValue: estudanteAtualizado.curso,
        semestre: estudanteAtualizado.semestre,
        periodo: estudanteAtualizado.periodo,
        dataFormatura: estudanteAtualizado.dataFormatura,
        porcentagem: perfilPorcentagem(estudanteAtualizado),
      },
      message: 'Perfil atualizado com sucesso',
    }
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error)
    return {
      success: false,
      error: 'Erro ao atualizar perfil',
    }
  }
}

