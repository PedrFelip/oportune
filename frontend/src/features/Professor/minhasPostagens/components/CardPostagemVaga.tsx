"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Pencil, XCircle, Users } from "lucide-react";
import Link from "next/link";
import { Vaga } from "@/models/vaga";

type CardPostagemVagaProps = {
  vagas: Vaga[];
};

const statusVagaMap = {
  ATIVA: {
    color: "text-green-400",
    border: "border-green-600",
    bg: "bg-green-500/20",
    label: "Ativa",
  },
  ENCERRADA: {
    color: "text-red-400",
    border: "border-red-600",
    bg: "bg-red-500/20",
    label: "Encerrada",
  },
} as const;

export function CardPostagemVaga({ vagas }: CardPostagemVagaProps) {
  return (
    <>
      {vagas.map((vaga) => {
        const isEncerrada = new Date(vaga.prazoInscricao) < new Date();
        const status = isEncerrada
          ? statusVagaMap.ENCERRADA
          : statusVagaMap.ATIVA;
        const semestreLabel =
          vaga.semestre && /^\d+$/.test(vaga.semestre)
            ? `${vaga.semestre}º`
            : vaga.semestre || "Não informado";

        return (
          <Accordion
            key={vaga.id}
            type="single"
            collapsible
            className="w-full bg-gray-400/10 px-4 pb-0 mb-8 rounded-2xl"
          >
            <AccordionItem value={vaga.id}>
              <AccordionTrigger>
                <div className="flex justify-between w-full mx-4">
                  <h3 className="text-2xl font-bold">{vaga.titulo}</h3>
                  <Badge
                    className={`text-sm ${status.bg} ${status.color} border ${status.border}`}
                  >
                    {status.label}
                  </Badge>
                </div>
              </AccordionTrigger>

              <AccordionContent className="flex flex-col gap-4 text-base px-4">
                <p className="font-bold">
                  Descrição:{" "}
                  <span className="font-normal">{vaga.descricao}</span>
                </p>

                <p className="font-bold">
                  Tipo de vaga:{" "}
                  <span className="font-normal">
                    {vaga.tipo === "ESTAGIO"
                      ? "Estágio"
                      : vaga.tipo === "PESQUISA"
                      ? "Pesquisa"
                      : "Extensão"}
                  </span>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p className="font-bold">
                    Curso: <span className="font-normal">{vaga.curso}</span>
                  </p>
                  <p className="font-bold">
                    Semestre mínimo:{" "}
                    <span className="font-normal">{semestreLabel}</span>
                  </p>
                  <p className="font-bold flex items-center gap-2">
                    <Calendar className="text-blue-400" size={18} />
                    Prazo de inscrição:{" "}
                    <span className="font-normal">
                      {new Date(vaga.prazoInscricao).toLocaleDateString(
                        "pt-BR"
                      )}
                    </span>
                  </p>
                  <p className="font-bold flex items-center gap-2">
                    <Users className="text-purple-400" size={18} />
                    Candidaturas:{" "}
                    <span className="font-normal">
                      {vaga.candidaturas?.length ?? 0}
                    </span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 mt-3">
                  {(vaga.categorias || []).map((cat) => (
                    <Badge
                      key={cat}
                      variant="outline"
                      className="border-blue-600 text-blue-400"
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-8 mt-6 flex-wrap">
                  <Link href={`/vagas/${vaga.id}`}>
                    <Button variant={"ghost_blue"}>Ver detalhes</Button>
                  </Link>
                  <Link href={`/vagas/editar/${vaga.id}`}>
                    <Button
                      variant={"oportune"}
                      className="flex items-center gap-2"
                    >
                      <Pencil size={18} />
                      Editar vaga
                    </Button>
                  </Link>

                  {!isEncerrada && (
                    <>
                      <Link href={`/vagas/editar/${vaga.id}`}>
                        <Button
                          variant={"oportune"}
                          className="flex items-center gap-2"
                        >
                          <Pencil size={18} />
                          Editar vaga
                        </Button>
                      </Link>
                      <Button
                        variant={"destructive"}
                        className="flex items-center gap-2"
                        onClick={() => {
                          // função de encerrar vaga
                        }}
                      >
                        <XCircle size={18} />
                        Encerrar vaga
                      </Button>
                    </>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </>
  );
}
