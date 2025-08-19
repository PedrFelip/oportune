import React from "react";
import { User } from "lucide-react";
import FormInput from "../Inputs/FormInput";

export default function PersonalInfoStep() {
  const styleInput =
    "w-full px-3 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm";
  const styleLabel = "text-md block font-semibold text-gray-700 mb-3";

  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
          <User className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-3">
          Informações Pessoais
        </h2>
        {/* <p className="text-gray-600 text-lg">
          Digite suas informações pessoais para criar a conta
        </p> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormInput
          label={"Nome completo"}
          classNameLabel={styleLabel}
          iconrequired={"*"}
          type={"text"}
          required={true}
          placeholder={"Digite seu nome"}
          classNameInput={styleInput}
        />
        {/* <div className="absolute -bottom-6 left-0 items-center text-red-50 text-sm">Por favor digite seu nome completo</div> */}
        <FormInput
          label={"Email"}
          classNameLabel={"text-md block font-semibold text-gray-700 mb-3"}
          iconrequired={"*"}
          type={"email"}
          required={true}
          placeholder={"Digite seu email"}
          classNameInput={styleInput}
        />
        {/* <div className="absolute -bottom-6 left-0 items-center text-red-50 text-sm">Por favor digite seu email</div> */}
      </div>
    </div>
  );
}
