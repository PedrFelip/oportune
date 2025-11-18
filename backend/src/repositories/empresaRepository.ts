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
