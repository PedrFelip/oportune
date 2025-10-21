"use client";

import { Button } from "@/components/ui/button";
import { CardStatusVaga } from "./CardStatusVaga";
import { useState } from "react";

export const variaveis = [
  {
    id: 1,
    titulo: "Desenvolvimento em Front End",
    status: "Aprovado",
    empresa: "DevFuture",
    data: "2025-09-05",
    mensagem: {
      titulo: "Parabéns! Sua candidatura foi aprovada.",
      descricao: "A empresa entrará em contato em breve.",
      icone: "CircleCheck",
      cor: "green",
    },
    acoes: [
      {
        label: "Ver detalhes da vaga",
        variant: "ghost_blue",
      },
      {
        label: "Ver perfil da empresa",
        variant: "oportune",
      },
    ],
  },
  {
    id: 2,
    titulo: "Desenvolvedor Back End",
    status: "Rejeitado",
    empresa: "TechWave Solutions",
    data: "2025-08-22",
    mensagem: {
      titulo: "Sua candidatura não foi aprovada desta vez.",
      descricao:
        "Agradecemos o seu interesse. Continue acompanhando novas oportunidades.",
      icone: "XCircle",
      cor: "red",
    },
    acoes: [
      {
        label: "Ver outras vagas",
        variant: "ghost_red",
      },
      {
        label: "Tentar novamente",
        variant: "outline",
      },
    ],
  },
  {
    id: 3,
    titulo: "Analista de QA",
    status: "Pendente",
    empresa: "InovaTech",
    data: "2025-10-02",
    mensagem: {
      titulo: "Sua candidatura está em análise.",
      descricao:
        "A equipe de recrutamento está avaliando seu perfil. Você receberá uma resposta em breve.",
      icone: "Clock",
      cor: "yellow",
    },
    acoes: [
      {
        label: "Ver status da vaga",
        variant: "ghost_yellow",
      },
      {
        label: "Cancelar candidatura",
        variant: "outline",
      },
    ],
  },
];

export function Candidaturas() {
  console.log("Renderizou Candidaturas no cliente");

  const [categoria, setCategoria] = useState("");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log("Valor do botão");
    console.log(e.currentTarget.value);
    setCategoria(e.currentTarget.value);
    console.log(categoria);
  };

  // const variaveisFiltradas = variaveis.filter((item) => {
  //   const matchesCategory =
  //     selectedCategory === "todas" || item.category === selectedCategory;
  //   const matchesSearch =
  //     searchTerm === "" ||
  //     item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.answer.toLowerCase().includes(searchTerm.toLowerCase());
  //   return matchesCategory && matchesSearch;
  // });
  return (
    <div className="flex flex-col gap-4 text-white">
      <header className="flex flex-col gap-4">
        <h2 className="text-3xl text-white font-bold">Minhas Candidaturas</h2>
        <div className="flex gap-8">
          <Button
            className="border-l-4 border-[#7C3AED] bg-gray-400/10 cursor-pointer hover:bg-gray-700"
            value={"todas"}
            onClick={(e) => {
              console.log("Clicou");
              handleClick(e);
            }}
          >
            Todas
          </Button>
          <Button
            className="border-l-4 border-green-500 bg-gray-400/10 cursor-pointer hover:bg-gray-700"
            value={"aprovadas"}
            onClick={handleClick}
          >
            Aprovadas
          </Button>
          <Button
            className="border-l-4 border-yellow-500 bg-gray-400/10 cursor-pointer hover:bg-gray-700"
            value={"pendentes"}
            onClick={handleClick}
          >
            Pendentes
          </Button>
          <Button
            className="border-l-4 border-red-500 bg-gray-400/10 cursor-pointer hover:bg-gray-700"
            value={"rejeitadas"}
            onClick={handleClick}
          >
            Rejeitadas
          </Button>
        </div>
      </header>
      <main className="flex flex-col items-center mt-10">
        <CardStatusVaga variaveis={variaveis} />
      </main>
    </div>
  );
}
