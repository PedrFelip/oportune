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
import { useForm } from "react-hook-form";
import FormInput from "@/components/FormInput";
import { vagaModel } from "@/models/oportunidadeModel";
import { DialogProps } from "@radix-ui/react-dialog";

type FormNewEventProps = {
  isOpen: DialogProps["open"];
  setIsOpen: DialogProps["onOpenChange"];
};

export function FormNewOportune({ isOpen, setIsOpen }: FormNewEventProps) {
  const form = useForm<vagaModel>({
    defaultValues: {
      titulo: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = () => {
    return null;
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
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
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
            {/* Montar o input de requisitos */}
            {/* <FormInput
              id="requisitos"
              label="Requisitos: "
              {...register("requisitos")}
            /> */}
            {/* Montar o select de tipo */}
            {/* <FormSelect
              name="tipo"
              label="Breve descrição da oportunidade: "
              {...register("descricao")}
            /> */}
            {/* Montar o inputCalendar */}
            {/* Montar o input de cursosAlvo, igual ao de requisitos */}
            <FormInput
              id="semestreMinimo"
              label="Qual o semestre mínimo: "
              {...register("semestreMinimo")}
            />
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
