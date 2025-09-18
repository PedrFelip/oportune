import z from 'zod'

export const createVagaSchema = z.object({
  titulo: z.string().min(2).max(100),
  descricao: z.string().min(10).max(1000),
  requisitos: z.array(z.string()).min(1).max(10),
  tipo: z.enum(['Estágio', 'Pesquisa', 'Extensão']),
  empresaId: z.string().uuid().optional(),
  professorId: z.string().uuid().optional(),
  prazoInscricao: z.date().min(new Date()).optional()
})

export type VagaCreateDTO = z.infer<typeof createVagaSchema>