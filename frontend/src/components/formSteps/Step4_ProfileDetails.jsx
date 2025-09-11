import React, { useState } from "react";
import CardHeader from "../cadastro/CardHeader";
import FormInput from "../cadastro/FormInput";
import FormSelect from "../cadastro/FormSelect";
import informacoes from "../../utils/informacoes.json";
import { lattesRegex, onlyLettersRegex } from "../../utils/validadores";
import { mostrarErro } from "../../utils/mostrarErro";

export default function Step4_ProfileDetails({
  profileType,
  onNext,
  onBack,
  formData,
  handleChange,
  handleSelectChange,
  setFormData,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [cnpjError, setCnpjError] = useState("");

  const handleCnpjBlur = async (e) => {
    const cnpj = e.target.value.replace(/\D/g, "");
    if (cnpj.length !== 14) {
      setFormData((prev) => ({ ...prev, ramo: "", setor: "" }));
      return;
    }
    setIsLoading(true);
    setCnpjError("");
    try {
      const response = await fetch(`http://localhost:3001/cnpj/${cnpj}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Não foi possível consultar o CNPJ.");
      }
      setFormData((prevData) => ({
        ...prevData,
        ramo: data.ramo || "",
        setor: data.setor || "",
      }));
    } catch (error) {
      console.error("Erro ao buscar CNPJ:", error);
      setCnpjError(error.message);
      setFormData((prev) => ({ ...prev, ramo: "", setor: "" }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Estudante não precisa verificar (por enquanto)
    if (profileType === "PROFESSOR") {
      if (!lattesRegex.test(formData.lattes)) {
        mostrarErro("Link do lattes inválido");
        return;
      }
      const fraseApenasLetra = "deve conter apenas letras";
      if (!onlyLettersRegex.test(formData.areaAtuacao)) {
        mostrarErro("Área de atuação " + fraseApenasLetra);
        return;
      }

      if (!onlyLettersRegex.test(formData.departamento)) {
        mostrarErro("Departamento " + fraseApenasLetra);
        return;
      }

      if (!onlyLettersRegex.test(formData.titulacao)) {
        mostrarErro("Titulação " + fraseApenasLetra);
        return;
      }
    }

    onNext();
  };

  const forms = {
    ESTUDANTE: (
      <>
        <CardHeader
          title="Perfil Acadêmico"
          subtitle="Ajude-nos a encontrar as melhores oportunidades para si."
        />
        <FormSelect
          id="curso"
          name="curso"
          label="Curso"
          options={informacoes.cursos}
          value={formData.curso || ""}
          onChange={(option) => handleSelectChange("curso", option)}
        />
        <FormInput
          id="semestre"
          name="semestre"
          label="Semestre Atual"
          type="number"
          placeholder="Qual semestre você está atualmente?"
          value={formData.semestre || ""}
          min={1}
          max={12}
          onChange={handleChange}
        />
        <FormInput
          id="matricula"
          name="matricula"
          label="Número de Matrícula"
          placeholder="Qual a sua matricula"
          value={formData.matricula || ""}
          onChange={handleChange}
        />
        <FormSelect
          id="periodo"
          name="periodo"
          label="Periodo"
          options={informacoes.periodo}
          value={formData.periodo || null}
          onChange={(option) => handleSelectChange("periodo", option)}
        />
      </>
    ),
    EMPRESA: (
      <>
        <CardHeader
          title="Informações da Empresa"
          subtitle="Registre a sua empresa para encontrar os melhores talentos."
        />
        <FormInput
          id="cnpj"
          name="cnpj"
          label="CNPJ"
          placeholder="Digite o CNPJ e aguarde"
          value={formData.cnpj || ""}
          onChange={handleChange}
          onBlur={handleCnpjBlur}
          disabled={isLoading}
        />
        {isLoading && (
          <p className="text-sm text-blue-400 mt-1 animate-pulse">
            Buscando dados do CNPJ...
          </p>
        )}
        {cnpjError && <p className="text-sm text-red-500 mt-1">{cnpjError}</p>}
        <FormInput
          id="ramo"
          name="ramo"
          label="Ramo de Atividade"
          placeholder={
            isLoading ? "Carregando..." : "Preenchido automaticamente"
          }
          value={formData.ramo || ""}
          onChange={handleChange}
        />
        <FormInput
          id="setor"
          name="setor"
          label="Setor"
          placeholder={
            isLoading ? "Carregando..." : "Preenchido automaticamente"
          }
          value={formData.setor || ""}
          onChange={handleChange}
        />
        <FormInput
          id="descricao"
          name="descricao"
          label="Descrição"
          placeholder="Escreva uma breve descrição da empresa"
          value={formData.descricao || ""}
          onChange={handleChange}
        />
      </>
    ),
    PROFESSOR: (
      <>
        <CardHeader
          title="Perfil de Docente"
          subtitle="Complete o seu perfil para divulgar os seus projetos."
        />
        <FormInput
          id="areaAtuacao"
          name="areaAtuacao"
          label="Área de Atuação"
          placeholder="Ex: Professor de Matemática"
          value={formData.areaAtuacao || ""}
          onChange={handleChange}
        />
        <FormInput
          id="departamento"
          name="departamento"
          label="Departamento"
          placeholder="Ex: Departamento de TI"
          value={formData.departamento || ""}
          onChange={handleChange}
        />
        <FormInput
          id="titulacao"
          name="titulacao"
          label="Titulação"
          placeholder="Ex: Mestre, Doutor"
          value={formData.titulacao || ""}
          onChange={handleChange}
        />
        <FormInput
          id="lattes"
          name="lattes"
          label="Link para o Lattes (Opcional)"
          type="url"
          placeholder="Qual o link do seu curriculo lattes"
          required={false}
          value={formData.lattes || ""}
          onChange={handleChange}
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
    </div>
  );
}
