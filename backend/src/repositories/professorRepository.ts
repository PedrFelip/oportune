import prisma from '../../prisma/client.ts'

export const vagasRecentesProfessorRepository = async (professorId: string) => {
  try {
    const vagas = await prisma.vaga.findMany({
      where: {
        professorId: professorId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 3,
      select: {
        id: true,
        titulo: true,
        numeroVagas: true,
        prazoInscricao: true,
        tipo: true,

        candidaturas: {
          select: {
            status: true,
          },
        },
      },
    })

    return vagas
  } catch (error) {
    console.error('Erro ao buscar vagas recentes do professor:', error)
    throw new Error('Erro ao buscar vagas recentes do professor')
  }
}
