import { describe, it, expect, beforeAll } from 'vitest'
import fastify from 'fastify'
import { authRoutes } from '../src/routes/authRoutes.ts'
import request from 'supertest'

const app = fastify()
app.register(authRoutes)

beforeAll(async () => {
  await app.ready()
})

describe('Auth routes', () => {
  it('deve retornar token ao logar com credenciais válidas', async () => {
    const response = await request(app.server)
      .post('/loguser')
      .send({ email: 'pfsilva190406@gmail.com', senha: 'Senha123#' })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })
})