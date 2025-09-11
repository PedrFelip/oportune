import prisma from "../../prisma/client.ts";

export const getDashboardData = async (userId: string): Promise<{
  estudanteData: any,
  candidaturasEstudante: any,
  VagasRecomendadas: any
}> => {
  const estudanteData = await prisma.estudante.findUnique({
    where: { userId: userId },
    include: {
      user: {
        select: { nome: true }
      }
    }
  })
  
  if (!estudanteData) {
    throw new Error("Estudante não encontrado");
  }
  const candidaturasEstudante = await prisma.candidatura.findMany({
    where: { estudanteId: estudanteData.id },
    orderBy: { dataCandidatura: 'desc' },
    take: 3,
    include: {
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

  const VagasRecomendadas = await prisma.vaga.findMany({
    where: {
      cursosAlvo: {
        contains: estudanteData.curso
      },
      NOT: {
        candidaturas: {
          some: {
            estudanteId: estudanteData.id
          }
        }
      }
     },
     take: 3,
     include: {
      empresa: {
        select: {
          nomeFantasia: true
        }
      },
      professor: {
        select: {
          user: {
            select: { 
              nome: true 
            }
          }
        }
      }
    }
  })

  return {
    estudanteData,
    candidaturasEstudante,
    VagasRecomendadas,
  }
}