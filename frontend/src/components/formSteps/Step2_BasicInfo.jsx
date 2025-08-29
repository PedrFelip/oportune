import React from "react";
import CardHeader from "../cadastro/CardHeader";
import FormInput from "../cadastro/FormInput";
import Swal from "sweetalert2";

export default function Step2_BasicInfo({
  profileType,
  onNext,
  onBack,
  formData,
  handleChange,
}) {
  const isEmpresa = profileType === "empresa";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.senha !== formData.senha_confirmada) {
      Swal.fire({
        title: "Erro",
        text: "As senhas não conferem! Tente novamente",
        icon: "error",
        confirmButtonText: "Refazer",
        confirmButtonColor: "#2474e4",

        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      return
    }
    delete formData.senhaConfirmada
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
