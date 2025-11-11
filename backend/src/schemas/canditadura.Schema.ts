import { z } from 'zod'

export const createCandidaturaSchema = z.object({
  vagaId: z.string().uuid('ID da vaga deve ser um UUID válido'),
  estudanteId: z.string().uuid('ID do estudante deve ser um UUID válido'),
})

export type CreateCandidaturaDTO = z.infer<typeof createCandidaturaSchema>

export const aprovarAlunoSchema = z.object({
  candidaturaId: z.string().uuid('ID da candidatura deve ser um UUID válido'),
  estudanteId: z.string().uuid('ID do estudante deve ser um UUID válido'),
})

export type AprovarAlunoDTO = z.infer<typeof aprovarAlunoSchema>

export const recusarAlunoSchema = z.object({
  candidaturaId: z.string().uuid('ID da candidatura deve ser um UUID válido'),
  estudanteId: z.string().uuid('ID do estudante deve ser um UUID válido'),
})

export type RecusarAlunoDTO = z.infer<typeof recusarAlunoSchema>

// Validações de negócio - não são validações de schema Zod, mas sim lógica de negócio
export const CANDIDATURA_VALIDATION_ERRORS = {
  CANDIDATURA_DUPLICADA: 'Você já se candidatou para esta vaga',
  VAGA_EXPIRADA: 'O prazo de inscrição para esta vaga já expirou',
  VAGA_INATIVA: 'Esta vaga não está mais ativa',
  VAGA_ENCERRADA: 'Esta vaga foi encerrada',
  VAGA_SEM_VAGAS: 'Esta vaga não possui mais vagas disponíveis',
  ESTUDANTE_NAO_ATENDE_SEMESTRE: 'Você não atende o semestre mínimo requerido para esta vaga',
  ESTUDANTE_NAO_ATENDE_CURSO: 'Seu curso não está entre os cursos alvo desta vaga',
  CANDIDATURA_NAO_ENCONTRADA: 'Candidatura não encontrada',
  CANDIDATURA_JA_APROVADA: 'Esta candidatura já foi aprovada',
  CANDIDATURA_JA_RECUSADA: 'Esta candidatura já foi recusada',
  CANDIDATURA_NAO_PENDENTE: 'Apenas candidaturas pendentes podem ser aprovadas ou recusadas',
  USUARIO_NAO_AUTORIZADO: 'Você não tem permissão para realizar esta ação',
  ERRO_AO_PROCESSAR: 'Erro ao processar candidatura. Tente novamente.',
}
