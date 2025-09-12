import prisma from "../../prisma/client.ts"

// Função para buscar dados básicos do estudante (carregamento inicial)
export const getEstudanteData = async (userId: string) => {
  const estudanteData = await prisma.estudante.findUnique({
    where: { userId },
    select: {
      id: true,
      telefone: true,
      fotoPerfil: true,
      dataNascimento: true,
      genero: true,
      faculdade: true,
      matricula: true,
      curso: true,
      semestre: true,
      periodo: true,
      dataFormatura: true,
      user: {
        select: { nome: true }
      }
    }
  })

  if (!estudanteData) {
    throw new Error("Estudante não encontrado")
  }

  return estudanteData
}

// Função para buscar candidaturas recentes 
// para evitar sobrecarga no carregamento inicial, carregamento separado
export const getCandidaturasRecentes = async (userId: string) => {
  const estudante = await prisma.estudante.findUnique({
    where: { userId },
    select: { id: true }
  })

  if (!estudante) {
    throw new Error("Estudante não encontrado")
  }

  const candidaturas = await prisma.candidatura.findMany({
    where: { estudanteId: estudante.id },
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
            select: { nomeFantasia: true }
          },
          professor: {
            select: {
              user: {
                select: { nome: true }
              }
            }
          }
        }
      }
    }
  })

  // Retorna array vazio se não houver candidaturas
  return candidaturas || []
}

// Função para buscar vagas recomendadas
export const getVagasRecomendadas = async (userId: string) => {
  const estudante = await prisma.estudante.findUnique({
    where: { userId },
    select: { id: true, curso: true }
  })

  if (!estudante) {
    throw new Error("Estudante não encontrado")
  }

  // Buscar IDs de vagas já candidatadas
  const candidaturasIds = await prisma.candidatura.findMany({
    where: { estudanteId: estudante.id },
    select: { vagaId: true }
  })

  const vagasExcluidas = candidaturasIds.map(c => c.vagaId)

  const vagas = await prisma.vaga.findMany({
    where: {
      AND: [
        { statusVaga: 'ATIVA' },
        { cursosAlvo: { contains: estudante.curso } },
        { id: { notIn: vagasExcluidas } }
      ]
    },
    orderBy: { id: 'desc' },
    take: 3,
    select: {
      id: true,
      titulo: true,
      empresa: {
        select: {
          nomeFantasia: true
        }
      },
      professor: {
        select: {
          user: {
            select: { nome: true }
          }
        }
      }
    }
  })

  // Retorna array vazio se não houver vagas
  return vagas || []
}