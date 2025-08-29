import z, { number } from "zod";
import * as regex from "../utils/validators.ts";

const FraseTelefoneInvalidoErro = "Número de telefone inválido";
const FraseErroEmail = "Email inválido";
const FraseComNumerosErro = "Nome inválido, use apenas letras!";
const FraseErroSenha =
  "A senha precisa de no minimo 8 caracteres, incluindo letras maiúsculas, minúsculas e números";

// Campos comuns a todos os usuários

const baseUser = z.object({
  nome: z.string().regex(regex.onlyLettersRegex, FraseComNumerosErro),
  email: z.email({ message: FraseErroEmail }),
  senha: z.string().regex(regex.passwordRegex, FraseErroSenha),
  senhaConfirmada: z.string(),
  tipo: z.enum(["ESTUDANTE", "PROFESSOR", "EMPRESA"]),
  termos: z.boolean(),
});

// Campos especificos para cada tipo
const estudanteSchema = z.object({
  tipo: z.literal("ESTUDANTE"),
  telefone: z
    .string()
    .regex(regex.phoneRegex, FraseTelefoneInvalidoErro)
    .optional(),

  dataNascimento: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date()
  ),
  genero: z.enum(["MASCULINO", "FEMININO", "OUTRO", "PREFIRO NAO DIZER"]).optional(),
  faculdade: z.string().optional(),
  curso: z.string().regex(regex.onlyLettersRegex, FraseComNumerosErro),
  matricula: z.string(),
  semestre: z.coerce.number().min(1).max(12),
  periodo: z.enum(["MATUTINO", "VESPERTINO", "NOTURNO"]).optional(),
  dataFormatura: z
    .preprocess(
      (arg) => (typeof arg === "string" ? new Date(arg) : arg),
      z.date()
    )
    .optional(),
});

const professorSchema = z.object({
  tipo: z.literal("PROFESSOR"),
  telefone: z
    .string()
    .regex(regex.phoneRegex, FraseTelefoneInvalidoErro)
    .optional(),

  dataNascimento: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date()
  ),
  genero: z.enum(["MASCULINO", "FEMININO", "OUTRO", "PREFIRO NAO DIZER"]),

  areasInteresse: z.array(z.string()).optional(),

  areaAtuacao: z.string(),
  departamento: z.string(),
  titulacao: z.string(),
  lattes: z.string(),
});

const empresaSchema = z.object({
  tipo: z.literal("EMPRESA"),
  nomeFantasia: z.string(),

  cnpj: z.string(),
  ramo: z.string().regex(regex.onlyLettersRegex, FraseComNumerosErro),
  setor: z.string(),
  descricao: z.string().optional(),

  //   endereco: z.string().optional(), Pode ser extraido com CNPJ
  telefone: z
    .string()
    .regex(regex.phoneRegex, FraseTelefoneInvalidoErro)
    .optional(),

  emailContato: z.email({ message: FraseErroEmail }),
  website: z.httpUrl({ message: "Url inválida" }),
});

// Union discriminado
export const createUserSchema = z
  .discriminatedUnion("tipo", [
    baseUser.extend(estudanteSchema.shape),
    baseUser.extend(professorSchema.shape),
    baseUser.extend(empresaSchema.shape),
  ])
  .refine((data) => data.senha === data.senhaConfirmada, {
    message: "As senhas não conferem.",
    path: ["senhaConfirmada"],
  });

export type createUserDTO = z.infer<typeof createUserSchema>;

export const createUserCleanSchema = createUserSchema.transform((data) => {
  const { senhaConfirmada, termos, ...rest } = data;
  return rest;
});

export type createUserCleanDTO = z.infer<typeof createUserCleanSchema>;

export const logUserSchema = z.object({
  email: z.email({ message: FraseErroEmail }),
  senha: z.string().regex(regex.passwordRegex, FraseErroSenha),
});

export type loginUserDTO = z.infer<typeof logUserSchema>;
