import React from "react";
import CardHeader from "../components/CardHeader"; 
import FormInput from "@/components/FormInput";
import { FormSelect } from "../components/FormSelect";
import dados from "@/utils/informacoes.json";
import { verificarIdadeMinima, phoneRegex } from "@/utils/validadores";
import { showMessage } from "@/adapters/showMessage";
import { FormStepProps } from "../@types/type";

export default function Step3_AditionalInfo({
  onNext,
  onBack,
  formData,
  handleChange,
  handleSelectChange,
}: FormStepProps) {
  if (
    !formData ||
    !handleChange ||
    !onNext ||
    !onBack ||
    !handleChange ||
    !handleSelectChange
  )
    return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.dataNascimento ||
      !verificarIdadeMinima(formData.dataNascimento)
    ) {
      showMessage.error("Você precisa ter mais de 16 anos para criar a conta");
      return;
    }
    if (formData.genero === null) {
      showMessage.error("Selecione um gênero válido");
      return;
    }
    if (formData.telefone) {
      if (!phoneRegex.test(formData.telefone)) {
        showMessage.error("Número de telefone inválido");
        return;
      }
    }

    onNext();
  };

  return (
    <div className="animate-fadeIn">
      <CardHeader
        title="Informações adicionais"
        subtitle="Fale mais sobre você."
      />
      <main>
        <form onSubmit={handleSubmit}>
          <FormInput
            id="dataNascimento"
            name="dataNascimento"
            label="Data de Nascimento"
            placeholder="Qual sua data de nascimento"
            type="date"
            max={new Date().toISOString().split("T")[0]}
            value={formData.dataNascimento || ""}
            onChange={handleChange}
          />
          <FormSelect
            id="genero"
            name="genero"
            label="Gênero"
            options={dados.genero}
            value={formData.genero || null}
            onChange={(option) => handleSelectChange("genero", option)}
          />
          <FormInput
            id="telefone"
            name="telefone"
            label="Número de telefone"
            placeholder="Digite seu número de telefone"
            type="tel"
            value={formData.telefone || ""}
            mask={"(__) _____-____"}
            onChange={handleChange}
          />
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
