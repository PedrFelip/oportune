import React, { useState } from "react";
import Step1_ProfileSection from "../../components/formSteps/Step1_ProfileSection";
import Step2_BasicInfo from "../../components/formSteps/Step2_BasicInfo";
import Step3_ProfileDetails from "../../components/formSteps/Step3_ProfileDetails";
import Step4_Confirmation from "../../components/formSteps/Step4_Confirmation";

export default function Cadastro() {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileType, setProfileType] = useState(""); // Aluno ou Professor ou Empresa
  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState({});

  const handleProfileSelect = (type) => {
    // Seleciona o formulário com base no perfil escolhido
    setProfileType(type);
    setCurrentStep(2);
  };

  const handleNext = (data = {}) => {
    // Avança
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    // Retrocede
    setCurrentStep((prev) => prev - 1);
  };

  const handleFinish = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(4);
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
          />
        );
      case 3:
        return (
          <Step3_ProfileDetails
            profileType={profileType}
            onFinish={handleFinish}
            onBack={handleBack}
          />
        );
      case 4:
        return <Step4_Confirmation />;
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
