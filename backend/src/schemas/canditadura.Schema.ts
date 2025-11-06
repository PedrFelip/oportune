import { z } from 'zod'

export const aprovarAlunoSchema = z.object({
  candidaturaId: z.string().uuid(),
  estudanteId: z.string().uuid(),
})

export type AprovarAlunoDTO = z.infer<typeof aprovarAlunoSchema>
