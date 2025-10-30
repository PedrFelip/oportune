"use client";

import * as React from "react";
import { Search, Briefcase } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Vaga } from "@/models/vaga"; // Importe o tipo Vaga se necessário
import { buscarVagas } from "@/features/Aluno/api/buscarVagas";

export function SearchVagaCommand() {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [vagas, setVagas] = React.useState<Vaga[]>([]); // Corrigido para array de Vaga

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const carregarVagas = async () => {
    try {
      const vagasReq = await buscarVagas();

      if (vagasReq === null) {
        throw new Error("Falha na requisição");
      }
      setVagas(vagasReq);
    } catch (error) {
      console.error("Erro ao carregar vagas:", error);
    }
  };

  React.useEffect(() => {
    carregarVagas();
  }, []);

  // const handleSearch = () => {
  //   console.log("Buscando vaga:", searchValue);
  //   // 🔍 Aqui entra sua lógica de busca (chamada de API, filtro, etc.)
  //   setOpen(false);
  // };

  return (
    <>
      <Button
        variant="outline"
        className="cursor-pointer bg-blue-400 border-blue-400 hover:bg-blue-600 transition-colors duration-300"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Buscar Vaga
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Digite o nome da vaga..."
          value={searchValue}
          onValueChange={setSearchValue}
        />
        <CommandList>
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>

          <CommandGroup heading="Vagas recentes">
            {vagas.slice(0, 5).map(
              (
                vaga // Exibe as primeiras 3 vagas
              ) => (
                <CommandItem key={vaga.id}>
                  <Briefcase className="mr-2 h-4 w-4" />
                  <span>{vaga.titulo}</span>
                </CommandItem>
              )
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
