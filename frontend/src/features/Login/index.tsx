'use client'

import React, { useState } from "react";
// import { useRouter } from "next/router";
import { Header } from "./Header";
import Link from "next/link";
import { MainForm } from "./MainForm";
import { logarUsuario } from "@/app/api/login/route";

export default function Login() {
  // const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data: {email: string, senha: string}) => {
    setError("");
    setLoading(true);
    try {
      const response = await logarUsuario(data);
      const { token, user } = response;
      localStorage.setItem("authToken", token);
      localStorage.setItem("token", token); // legacy compat
      localStorage.setItem("user", JSON.stringify(user));

      if (user.emailVerificado === false) {
        // router.replace("/confirmacao");
        return;
      }

      // switch (user.tipo) {
      //   case "ESTUDANTE":
      //     router.replace("/aluno/dashboard");
      //     break;
      //   case "PROFESSOR":
      //     router.replace("/professor/dashboard");
      //     break;
      //   case "EMPRESA":
      //     router.replace("/empresa/dashboard");
      //     break;
      //   default:
      //     router.replace("/");
      // }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans text-slate-300 bg-gradient-to-b from-[#0c1a2c] to-[#15223c] min-h-screen flex items-center justify-center p-5 relative">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-lg p-8">
          <Header/>
          
          <MainForm
            onSubmit={handleSubmit}
            error={error}
            loading={loading}
          />
          {/* Card Footer Section */}
          <footer className="text-center mt-6 text-sm">
            <p>
              Não tem uma conta?{" "}
              <Link
                href={"/cadastro"}
                className="font-semibold text-blue-400 hover:text-white hover:underline transition-colors duration-300"
              >
                Crie uma agora
              </Link>
            </p>
          </footer>
        </div>
      </div>

      {/* Page Footer */}
      <footer className="absolute bottom-5 text-center text-xs text-slate-600 w-full">
        © Oportune — 2025 |{" "}
        <Link
          href={"/"}
          className="text-slate-600 hover:text-slate-400 hover:underline transition-colors duration-300"
        >
          Voltar para o início
        </Link>
      </footer>
    </div>
  );
}
