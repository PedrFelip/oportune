import { z } from "zod";
import * as regex from "@/utils/validadores";
import informacoes from "@/utils/informacoes.json" with {type: "json"};

const cursoSchema = z.object({
  label: z.string(),
  value: z.string().nullable(),
});

const informacoesSchema = z.object({
  cursos: z.array(cursoSchema),
});

const informacoesValidadas = informacoesSchema.parse(informacoes);

const listaCursos: string[] = informacoesValidadas.cursos
  .map((c) => c.value)
  .filter((v) => v !== null && v !== null);

const dominiosEmailValidos = new Set([
  "gmail.com",
  "outlook.com",
  "yahoo.com",
  "icloud.com",
  "proton.me",
  "hotmail.com",
  "live.com",
  "aol.com",
  "edu.br",
  "usp.br",
  "univ.com",
  "company.com",
  "tech.co",
  "org.br",
  "gov.br",
]);

// FRASES DE ERRO
const FraseTelefoneInvalidoErro = "Número de telefone inválido";
const FraseErroEmail = "Email inválido";
const FraseComNumerosErro = "Nome inválido, use apenas letras!";
const FraseErroSenha =
  "A senha precisa de no minimo 8 caracteres, incluindo letras maiúsculas, minúsculas e números";

// ENUMS
const tipo = ["ESTUDANTE", "PROFESSOR", "EMPRESA"];
const genero = ["MASCULINO", "FEMININO", "OUTRO", "PREFIRO NAO DIZER"];
const periodo = ["MATUTINO", "VESPERTINO", "NOTURNO"];

const baseSchema = z.object({
  nome: z.string().regex(regex.onlyLettersRegex, FraseComNumerosErro),
  email: z.email({ message: FraseErroEmail }).refine(
    (email) => {
      const dominio = email.split("@")[1];
      return dominiosEmailValidos.has(dominio);
    },
    {
      message: "Dominio inválido, tente novamente com outro dominio!",
    }
  ),
  senha: z.string().regex(regex.passwordRegex, FraseErroSenha),
  senhaConfirmada: z.string(),
  tipo: z.enum(tipo),
  termos: z.boolean().refine((val) => val === true, {
    message: "Você precisa aceitar os termos.",
  }),
});

// ESTUDANTE FORMULÁRIO
const estudanteSchema = z.object({
  tipo: z.literal("ESTUDANTE"),
  telefone: z
    .string()
    .regex(regex.phoneRegex, FraseTelefoneInvalidoErro)
    .optional(),

  dataNascimento: z.string({
    message: "Por favor, insira uma data de nascimento válida.",
  }),

  genero: z.enum(genero, {
    message: "Selecione um gênero válido.",
  }),

  faculdade: z.string().optional(),

  curso: z.string().refine((v) => listaCursos.includes(v), {
    message: "Curso inválido",
  }),

  matricula: z
    .string({
      message: "A matrícula é obrigatória.",
    })
    .min(1, "A matrícula é obrigatória."),

  semestre: z.string({ message: "Semestre inválido" }),

  periodo: z.enum(periodo, {
    message: "Selecione um período válido.",
  }),
});

// PROFESSOR FORMULÁRIO
const professorSchema = z.object({
  tipo: z.literal("PROFESSOR"),
  telefone: z
    .string()
    .regex(regex.phoneRegex, FraseTelefoneInvalidoErro)
    .optional(),

  dataNascimento: z.string({
    message: "Data de nascimento inválida.",
  }),

  genero: z.enum(genero, {
    message: "Selecione um gênero válido.",
  }),

  areaAtuacao: z.string({
    message: "Área de atuação é obrigatória",
  }),

  departamento: z.string({
    message: "Departamento é obrigatório",
  }),

  titulacao: z.string({
    message: "Titulação é obrigatório",
  }),

  lattes: z.string().optional(),
});

// EMPRESA FORMULÁRIO
const empresaSchema = z.object({
  tipo: z.literal("EMPRESA"),
  nome: z.string(),

  cnpj: z.string(),
  ramo: z.string().regex(regex.onlyLettersRegex, FraseComNumerosErro),
  setor: z.string(),
  descricao: z.string().optional(),

  telefone: z
    .string()
    .regex(regex.phoneRegex, FraseTelefoneInvalidoErro)
    .optional(),

  emailContato: z.email({ message: FraseErroEmail }),
  website: z.httpUrl({ message: "Url inválida" }),
});

export const cadastroSchema = z.discriminatedUnion("tipo", [
  baseSchema.safeExtend(estudanteSchema.shape),
  baseSchema.safeExtend(empresaSchema.shape),
  baseSchema.safeExtend(professorSchema.shape),
]);

export type CadastroFormData = z.infer<typeof cadastroSchema>;
