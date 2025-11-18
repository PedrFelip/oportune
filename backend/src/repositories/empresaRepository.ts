import prisma from '../../prisma/client.ts'
import { StatusVaga } from '@prisma/client'

export const VagasAtivasEmpresaRepository = async (idEmpresa: string) => {
  return prisma.vaga.count({
    where: {
      empresa: {
        userId: idEmpresa,
      },
      statusVaga: 'ATIVA' as StatusVaga,
    },
  })
}

export const totalCandidaturasVagasEmpresaRepository = async (idEmpresa: string) => {
  return prisma.candidatura.count({
    where: {
      vaga: {
        empresa: {
          userId: idEmpresa,
        },
      },
    },
  })
}

export const vagasRecentesEmpresaRepository = async (empresaId: string) => {
  try {
    const vagas = await prisma.vaga.findMany({
      where: {
        empresa: {
          userId: empresaId,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 3,
      select: {
        id: true,
        titulo: true,
        numeroVagas: true,
        numeroVagasPreenchidas: true,
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
    console.error('Erro ao buscar vagas recentes da empresa:', error)
    throw new Error('Erro ao buscar vagas recentes da empresa')
  }
}
