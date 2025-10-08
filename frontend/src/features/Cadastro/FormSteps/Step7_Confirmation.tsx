/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { showMessage } from "@/adapters/showMessage";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Step7Props {
  userEmail: string;
}

export function Step7_Confirmation({ userEmail }: Step7Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleVerificationCheck = async () => {
    if (!userEmail) {
      showMessage.error(
        "Não foi possível identificar o seu e-mail para verificação."
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3001/api/auth/status/${userEmail}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Não foi possível verificar o status.");
      }

      if (data.isVerified) {
        showMessage.success("Conta verificada com sucesso!");
        router.replace("/login");
      } else {
        throw new Error(
          "Ainda não detectamos sua confirmação. Por favor, verifique seu e-mail e clique no link de ativação."
        );
      }
    } catch (error: any) {
      showMessage.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn text-center">
      <div className="w-16 h-16 mx-auto text-[#639bec]">
        <CheckIcon />
      </div>
      <h2 className="text-white text-xl font-bold mt-4 mb-2">
        Cadastro Realizado!
      </h2>
      <p className="text-[#c4d3e6] text-sm mb-6">
        Um e-mail de confirmação foi enviado para{" "}
        <strong className="text-white">{userEmail}</strong>. Verifique sua caixa
        de entrada para ativar a conta.
      </p>
      <Button
        onClick={handleVerificationCheck}
        disabled={isLoading}
        variant={"oportune"}
        className="w-full font-semibold transition-all hover:opacity-90 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#2474e4]/20 mt-2"
      >
        {isLoading
          ? showMessage.loading("Verificando...")
          : "Enviar email"}
      </Button>
    </div>
  );
}
