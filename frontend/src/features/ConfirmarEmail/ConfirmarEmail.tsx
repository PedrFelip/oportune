"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { confirmarEmail } from "./api/confirmarEmail";
import { Button } from "@/components/ui/button";
import { AuthHeader } from "@/components/AuthHeaderForm";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

type ConfirmarEmailProps = {
  token: string;
};

type StatusType = "verifying" | "success" | "error";

export function ConfirmarEmail({ token }: ConfirmarEmailProps) {
  const [status, setStatus] = useState<StatusType>("verifying");
  const [mensagem, setMensagem] = useState("");
  const router = useRouter();

  useEffect(() => {
    const confirmar = async () => {
      if (!token) {
        setStatus("error");
        setMensagem("Token de confirmação não encontrado na URL.");
        return;
      }

      try {
        const response = await confirmarEmail(token);
        setStatus("success");
        setMensagem(response.message || "Seu e-mail foi confirmado. Você já pode fazer login.");
      } catch (error: any) {
        setStatus("error");
        setMensagem(
          error.message || "Não foi possível confirmar o email. O link pode ter expirado."
        );
      }
    };

    confirmar();
  }, [token]);

  return (
    <div className="space-y-6">
      <AuthHeader
        title="Confirme seu e-mail"
        description="Estamos verificando seu link para ativar a conta."
      />

      {status === "verifying" && (
        <div className="flex flex-col items-center gap-3 text-slate-200">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-sm text-center">
            Verificando as informações, aguarde alguns instantes…
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col items-center gap-4 text-slate-200">
          <CheckCircle2 className="h-10 w-10 text-emerald-400" />
          <p className="text-sm text-center">{mensagem}</p>
          <Button
            type="button"
            className="w-full"
            variant="oportune"
            onClick={() => router.push("/login")}
          >
            Ir para o login
          </Button>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center gap-4 text-slate-200">
          <XCircle className="h-10 w-10 text-rose-400" />
          <p className="text-sm text-center">{mensagem}</p>
          <Button
            type="button"
            className="w-full"
            variant="oportune"
            onClick={() => router.push("/login")}
          >
            Voltar ao login
          </Button>
        </div>
      )}
    </div>
  );
}
