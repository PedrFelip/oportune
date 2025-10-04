"use client";

import React, { ChangeEvent, useState } from "react";
// Steps do formulário
import Step1_ProfileSection from "./FormSteps/Step1_ProfileSection";
// import Step2_BasicInfo from "../../components/formSteps/Step2_BasicInfo";
// import Step3_AditionalInfo from "../../components/formSteps/Step3_AditionalInfo";
// import Step4_ProfileDetails from "../../components/formSteps/Step4_ProfileDetails";
// import Step5_Socialmedia from "../../components/formSteps/Step5_Socialmedia";
// import Step6_FinalForm from "../../components/formSteps/Step6_FinalForm";
// import Step7_Confirmation from "../../components/formSteps/Step7_Confirmation";
// -----
// import { cadastrarUsuario } from "../../api/api";
import { showMessage } from "@/adapters/showMessage";
import { formDataState, ProfileType } from "./@types/type";
import Step2_BasicInfo from "./FormSteps/Step2_BasicInfo";
import { CadastroFormData, cadastroSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const initialState: formDataState = {
  nome: "",
  email: "",
  senha: "",
  senhaConfirmada: "",
  termos: false,
  dataNascimento: undefined,
  genero: null,
};

export default function Cadastro() {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileType, setProfileType] = useState<ProfileType | "">(""); // Aluno ou Professor ou Empresa
  const isEmpresa = profileType === "EMPRESA";

  const {
    register,
    handleSubmit,
    trigger,
    control,
    setValue,
    formState: { errors },
  } = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroSchema),
    mode: "onTouched",
  });

  const handleProfileSelect = (type: ProfileType) => {
    // Seleciona o formulário com base no perfil escolhido
    setProfileType(type);
    setValue("tipo", type)
    setCurrentStep(2);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSelectChange = (name: string, selectedOption: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOption, // Tratado
    }));
  };

  const handleNext = () => {
    // Avança
    setCurrentStep((prev) => {
      if (prev === 2 && isEmpresa) {
        return 4; // Pula o passo 3 que só tem o formulário para pessoas fisicas
      }
      if (prev === 4 && !isEmpresa) {
        return 6; // Pula o passo 5 que só tem o formulário para empresas
      }
      return prev + 1;
    });
  };

  const handleBack = () => {
    // Retrocede
    setCurrentStep((prev) => {
      if (prev === 4 && isEmpresa) {
        return 2; // Pula o passo 3 que só tem o formulário para pessoas fisicas
      }
      if (prev === 6 && !isEmpresa) {
        return 4; // Pula o passo 5 que só tem o formulário para empresas
      }

      return prev - 1;
    });
  };

  // Finaliza o formulário e envia os dados
  const handleFinish = async () => {
    showMessage.loading("Enviando os dados");

    try {
      await cadastrarUsuario(formData);

      showMessage.dismiss();
      showMessage.success(
        "Conta criada com sucesso! Agora realize a confirmação por email"
      );

      setFormData({});
      setProfileType("");
      setCurrentStep(7);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showMessage.dismiss();
      showMessage.error(err.message || "Erro ao criar conta");
    }
  };

  const renderStep = () => {
    const commonProps = {
      formData,
      setFormData,
      handleChange,
      handleSelectChange,
      profileType,
      onNext: handleNext,
      onBack: handleBack,
      handleFinish,
    };

    switch (currentStep) {
      case 1:
        return (
          <Step1_ProfileSection
            {...commonProps}
            onProfileSelect={handleProfileSelect}
          />
        );
      case 2:
        return <Step2_BasicInfo {...commonProps} />;
      case 3:
        return <Step3_AditionalInfo {...commonProps} />;
      case 4:
        return <Step4_ProfileDetails {...commonProps} />;
      case 5:
        return <Step5_Socialmedia {...commonProps} />;
      case 6:
        return <Step6_FinalForm {...commonProps} />;
      case 7:
        return <Step7_Confirmation {...commonProps} />;
      default:
        return (
          <Step1_ProfileSection
            {...commonProps}
            onProfileSelect={handleProfileSelect}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c1a2c] to-[#15223c] flex items-center justify-center p-4 font-['Inter',_sans-serif] text-[#c4d3e6]">
      <div className="w-full max-w-md">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/5 backdrop-blur-xl">
          <form onSubmit={handleFinish(onSubmit)}>{renderStep()}</form>
        </div>
      </div>
    </div>
  );
}
