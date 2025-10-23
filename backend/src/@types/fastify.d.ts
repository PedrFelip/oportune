import fastify from 'fastify'

declare module 'fastify' {
  // Extensão de interfaces
  export interface FastifyRequest {
    // Une isso a interface do FastifyRequest
    user?: {
      sub: string // Id do usuário
      role: 'ESTUDANTE' | 'PROFESSOR' | 'EMPRESA'
    }
  }
}
