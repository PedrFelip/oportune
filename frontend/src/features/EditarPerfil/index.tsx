"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import FormInput from "@/components/FormInput";
import { useForm } from "react-hook-form";
import { CursoType } from "@/features/Cadastro/@types/type";
import { FormSelect } from "@/features/Cadastro/components/FormSelect";
import dados from "@/utils/informacoes.json";
import { FormCalendar } from "@/features/Cadastro/components/FormCalendar";
import { FormTagInput } from "@/components/TagsInputForm";
import { useLayout } from "@/contexts/LayoutContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useLoading } from "@/contexts/LoadingContext";
import { showMessage } from "@/adapters/showMessage";
import { editarPerfil } from "../Api/editarPerfil";

export interface ProfileEdit {
  nome?: string;
  telefone?: string;
  curso?: CursoType;
  semestre?: number;
  dataFormatura?: string | null;
  habilidadesTecnicas?: string[];
  areasInteresse?: string[];
  areaAtuacao?: string[]; // Para professor
  departamento?: string; // Para professor
  titulacao?: string; // Para professor
  linkPortfolio?: string | null;
  curriculo?: File | null;
}

type SemestreOption = {
  value: number;
  label: string;
};

const cardTitleStyle = "text-xl font-bold mb-3 text-white";

export default function EditarPerfilAluno() {
  const { usuario } = useAuth();
  const { showLoading, hideLoading } = useLoading();
  const { back } = useRouter();
  const { setPageTitle } = useLayout();

  useEffect(() => {
    setPageTitle("Editar perfil");
  }, [setPageTitle]);

  const { register, control, watch, setValue, handleSubmit } =
    useForm<ProfileEdit>({
      defaultValues: (() => {
        if (!usuario) return {};

        switch (usuario.tipo) {
          // ==================== ESTUDANTE ====================
          case "ESTUDANTE":
            return {
              nome: usuario.nome,
              telefone: usuario.estudante?.telefone ?? "",
              curso: usuario.estudante?.curso as CursoType,
              semestre: usuario.estudante?.semestre ?? 0,
              dataFormatura: usuario.estudante?.dataFormatura ?? null,
              habilidadesTecnicas: usuario.estudante?.habilidadesTecnicas ?? [],
              areasInteresse: usuario.estudante?.areasInteresse ?? [],
              linkPortfolio: "",
              curriculo: null,
            };

          // ==================== PROFESSOR ====================
          case "PROFESSOR":
            return {
              nome: usuario.nome,
              telefone: usuario.professor?.telefone ?? "",
              curso: "" as CursoType,
              semestre: 0,
              dataFormatura: null,
              habilidadesTecnicas: usuario.professor?.areasInteresse ?? [],
              areasInteresse: usuario.professor?.areasInteresse ?? [],
              linkPortfolio: usuario.professor?.lattes ?? "",
              curriculo: null,
            };

          // ==================== EMPRESA ====================
          case "EMPRESA":
            return {
              nome: usuario.empresa?.nomeFantasia ?? usuario.nome,
              telefone: usuario.empresa?.telefone ?? "",
              curso: "" as CursoType,
              semestre: 0,
              dataFormatura: null,
              habilidadesTecnicas: usuario.empresa?.setor
                ? [usuario.empresa.setor]
                : [],
              areasInteresse: usuario.empresa?.redesSociais ?? [],
              linkPortfolio: usuario.empresa?.website ?? "",
              curriculo: null,
            };

          default:
            return {};
        }
      })(),
    });

  const [cursoSemestre, setCursoSemestre] = useState<SemestreOption[]>([]);
  const cursoSelecionadoValue = watch("curso");

  useEffect(() => {
    const cursoSelecionado = dados.cursos.find(
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
      setValue("semestre", 0);
    } else {
      setCursoSemestre([]);
      setValue("semestre", 0);
    }
  }, [cursoSelecionadoValue, setValue]);

  const onSubmit = async (data: ProfileEdit) => {
    showLoading();

    try {
      if (usuario?.tipo !== "ESTUDANTE") {
        throw new Error(
          "Apenas estudantes podem editar o perfil por enquanto."
        );
      }

      const payload = {
        ...data,
        semestre: Number(data.semestre),
      };

      await editarPerfil(payload);
      showMessage.success("Perfil atualizado com sucesso!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      showMessage.error(err.message || "Erro ao atualizar o perfil.");
    } finally {
      hideLoading();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-gray-900 text-white min-h-screen">
        <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <Button variant="ghost_red" onClick={back}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Perfil
            </Button>
            <Button
              type="submit"
              variant="oportune"
              className="flex items-center"
            >
              <Save className="w-5 h-5 mr-2" />
              Salvar Alterações
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ==================== COLUNA ESQUERDA ==================== */}
            <div className="space-y-8">
              {/* 🔹 Informações pessoais */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className={cardTitleStyle}>
                    Informações Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormInput
                    id="nome"
                    label="Nome Completo"
                    {...register("nome")}
                  />
                  <FormInput
                    id="telefone"
                    label="Telefone"
                    mask="(__) _____-____"
                    placeholder="(99) 99999-9999"
                    {...register("telefone")}
                  />
                </CardContent>
              </Card>

              {/* 🔹 Informações acadêmicas (somente estudante) */}
              {usuario?.tipo === "ESTUDANTE" && (
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className={cardTitleStyle}>
                      Informações Acadêmicas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-white">
                    <FormSelect
                      name="curso"
                      control={control}
                      label="Curso"
                      options={dados.cursos}
                      placeholder="Selecione seu curso"
                    />
                    <FormSelect
                      control={control}
                      name="semestre"
                      label="Semestre"
                      options={cursoSemestre}
                      placeholder="Selecione o semestre após o curso"
                    />
                    <FormCalendar
                      control={control}
                      name="dataFormatura"
                      label="Previsão de formatura"
                      placeholder="Qual a previsão de sua formatura?"
                      toYear={new Date().getFullYear()}
                    />
                  </CardContent>
                </Card>
              )}

              {usuario?.tipo === "PROFESSOR" && (
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className={cardTitleStyle}>
                      Informações Acadêmicas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-white">
                    <FormTagInput
                      label="Área de interesse"
                      placeholder="Adicionar área de interesse"
                      control={control}
                      name="areasInteresse"
                    />
                  </CardContent>
                </Card>
              )}
            </div>

            {/* ==================== COLUNA DIREITA ==================== */}
            <div className="lg:col-span-2 space-y-8">
              {/* 🔹 Habilidades e Interesses */}
              {usuario?.tipo === "ESTUDANTE" && (
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className={cardTitleStyle}>
                      Habilidades e Interesses
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormTagInput
                      label="Habilidades Técnicas"
                      placeholder="Adicionar habilidade técnica"
                      control={control}
                      name="habilidadesTecnicas"
                    />
                    <FormTagInput
                      label="Áreas de Interesse"
                      placeholder="Adicionar área de interesse"
                      control={control}
                      name="areasInteresse"
                    />
                  </CardContent>
                </Card>
              )}
              {usuario?.tipo === "PROFESSOR" && (
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className={cardTitleStyle}>
                      Informações Acadêmicas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormInput
                      id="areaAtuacao"
                      label="Área de Atuação"
                      placeholder="Digite sua área de atuação"
                      {...register("areaAtuacao")}
                    />
                    <FormInput
                      id="departamento"
                      label="Departamento"
                      placeholder="Digite seu departamento"
                      {...register("departamento")}
                    />
                    <FormInput
                      id="titulacao"
                      label="Titulação"
                      placeholder="Digite sua titulação"
                      {...register("titulacao")}
                    />
                  </CardContent>
                </Card>
              )}

              {/* 🔹 Documentos */}
              {usuario?.tipo === "ESTUDANTE" && (
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className={cardTitleStyle}>Documentos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormInput
                      id="portfolio"
                      label="Link do Portfólio"
                      type="url"
                      placeholder="https://github.com/seu-usuario"
                      {...register("linkPortfolio")}
                    />
                    <div>
                      <Label className="block mb-2 text-sm font-medium text-[#c4d3e6]">
                        Currículo (PDF)
                      </Label>
                      <label
                        htmlFor="curriculo"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700/50 hover:bg-gray-700 transition-colors"
                      >
                        <Upload className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="text-sm text-gray-400">
                          <span className="font-semibold">
                            Clique para enviar
                          </span>{" "}
                          ou arraste e solte
                        </p>
                        <p className="text-xs text-gray-500">PDF (MAX. 5MB)</p>
                        <input id="curriculo" type="file" className="hidden" />
                      </label>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </form>
  );
}
