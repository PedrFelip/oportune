// Em src/lib/schemas.ts

import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
// Ajustei a regex para aceitar acentos e "ç", comuns em nomes brasileiros.
const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/;

export const cadastroSchema = z
  .object({
    tipo: z.enum(["ESTUDANTE", "EMPRESA", "PROFESSOR"]),
    nome: z
      .string()
      .min(3, "O nome precisa ter no mínimo 3 caracteres.")
      .regex(nameRegex, "O nome deve conter apenas letras e espaços."),
    email: z.email("Formato de e-mail inválido."),
    senha: z
      .string()
      .min(8, "A senha precisa ter no mínimo 8 caracteres.")
      .regex(
        passwordRegex,
        "A senha precisa conter letras maiúsculas, minúsculas e números."
      ),
    senhaConfirmada: z.string(),

    termos: z.boolean().refine((val) => val === true, {
      message: "Você precisa aceitar os termos para continuar.",
    }),
  })
  .refine((data) => data.senha === data.senhaConfirmada, {
    message: "As senhas não conferem.",
    path: ["senhaConfirmada"],
  });

export type CadastroFormData = z.infer<typeof cadastroSchema>;
