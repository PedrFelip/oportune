import z from 'zod'

export const createVagaSchema = z.object({
  titulo: z.string().min(2).max(100),
  descricao: z.string().min(10).max(1000),
  requisitos: z.array(z.string()).min(1).max(10),
  tipo: z.enum(['Estágio', 'Pesquisa', 'Extensão'])
    .transform(val => val.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()),
  empresaId: z.string().uuid().optional(),
  professorId: z.string().uuid().optional(),
  prazoInscricao: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato AAAA-MM-DD')
    .transform((str) => new Date(str))
    .pipe(z.date()),
  cursosAlvo: z.array(z.string()).min(0).optional(),
  semestreMinimo: z.number().int().min(1).optional()
  })
export type VagaCreateDTO = z.infer<typeof createVagaSchema>
