import prisma from '../../prisma/client.ts'
import { VagaUpdateDTO } from '../schemas/vagasSchema.ts'

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
    return vagas.map((vaga: any) => ({
      id: vaga.id,
      titulo: vaga.titulo,
      empresa: vaga.empresa?.nomeFantasia || vaga.professor?.user?.nome || '',
      categorias: [vaga.tipo, ...(vaga.requisitos || [])],
      descricao: vaga.descricao,
      curso:
        vaga.cursosAlvo && vaga.cursosAlvo.length > 0 ? vaga.cursosAlvo.join(', ') : 'Qualquer',
      semestre: vaga.semestreMinimo ? `A partir do ${vaga.semestreMinimo}º` : 'Não informado',
    }))
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
      bolsa: 'A combinar', // Campo não existe no banco
      prazoInscricao: prazoFormatado,
      sobre: vaga.empresa?.descricao || 'Informações não disponíveis',
      responsavel: {
        id: vaga.empresaId || vaga.professorId || '',
        tipo: vaga.empresa ? 'EMPRESA' : 'PROFESSOR',
        nome: vaga.empresa?.nomeFantasia || vaga.professor?.user?.nome || 'Não especificado',
      },
    }
  } catch (error) {
    console.error('Erro ao obter detalhes da vaga:', error)
    throw new Error('Erro ao obter detalhes da vaga')
  }
}

export const updateVaga = async (vagaId: string, dadosAtualizacao: VagaUpdateDTO) => {
  try {
    const data: Record<string, unknown> = {}

    if (typeof dadosAtualizacao.titulo !== 'undefined') data.titulo = dadosAtualizacao.titulo
    if (typeof dadosAtualizacao.descricao !== 'undefined') data.descricao = dadosAtualizacao.descricao
    if (typeof dadosAtualizacao.requisitos !== 'undefined') data.requisitos = dadosAtualizacao.requisitos
    if (typeof dadosAtualizacao.tipo !== 'undefined') data.tipo = dadosAtualizacao.tipo
    if (typeof dadosAtualizacao.numeroVagas !== 'undefined') data.numeroVagas = dadosAtualizacao.numeroVagas
    if (typeof dadosAtualizacao.prazoInscricao !== 'undefined') data.prazoInscricao = dadosAtualizacao.prazoInscricao
    if (typeof dadosAtualizacao.cursosAlvo !== 'undefined') data.cursosAlvo = dadosAtualizacao.cursosAlvo
    if (typeof dadosAtualizacao.semestreMinimo !== 'undefined') data.semestreMinimo = dadosAtualizacao.semestreMinimo
    if (typeof dadosAtualizacao.empresaId !== 'undefined') data.empresaId = dadosAtualizacao.empresaId
    if (typeof dadosAtualizacao.professorId !== 'undefined') data.professorId = dadosAtualizacao.professorId

    if (!Object.keys(data).length) {
      throw new Error('Nenhum campo informado para atualização')
    }

    const vaga = await prisma.vaga.update({
      where: { id: vagaId },
      data,
    })

    return vaga
  } catch (error) {
    console.error('Erro ao atualizar vaga:', error)
    throw new Error('Erro ao atualizar vaga')
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