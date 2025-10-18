import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { SearchIcon } from "lucide-react";

type inputModalProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

export function InputModal({ open, onOpenChange }: inputModalProps) {
  const { handleSubmit } = useForm();
  const onSubmit = () => {
    // Logica de enviar o coisa
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={
            "cursor-pointer bg-blue-400 border-blue-400 hover:bg-blue-600 transition-colors duration-300"
          }
        >
          <SearchIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] bg-gray-700 border-0">
        <form onSubmit={handleSubmit(onSubmit)} className="px-2">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-secondary">Buscar vaga</DialogTitle>
          </DialogHeader>
          <Input type="text" className={"m-4"} />
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="destructive"
                className={"cursor-pointer"}
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant={"oportune"}
              className={"cursor-pointer"}
            >
              Realizar Busca
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
