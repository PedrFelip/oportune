import { VagasAtivasEmpresaRepository } from '../repositories/empresaRepository.ts'

export const VagasAtivasService = async (empresaId: string) => {
  const vagasAtivas = await VagasAtivasEmpresaRepository(empresaId)
  if (vagasAtivas === 0) {
    return { message: 'Nenhuma vaga ativa encontrada para esta empresa.', count: 0 }
  }
  return { message: 'Vagas ativas encontradas.', count: vagasAtivas }
}
