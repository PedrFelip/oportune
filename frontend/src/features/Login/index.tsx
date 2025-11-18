"use client";

import React, { useState } from "react";
// import { useRouter } from "next/navigation";
import { AuthHeader } from "@/components/AuthHeaderForm";
import { MainForm } from "./MainForm";
import { logarUsuario } from "./api/loguser";
import { showMessage } from "@/adapters/showMessage";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { salveTokenCookie } from "./salvarCookies";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data: { email: string; senha: string }) => {
    setError("");
    setLoading(true);
    try {
      const response = await logarUsuario(data);
      const { token, user } = response;

      login(token, user);
      salveTokenCookie(token);

      if (user.emailVerificado === false) {
        // router.replace("/confirmacao"); Isso não funciona
        showMessage.error("Por favor, verifique seu email antes de continuar.");
        return;
      }

      showMessage.success("Login realizado com sucesso");

      if (user.tipo === "ESTUDANTE") {
        router.replace("/aluno/dashboard");
        return;
      } else if (user.tipo === "PROFESSOR") {
        router.replace("/professor/dashboard");
        return;
      } else {
        router.push("/empresa/dashboard");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login");
      showMessage.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthHeader
        title="Acesse sua conta"
        description="Bem-vindo de volta! Insira seus dados."
      />
      <MainForm onSubmit={handleSubmit} error={error} loading={loading} />
      <footer className="mt-4">
        <p className="text-gray-400 text-sm text-center">
          Ainda não tem uma conta?{" "}
          <Link href={"/cadastro"} className="text-blue-400 hover:underline">
            Crie agora
          </Link>
        </p>
      </footer>
    </>
  );
}
