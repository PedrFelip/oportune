"use client";
import { InfoVaga } from "@/components/InfoVaga";
import { Categoria } from "@/components/Categoria";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface infos {
  titulo: string;
  tags: string[];
  empresa: string;
  descricao: string;
  responsabilidades: string[];
  requisitos: string[];
  curso: string[];
  semestre: string;
  bolsa: string;
  prazoInscricao: string;
  sobre: string;
}

type vagaProps = {
  vaga: infos;
};

export function Vaga({ vaga }: vagaProps) {
  const router = useRouter();

  const handleVoltar = () => {
    router.back();
  };

  const Back = () => (
    <button
      className="flex items-center gap-4 cursor-pointer"
      onClick={handleVoltar}
    >
      {<ChevronLeft />}
    </button>
  );

  return (
    <>
      <header className="flex items-center justify-between gap-3 text-white p-2">
        <div className="flex w-full gap-4">
          <h2 className="flex gap-4 text-2xl font-bold">
            <Back />
            {vaga.titulo}
          </h2>
          <div className="flex gap-5">
            {vaga.tags.map((tag, index) => (
              <Categoria key={index} caracteristica={tag}></Categoria>
            ))}
          </div>
        </div>
        <div className="flex">
          <Button
            variant={"oportune"}
            className="cursor-pointer duration-300 p-2 rounded-xl w-40"
          >
            Candidatar-se
          </Button>
        </div>
      </header>
      <main className="flex justify-between m-2 text-white ">
        <section className="flex flex-col gap-6 w-65/100 bg-[#1E293B] p-6 rounded-2xl">
          <InfoVaga titulo={"Descrição da vaga"} descricao={vaga.descricao} />
          <InfoVaga
            titulo={"Responsabilidades"}
            descricao={vaga.responsabilidades}
            tipo={"lista"}
          />
          <InfoVaga
            titulo={"Requisitos"}
            descricao={vaga.requisitos}
            tipo={"lista"}
          />
        </section>
        <section className="flex flex-col gap-5 w-3/10 bg-[#1E293B] p-6 rounded-2xl">
          <InfoVaga
            titulo={"Curso Requisitado"}
            descricao={vaga.curso}
            tipo="lista"
          />
          <InfoVaga
            titulo={"Semestre Mínimo"}
            descricao={`A partir do ${vaga.semestre}°`}
          />
          <InfoVaga titulo={"Bolsa Auxilio"} descricao={vaga.bolsa} />
          <InfoVaga
            titulo={"Prazo de inscrição"}
            descricao={vaga.prazoInscricao}
          />
          <InfoVaga titulo={"Sobre a empresa"} descricao={vaga.sobre} />
        </section>
      </main>
    </>
  );
}
