import z from "zod";
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
  tipo: z.enum(["ESTUDANTE", "PROFESSOR", "EMPRESA"]),
});

// Campos específicos de cada tipo
const estudanteSchema = z.object({
  tipo: z.literal("ESTUDANTE"),
  phone: z
    .string()
    .regex(regex.phoneRegex, FraseTelefoneInvalidoErro)
    .optional(),

  dataNascimento: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date()
  ),
  genero: z.enum(["MASCULINO", "FEMININO", "OUTRO", "PREFIRO NAO DIZER"]),

  faculdade: z.string().optional(),
  curso: z.string().regex(regex.onlyLettersRegex, FraseComNumerosErro),
  matricula: z.string(),
  semestreAtual: z.number().int(),
  periodoAtual: z.enum(["MATUTINO", "VESPERTINO", "NOTURNO"]),
  dataFormatura: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date()
  ),
});

const professorSchema = z.object({
  tipo: z.literal("PROFESSOR"),
  phone: z
    .string()
    .regex(regex.phoneRegex, FraseTelefoneInvalidoErro)
    .optional(),

  dataNascimento: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date()
  ),
  genero: z.enum(["MASCULINO", "FEMININO", "OUTRO", "PREFIRO NAO DIZER"]),

  areasInteresse: z.array(z.string()),

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
  phone: z
    .string()
    .regex(regex.phoneRegex, FraseTelefoneInvalidoErro)
    .optional(),

  emailContato: z.email({ message: FraseErroEmail }),
});

// Union discriminado
export const createUserSchema = z.discriminatedUnion("tipo", [
  baseUser.extend(estudanteSchema.shape),
  baseUser.extend(professorSchema.shape),
  baseUser.extend(empresaSchema.shape),
]);
