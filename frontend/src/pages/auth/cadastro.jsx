import React, { useState } from "react";
import Step1_ProfileSection from "../../components/formSteps/Step1_ProfileSection";
import Step2_BasicInfo from "../../components/formSteps/Step2_BasicInfo";
import Step3_AditionalInfo from "../../components/formSteps/Step3_AditionalInfo";
import Step4_ProfileDetails from "../../components/formSteps/Step4_ProfileDetails";
import Step5_Socialmedia from "../../components/formSteps/Step5_Socialmedia";
import Step6_FinalForm from "../../components/formSteps/Step6_FinalForm";
import Step7_Confirmation from "../../components/formSteps/Step7_Confirmation";

export default function Cadastro() {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileType, setProfileType] = useState(""); // Aluno ou Professor ou Empresa
  const [formData, setFormData] = useState({});

  const handleProfileSelect = (type) => {
    // Seleciona o formulário com base no perfil escolhido
    setProfileType(type);

    setFormData((prev) => ({
      ...prev,
      tipo: type,
    }));

    setCurrentStep(2);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOption,
    }));
  };

  const handleNext = () => {
    // Avança
    setCurrentStep((prev) => {
      if (prev === 2 && profileType === "empresa") {
        return 4; // Pula o passo 3 que só tem o formulário para pessoas fisicas
      }
      if (prev === 4 && profileType !== "empresa") {
        return 6; // Pula o passo 5 que só tem o formulário para empresas
      }
      return prev + 1;
    });
  };

  const handleBack = () => {
    // Retrocede
    setCurrentStep((prev) => {
      if (prev === 4 && profileType === "empresa") {
        return 2; // Pula o passo 3 que só tem o formulário para pessoas fisicas
      }
      if (prev === 6 && profileType !== "empresa") {
        return 4; // Pula o passo 5 que só tem o formulário para empresas
      }

      return prev - 1;
    });
  };

  // Finaliza o formulário e envia os dados
  const handleFinish = () => {
    // Fazer a chamada da API com o 'formData'
    setCurrentStep(7);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1_ProfileSection onProfileSelect={handleProfileSelect} />;
      case 2:
        return (
          <Step2_BasicInfo
            profileType={profileType}
            onNext={handleNext}
            onBack={handleBack}
            handleChange={handleChange}
            formData={formData}
          />
        );
      case 3: // Somente para pessoas fisicas
        return (
          <Step3_AditionalInfo
            onNext={handleNext}
            onBack={handleBack}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            formData={formData}
          />
        );
      case 4:
        return (
          <Step4_ProfileDetails
            profileType={profileType}
            onNext={handleNext}
            onBack={handleBack}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            formData={formData}
          />
        );
      case 5: // Somente para empresas
        
        return (
          <Step5_Socialmedia
            onNext={handleNext}
            onBack={handleBack}
            handleChange={handleChange}
            formData={formData}
          />
        );
      case 6:
        return (
          <Step6_FinalForm
            onBack={handleBack}
            handleFinish={handleFinish}
            formData={formData}
          />
        );

      case 7:
        return <Step7_Confirmation />;
      default:
        return <Step1_ProfileSection onProfileSelect={handleProfileSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c1a2c] to-[#15223c] flex items-center justify-center p-4 font-['Inter',_sans-serif] text-[#c4d3e6]">
      <div className="w-full max-w-md">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/5 backdrop-blur-xl">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
