import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { confirmarEmail } from "../../api/api"; // Importa a função da API

export default function Confirmacao() {
  const [status, setStatus] = useState("verifying"); // 'verifying', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      // Mostra um feedback visual de carregamento
      Swal.fire({
        title: "Verificando...",
        text: "Aguarde um momento, estamos confirmando seu e-mail.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      confirmarEmail(token)
        .then(() => {
          setStatus("success");
          Swal.fire({
            title: "Sucesso!",
            text: "Seu e-mail foi confirmado. Você já pode fazer login.",
            icon: "success",
            confirmButtonText: "Ir para Login",
            confirmButtonColor: "#2474e4",
          }).then(() => {
            navigate("/login");
          });
        })
        .catch((error) => {
          setStatus("error");
          const message =
            error.message || "Não foi possível verificar seu e-mail.";
          setErrorMessage(message);
          Swal.fire({
            title: "Erro!",
            text: message,
            icon: "error",
            confirmButtonText: "Tentar Novamente",
            confirmButtonColor: "#e53e3e",
          });
        });
    } else {
      setStatus("error");
      const message = "Token de confirmação não encontrado na URL.";
      setErrorMessage(message);
      Swal.fire({
        title: "Erro!",
        text: message,
        icon: "error",
        confirmButtonText: "Voltar",
        confirmButtonColor: "#e53e3e",
      });
    }
  }, [location, navigate]);

  // Renderiza a UI com base no estado
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c1a2c] to-[#15223c] flex items-center justify-center p-4 font-['Inter',_sans-serif] text-[#c4d3e6]">
      <div className="w-full max-w-md text-center">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/5 backdrop-blur-xl">
          {status === "verifying" && (
            <>
              <h1 className="text-2xl font-bold text-white mb-4">
                Verificando seu e-mail...
              </h1>
              <p>Por favor, aguarde um momento.</p>
            </>
          )}
          {status === "success" && (
            <>
              <h1 className="text-2xl font-bold text-white mb-4">
                E-mail confirmado com sucesso!
              </h1>
              <p className="mb-6">Você já pode acessar sua conta.</p>
              <Link to="/login">
                <button className="w-full bg-gradient-to-r from-[#2474e4] to-[#639bec] text-white font-semibold py-3.5 rounded-lg">
                  Ir para Login
                </button>
              </Link>
            </>
          )}
          {status === "error" && (
            <>
              <h1 className="text-2xl font-bold text-red-400 mb-4">
                Ocorreu um erro
              </h1>
              <p className="mb-6">{errorMessage}</p>
              <Link to="/login">
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3.5 rounded-lg">
                  Ir para Login
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
