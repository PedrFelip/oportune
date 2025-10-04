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
import { FormStepProps } from "../@types/type";

export default function Step2_BasicInfo({
  profileType,
  onNext,
  onBack,
  formData,
  handleChange,
}: FormStepProps) {
  if (!formData || !handleChange || !onNext || !onBack) return null;

  const isEmpresa = profileType === "EMPRESA";

  const handleSubmit = (e: React.FormEvent) => {
    if (!formData) return;
    e.preventDefault();

    if (!onlyLettersRegex.test(formData.nome)) {
      showMessage.error("Nome inválido");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      showMessage.error("Email inválido");
      return;
    }
    if (!passwordRegex.test(formData.senha)) {
      showMessage.error(
        "A senha precisa de no minimo 8 caracteres, incluindo letras maiúsculas, minúsculas e números"
      );
      return;
    }
    if (formData.senha !== formData.senhaConfirmada) {
      showMessage.error("As senhas não conferem");
      return;
    }
    onNext();
  };

  return (
    <div className="animate-fadeIn">
      <CardHeader
        title="Crie a sua Conta"
        subtitle="Vamos começar com as informações básicas de acesso."
      />
      <main>
        <form onSubmit={handleSubmit}>
          <FormInput
            id="nome"
            name="nome"
            label={isEmpresa ? "Nome da Empresa" : "Nome Completo"}
            placeholder={
              isEmpresa ? "Ex: Oportune Soluções" : "Ex: João da Silva"
            }
            value={formData.nome || ""}
            onChange={handleChange}
            error={errors}
          />
          <FormInput
            id="email"
            name="email"
            label="E-mail"
            type="email"
            placeholder="seuemail@dominio.com"
            value={formData.email || ""}
            onChange={handleChange}
          />
          <FormInput
            id="senha"
            name="senha"
            label="Crie uma Senha"
            type="password"
            placeholder="••••••••••"
            value={formData.senha || ""}
            onChange={handleChange}
          />
          <FormInput
            id="senhaConfirmada"
            name="senhaConfirmada"
            label="Confirme a sua Senha"
            type="password"
            placeholder="••••••••••"
            value={formData.senhaConfirmada || ""}
            onChange={handleChange}
          />

          <div className="flex items-center gap-2.5 text-xs mb-4">
            <input
              type="checkbox"
              id="termos"
              name="termos"
              className="accent-[#2474e4]"
              required
              checked={formData.termos || false}
              onChange={handleChange}
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
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#2474e4] to-[#639bec] text-white font-semibold py-3.5 rounded-lg transition-all hover:opacity-90 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#2474e4]/20 mt-2 cursor-pointer"
          >
            Continuar
          </button>
          <button
            type="button"
            onClick={onBack}
            className="w-full bg-[rgba(196,211,230,0.04)] text-[#c4d3e6] font-medium py-3 rounded-lg border border-white/10 mt-3 transition-all hover:bg-[rgba(196,211,230,0.02)] hover:text-white cursor-pointer"
          >
            Voltar
          </button>
        </form>
      </main>
    </div>
  );
}
