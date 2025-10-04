
export type ProfileType = "ESTUDANTE" | "PROFESSOR" | "EMPRESA";

export interface FormStepProps {
  // controle de navegação
  onNext?: () => void;
  onBack?: () => void;

  // controle geral
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleSelectChange?: (name: string, selectedOption: string) => void;

  // dados
  formData?: FormData;
  setFormData?: React.Dispatch<React.SetStateAction<FormData>>;
  profileType?: ProfileType | "";

  // usado na primeira etapa
  onProfileSelect?: (type: ProfileType) => void;

  // usado na última etapa
  handleFinish?: () => void;
}