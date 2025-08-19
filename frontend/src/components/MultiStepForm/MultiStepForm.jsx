import React from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useFormContext } from "../../contexts/formContext";
import { stepIcons } from "../../utils/Icon";
import PersonalInfoStep from "./PersonalInfoStep";
import AditionalInformationsStep from "./AditionInformationsStep";
import ReviewStep from "./ReviewStep";

export default function MultiStepForm() {
  const { steps, currentStep } = useFormContext();

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep />;
      case 2:
        return <AditionalInformationsStep />;
      case 3:
        return <ReviewStep />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => {
            const Icon = stepIcons[step.id];
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <div className="flex items-center" key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-16 h-16 rounded-2xl transition-all duration-500 transform ${
                      isCompleted
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 border-green-500 text-white shadow scale-110"
                        : isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-600 text-white shadow-lg scale-110"
                        : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-8 h-8" />
                    ) : (
                      <Icon className="w-8 h-8" />
                    )}
                  </div>
                  <div className="mt-4 text-center">
                    <p
                      className={`text-sm font-bold ${
                        isActive
                          ? "text-blue-600"
                          : isCompleted
                          ? "text-green-500"
                          : "text-gray-400"
                      }`}
                    >
                      Passo {step.id}
                    </p>
                    <p
                      className={`text-xs font-bold ${
                        isActive
                          ? "text-blue-600"
                          : isCompleted
                          ? "text-green-500"
                          : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p
                      className={`text-sm font-bold ${
                        isActive
                          ? "text-blue-600"
                          : isCompleted
                          ? "text-green-500"
                          : "text-gray-400"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`hidden md:block w-50 h-1 mx-6 rounded-full transition-all duration-500 ${
                      currentStep > step.id
                        ? "bg-gradient-to-r from-green-500 to-emerald-600"
                        : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Barra de progresso Mobile */}
        <div className="md:hidden">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-black text-gray-700">
              Passo {currentStep} de {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {steps[currentStep - 1].title}
            </span>
          </div>
          {/* Barra de Progresso */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-700"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Formulário */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 p-10 mb-10">
        <div className="min-h[600]">{renderStepContent()}</div>
      </div>

      {/* Botões de Navegação */}
      <div className="flex justify-between items-center text-white">
        <button
          className={`flex items-center px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-200 ${
            currentStep === 1
              ? "bg-gray-100 text-black cursor-not-allowed"
              : "bg-red-800 hover:bg-red-500 shadow-lg hover:shadow-xl border border-gray-200 transform hover:-translate-y-1 cursor-pointer"
          }`}
          onClick={() => {}}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Voltar Passo
        </button>

        {currentStep < steps.length ? (
          <button className="flex items-center px-8 py-4 rounded-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer">
            <ChevronRight className="w-5 h-5 mr-2" />
            Próximo Passo
          </button>
        ) : (
          <button className="flex items-center px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:translate-y-1">
            Criar conta
          </button>
        )}
      </div>
    </div>
  );
}
