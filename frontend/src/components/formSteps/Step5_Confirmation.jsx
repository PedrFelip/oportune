import React from "react";
import CheckIcon from "../cadastro/CheckIcon";

export default function Step4_Confirmation() {
  return (
    <div className="animate-fadeIn text-center">
      <div className="w-16 h-16 mx-auto text-[#639bec]">
        <CheckIcon />
      </div>
      <h2 className="text-white text-xl font-bold mt-4 mb-2">
        Cadastro realizado com sucesso!
      </h2>
      <p className="text-[#c4d3e6] text-sm mb-6">
        Enviámos um e-mail de confirmação para si. Por favor, verifique a sua
        caixa de entrada para ativar a sua conta.
      </p>
      <button
        onClick={() => alert("Redirecionando para o painel...")}
        className="w-full bg-gradient-to-r from-[#2474e4] to-[#639bec] text-white font-semibold py-3.5 rounded-lg transition-all hover:opacity-90 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#2474e4]/20"
      >
        Ir para o meu Painel
      </button>
    </div>
  );
}
