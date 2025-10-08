"use client";

import { showMessage } from "@/adapters/showMessage";
import { AuthHeader } from "@/components/AuthHeaderForm";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useState } from "react";
// import { verificarEmail } from "./EnviarEmail";

export function EnviarEmail() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // const response = await verificarEmail(email);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showMessage.error(err.message || "Erro, por favor tente novamente");
    }
  };

  return (
    <div>
      <AuthHeader
        title="Digite seu email"
        description="Insira seu email para dar inicio ao processo de recuperação de senha"
      />
      <form>
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
        <Button type="submit" variant={"oportune"} className="w-full mt-4">
          {loading ? "Enviando email" : "Enviar email"}
        </Button>
      </form>
    </div>
  );
}
