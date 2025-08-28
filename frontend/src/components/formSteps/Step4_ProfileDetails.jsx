import React from "react";
import CardHeader from "../cadastro/CardHeader";
import FormInput from "../cadastro/FormInput";
import FormSelect from "../cadastro/FormSelect";
import informacoes from "../../utils/informacoes.json";

export default function Step4_ProfileDetails({
  profileType,
  onFinish,
  onBack,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (profileType === "aluno") {
      const { curso, semestre, matricula } = e.target;
      const data = {
        curso: curso.value,
        semestre: semestre.value,
        matricula: matricula.value,
      };

      onFinish(data);
    } else if (profileType === "professor") {
      const { area_atuacao, departamento, titulacao, lattes } = e.target;

      const data = {
        area_atuacao: area_atuacao.value,
        departamento: departamento.value,
        titulacao: titulacao.value,
        lattes: lattes.value,
      };

      onFinish(data);
    } else if (profileType === "empresa") {
      const { cnpj, ramo, descricao } = e.target;

      const data = {
        cnpj: cnpj.value,
        ramo: ramo.value,
        descricao: descricao.value,
      };

      onFinish(data);
    }
  };
  const forms = {
    aluno: (
      <>
        <CardHeader
          title="Perfil Acadêmico"
          subtitle="Ajude-nos a encontrar as melhores oportunidades para si."
        />
        <FormInput
          id="curso"
          name="curso"
          label="Curso"
          placeholder="Digite seu curso"
        />
        <FormInput
          id="semestre"
          name="semestre"
          label="Semestre Atual"
          type="number"
          placeholder="Qual semestre você está atualmente?"
        />
        <FormInput
          id="matricula"
          name="matricula"
          label="Número de Matrícula"
          placeholder="Qual a sua matricula"
        />
        <FormSelect id="periodo" name="periodo" label="Periodo" options={informacoes.periodo} />
      </>
    ),
    empresa: (
      <>
        <CardHeader
          title="Informações da Empresa"
          subtitle="Registre a sua empresa para encontrar os melhores talentos."
        />
        <FormInput
          id="cnpj"
          name="cnpj"
          label="CNPJ"
          placeholder="Digite o CNPJ (somente números)"
        />
        <FormInput
          id="ramo"
          name="ramo"
          label="Ramo de Atividade"
          placeholder="Qual ramo a empresa atua?"
        />
        <FormInput
          id="setor"
          name="setor"
          label="Setor"
          placeholder="Escreva o setor da empresa"
        />
        <FormInput
          id="descricao"
          name="descricao"
          label="Descrição"
          placeholder="Escreva uma breve descrição da empresa"
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
          id="area_atuacao"
          name="area_atuacao"
          label="Área de Atuação"
          placeholder="Ex: Professor de Matemática"
        />
        <FormInput
          id="departamento"
          name="departamento"
          label="Departamento"
          placeholder="Ex: Departamento de TI"
        />
        <FormInput
          id="titulacao"
          name="titulacao"
          label="Titulação"
          placeholder="Ex: Mestre, Doutor"
        />
        <FormInput
          id="lattes"
          name="lattes"
          label="Link para o Lattes (Opcional)"
          type="url"
          placeholder="Qual o link do seu curriculo lattes"
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
