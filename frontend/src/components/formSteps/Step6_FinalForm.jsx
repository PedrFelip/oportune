import React from "react";
import CheckIcon from "../cadastro/CheckIcon";

export default function Step_FinalForm({ handleFinish }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    handleFinish();
  };

  return (
    <div className="animate-fadeIn text-center">
      <div className="w-16 h-16 mx-auto text-[#639bec]">
        <CheckIcon />
      </div>
      <h2 className="text-white text-xl font-bold mt-4 mb-2">
        Fim do Formulário
      </h2>
      <form onSubmit={handleSubmit}>
        <button
          className="w-full bg-gradient-to-r from-[#2474e4] to-[#639bec] text-white font-semibold py-3.5 rounded-lg transition-all hover:opacity-90 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#2474e4]/20"
          type="submit"
        >
          Enviar os dados
        </button>
      </form>
    </div>
  );
}
