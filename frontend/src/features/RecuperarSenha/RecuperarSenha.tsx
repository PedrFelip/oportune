"use client";

import { showMessage } from "@/adapters/showMessage";
import { AuthHeader } from "@/components/AuthHeaderForm";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { BadgeCheckIcon, BadgeXIcon } from "lucide-react";
import { useEffect, useState } from "react";

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

export function RecuperarSenha() {
  const [senhaNova, setSenhaNova] = useState("");
  const [senhaNovaConfirmada, setSenhaNovaConfirmada] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecial, setHasSpecial] = useState(false);

  const senhaValida = hasMinLength && hasUppercase && hasNumber && hasSpecial;
  const senhaConfirmadaValida = (senhaNova === senhaNovaConfirmada);

  useEffect(() => {
    setHasMinLength(senhaNova.length >= 8);
    setHasUppercase(/[A-Z]/.test(senhaNova));
    setHasNumber(/\d/.test(senhaNova));
    setHasSpecial(/[^A-Za-z0-9]/.test(senhaNova));
  }, [senhaNova]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!senhaConfirmadaValida) {
      showMessage.error("As senhas não coincidem");
      return;
    }

    setLoading(true);

    try {
      // const response = await cadastrarNovaSenha(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
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
          name="senhaNova"
          label="Nova senha"
          id="senhaNova"
          type="password"
          value={senhaNova}
          onChange={(e) => setSenhaNova(e.target.value)}
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
          name="senhaNovaConfirmada"
          label="Confirme a nova senha"
          id="senhaNovaConfirmada"
          type="password"
          value={senhaNovaConfirmada}
          onChange={(e) => setSenhaNovaConfirmada(e.target.value)}
          className={` w-full px-4 py-3 rounded-lg ${
            senhaConfirmadaValida ? "border border-green-500" : "liquid-input"
          }`}
        />
        <Button variant={"oportune"} className="w-full mt-4">
          {loading ? "Criando..." : "Criar nova senha"}
        </Button>
      </form>
    </>
  );
}
