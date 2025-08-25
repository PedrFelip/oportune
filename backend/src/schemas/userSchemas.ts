import z from "zod";
import * as regex from "../utils/validators.ts";

const FraseErroEmail = "Email inválido";
const FraseErroNome = "Nome inválido, use apenas letras!";
const FraseErroSenha =
  "A senha precisa de no minimo 8 caracteres, incluindo letras maiúsculas, minúsculas e números";

// Campos comuns a todos os usuários
const baseUser = z.object({
  name: z.string().regex(regex.onlyLettersRegex, FraseErroNome),
  email: z.string().email({ message: FraseErroEmail }),
  senha: z.string().regex(regex.passwordRegex, FraseErroSenha),
  tipo: z.enum(["ESTUDANTE", "PROFESSOR", "EMPRESA"]),
});

// Campos específicos de cada tipo
const estudanteSchema = z.object({
  tipo: z.literal("ESTUDANTE"),
  nomeCompleto: z.string(),
  matricula: z.string(),
  curso: z.string(),
  semestreAtual: z.number().int(),
  periodoAtual: z.enum(["MATUTINO", "VESPERTINO", "NOTURNO"]),
  faculdade: z.string().optional(),
  phone: z.string().optional(),
});

const professorSchema = z.object({
  tipo: z.literal("PROFESSOR"),
  nomeCompleto: z.string(),
  areaAtuacao: z.string(),
  areasInteresse: z.array(z.string()),
  phone: z.string().optional(),
});

const empresaSchema = z.object({
  tipo: z.literal("EMPRESA"),
  nomeFantasia: z.string(),
  cnpj: z.string(),
  endereco: z.string().optional(),
  site: z.string().optional(),
  descricao: z.string().optional(),
  phone: z.string().optional(),
});

export const createUserSchema = z.discriminatedUnion("tipo", [
  baseUser.extend(estudanteSchema.shape),
  baseUser.extend(professorSchema.shape),
  baseUser.extend(empresaSchema.shape),
]);
