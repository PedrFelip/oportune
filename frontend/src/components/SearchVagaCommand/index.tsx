"use client";

import * as React from "react";
import { Search, Briefcase, XCircle } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

export function SearchVagaCommand() {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

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

  const handleSearch = () => {
    console.log("Buscando vaga:", searchValue);
    // 🔍 Aqui entra sua lógica de busca (chamada de API, filtro, etc.)
    setOpen(false);
  };

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

          <CommandGroup heading="Ações rápidas">
            <CommandItem onSelect={handleSearch}>
              <Search className="mr-2 h-4 w-4" />
              <span>Realizar busca</span>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <XCircle className="mr-2 h-4 w-4" />
              <span>Cancelar</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Vagas recentes">
            <CommandItem>
              <Briefcase className="mr-2 h-4 w-4" />
              <span>Desenvolvedor Front-end</span>
            </CommandItem>
            <CommandItem>
              <Briefcase className="mr-2 h-4 w-4" />
              <span>Estágio em TI</span>
            </CommandItem>
            <CommandItem>
              <Briefcase className="mr-2 h-4 w-4" />
              <span>Analista Júnior</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
