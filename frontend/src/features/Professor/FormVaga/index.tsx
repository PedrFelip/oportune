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
import { cadastrarVaga } from "../api/cadastrarVaga";
import { FormCalendar } from "../components/FormCalendar";
import { useAuth } from "@/contexts/AuthContext";

type FormNewEventProps = {
  isOpen: DialogProps["open"];
  setIsOpen: DialogProps["onOpenChange"];
};

const tipoVaga = [
  { label: "Extensão", value: "Extensão" },
  { label: "Pesquisa", value: "Pesquisa" },
  { label: "Estágio", value: "Estágio" },
];

export function FormNewOportune({ isOpen, setIsOpen }: FormNewEventProps) {
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

  const { register, handleSubmit, control } = form;

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
        professorId: usuario?.professor?.id,
      };

      console.log("Payload sendo enviado:", payload);
      await cadastrarVaga(payload);

      showMessage.success("Vaga cadastrada com sucesso!");
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
        <Button
          variant={"secondary"}
          className="absolute bottom-10 right-10 rounded-[50%] w-16 h-16 cursor-pointer active:rotate-360 duration-300"
        >
          <Image src={Logo} alt="Botão de criar nova tarefa" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-foreground text-white border-0 rounded-2xl">
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold text-center">
              Adicionar evento
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-2">
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
            <div className="grid gap-3">
              <div className="flex justify-between">
                <div className="">
                  <Label htmlFor="tipo" className="px-1 py-2">
                    Tipo de oportunidade
                  </Label>
                  <Controller
                    name="tipo"
                    control={control}
                    rules={{ required: "Escolha um tipo" }}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
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
                </div>
                <div className="">
                  <FormCalendar
                    control={control}
                    name="prazoInscricao"
                    label="Prazo de inscrição"
                    placeholder="Prazo de inscrição"
                  />
                </div>
              </div>
            </div>
            {/* Montar o input de requisitos */}
            {/* // Será alterado para usar um criador de labels e values, alem de permitir a criação de novos requisitos */}
            <div className="grid gap-3">
              <Label htmlFor="requisitos" className="px-1">
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
            <div className="flex gap-3">
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
              <FormInput
                id="maximoVagas"
                label="Número de vagas: "
                {...register("numeroVagas", {
                  required: "O numero minimo de vagas é obrigatório",
                  min: {
                    value: 1,
                    message: "O número de vagas não pode ser menor que 1",
                  },
                  max: {
                    value: 1000,
                    message: "O número de vagas não pode ser maior que 1000",
                  },
                })}
              />
            </div>
          </div>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant="destructive">Cancelar</Button>
            </DialogClose>
            <Button type="submit" variant={"oportune"}>
              Criar evento
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
