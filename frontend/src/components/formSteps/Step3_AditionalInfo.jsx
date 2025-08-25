import React from "react";
import CardHeader from "../cadastro/CardHeader";
import Forminput from "../cadastro/FormInput";
import FormSelect from "../cadastro/FormSelect";
import dados from "../../utils/informacoes.json";

export default function Step3_AditionalInfo({ onNext, onBack }) {

  const handleSubmit = (e) => {
    e.preventDefault();

    const { data_nascimento, genero, telefone } = e.target;

    const data = {
        data_nascimento: data_nascimento.value,
        genero: genero.value,
        telefone: telefone.value
    };

    onNext(data);
  };

  return (
    <div className="animate-fadeIn">
      <CardHeader
        title="Informações adicionais"
        subtitle="Fale mais sobre você."
      />
      <main>
        <form onSubmit={handleSubmit}>
          <Forminput
            id="data_nascimento"
            name="data_nascimento"
            label="Data de Nascimento"
            placeholder="Qual sua data de nascimento"
            type="date"
          />
          <FormSelect
            id="genero"
            name="genero"
            label="Gênero"
            options={dados.genero}
          />
          <Forminput
            id="telefone"
            name="telefone"
            label="Número de telefone"
            placeholder="Digite seu número de telefone"
            type="tel"
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
