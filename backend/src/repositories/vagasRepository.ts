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
      }
    })
    return vaga;
  } catch (error) {
    console.error('Erro ao criar vaga:', error);
    throw new Error('Erro ao criar vaga');
  }
}
