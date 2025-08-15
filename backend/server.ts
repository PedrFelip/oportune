import Fastify from 'fastify';

const app = Fastify()

app.get('/', async () => {
  return { message: 'check' }
})

app.listen({port: 3001}).then(() =>{
  console.log('rodando na porta 3001')
})