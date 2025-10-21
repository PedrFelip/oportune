import prisma from '../../prisma/client.ts'

export const candidaturaVaga = async (candidaturaData: {
  vagaId: string
  estudanteId: string
}) => {
  try {
    const candidatura = await prisma.candidatura.create({
      data: {
        vagaId: candidaturaData.vagaId,
        estudanteId: candidaturaData.estudanteId,
      },
    })
    return candidatura
  } catch (error) {
    throw new Error('Erro ao cadastrar candidatura: ' + error)
  }
}

export const listarCadidaturasPorEstudante = async (estudanteId: string) => {
  try {
    const candidaturas = await prisma.candidatura.findMany({
      take: 10,
      where: {
        estudanteId,
      },
      include: {
        vaga: {
          select: {
            id: true,
            titulo: true,
            tipo: true,

            empresaId: true,
            empresa: {
              select: {
                nomeFantasia: true,
              },
            },

            professorId: true,
            professor: {
              select: {
                user: {
                  select: {
                    nome: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return candidaturas
  } catch (error) {
    throw new Error('Erro ao listar candidaturas: ' + error)
  }
}
