"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CircleCheck } from "lucide-react";

interface Mensagem {
  titulo: string;
  descricao: string;
  icone: string;
  cor: string;
}

interface Acao {
  label: string;
  variant: string;
}

export interface VariavelVaga {
  id: number;
  titulo: string;
  status: string;
  empresa: string;
  data: string;
  mensagem: Mensagem;
  acoes: Acao[];
}

type CardStatusVagaProps = {
  variaveis: VariavelVaga[];
};

const statusColorMap = {
  aprovado: {
    variant: "green",
    color: "text-green-400",
    border: "border-green-600",
    bg: "bg-green-500/20",
  },
  pendente: {
    variant: "yellow",
    color: "text-yellow-400",
    border: "border-yellow-600",
    bg: "bg-yellow-500/20",
  },
  rejeitado: {
    variant: "red",
    color: "text-red-400",
    border: "border-red-600",
    bg: "bg-red-500/20",
  },
} as const;

export function CardStatusVaga({ variaveis }: CardStatusVagaProps) {
  return (
    <>
      {variaveis &&
        variaveis.map((variavel) => {
          const statusKey =
            variavel.status.toLowerCase() as keyof typeof statusColorMap;
          const cores = statusColorMap[statusKey] ?? statusColorMap.pendente;

          return (
            <Accordion
              key={variavel.id}
              type="single"
              collapsible
              className="w-full bg-gray-400/10 px-4 pb-0 mb-8 rounded-2xl"
              defaultValue="item-1"
            >
              <AccordionItem value={String(variavel.id)}>
                <AccordionTrigger className="">
                  <div className="flex justify-between w-full mx-4">
                    <h3 className="text-2xl font-bold">{variavel.titulo}</h3>
                    <Badge variant={`${cores.variant}`} className="text-sm">
                      {variavel.status}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-base px-4">
                  <p className="font-bold">
                    Empresa:{" "}
                    <span className="text-blue-500 font-normal">
                      {variavel.empresa}
                    </span>
                  </p>
                  <p className="font-bold">
                    Data:{" "}
                    <span className="font-normal">
                      {format(variavel.data, "dd/MM/yyyy")}
                    </span>
                  </p>
                  <div
                    className={`flex ${cores.bg} border ${cores.border} rounded-2xl p-6 items-center gap-6`}
                  >
                    <CircleCheck className={cores.color} />
                    <div className="flex flex-col">
                      <h4 className={`${cores.color} font-bold`}>
                        Parabéns! Sua candidatura foi aprovada.
                      </h4>
                      <p>A empresa entrará em contato em breve.</p>
                    </div>
                  </div>
                  <div className="flex gap-8">
                    <Button variant={"ghost_blue"}>Ver detalhes da vaga</Button>
                    <Button variant={"oportune"}>Ver perfil da empresa</Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
    </>
  );
}
