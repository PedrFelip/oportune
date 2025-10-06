"use client";

import React, { useState } from "react";
// Steps do formulário
import { Step1_ProfileSection } from "./FormSteps/Step1_ProfileSection";
import { Step2_BasicInfo } from "./FormSteps/Step2_BasicInfo";
import { Step3_AditionalInfo } from "./FormSteps/Step3_AditionalInfo";
import { Step4_ProfileDetails } from "./FormSteps/Step4_ProfileDetails";
import { Step5_Socialmedia } from "./FormSteps/Step5_Socialmedia";
import { Step6_Final } from "./FormSteps/Step6_Final";
import { Step7_Confirmation } from "./FormSteps/Step7_Confirmation";
// -----
// import { cadastrarUsuario } from "../../api/api";
import { showMessage } from "@/adapters/showMessage";
import { ProfileType } from "./@types/type";
import { CadastroFormData, cadastroSchema } from "@/lib/schemas";
import { FieldErrors, Path, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cadastrarUsuario } from "@/app/api/cadastro/route";

export default function Cadastro() {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileType, setProfileType] = useState<ProfileType | "">(""); // Aluno ou Professor ou Empresa
  const [emailCadastro, setEmailCadastro] = useState("");
  const isEmpresa = profileType === "EMPRESA";

  const {
    register,
    handleSubmit,
    trigger,
    control,
    setValue,
    getValues,
    setError,
    watch,
    formState: { errors },
  } = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroSchema),
    mode: "onTouched",
  });

  const onValidationError = (errors: FieldErrors<CadastroFormData>) => {
    // Pega o primeiro campo que deu erro
    const firstErrorField = Object.keys(errors)[0] as keyof CadastroFormData;

    if (firstErrorField) {
      // Pega a mensagem de erro desse campo
      const errorMessage = errors[firstErrorField]?.message;
      if (errorMessage) {
        showMessage.error(errorMessage);
      }
    }
  };

  const handleProfileSelect = (type: ProfileType) => {
    // Seleciona o formulário com base no perfil escolhido
    setProfileType(type);
    setValue("tipo", type);
    setCurrentStep(2);
  };

  const handleNext = async () => {
    let fieldsToValidate: Path<CadastroFormData>[] = [];

    if (currentStep === 2) {
      fieldsToValidate = [
        "nome",
        "email",
        "senha",
        "senhaConfirmada",
        "termos",
      ];
    }

    if (currentStep === 3) {
      fieldsToValidate = ["dataNascimento", "genero", "telefone"];
    }

    if (currentStep === 4) {
      if (profileType === "ESTUDANTE") {
        fieldsToValidate = ["curso", "semestre", "matricula", "periodo"];
      }
      if (profileType === "PROFESSOR") {
        fieldsToValidate = [
          "areaAtuacao",
          "departamento",
          "titulacao",
          "lattes",
        ];
      }
      if (profileType === "EMPRESA") {
        fieldsToValidate = ["cnpj", "ramo", "setor", "descricao"];
      }
    }

    if (currentStep === 5) {
      fieldsToValidate = ["emailContato", "telefone", "website"];
    }

    if (currentStep === 2) {
      const { senha, senhaConfirmada } = getValues();

      if (senha !== senhaConfirmada) {
        setError("senhaConfirmada", {
          type: "manual",
          message: "As senhas não conferem.",
        });
        showMessage.error("As senhas não conferem");
        return;
      }
    }

    if (fieldsToValidate.length > 0) {
      const isValid = await trigger(fieldsToValidate);
      if (!isValid) {
        onValidationError(errors);
        return;
      }
    }

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
  const onSubmit: SubmitHandler<CadastroFormData> = async (data) => {
    showMessage.loading("Enviando os dados");

    try {
      await cadastrarUsuario(data);

      setEmailCadastro(data.email);
      showMessage.dismiss();
      showMessage.success(
        "Conta criada com sucesso! Agora realize a confirmação por email"
      );

      setCurrentStep(7);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showMessage.dismiss();
      showMessage.error(err.message || "Erro ao criar conta");
    }
  };

  const renderStep = () => {
    const commonProps = {
      register,
      errors,
      control,
      profileType,
      getValues,
      setValue,
      onNext: handleNext,
      onBack: handleBack,
      watch
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
        return <Step6_Final {...commonProps} />;
      case 7:
        return <Step7_Confirmation userEmail={emailCadastro} />;
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
          <form onSubmit={handleSubmit(onSubmit, onValidationError)}>
            {renderStep()}
          </form>
        </div>
      </div>
    </div>
  );
}
