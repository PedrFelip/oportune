"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormSelect } from "@/features/Cadastro/components/FormSelect";
import FormInput from "@/components/FormInput";
import { ArrowLeft, Save } from "lucide-react";
import { TipoVaga } from "@/models/enums";
import { useAuth } from "@/contexts/AuthContext";
import { FormTagInput } from "@/components/TagsInputForm";
import { FormCalendar } from "../Cadastro/components/FormCalendar";

interface VagaEdit {
  id?: string;
  titulo: string;
  descricao: string;
  tipo: TipoVaga;
  categorias: string[];
  curso: string;
  semestre: string;
  prazoInscricao: string;
}

interface EditarVagaFormProps {
  vaga?: VagaEdit;
  onSubmit: (data: VagaEdit) => void;
  onCancel: () => void;
}

export function EditarVagaForm({
  vaga,
  onSubmit,
  onCancel,
}: EditarVagaFormProps) {
  const { usuario } = useAuth();

  const { register, control, handleSubmit, reset } = useForm<VagaEdit>({
    defaultValues: vaga ?? {
      titulo: "",
      descricao: "",
      tipo: "Estágio" as TipoVaga,
      categorias: [],
      curso: "",
      semestre: "",
      prazoInscricao: "",
    },
  });

  // Quando os dados da vaga chegarem assincronamente, atualiza os valores do formulário
  useEffect(() => {
    if (vaga) {
      reset(vaga);
    }
  }, [vaga, reset]);

  if (usuario?.tipo === "ESTUDANTE") {
    return;
  }

  // Usar os mesmos rótulos da criação (o backend normaliza estes valores)
  const tipoOptions = [
    { value: "Estágio", label: "Estágio" },
    { value: "Pesquisa", label: "Pesquisa" },
    { value: "Extensão", label: "Extensão" },
  ];

  const cursoOptions = [
    {
      value: "analise_desenvolvimento_sistemas",
      label: "Análise e Desenvolvimento de Sistemas",
    },
    { value: "engenharia_software", label: "Engenharia de Software" },
  ];

  const semestreOptions = Array.from({ length: 8 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1}º semestre`,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-gray-900 text-white min-h-screen">
        <main className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <Button variant="ghost_red" onClick={onCancel}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
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

          {/* Card Principal */}
          <Card className="bg-gray-800 border-gray-700 shadow-md shadow-gray-900/40">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">
                Editar Vaga
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6 text-white">
              <FormInput
                id="titulo"
                label="Título da vaga"
                placeholder="Ex: Desenvolvedor Front-end"
                {...register("titulo")}
              />

              <FormInput
                id="descricao"
                label="Descrição"
                placeholder="Descreva as atividades, requisitos e benefícios"
                {...register("descricao")}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormSelect
                  control={control}
                  name="tipo"
                  label="Tipo de vaga"
                  options={tipoOptions}
                  placeholder="Selecione o tipo"
                />
                <FormCalendar
                  control={control}
                  name="prazoInscricao"
                  label="Prazo de inscrição"
                  placeholder="Selecione a data limite"
                  fromYear={new Date().getFullYear()}
                  toYear={new Date().getFullYear() + 10}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormSelect
                  control={control}
                  name="curso"
                  label="Curso"
                  options={cursoOptions}
                  placeholder="Selecione o curso"
                />
                <FormSelect
                  control={control}
                  name="semestre"
                  label="Semestre mínimo"
                  options={semestreOptions}
                  placeholder="Selecione o semestre"
                />
              </div>

              <div>
                <Label className="text-[#c4d3e6] text-sm font-medium mb-2 block">
                  Categorias
                </Label>
                <FormTagInput
                  placeholder="Ex: React, UX, Node.js..."
                  control={control}
                  name="categorias"
                />
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </form>
  );
}
