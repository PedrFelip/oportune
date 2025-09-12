import fastify from "fastify";

declare module "fastify" { // Extensão de interfaces
    export interface FastifyRequest { // Une isso a interface do FastifyRequest
        user?: {
            sub: string // Id do usuário
            role: "ESTUDANTE" | "PROFESSOR" | "EMPRESA" // Tipo de perfil
            tipo: "ESTUDANTE" | "PROFESSOR" | "EMPRESA" // Tipo de perfil (compatibilidade)
        }
    }
}