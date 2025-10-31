"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CircleCheck, Clock, XCircle } from "lucide-react";
import { CandidaturaResponse } from "../hooks/useCandidaturas";
import Link from "next/link";

type CardStatusVagaProps = {
  candidaturas: CandidaturaResponse[];
};

const statusColorMap = {
  ACEITA: {
    variant: "green" as const,
    color: "text-green-400",
    border: "border-green-600",
    bg: "bg-green-500/20",
    icon: CircleCheck,
    titulo: "Parabéns! Sua candidatura foi aceita.",
    descricao: "O responsável pela vaga entrará em contato em breve.",
  },
  PENDENTE: {
    variant: "yellow" as const,
    color: "text-yellow-400",
    border: "border-yellow-600",
    bg: "bg-yellow-500/20",
    icon: Clock,
    titulo: "Sua candidatura está em análise.",
    descricao: "A equipe de recrutamento está avaliando seu perfil. Você receberá uma resposta em breve.",
  },
  RECUSADA: {
    variant: "red" as const,
    color: "text-red-400",
    border: "border-red-600",
    bg: "bg-red-500/20",
    icon: XCircle,
    titulo: "Sua candidatura não foi aprovada desta vez.",
    descricao: "Agradecemos o seu interesse. Continue acompanhando novas oportunidades.",
  },
} as const;

const statusLabelMap = {
  ACEITA: "Aceita",
  PENDENTE: "Pendente",
  RECUSADA: "Recusada",
} as const;

export function CardStatusVaga({ candidaturas }: CardStatusVagaProps) {
  return (
    <>
      {candidaturas.map((candidatura) => {
        const config = statusColorMap[candidatura.status];
        const Icon = config.icon;

        return (
          <Accordion
            key={candidatura.id}
            type="single"
            collapsible
            className="w-full bg-gray-400/10 px-4 pb-0 mb-8 rounded-2xl"
          >
            <AccordionItem value={candidatura.id}>
              <AccordionTrigger className="">
                <div className="flex justify-between w-full mx-4">
                  <h3 className="text-2xl font-bold">
                    {candidatura.vaga.titulo}
                  </h3>
                  <Badge variant={config.variant} className="text-sm">
                    {statusLabelMap[candidatura.status]}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-base px-4">
                <p className="font-bold">
                  {candidatura.responsavel.tipo === "EMPRESA" ? "Empresa" : "Professor"}:{" "}
                  <span className="text-blue-500 font-normal">
                    {candidatura.responsavel.nome}
                  </span>
                </p>
                <p className="font-bold">
                  Tipo de vaga:{" "}
                  <span className="font-normal">
                    {candidatura.vaga.tipo === "ESTAGIO"
                      ? "Estágio"
                      : candidatura.vaga.tipo === "PESQUISA"
                      ? "Pesquisa"
                      : "Extensão"}
                  </span>
                </p>
                <p className="font-bold">
                  Data da candidatura:{" "}
                  <span className="font-normal">
                    {candidatura.dataCandidatura}
                  </span>
                </p>
                <div
                  className={`flex ${config.bg} border ${config.border} rounded-2xl p-6 items-center gap-6`}
                >
                  <Icon className={config.color} size={32} />
                  <div className="flex flex-col">
                    <h4 className={`${config.color} font-bold`}>
                      {config.titulo}
                    </h4>
                    <p>{config.descricao}</p>
                  </div>
                </div>
                <div className="flex gap-8">
                  <Link href={`/aluno/vagas/${candidatura.vaga.id}`}>
                    <Button variant={"ghost_blue"}>Ver detalhes da vaga</Button>
                  </Link>
                  {candidatura.responsavel.tipo === "EMPRESA" && (
                    <Link href={`/perfil/${candidatura.responsavel.idResponsavel}`}>
                      <Button variant={"oportune"}>Ver perfil da empresa</Button>
                    </Link>
                  )}
                  {candidatura.responsavel.tipo === "PROFESSOR" && (
                    <Link href={`/perfil/${candidatura.responsavel.idResponsavel}`}>
                      <Button variant={"oportune"}>Ver perfil do professor</Button>
                    </Link>
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
