import { describe, expect, test } from '@jest/globals'
import fastify from 'fastify'
import { authRoutes } from '../routes/authRoutes.ts'
import request from 'supertest'

const app = fastify()
app.register(authRoutes)

request(app.server)
  .post('/auth/login')
  .send({ email: 'maria.santos@universidade.edu', password: 'Senha123#' })
  .expect(200)
  .then((response) => {
    expect(response.body).toHaveProperty('token')
  })