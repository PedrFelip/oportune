"use client";

import { showMessage } from "@/adapters/showMessage";
import { AuthHeader } from "@/components/AuthHeaderForm";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { solicitarRecuperacaoSenha } from "./api/SolicitarRecuperacaoSenha";

export function EnviarEmail() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    showMessage.loading("Enviando email");
    try {
      await solicitarRecuperacaoSenha(email);

      setLoading(false);
      showMessage.dismiss();
      showMessage.success("Email enviado com sucesso!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showMessage.error(err || "Erro, por favor tente novamente");
      setLoading(false);
    }
  };

  return (
    <div>
      <AuthHeader
        title="Digite seu email"
        description="Insira seu email para dar inicio ao processo de recuperação de senha"
      />
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          label="Email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg liquid-input"
          placeholder="Digite seu email"
          required
        />
        <Button
          type="submit"
          variant={"oportune"}
          className="w-full mt-4"
          disabled={loading}
        >
          {loading ? "Enviando email" : "Enviar email"}
        </Button>
      </form>
    </div>
  );
}
