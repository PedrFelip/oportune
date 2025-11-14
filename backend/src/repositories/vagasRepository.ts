import prisma from '../../prisma/client.ts'
import { VagaUpdateDTO } from '../schemas/vagasSchema.ts'

// Busca o ID do Professor a partir do userId
export const getProfessorIdByUserId = async (userId: string): Promise<string | null> => {
  try {
    const professor = await prisma.professor.findUnique({
      where: { userId },
      select: { id: true },
    })
    return professor?.id || null
  } catch (error) {
    console.error('Erro ao buscar professor:', error)
    return null
  }
}

// Busca o ID da Empresa a partir do userId
export const getEmpresaIdByUserId = async (userId: string): Promise<string | null> => {
  try {
    const empresa = await prisma.empresa.findUnique({
      where: { userId },
      select: { id: true },
    })
    return empresa?.id || null
  } catch (error) {
    console.error('Erro ao buscar empresa:', error)
    return null
  }
}

export const createVaga = async (vagaData: any) => {
  try {
    const vaga = await prisma.vaga.create({
      data: {
        titulo: vagaData.titulo,
        descricao: vagaData.descricao,
        requisitos: vagaData.requisitos,
        tipo: vagaData.tipo,
        empresaId: vagaData.empresaId,
        professorId: vagaData.professorId,
        numeroVagas: vagaData.numeroVagas || 1,
        prazoInscricao: vagaData.prazoInscricao,
        cursosAlvo: vagaData.cursosAlvo || [],
        semestreMinimo: vagaData.semestreMinimo,
      },
    })
    return vaga
  } catch (error) {
    console.error('Erro ao criar vaga:', error)
    throw new Error('Erro ao criar vaga')
  }
}

export const listatodasVagas = async (page: number, limit: number) => {
  try {
    const vagas = await prisma.vaga.findMany({
      where: {
        statusVaga: 'ATIVA',
      },
      include: {
        empresa: true,
        professor: {
          include: {
            user: true,
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    })
    // Mapear para o formato esperado pelo frontend
    return vagas
  } catch (error) {
    console.error('Erro ao listar vagas:', error)
    throw new Error('Erro ao listar vagas')
  }
}

export const getVagaDetalhes = async (vagaId: string) => {
  try {
    const vaga = await prisma.vaga.findUniqueOrThrow({
      where: { id: vagaId },
      include: {
        empresa: true,
        professor: {
          include: {
            user: true,
          },
        },
      },
    })

    // Formatar data de prazo de inscrição
    const prazoFormatado = new Date(vaga.prazoInscricao).toLocaleDateString('pt-BR')

    // Criar array de tags baseado no tipo de vaga
    const tags = [vaga.tipo]

    return {
      id: vaga.id,
      titulo: vaga.titulo,
      tags: tags,
      empresa: vaga.empresa?.nomeFantasia || vaga.professor?.user?.nome || 'Não especificado',
      descricao: vaga.descricao,
      responsabilidades: [], // Campo não existe no banco, retornar array vazio
      requisitos: vaga.requisitos,
      curso: vaga.cursosAlvo || [],
      semestre: vaga.semestreMinimo?.toString() || '1',
      prazoInscricao: prazoFormatado,
      responsavel: {
        id: vaga.empresa?.userId || vaga.professor?.userId || '',
        tipo: vaga.empresa ? 'EMPRESA' : 'PROFESSOR',
        nome: vaga.empresa?.nomeFantasia || vaga.professor?.user?.nome || 'Não especificado',
      },
    }
  } catch (error) {
    console.error('Erro ao obter detalhes da vaga:', error)
    throw new Error('Erro ao obter detalhes da vaga')
  }
}

export const getVagaByIdForAuth = async (vagaId: string) => {
  // Busca vaga com informações mínimas para verificação de permissão
  try {
    const vaga = await prisma.vaga.findUnique({
      where: { id: vagaId },
      include: {
        empresa: true,
        professor: true,
      },
    })
    return vaga
  } catch (error) {
    console.error('Erro ao buscar vaga para autorização:', error)
    throw new Error('Erro ao buscar vaga')
  }
}

export const updateVaga = async (vagaId: string, dadosAtualizacao: VagaUpdateDTO) => {
  try {
    if (!Object.keys(dadosAtualizacao).length) {
      throw new Error('Nenhum campo informado para atualização')
    }

    const vaga = await prisma.vaga.update({
      where: { id: vagaId },
      data: dadosAtualizacao,
    })

    return vaga
  } catch (error) {
    console.error('Erro ao atualizar vaga:', error)
    throw new Error('Erro ao atualizar vaga')
  }
}

export const encerrarVaga = async (vagaId: string) => {
  try {
    const vaga = await prisma.vaga.update({
      where: { id: vagaId },
      data: {
        statusVaga: 'ENCERRADA',
      },
    })

    return vaga
  } catch (error) {
    console.error('Erro ao encerrar vaga:', error)
    throw new Error('Erro ao encerrar vaga')
  }
}

export const listarVagasPorResponsavel = async (
  responsavelId: string,
  tipoResponsavel: 'EMPRESA' | 'PROFESSOR',
) => {
  try {
    const whereFiltro =
      tipoResponsavel === 'EMPRESA'
        ? { empresa: { userId: responsavelId } }
        : { professor: { userId: responsavelId } }

    const vagas = await prisma.vaga.findMany({
      where: whereFiltro,
      include: {
        empresa: true,
        professor: {
          include: {
            user: true,
          },
        },
        candidaturas: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return vagas
  } catch (error) {
    console.error('Erro ao listar vagas por responsável: ', error)
    throw new Error('Erro ao listar vagas por responsável')
  }
}
