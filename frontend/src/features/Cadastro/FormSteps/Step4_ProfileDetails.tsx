/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import CardHeader from "../components/CardHeader";
import FormInput from "@/components/FormInput";
import { FormSelect } from "../components/FormSelect";
import informacoes from "@/utils/informacoes.json";
import { Button } from "@/components/ui/button";
import { StepProps } from "../@types/type";
import { showMessage } from "@/adapters/showMessage";

type SemestreOption = {
  value: number;
  label: string;
};

export function Step4_ProfileDetails({
  profileType,
  onNext,
  onBack,
  register,
  control,
  errors,
  setValue,
  getValues,
  watch,
}: StepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [cnpjError, setCnpjError] = useState("");
  const [cursoSemestre, setCursoSemestre] = useState<SemestreOption[]>([]);
  const cursoSelecionadoValue = watch("curso")

  const handleCnpjBlur = async () => {
    const cnpj = getValues("cnpj")?.replace(/\D/g, "") || "";
    if (cnpj.length !== 14) {
      // Limpa os campos se o CNPJ for inválido
      setValue("ramo", "");
      setValue("setor", "");
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

      setValue("ramo", data.ramo || "", { shouldValidate: true });
      setValue("setor", data.setor || "", { shouldValidate: true });
    } catch (error: any) {
      console.error("Erro ao buscar CNPJ:", error);
      setCnpjError(error.message);
      setValue("ramo", "");
      setValue("setor", "");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cursoSelecionado = informacoes.cursos.find(
      (c) => c.value === cursoSelecionadoValue
    );

    if (cursoSelecionado && cursoSelecionado.maxSemestres > 0) {
      const semestres = Array.from(
        { length: cursoSelecionado.maxSemestres },
        (_, i) => ({
          value: i + 1,
          label: `${i + 1}º semestre`,
        })
      );

      setCursoSemestre(semestres);
      setValue("semestre", "")
    } else {
      setCursoSemestre([])
      setValue("semestre", "")
    }
  }, [cursoSelecionadoValue, setValue]);

  const forms = {
    ESTUDANTE: (
      <>
        <CardHeader
          title="Perfil Acadêmico"
          subtitle="Ajude-nos a encontrar as melhores oportunidades para si."
        />
        {/* Usamos (errors as any) para acessar propriedades específicas de estudante */}
        <FormSelect
          control={control}
          name="curso"
          label="Curso"
          options={informacoes.cursos}
        />
        <FormSelect
          control={control}
          name="semestre"
          label="Semestre"
          options={cursoSemestre}
        />
        <FormInput
          id="matricula"
          label="Número de Matrícula"
          {...register("matricula")}
          error={(errors as any).matricula?.message}
        />
        <FormSelect
          control={control}
          name="periodo"
          label="Período"
          options={informacoes.periodo}
        />
      </>
    ),
    EMPRESA: (
      <>
        <CardHeader
          title="Informações da Empresa"
          subtitle="Registre a sua empresa para encontrar os melhores talentos."
        />
        {/* Usamos (errors as any) para acessar propriedades específicas de empresa */}
        <FormInput
          id="cnpj"
          label="CNPJ"
          {...register("cnpj")}
          onBlur={handleCnpjBlur}
          disabled={isLoading}
          error={(errors as any).cnpj?.message || cnpjError}
        />
        {isLoading && showMessage.loading("Carregando informações")}
        <FormInput
          id="ramo"
          label="Ramo de Atividade"
          {...register("ramo")}
          error={(errors as any).ramo?.message}
        />
        <FormInput
          id="setor"
          label="Setor"
          {...register("setor")}
          error={(errors as any).setor?.message}
        />
        <FormInput
          id="descricao"
          label="Descrição"
          {...register("descricao")}
          error={(errors as any).descricao?.message}
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
          label="Área de Atuação"
          {...register("areaAtuacao")}
          error={(errors as any).areaAtuacao?.message}
        />
        <FormInput
          id="departamento"
          label="Departamento"
          {...register("departamento")}
          error={(errors as any).departamento?.message}
        />
        <FormInput
          id="titulacao"
          label="Titulação"
          {...register("titulacao")}
          error={(errors as any).titulacao?.message}
        />
        <FormInput
          id="lattes"
          label="Link para o Lattes (Opcional)"
          type="url"
          {...register("lattes")}
          error={(errors as any).lattes?.message}
        />
      </>
    ),
  };

  return (
    <div className="animate-fadeIn">
      {profileType && forms[profileType]}

      <div className="flex flex-col gap-3 mt-4">
        <Button
          type="button"
          onClick={onNext}
          variant="oportune"
          className="w-full font-semibold transition-all hover:opacity-90 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#2474e4]/20 mt-2"
        >
          Continuar
        </Button>
        <Button
          type="button"
          onClick={onBack}
          variant="oportune_blank"
          className="w-full font-semibold transition-all hover:opacity-90 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#2474e4]/20 mt-2"
        >
          Voltar
        </Button>
      </div>
    </div>
  );
}
