import prisma from '../../prisma/client.ts'
import { StatusVaga } from '@prisma/client'

export const VagasAtivasEmpresaRepository = async (idEmpresa: string) => {
  return prisma.vaga.count({
    where: {
      empresaId: idEmpresa,
      statusVaga: StatusVaga.ATIVA,
    },
  })
}