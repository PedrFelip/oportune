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

export interface profileEdit {
  nome?: string;
  telefone?: string;
  curso?: CursoType;
  semestre?: string;
  previsao_formatura?: string;
  habilidade_tecnica?: string[];
  area_interesse?: string[];
  link_portfolio?: string;
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

  const { register, control, watch, setValue, handleSubmit } =
    useForm<profileEdit>({
      defaultValues: (() => {
        if (!usuario) return {};

        switch (usuario.tipo) {
          // ==================== ESTUDANTE ====================
          case "ESTUDANTE":
            return {
              nome: usuario.nome,
              email: usuario.email,
              telefone: usuario.estudante?.telefone ?? "",
              curso: usuario.estudante?.curso as CursoType,
              semestre: String(usuario.estudante?.semestre ?? ""),
              previsao_formatura: usuario.estudante?.dataFormatura ?? "",
              habilidade_tecnica: usuario.estudante?.habilidadesTecnicas ?? [],
              area_interesse: usuario.estudante?.areasInteresse ?? [],
              link_portfolio: "", // futuro campo no backend
              curriculo: null,
            };

          // ==================== PROFESSOR ====================
          case "PROFESSOR":
            return {
              nome: usuario.nome,
              email: usuario.email,
              telefone: usuario.professor?.telefone ?? "",
              curso: "" as CursoType, // professores não têm curso, mas mantém tipo
              semestre: "",
              previsao_formatura: "",
              habilidade_tecnica: usuario.professor?.areasInteresse ?? [],
              area_interesse: usuario.professor?.areasInteresse ?? [],
              link_portfolio: usuario.professor?.lattes ?? "",
              curriculo: null,
            };

          // ==================== EMPRESA ====================
          case "EMPRESA":
            return {
              nome: usuario.empresa?.nomeFantasia ?? usuario.nome,
              email: usuario.email,
              telefone: usuario.empresa?.telefone ?? "",
              curso: "" as CursoType,
              semestre: "",
              previsao_formatura: "",
              habilidade_tecnica: usuario.empresa?.setor
                ? [usuario.empresa.setor]
                : [],
              area_interesse: usuario.empresa?.redesSociais ?? [],
              link_portfolio: usuario.empresa?.website ?? "",
              curriculo: null,
            };

          default:
            return {};
        }
      })(),
    });

  const { back } = useRouter();

  const { setPageTitle } = useLayout();
  useEffect(() => {
    setPageTitle("Editar perfil");
  }, [setPageTitle]);

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
      setValue("semestre", "");
    } else {
      setCursoSemestre([]);
      setValue("semestre", "");
    }
  }, [cursoSelecionadoValue, setValue]);

  const onSubmit = async (data: profileEdit) => {
    showLoading();

    try {
      if (usuario?.tipo !== "ESTUDANTE") {
        throw new Error(
          "Apenas estudantes podem editar o perfil por enquanto."
        );
      }

      await editarPerfil(data);
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
                      name="previsao_formatura"
                      label="Previsão de formatura"
                      placeholder="Qual a previsão de sua formatura?"
                    />
                  </CardContent>
                </Card>
              )}
              {/* 🔹 Informações profissionais (somente professor) */}
              {usuario?.tipo === "PROFESSOR" && (
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className={cardTitleStyle}>
                      Informações Profissionais
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormInput
                      id="link_portfolio"
                      label="Link do Lattes"
                      type="url"
                      placeholder="https://lattes.cnpq.br/seu-id"
                      {...register("link_portfolio")}
                    />
                    <FormTagInput
                      label="Áreas de Interesse"
                      placeholder="Adicionar área de interesse"
                      control={control}
                      name="area_interesse"
                    />
                  </CardContent>
                </Card>
              )}
              {/* 🔹 Informações empresariais (somente empresa) */}
              {/* 🔹 Informações empresariais (somente empresa) */}
              {usuario?.tipo === "EMPRESA" && (
                <Card className="bg-gray-800 border-gray-700 shadow-lg shadow-gray-900/40">
                  <CardHeader className="pb-3 border-b border-gray-700/70">
                    <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                      <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded-md text-sm font-medium">
                        Empresa
                      </span>
                      Informações da Organização
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5 pt-4">
                    <div className="space-y-3">
                      <FormInput
                        id="nome"
                        label="Nome Fantasia"
                        placeholder="Ex: Evolução Contábil"
                        {...register("nome")}
                      />
                      <FormInput
                        id="telefone"
                        label="Telefone Comercial"
                        mask="(__) _____-____"
                        placeholder="(61) 99999-9999"
                        {...register("telefone")}
                      />
                      <FormInput
                        id="link_portfolio"
                        label="Website"
                        type="url"
                        placeholder="https://empresa.com.br"
                        {...register("link_portfolio")}
                      />
                    </div>
                    <div className="pt-2 space-y-6">
                      <div className="space-y-3">
                        <Label className="text-[#c4d3e6] text-sm font-medium">
                          Redes Sociais
                        </Label>
                        <FormTagInput
                          label=""
                          placeholder="Adicionar link de rede social"
                          control={control}
                          name="area_interesse"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[#c4d3e6] text-sm font-medium">
                          Setores / Áreas de Atuação
                        </Label>
                        <FormTagInput
                          label=""
                          placeholder="Ex: Contabilidade, Fiscal, RH..."
                          control={control}
                          name="habilidade_tecnica"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            {/* ==================== COLUNA DIREITA ==================== */}
            <div className="lg:col-span-2 space-y-8">
              {/* 🔹 Habilidades e Interesses (estudante/professor) */}
              {(usuario?.tipo === "ESTUDANTE" ||
                usuario?.tipo === "PROFESSOR") && (
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className={cardTitleStyle}>
                      Habilidades e Interesses
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {usuario?.tipo === "ESTUDANTE" && (
                      <>
                        <FormTagInput
                          label="Habilidades Técnicas"
                          placeholder="Adicionar habilidade técnica"
                          control={control}
                          name="habilidade_tecnica"
                        />
                        <FormTagInput
                          label="Áreas de Interesse"
                          placeholder="Adicionar área de interesse"
                          control={control}
                          name="area_interesse"
                        />
                      </>
                    )}
                    {usuario?.tipo === "PROFESSOR" && (
                      <FormTagInput
                        label="Áreas de Interesse"
                        placeholder="Adicionar área de interesse"
                        control={control}
                        name="area_interesse"
                      />
                    )}
                  </CardContent>
                </Card>
              )}
              {/* 🔹 Documentos (estudante/professor) */}
              {(usuario?.tipo === "ESTUDANTE" ||
                usuario?.tipo === "PROFESSOR") && (
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
                      {...register("link_portfolio")}
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
