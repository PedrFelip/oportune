import React from "react";
import CardHeader from "../components/CardHeader";
import FormInput from "@/components/FormInput";
import {
  passwordRegex,
  emailRegex,
  onlyLettersRegex,
} from "@/utils/validadores";
import { showMessage } from "@/adapters/showMessage";
// Tipagens
import { StepProps } from "../@types/type";
import { Button } from "@/components/ui/button";

export default function Step2_BasicInfo({
  profileType,
  onNext,
  onBack,
  register,
  errors
}: StepProps) {

  const isEmpresa = profileType === "EMPRESA";

  return (
    <div className="animate-fadeIn">
      <CardHeader
        title="Crie a sua Conta"
        subtitle="Vamos começar com as informações básicas de acesso."
      />
      <main>
          <FormInput
            id="nome"
            label={isEmpresa ? "Nome da Empresa" : "Nome Completo"}
            placeholder={
              isEmpresa ? "Ex: Oportune Soluções" : "Ex: João da Silva"
            }
            {...register("nome")}
            error={errors.nome?.message}
          />
          <FormInput
            id="email"
            label="E-mail"
            type="email"
            placeholder="seuemail@dominio.com"
            {...register("email")}
            error={errors.email?.message}
          />
          <FormInput
            id="senha"
            label="Crie uma Senha"
            type="password"
            placeholder="••••••••••"
            {...register("senha")}
            error={errors.senha?.message}
          />
          <FormInput
            id="senhaConfirmada"
            label="Confirme a sua Senha"
            type="password"
            placeholder="••••••••••"
            {...register("senhaConfirmada")}
            error={errors.senhaConfirmada?.message}
          />

          <div className="flex items-center gap-2.5 text-xs mb-4">
            <input
              type="checkbox"
              id="termos"
              className="accent-[#2474e4]"
              {...register("termos")}
            />
            <label htmlFor="termos" className="text-[#c4d3e6]">
              Li e aceito os{" "}
              <a
                href="#"
                className="font-semibold text-[#639bec] hover:text-white hover:underline"
              >
                Termos de Serviço
              </a>
              .
            </label>
          </div>
          <Button
            type="button"
            onClick={onNext}
            variant={"oportune"}
          >
            Continuar
          </Button>
          <Button
            type="button"
            onClick={onBack}
            variant={"oportune"}
          >
            Voltar
          </Button>
      </main>
    </div>
  );
}
