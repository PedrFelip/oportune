"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Logo from "@/assets/logo_oportune.png";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { vagaModel } from "@/models/oportunidadeModel";
import { DialogProps } from "@radix-ui/react-dialog";
import { showMessage } from "@/adapters/showMessage";
import { TagsInput } from "@/components/TagsInput";
import { FreeTagsInput } from "@/components/FreeTagsInput";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import informacoes from "@/utils/informacoes.json";
import { cadastrarVaga } from "../api/cadastrarVaga";
import { useAuth } from "@/contexts/AuthContext";
import { PlusCircle } from "lucide-react";
import { FormCalendar } from "@/features/Cadastro/components/FormCalendar";

type FormNewEventProps = {
  isOpen: DialogProps["open"];
  setIsOpen: DialogProps["onOpenChange"];
  typeButton: "floating" | "standard";
};

const tipoVaga = [
  { label: "Extensão", value: "Extensão" },
  { label: "Pesquisa", value: "Pesquisa" },
  { label: "Estágio", value: "Estágio" },
];

export function FormNewOportune({
  isOpen,
  setIsOpen,
  typeButton,
}: FormNewEventProps) {
  const { usuario } = useAuth();

  const form = useForm<vagaModel>({
    defaultValues: {
      titulo: "",
      descricao: "",
      tipo: "Estágio",
      semestreMinimo: "",
      prazoInscricao: "",
      requisitos: [],
      cursosAlvo: [],
    },
  });

  const { register, handleSubmit, control, reset } = form;

  const onSubmit = async (data: vagaModel) => {
    try {
      const payload = {
        ...data,
        semestreMinimo:
          typeof data.semestreMinimo === "string"
            ? parseInt(data.semestreMinimo, 10)
            : data.semestreMinimo,
        numeroVagas:
          data.numeroVagas && typeof data.numeroVagas === "string"
            ? parseInt(data.numeroVagas, 10)
            : data.numeroVagas || 1,
        empresaId: usuario?.empresa?.id,
      };

      await cadastrarVaga(payload);

      showMessage.success("Vaga cadastrada com sucesso!");
      reset();
      if (setIsOpen) {
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Erro ao cadastrar vaga:", error);
      showMessage.error("Não foi possivel cadastrar a vaga. Tente novamente");
    }
  };

  const onInvalid = (validationErrors: FieldErrors<vagaModel>) => {
    Object.values(validationErrors).forEach((error) => {
      if (error && error.message) {
        showMessage.error(error.message);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {typeButton === "floating" ? (
          <Button
            variant={"secondary"}
            className="absolute bottom-10 right-10 rounded-[50%] w-16 h-16 cursor-pointer active:rotate-360 duration-300"
          >
            <Image src={Logo} alt="Botão de criar nova tarefa" />
          </Button>
        ) : (
          <Button
            variant="oportune"
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              // aqui tu redireciona pro form de criação de vaga
            }}
          >
            <PlusCircle className="w-5 h-5" />
            Nova Vaga
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto scrollbar-modal modal-content-highlight bg-[#1E293B] text-white border border-white/10 rounded-2xl p-0">
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="flex flex-col h-full"
        >
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-white/10 sticky top-0 bg-[#1E293B] z-10">
            <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-[#2474e4] to-[#1a5bb8] bg-clip-text text-transparent">
              Nova Vaga
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 px-6 py-6 space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="titulo"
                className="text-white/90 font-medium text-sm"
              >
                Título da vaga
              </Label>
              <input
                type="text"
                id="titulo"
                {...register("titulo", {
                  required: "O título é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O título deve ter no mínimo 2 caracteres",
                  },
                })}
                className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[rgba(196,211,230,0.02)] text-white text-base transition-all focus:outline-none focus:border-[#2474e4] focus:ring-2 focus:ring-[#2474e4]/30"
                placeholder="Ex: Estágio em Desenvolvimento Web"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="descricao"
                className="text-white/90 font-medium text-sm"
              >
                Descrição da vaga
              </Label>
              <textarea
                id="descricao"
                {...register("descricao", {
                  required: "A descrição é obrigatória",
                  minLength: {
                    value: 10,
                    message: "A descrição deve ter no mínimo 10 caracteres",
                  },
                })}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[rgba(196,211,230,0.02)] text-white text-base transition-all focus:outline-none focus:border-[#2474e4] focus:ring-2 focus:ring-[#2474e4]/30 resize-none"
                placeholder="Descreva a vaga..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="tipo"
                  className="text-white/90 font-medium text-sm"
                >
                  Tipo de vaga
                </Label>
                <Controller
                  name="tipo"
                  control={control}
                  rules={{ required: "Escolha um tipo" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full h-[48px] bg-[rgba(196,211,230,0.02)] border-white/10 text-white">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1E293B] border-white/10">
                        {tipoVaga.map((opt) => (
                          <SelectItem
                            key={opt.value}
                            value={opt.value}
                            className="text-white focus:bg-[#2474e4]/20"
                          >
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white/90 font-medium text-sm">
                  Prazo de inscrição
                </Label>
                <FormCalendar
                  control={control}
                  name="prazoInscricao"
                  label=""
                  placeholder="Selecione a data"
                  toYear={new Date().getFullYear() + 10}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="requisitos"
                className="text-white/90 font-medium text-sm"
              >
                Requisitos
                <span className="text-white/50 text-xs font-normal">
                  {" "}
                  (Digite e pressione Enter ou clique em +)
                </span>
              </Label>
              <Controller
                name="requisitos"
                control={control}
                rules={{ required: "Digite ao menos um requisito." }}
                render={({ field }) => (
                  <FreeTagsInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Ex: JavaScript, React, Node.js..."
                  />
                )}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="cursosAlvo"
                className="text-white/90 font-medium text-sm"
              >
                Cursos alvo
                <span className="text-white/50 text-xs font-normal">
                  {" "}
                  (Selecione da lista)
                </span>
              </Label>
              <Controller
                name="cursosAlvo"
                control={control}
                rules={{ required: "Digite ao menos um curso" }}
                render={({ field }) => (
                  <TagsInput
                    value={field.value}
                    onChange={field.onChange}
                    suggestions={informacoes.cursos.filter(
                      (curso) => curso.value !== null
                    )}
                    placeholder="Busque e selecione os cursos..."
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="semestreMinimo"
                  className="text-white/90 font-medium text-sm"
                >
                  Semestre mínimo
                </Label>
                <input
                  type="number"
                  id="semestreMinimo"
                  {...register("semestreMinimo", {
                    required: "O semestre mínimo é obrigatório",
                    min: {
                      value: 1,
                      message: "O semestre não pode ser menor que 1",
                    },
                    max: {
                      value: 12,
                      message: "O semestre não pode ser maior que 12",
                    },
                  })}
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[rgba(196,211,230,0.02)] text-white text-base transition-all focus:outline-none focus:border-[#2474e4] focus:ring-2 focus:ring-[#2474e4]/30"
                  placeholder="1"
                  min="1"
                  max="12"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="numeroVagas"
                  className="text-white/90 font-medium text-sm"
                >
                  Número de vagas
                </Label>
                <input
                  type="number"
                  id="numeroVagas"
                  {...register("numeroVagas", {
                    required: "O número de vagas é obrigatório",
                    min: {
                      value: 1,
                      message: "Deve ter no mínimo 1 vaga",
                    },
                    max: {
                      value: 1000,
                      message: "Não pode ter mais de 1000 vagas",
                    },
                  })}
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[rgba(196,211,230,0.02)] text-white text-base transition-all focus:outline-none focus:border-[#2474e4] focus:ring-2 focus:ring-[#2474e4]/30"
                  placeholder="1"
                  min="1"
                  max="1000"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t border-white/10 sticky bottom-0 bg-[#1E293B] z-10 flex-row gap-3">
            <DialogClose asChild>
              <Button
                type="button"
                className="flex-1 h-12 bg-transparent hover:bg-white/5 text-white border border-white/20 transition-all font-medium"
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="flex-1 h-12 bg-[#2474e4] hover:bg-[#1a5bb8] text-white transition-all font-medium"
            >
              Criar Vaga
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
