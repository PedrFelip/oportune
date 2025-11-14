import { z } from 'zod'

export const aprovarAlunoSchema = z.object({
  candidaturaId: z.string().uuid(),
  estudanteId: z.string().uuid(),
})

export type AprovarAlunoDTO = z.infer<typeof aprovarAlunoSchema>

export const recusarAlunoSchema = z.object({
  candidaturaId: z.string().uuid(),
  estudanteId: z.string().uuid(),
})

export type RecusarAlunoDTO = z.infer<typeof recusarAlunoSchema>
