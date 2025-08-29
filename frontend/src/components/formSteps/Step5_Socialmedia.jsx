import React from "react";
import CardHeader from "../cadastro/CardHeader";
import Forminput from "../cadastro/FormInput";

export default function Step5_Socialmedia({ onNext, onBack, formData, handleChange }) {

  const handleSubmit = (e) => {
    e.preventDefault();

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
          <Forminput
            id="emailContato"
            name="emailContato"
            label="Email de contato"
            placeholder="Qual o email para entrar em contato"
            type="email"
            value={formData.emailContato || ''}
            onChange={handleChange}
            
          />
          <Forminput
            id="telefone"
            name="telefone"
            label="Telefone"
            type="tel"
            value={formData.telefone || ''}
            mask={"(__) _____-____"}
            onChange={handleChange}
          />
          <Forminput
            id="website"
            name="website"
            label="Site da empresa"
            placeholder="Site da empresa"
            type="url"
            required={false}
            value={formData.website || ''}
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
