import { UseFormRegister, FieldErrors, Control } from "react-hook-form";
import { CadastroFormData } from "@/lib/schemas";


export type ProfileType = "ESTUDANTE" | "PROFESSOR" | "EMPRESA";

export type PeriodoType = "MATUTINO" | "VESPERTINO" | "NOTURNO" | null;
export type GeneroType =
  | "MASCULINO"
  | "FEMININO"
  | "OUTRO"
  | "PREFIRO NAO DIZER"
  | null;
export type CursoType =
  | "administracao"
  | "analise_desenvolvimento_sistemas"
  | "arquitetura_urbanismo"
  | "ciencia_computacao"
  | "ciencias_contabeis"
  | "direito"
  | "educacao_fisica"
  | "enfermagem"
  | "biomedicina"
  | "farmacia"
  | "gestao_empresarial"
  | "gestao_financeira"
  | "marketing_gestao_clientes"
  | "saude_publica"
  | "seguranca_informacao"
  | "tecnologias_educacao_distancia"
  | "marketing_digital_ciencia_dados"
  | "processos_gerenciais"
  | "terapia_ocupacional"
  | null;

export type ModalidadeType = "presencial" | "hibrido" | "remoto" | null;

export interface StepProps {
  // Funções para registrar os campos do formulário
  register: UseFormRegister<CadastroFormData>;
  // Objeto com todos os erros de validação
  errors: FieldErrors<CadastroFormData>;
  // Objeto de controle para usar com componentes customizados (ex: react-select)
  control: Control<CadastroFormData>;
  
  // Funções de navegação, que continuam sendo controladas pelo pai
  onNext: () => void;
  onBack: () => void;
  
  // Prop opcional para lógicas condicionais dentro do step
  profileType?: ProfileType | "";
}