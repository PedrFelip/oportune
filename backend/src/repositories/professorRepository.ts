import prisma from '../../prisma/client.ts'

export const getProfessorIdByUserId = async (userId: string): Promise<string | null> => {
  try {
    const professor = await prisma.professor.findUnique({
      where: {
        userId: userId,
      },
      select: {
        id: true,
      },
    })
    return professor?.id || null
  } catch (error) {
    console.error('Erro ao buscar ID do professor:', error)
    throw new Error('Erro ao buscar ID do professor')
  }
}

export const vagasRecentesProfessorRepository = async (professorId: string) => {
  try {
    const vagas = await prisma.vaga.findMany({
      where: {
        professorId: professorId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 3,
      select: {
        id: true,
        titulo: true,
        numeroVagas: true,
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
    console.error('Erro ao buscar vagas recentes do professor:', error)
    throw new Error('Erro ao buscar vagas recentes do professor')
  }
}

export const getProfessorProfileRepository = async (professorId: string) => {
  try {
    const professor = await prisma.professor.findUnique({
      where: {
        userId: professorId,
      },
      select: {
        userId: true,
        departamento: true,
        telefone: true,
        fotoPerfil: true,
        lattes: true,
        areasInteresse: true,
        user: {
          select: {
            nome: true,
            email: true,
          },
        },
      },
    })

    if (!professor) {
      return null
    }

    return {
      professor,
    }
  } catch (error) {
    console.error('Erro ao buscar perfil do professor:', error)
    throw new Error('Erro ao buscar perfil do professor')
  }
}

export const getAlunosRepository = async (professorId: string) => {
  try {
    // Busca todos os cursos das vagas do professor
    const vagasProfessor = await prisma.vaga.findMany({
      where: {
        professorId: professorId,
      },
      select: {
        cursosAlvo: true,
      },
    })

    // Extrai todos os cursos únicos das vagas
    const cursosUnicos = Array.from(
      new Set(
        vagasProfessor
          .flatMap(v => v.cursosAlvo)
          .filter(curso => curso !== null && curso !== undefined),
      ),
    )

    // Se não houver cursos nas vagas, retorna array vazio
    if (cursosUnicos.length === 0) {
      return []
    }

    // Busca estudantes cujo curso está nos cursos das vagas do professor
    const todosAlunos = await prisma.estudante.findMany({
      where: {
        curso: {
          in: cursosUnicos,
        },
      },
      select: {
        id: true,
        semestre: true,
        curso: true,
        habilidadesTecnicas: true,
        fotoPerfil: true,
        user: {
          select: {
            nome: true,
            email: true,
          },
        },
      },
    })

    // Embaralha e pega até 3 alunos aleatórios
    const alunosAleatórios = todosAlunos.sort(() => Math.random() - 0.5).slice(0, 3)

    return alunosAleatórios
  } catch (error) {
    console.error('Erro ao buscar alunos orientados:', error)
    throw new Error('Erro ao buscar alunos orientados')
  }
}
