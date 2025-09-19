import z from 'zod'

export const createVagaSchema = z.object({
  titulo: z.string().min(2).max(100),
  descricao: z.string().min(10).max(1000),
  requisitos: z.array(z.string()).min(1).max(10),
  tipo: z.enum(['ESTAGIO', 'PESQUISA', 'EXTENSAO']),
  empresaId: z.string().uuid().optional(),
  professorId: z.string().uuid().optional(),
  prazoInscricao: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato AAAA-MM-DD')
    .transform((str) => new Date(str))
    .pipe(z.date())
})

export type VagaCreateDTO = z.infer<typeof createVagaSchema>