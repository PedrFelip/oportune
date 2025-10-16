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
import FormInput from "@/components/FormInput";
import { vagaModel } from "@/models/oportunidadeModel";
import { DialogProps } from "@radix-ui/react-dialog";
import { showMessage } from "@/adapters/showMessage";
import { TagsInput } from "@/components/TagsInput";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import informacoes from "@/utils/informacoes.json";

type FormNewEventProps = {
  isOpen: DialogProps["open"];
  setIsOpen: DialogProps["onOpenChange"];
};

const tipoVaga = [
  { label: "Extensão", value: "extensao" },
  { label: "Científico", value: "cientifico" },
  { label: "Estágio", value: "estagio" },
];

export function FormNewOportune({ isOpen, setIsOpen }: FormNewEventProps) {
  const form = useForm<vagaModel>({
    defaultValues: {
      titulo: "",
    },
  });

  const { register, handleSubmit, control } = form;

  const onSubmit = () => {
    return null;
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
        <Button
          variant={"secondary"}
          className="absolute bottom-10 right-10 rounded-[50%] w-16 h-16 cursor-pointer hover:rotate-360 duration-500"
        >
          <Image src={Logo} alt="Botão de criar nova tarefa" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-foreground text-white border-0 rounded-2xl">
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold text-center">
              Adicionar evento
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <FormInput
              id="titulo"
              label="Título da oportunidade: "
              {...register("titulo")}
            />
            <FormInput
              id="descricao"
              label="Breve descrição da oportunidade: "
              {...register("descricao")}
            />
            {/* Montar o select de tipo */}
            <Label htmlFor="tipo" className="px-1">
              Tipo de oportunidade
            </Label>
            <Controller
              name="tipo"
              control={control}
              rules={{ required: "Escolha um tipo" }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={"Tipo de oportunidade"} />
                  </SelectTrigger>
                  <SelectContent>
                    {tipoVaga.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {/* Montar o input de requisitos */}
            {/* // Será alterado para usar um criador de labels e values, alem de permitir a criação de novos requisitos */}
            <div className="grid gap-3">
              <Label htmlFor="date" className="px-1">
                Requisitos
              </Label>
              <Controller
                name="requisitos"
                control={control}
                rules={{ required: "Digite ao menos um requisito." }}
                render={({ field }) => (
                  <TagsInput
                    value={field.value}
                    onChange={field.onChange}
                    suggestions={informacoes.requisitos}
                  />
                )}
              />
            </div>
            <div className="flex gap-3">
              <div className="grid gap-3">
                <Label htmlFor="cursosAlvo" className="px-1">
                  Cursos
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
                    />
                  )}
                />
              </div>
              <FormInput
                id="semestreMinimo"
                label="Qual o semestre mínimo: "
                {...register("semestreMinimo", {
                  required: "O semestre minimo é obrigatório",
                  maxLength: {
                    value: 12,
                    message: "O número do semestre não pode ser maior que 12", // Ajustar para ficar dinâmico, conforme o curso
                  },
                  minLength: {
                    value: 1,
                    message: "O número do semestre não pode ser menor que 1",
                  },
                })}
              />
            </div>
          </div>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Criar evento</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
