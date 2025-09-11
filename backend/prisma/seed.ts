import { PrismaClient } from '@prisma/client'
import { v4 } from 'uuid'

const uuid = v4()
const prisma = new PrismaClient()

async function main() {
  const aluno = await prisma.user.create({
    data: {
      id: uuid,
      tipo: 'ESTUDANTE',
      nome: 'Teste da Silva',
      email: 'teste@exemplo.com',
      senha: 'senha123',
      emailVerificado: true,
      estudante: {
        create: {
          curso: 'Engenharia',
          semestre: 5,
          periodo: 'MATUTINO',
          dataNascimento: new Date('2000-01-01'),
          genero: 'MASCULINO',
          matricula: '20250001',
        },
      },
    },
  })

  console.log({ aluno })
}

main().then(async () => {
  await prisma.$disconnect()
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})