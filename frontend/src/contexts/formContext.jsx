import { createContext, useContext, useState } from "react";

const FormContext = createContext();
export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Informações pessoais",
      description: "Informações básicas",
    },
    { id: 2, title: "Informações adicionais", description: "Informações adicionais" },
    { id: 3, title: "Revisar informações", description: "Revisar informações" },
    // {id: 1, title: "Informações pessoais", description: "nformações básicas"}
  ];

  const value = { steps, currentStep };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
