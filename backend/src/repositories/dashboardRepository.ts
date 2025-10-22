import prisma from '../../prisma/client.ts'

// Função para buscar dados básicos do estudante (carregamento inicial)
export const getEstudanteData = async (userId: string) => {
  console.time('getEstudanteData')
  try {
    const estudanteData = await prisma.estudante.findUnique({
      where: { userId },
      select: {
        id: true,
        telefone: true,
        fotoPerfil: true,
        dataNascimento: true,
        genero: true,
        faculdade: true,
        areasInteresse: true,
        habilidadesComportamentais: true,
        habilidadesTecnicas: true,
        matricula: true,
        curso: true,
        semestre: true,
        periodo: true,
        dataFormatura: true,
        user: {
          select: { nome: true },
        },
      },
    })

    if (!estudanteData) {
      return null
    }

    console.timeEnd('getEstudanteData')
    return estudanteData
  } catch (error) {
    console.error('Erro ao buscar dados do estudante:', error)
    throw error
  }
}

// Função independente para buscar apenas o ID do estudante (usado por outras funções)
const getEstudanteId = async (userId: string): Promise<string | null> => {
  try {
    const estudante = await prisma.estudante.findUnique({
      where: { userId },
      select: { userId: true },
    })
    return estudante?.userId || null
  } catch (error) {
    console.error('Erro ao buscar ID do estudante:', error)
    return null
  }
}

// Função independente para buscar curso do estudante (usado por vagas recomendadas)
const getEstudanteCurso = async (userId: string): Promise<{ id: string; curso: string } | null> => {
  try {
    const estudante = await prisma.estudante.findUnique({
      where: { userId },
      select: { id: true, curso: true },
    })
    return estudante || null
  } catch (error) {
    console.error('Erro ao buscar curso do estudante:', error)
    return null
  }
}

// Função totalmente independente para buscar candidaturas recentes
export const getCandidaturasRecentes = async (userId: string) => {
  console.time('getCandidaturasRecentes')
  try {
    console.log(`[getCandidaturasRecentes] Iniciando busca para userId: ${userId}`)

    // Busca independente do ID do estudante
    const estudanteId = await getEstudanteId(userId)
    if (!estudanteId) {
      console.warn(`[getCandidaturasRecentes] Estudante não encontrado para userId: ${userId}`)
      return []
    }

    const candidaturas = await prisma.candidatura.findMany({
      where: { estudanteId },
      orderBy: { dataCandidatura: 'desc' },
      take: 3,
      select: {
        id: true,
        status: true,
        dataCandidatura: true,
        vaga: {
          select: {
            titulo: true,
            empresa: {
              select: { nomeFantasia: true },
            },
            professor: {
              select: {
                user: {
                  select: { nome: true },
                },
              },
            },
          },
        },
      },
    })

    // Filtrar candidaturas com dados válidos
    const candidaturasValidas = candidaturas.filter(
      c =>
        c.vaga && c.vaga.titulo && (c.vaga.empresa?.nomeFantasia || c.vaga.professor?.user?.nome),
    )

    console.log(
      `[getCandidaturasRecentes] Encontradas ${candidaturasValidas.length} candidaturas válidas para estudante ${estudanteId}`,
    )
    console.timeEnd('getCandidaturasRecentes')
    return candidaturasValidas || []
  } catch (error) {
    console.error('[getCandidaturasRecentes] Erro ao buscar candidaturas:', error)
    return []
  }
}

// Função totalmente independente para buscar vagas recomendadas
export const getVagasRecomendadas = async (userId: string) => {
  console.time('getVagasRecomendadas')
  try {
    console.log(`[getVagasRecomendadas] Iniciando busca para userId: ${userId}`)

    // Busca independente dos dados do estudante
    const estudanteData = await getEstudanteCurso(userId)
    if (!estudanteData) {
      console.warn(`[getVagasRecomendadas] Estudante não encontrado para userId: ${userId}`)
      return []
    }

    if (!estudanteData.curso) {
      console.warn(`[getVagasRecomendadas] Estudante ${estudanteData.id} não possui curso definido`)
      // Retorna vagas gerais se não tem curso
      return await buscarVagasGerais(estudanteData.id)
    }

    // Buscar vagas específicas do curso
    const vagasDoCurso = await buscarVagasPorCurso(estudanteData.id, estudanteData.curso)

    // Se não encontrou vagas do curso, buscar vagas gerais
    if (vagasDoCurso.length === 0) {
      console.log(
        `[getVagasRecomendadas] Nenhuma vaga encontrada para curso ${estudanteData.curso}, buscando vagas gerais`,
      )
      return await buscarVagasGerais(estudanteData.id)
    }

    console.timeEnd('getVagasRecomendadas')
    return vagasDoCurso
  } catch (error) {
    console.error('[getVagasRecomendadas] Erro ao buscar vagas:', error)
    return []
  }
}

// Função auxiliar para buscar vagas por curso específico
const buscarVagasPorCurso = async (estudanteId: string, curso: string) => {
  try {
    // Buscar IDs de vagas já candidatadas (query independente)
    const candidaturasIds = await prisma.candidatura.findMany({
      where: { estudanteId },
      select: { vagaId: true },
    })

    const vagasExcluidas = candidaturasIds.map(c => c.vagaId)

    const vagas = await prisma.vaga.findMany({
      where: {
        AND: [
          { statusVaga: 'ATIVA' },
          { cursosAlvo: { has: curso } },
          { id: { notIn: vagasExcluidas } },
        ],
      },
      // Preferir ordenação por createdAt para melhor correlação com "recentes" e uso de índice
      orderBy: { createdAt: 'desc' },
      take: 3,
      select: {
        id: true,
        titulo: true,
        tipo: true,
        descricao: true,
        empresa: {
          select: {
            nomeFantasia: true,
          },
        },
        professor: {
          select: {
            user: {
              select: { nome: true },
            },
          },
        },
      },
    })

    // Filtrar vagas com dados válidos
    const vagasValidas = vagas.filter(
      v => v.titulo && (v.empresa?.nomeFantasia || v.professor?.user?.nome),
    )

    console.log(
      `[buscarVagasPorCurso] Encontradas ${vagasValidas.length} vagas válidas para curso ${curso}`,
    )
    return vagasValidas || []
  } catch (error) {
    console.error('[buscarVagasPorCurso] Erro:', error)
    return []
  }
}

// Função auxiliar para buscar vagas gerais (fallback)
const buscarVagasGerais = async (estudanteId: string) => {
  try {
    // Buscar IDs de vagas já candidatadas (query independente)
    const candidaturasIds = await prisma.candidatura.findMany({
      where: { estudanteId },
      select: { vagaId: true },
    })

    const vagasExcluidas = candidaturasIds.map(c => c.vagaId)

    const vagasGerais = await prisma.vaga.findMany({
      where: {
        AND: [{ statusVaga: 'ATIVA' }, { id: { notIn: vagasExcluidas } }],
      },
      // Preferir ordenação por createdAt para melhor correlação com "recentes" e uso de índice
      orderBy: { createdAt: 'desc' },
      take: 3,
      select: {
        id: true,
        titulo: true,
        tipo: true,
        descricao: true,
        empresa: {
          select: {
            nomeFantasia: true,
          },
        },
        professor: {
          select: {
            user: {
              select: { nome: true },
            },
          },
        },
      },
    })

    const vagasGeraisValidas = vagasGerais.filter(
      v => v.titulo && (v.empresa?.nomeFantasia || v.professor?.user?.nome),
    )

    console.log(`[buscarVagasGerais] Encontradas ${vagasGeraisValidas.length} vagas gerais válidas`)
    return vagasGeraisValidas || []
  } catch (error) {
    console.error('[buscarVagasGerais] Erro:', error)
    return []
  }
}
