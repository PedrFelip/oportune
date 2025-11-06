import { PrismaClient } from '@prisma/client'
import { v4 } from 'uuid'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Limpar dados existentes para evitar conflitos de chave única
  await prisma.candidatura.deleteMany({})
  await prisma.vaga.deleteMany({})
  await prisma.estudante.deleteMany({})
  await prisma.professor.deleteMany({})
  await prisma.empresa.deleteMany({})
  await prisma.user.deleteMany({})
  // Criar usuário estudante
  const senhaHash = await bcrypt.hash('senha123#', 10)

  const aluno = await prisma.user.create({
    data: {
      id: v4(),
      tipo: 'ESTUDANTE',
      nome: 'Pedro Teste da Silva',
      email: 'pedro.teste@exemplo.com',
      senha: senhaHash,
      emailVerificado: true,
      estudante: {
        create: {
          curso: 'Engenharia de Software',
          semestre: 5,
          periodo: 'MATUTINO',
          dataNascimento: new Date('2000-01-01'),
          genero: 'MASCULINO',
          matricula: '20250001',
          telefone: '(11) 99999-9999',
          faculdade: 'Universidade Federal de Tecnologia',
        },
      },
    },
    include: {
      estudante: true,
    },
  })

  // Criar usuário empresa
  const empresa = await prisma.user.create({
    data: {
      id: v4(),
      tipo: 'EMPRESA',
      nome: 'Tech Solutions',
      email: 'contato@techsolutions.com',
      senha: senhaHash,
      emailVerificado: true,
      empresa: {
        create: {
          nomeFantasia: 'Tech Solutions Ltda',
          cnpj: '12345678000190',
          ramo: 'Tecnologia',
          setor: 'Desenvolvimento de Software',
          descricao: 'Empresa especializada em soluções tecnológicas.',
          endereco: 'São Paulo, SP',
          telefone: '(11) 3333-3333',
          website: 'https://techsolutions.com',
        },
      },
    },
    include: {
      empresa: true,
    },
  })

  // Criar usuário professor
  const professor = await prisma.user.create({
    data: {
      id: v4(),
      tipo: 'PROFESSOR',
      nome: 'Dr. Maria Santos',
      email: 'maria.santos@universidade.edu',
      senha: senhaHash,
      emailVerificado: true,
      professor: {
        create: {
          dataNascimento: new Date('1980-05-15'),
          genero: 'FEMININO',
          areasInteresse: ['Inteligência Artificial', 'Machine Learning', 'Ciência de Dados'],
          areaAtuacao: 'Ciência da Computação',
          departamento: 'Departamento de Engenharia de Software',
          titulacao: 'Doutora',
          lattes: 'http://lattes.cnpq.br/1234567890',
        },
      },
    },
    include: {
      professor: true,
    },
  })

  // Criar vagas da empresa
  const vagaEmpresa1 = await prisma.vaga.create({
    data: {
      titulo: 'Estágio em Desenvolvimento Frontend',
      descricao:
        'Oportunidade de estágio para desenvolvimento de interfaces web usando React e TypeScript.',
      tipo: 'ESTAGIO',
      requisitos: ['React', 'TypeScript', 'HTML/CSS', 'Git'],
      prazoInscricao: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias a partir de hoje
      statusVaga: 'ATIVA',
      cursosAlvo: ['Engenharia de Software'],
      semestreMinimo: 4,
      empresaId: empresa.empresa!.id,
    },
  })

  const vagaEmpresa2 = await prisma.vaga.create({
    data: {
      titulo: 'Desenvolvedor Backend Júnior',
      descricao: 'Vaga para desenvolvedor backend com foco em Node.js e bancos de dados.',
      tipo: 'ESTAGIO',
      requisitos: ['Node.js', 'JavaScript', 'PostgreSQL', 'API REST'],
      prazoInscricao: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 dias a partir de hoje
      statusVaga: 'ATIVA',
      cursosAlvo: ['Engenharia de Software'],
      semestreMinimo: 3,
      empresaId: empresa.empresa!.id,
    },
  })

  // Criar vagas do professor
  const vagaProfessor1 = await prisma.vaga.create({
    data: {
      titulo: 'Pesquisa em Inteligência Artificial',
      descricao:
        'Projeto de pesquisa focado em algoritmos de machine learning aplicados à análise de dados.',
      tipo: 'PESQUISA',
      requisitos: ['Python', 'Machine Learning', 'Estatística', 'Pesquisa Acadêmica'],
      prazoInscricao: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 dias a partir de hoje
      statusVaga: 'ATIVA',
      cursosAlvo: ['Engenharia de Software'],
      semestreMinimo: 6,
      professorId: professor.professor!.id,
    },
  })

  const vagaProfessor2 = await prisma.vaga.create({
    data: {
      titulo: 'Extensão: Ensino de Programação',
      descricao: 'Projeto de extensão para ensinar programação básica para comunidades carentes.',
      tipo: 'EXTENSAO',
      requisitos: ['Programação', 'Didática', 'Comunicação', 'Trabalho em Equipe'],
      prazoInscricao: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 dias a partir de hoje
      statusVaga: 'ATIVA',
      cursosAlvo: ['Engenharia de Software'],
      semestreMinimo: 2,
      professorId: professor.professor!.id,
    },
  })

  // Criar alunos adicionais para demonstração
  const aluno2 = await prisma.user.create({
    data: {
      id: v4(),
      tipo: 'ESTUDANTE',
      nome: 'Ana Silva',
      email: 'ana.silva@exemplo.com',
      senha: senhaHash,
      emailVerificado: true,
      estudante: {
        create: {
          curso: 'Engenharia de Software',
          semestre: 6,
          periodo: 'MATUTINO',
          dataNascimento: new Date('1999-05-10'),
          genero: 'FEMININO',
          matricula: '20250002',
          telefone: '(11) 98888-8888',
          faculdade: 'Universidade Federal de Tecnologia',
          habilidadesTecnicas: ['Python', 'Machine Learning', 'Docker'],
        },
      },
    },
    include: {
      estudante: true,
    },
  })

  const aluno3 = await prisma.user.create({
    data: {
      id: v4(),
      tipo: 'ESTUDANTE',
      nome: 'Carlos Oliveira',
      email: 'carlos.oliveira@exemplo.com',
      senha: senhaHash,
      emailVerificado: true,
      estudante: {
        create: {
          curso: 'Engenharia de Software',
          semestre: 7,
          periodo: 'VESPERTINO',
          dataNascimento: new Date('1998-08-22'),
          genero: 'MASCULINO',
          matricula: '20250003',
          telefone: '(11) 97777-7777',
          faculdade: 'Universidade Federal de Tecnologia',
          habilidadesTecnicas: ['React', 'Node.js', 'TypeScript'],
        },
      },
    },
    include: {
      estudante: true,
    },
  })

  // Criar candidaturas do estudante
  const candidatura1 = await prisma.candidatura.create({
    data: {
      vagaId: vagaEmpresa1.id,
      estudanteId: aluno.id, // Usar o userId (aluno.id), não estudante.id
      status: 'PENDENTE',
      dataCandidatura: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 dias atrás
    },
  })

  const candidatura2 = await prisma.candidatura.create({
    data: {
      vagaId: vagaProfessor2.id,
      estudanteId: aluno.id, // Usar o userId
      status: 'ACEITA',
      dataCandidatura: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 dias atrás
    },
  })

  const candidatura3 = await prisma.candidatura.create({
    data: {
      vagaId: vagaEmpresa2.id,
      estudanteId: aluno.id, // Usar o userId
      status: 'RECUSADA',
      dataCandidatura: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 dias atrás
    },
  })

  const candidatura4 = await prisma.candidatura.create({
    data: {
      vagaId: vagaProfessor1.id,
      estudanteId: aluno2.id, // Usar o userId
      status: 'ACEITA',
      dataCandidatura: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 dias atrás
    },
  })

  const candidatura5 = await prisma.candidatura.create({
    data: {
      vagaId: vagaProfessor2.id,
      estudanteId: aluno3.id, // Usar o userId
      status: 'ACEITA',
      dataCandidatura: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 dias atrás
    },
  })

  console.log('Seed executado com sucesso!')
  console.log({
    alunos: [
      { id: aluno.id, nome: aluno.nome, email: aluno.email, curso: aluno.estudante?.curso },
      { id: aluno2.id, nome: aluno2.nome, email: aluno2.email, curso: aluno2.estudante?.curso },
      { id: aluno3.id, nome: aluno3.nome, email: aluno3.email, curso: aluno3.estudante?.curso },
    ],
    empresa: { id: empresa.id, nome: empresa.nome },
    professor: { id: professor.id, nome: professor.nome, email: professor.email },
    vagas: [
      { id: vagaEmpresa1.id, titulo: vagaEmpresa1.titulo, professorId: vagaEmpresa1.professorId },
      { id: vagaEmpresa2.id, titulo: vagaEmpresa2.titulo, professorId: vagaEmpresa2.professorId },
      { id: vagaProfessor1.id, titulo: vagaProfessor1.titulo, professorId: vagaProfessor1.professorId },
      { id: vagaProfessor2.id, titulo: vagaProfessor2.titulo, professorId: vagaProfessor2.professorId },
    ],
    candidaturas: [
      { id: candidatura1.id, status: candidatura1.status },
      { id: candidatura2.id, status: candidatura2.status },
      { id: candidatura3.id, status: candidatura3.status },
      { id: candidatura4.id, status: candidatura4.status },
      { id: candidatura5.id, status: candidatura5.status },
    ],
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
