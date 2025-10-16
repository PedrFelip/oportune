import prisma from '../../prisma/client.ts'

export const candidaturaVaga = async (candidaturaData: any) => {
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