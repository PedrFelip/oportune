import React from "react";
import CheckIcon from "../cadastro/CheckIcon";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Step7_Confirmation() {
  const navigate = useNavigate();

  const handleRedirectWithSwal = () => {
    Swal.fire({
      title: "Sucesso",
      text: "Conta verificada com sucesso! Redirecionando para login",
      icon: "success",
      confirmButtonText: "Ir para login",

      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,

      willClose: () => {
        navigate("/login");
      },
    });
  };

  return (
    <div className="animate-fadeIn text-center">
      <div className="w-16 h-16 mx-auto text-[#639bec]">
        <CheckIcon />
      </div>
      <h2 className="text-white text-xl font-bold mt-4 mb-2">
        Cadastro realizado com sucesso!
      </h2>
      <p className="text-[#c4d3e6] text-sm mb-6">
        Enviamos um e-mail de confirmação para você. Por favor, verifique a sua
        caixa de entrada para ativar a sua conta.
      </p>
      <button
        onClick={handleRedirectWithSwal} // Função para verificar se a verificação ocorreu mesmo
        className="w-full bg-gradient-to-r from-[#2474e4] to-[#639bec] text-white font-semibold py-3.5 rounded-lg transition-all hover:opacity-90 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#2474e4]/20"
      >
        Confirmei o email
      </button>
    </div>
  );
}
