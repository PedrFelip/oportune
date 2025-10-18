"use client";

import { showMessage } from "@/adapters/showMessage";
import { AuthHeader } from "@/components/AuthHeaderForm";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { BadgeCheckIcon, BadgeXIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { cadastrarNovaSenha } from "./api/cadastrarNovaSenha";
import { useRouter } from "next/navigation";

type iconProps = {
  condicao: boolean;
};

const Icon = ({ condicao }: iconProps) => {
  return (
    <span>
      {condicao === true ? (
        <BadgeCheckIcon color="green" />
      ) : (
        <BadgeXIcon color="red" />
      )}
    </span>
  );
};

type RecuperarSenhaProps = {
  token: string;
};

export function RecuperarSenha({ token }: RecuperarSenhaProps) {
  const [novaSenha, setNovaSenha] = useState("");
  const [novaSenhaConfirmada, setNovaSenhaConfirmada] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecial, setHasSpecial] = useState(false);

  const router = useRouter();

  const senhaValida = hasMinLength && hasUppercase && hasNumber && hasSpecial;
  const senhaConfirmadaValida = novaSenha === novaSenhaConfirmada;

  useEffect(() => {
    setHasMinLength(novaSenha.length >= 8);
    setHasUppercase(/[A-Z]/.test(novaSenha));
    setHasNumber(/\d/.test(novaSenha));
    setHasSpecial(/[^A-Za-z0-9]/.test(novaSenha));
  }, [novaSenha]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!senhaConfirmadaValida) {
      showMessage.error("As senhas não coincidem");
      return;
    }

    setLoading(true);
    showMessage.loading("Aguarde!");

    try {
      await cadastrarNovaSenha({
        token,
        novaSenha,
        novaSenhaConfirmada,
      });

      showMessage.dismiss();
      showMessage.success("Senha atualizada com sucesso!");

      router.replace("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthHeader
        title="Recuperar senha"
        description="Crie sua nova senha abaixo"
      />
      <form onSubmit={handleSubmit}>
        <FormInput
          name="novaSenha"
          label="Nova senha"
          id="novaSenha"
          type="password"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          className={` w-full px-4 py-3 rounded-lg ${
            senhaValida ? "border border-green-500" : "liquid-input"
          }`}
        />
        <div className="text-sm my-4 flex flex-col gap-1">
          <span className="flex gap-3">
            <Icon condicao={hasMinLength} /> Possui no minimo 8 caracteres
          </span>
          <span className="flex gap-3">
            <Icon condicao={hasUppercase} /> Possui letra maiscula
          </span>
          <span className="flex gap-3">
            <Icon condicao={hasNumber} /> Possui número
          </span>
          <span className="flex gap-3">
            <Icon condicao={hasSpecial} /> Possui caracteres especiais
          </span>
        </div>
        <FormInput
          name="novaSenhaConfirmada"
          label="Confirme a nova senha"
          id="novaSenhaConfirmada"
          type="password"
          value={novaSenhaConfirmada}
          onChange={(e) => setNovaSenhaConfirmada(e.target.value)}
          className={` w-full px-4 py-3 rounded-lg ${
            senhaConfirmadaValida ? "border border-green-500" : "liquid-input"
          }`}
        />
        <Button
          variant={"oportune"}
          className="w-full mt-4"
          disabled={!senhaValida || !senhaConfirmadaValida || loading}
        >
          {loading ? "Criando..." : "Criar nova senha"}
        </Button>
      </form>
    </>
  );
}
