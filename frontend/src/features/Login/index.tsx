"use client";

import React, { useState } from "react";
// import { useRouter } from "next/navigation";
import { AuthHeader } from "@/components/AuthHeaderForm";
import { MainForm } from "./MainForm";
import { logarUsuario } from "./api/loguser";
import { showMessage } from "@/adapters/showMessage";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

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

      showMessage.success("Login realizado com sucesso");

      if (user.emailVerificado === false) {
        // router.replace("/confirmacao"); Isso não funciona
        return;
      }

      switch (user.tipo) {
        case "ESTUDANTE":
          router.replace("/aluno/dashboard");
          break;
        case "PROFESSOR":
          router.replace("/professor/dashboard");
          break;
        case "EMPRESA":
          router.replace("/empresa/dashboard");
          break;
        default:
          router.replace("/");
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
    </>
  );
}
