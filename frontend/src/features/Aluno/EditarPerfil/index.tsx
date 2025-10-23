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

interface profileEdit {
  nome: string;
  email: string;
  telefone: string;
  curso: CursoType;
  semestre: string;
  previsao_formatura: string; // Iso Date String
  habilidade_tecnica: string[];
  area_interesse: string[];
  link_portfolio: string;
  curriculo: File | null;
}

type SemestreOption = {
  value: number;
  label: string;
};

const cardTitleStyle = "text-xl font-bold mb-3 text-white";

export default function EditarPerfilAluno() {
  const { register, control, watch, setValue } = useForm<profileEdit>({
    defaultValues: {
      nome: "",
    },
  });

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

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Main */}
      <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <Button variant={"ghost_red"}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Perfil
          </Button>
          <Button variant={"oportune"} className="flex items-center">
            <Save className="w-5 h-5 mr-2" />
            Salvar Alterações
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Esquerda */}
          <div className="space-y-8">
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
                  id="email"
                  label="Email"
                  type="email"
                  {...register("email")}
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

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className={cardTitleStyle}>
                  Informações Acadêmicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
          </div>

          {/* Coluna Direita */}
          <div className="lg:col-span-2 space-y-8">
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
                  name="habilidade_tecnica"
                  // initialTags={["React", "Node.js", "Python", "SQL"]}
                />
                <FormTagInput
                  label="Áreas de Interesse"
                  placeholder="Adicionar área de interesse"
                  control={control}
                  name="area_interesse"
                  // initialTags={[
                  //   "Desenvolvimento Web",
                  //   "Inteligência Artificial",
                  // ]}
                />
              </CardContent>
            </Card>

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
                      <span className="font-semibold">Clique para enviar</span>{" "}
                      ou arraste e solte
                    </p>
                    <p className="text-xs text-gray-500">PDF (MAX. 5MB)</p>
                    <input id="curriculo" type="file" className="hidden" />
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
