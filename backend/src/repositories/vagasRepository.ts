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
    return {
      id: vaga.id,
      titulo: vaga.titulo,
      empresa: vaga.empresa?.nomeFantasia || '',
      professor: vaga.professor?.user?.nome || '',
      descricao: vaga.descricao,
      requisitos: vaga.requisitos,
      tipo: vaga.tipo,
      prazoInscricao: vaga.prazoInscricao,
      cursosAlvo: vaga.cursosAlvo || [],
      semestreMinimo: vaga.semestreMinimo,
      
    };
  } catch (error) {
    console.error('Erro ao obter detalhes da vaga:', error);
    throw new Error('Erro ao obter detalhes da vaga');
  }
}