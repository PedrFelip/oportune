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
        professor: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    // Mapear para o formato esperado pelo frontend
    return vagas.map((vaga: any) => ({
      titulo: vaga.titulo,
      empresa: vaga.empresa?.nome || vaga.professor?.nome || '',
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