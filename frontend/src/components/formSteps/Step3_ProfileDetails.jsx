import React from "react";
import CardHeader from "../cadastro/CardHeader";
import FormInput from "../cadastro/FormInput";

export default function Step3_ProfileDetails({
  profileType,
  onFinish,
  onBack,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onFinish();
  };

  const forms = {
    aluno: (
      <>
        <CardHeader
          title="Perfil Académico"
          subtitle="Ajude-nos a encontrar as melhores oportunidades para si."
        />
        <FormInput
          id="curso"
          label="Curso"
          placeholder="Ex: Engenharia de Software"
        />
        <FormInput
          id="semestre"
          label="Semestre Atual"
          type="number"
          placeholder="Ex: 5"
        />
        <FormInput id="matricula" label="Número de Matrícula" />
      </>
    ),
    empresa: (
      <>
        <CardHeader
          title="Informações da Empresa"
          subtitle="Registe a sua empresa para encontrar os melhores talentos."
        />
        <FormInput id="razao-social" label="Razão Social" />
        <FormInput id="cnpj" label="CNPJ" placeholder="00.000.000/0000-00" />
        <FormInput
          id="ramo"
          label="Ramo de Atividade"
          placeholder="Ex: Tecnologia da Informação"
        />
      </>
    ),
    professor: (
      <>
        <CardHeader
          title="Perfil de Docente"
          subtitle="Complete o seu perfil para divulgar os seus projetos."
        />
        <FormInput
          id="departamento"
          label="Departamento"
          placeholder="Ex: Departamento de TI"
        />
        <FormInput
          id="titulacao"
          label="Titulação"
          placeholder="Ex: Mestre, Doutor"
        />
        <FormInput
          id="lattes"
          label="Link para o Lattes (Opcional)"
          type="url"
          placeholder="https://..."
          required={false}
        />
      </>
    ),
  };

  return (
    <div className="animate-fadeIn">
      <form onSubmit={handleSubmit}>
        {forms[profileType]}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#2474e4] to-[#639bec] text-white font-semibold py-3.5 rounded-lg transition-all hover:opacity-90 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#2474e4]/20 mt-2"
        >
          Finalizar Cadastro
        </button>
        <button
          type="button"
          onClick={onBack}
          className="w-full bg-[rgba(196,211,230,0.04)] text-[#c4d3e6] font-medium py-3 rounded-lg border border-white/10 mt-3 transition-all hover:bg-[rgba(196,211,230,0.02)] hover:text-white"
        >
          Voltar
        </button>
      </form>
    </div>
  );
}
