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

// @types/type.ts
export interface FormStepProps {
  onNext?: () => void;
  onBack?: () => void;

  formData?: formDataState;
  setFormData?: React.Dispatch<React.SetStateAction<formDataState>>;

  profileType?: ProfileType | "";

  onProfileSelect?: (type: ProfileType) => void;

  handleChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleSelectChange?: <K extends keyof formDataState>(
    name: K,
    selectedOption: formDataState[K]
  ) => void;

  handleFinish?: () => void;
}

export interface formDataState {
  nome: string;
  email: string;
  senha: string;
  senhaConfirmada: string;
  termos: boolean;
  dataNascimento: Date,
  genero: GeneroType
}
