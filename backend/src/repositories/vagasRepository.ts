import prisma from '../../prisma/client.ts'

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
      }
    })
    return vaga;
  } catch (error) {
    console.error('Erro ao criar vaga:', error);
    throw new Error('Erro ao criar vaga');
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
    });
    // Mapear para o formato esperado pelo frontend
    return vagas.map((vaga: any) => ({
      id: vaga.id,
      titulo: vaga.titulo,
      empresa: vaga.empresa?.nomeFantasia || vaga.professor?.user?.nome || '',
      categorias: [vaga.tipo, ...(vaga.requisitos || [])],
      descricao: vaga.descricao,
      curso: vaga.cursosAlvo && vaga.cursosAlvo.length > 0 ? vaga.cursosAlvo.join(', ') : 'Qualquer',
      semestre: vaga.semestreMinimo ? `A partir do ${vaga.semestreMinimo}º` : 'Não informado',
    }));
  } catch (error) {
    console.error('Erro ao listar vagas:', error);
    throw new Error('Erro ao listar vagas');
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
    });
    
    // Formatar data de prazo de inscrição
    const prazoFormatado = new Date(vaga.prazoInscricao).toLocaleDateString('pt-BR');
    
    // Criar array de tags baseado no tipo de vaga
    const tags = [vaga.tipo];
    
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
    };
  } catch (error) {
    console.error('Erro ao obter detalhes da vaga:', error);
    throw new Error('Erro ao obter detalhes da vaga');
  }
}