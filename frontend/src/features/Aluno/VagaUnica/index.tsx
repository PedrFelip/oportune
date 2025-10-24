"use client";
import { InfoVaga } from "@/components/InfoVaga";
import { Categoria } from "@/components/Categoria";
import React from "react";
import { ArrowUpRight, Building2, ChevronLeft, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Candidatar } from "../api/candidatar";
import { showMessage } from "@/adapters/showMessage";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

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
  responsavel?: {
    id: string;
    tipo: "EMPRESA" | "PROFESSOR";
    nome: string;
  };
}

type vagaProps = {
  vaga: infos;
  id: string;
};

export function Vaga({ vaga, id }: vagaProps) {
  const { usuario } = useAuth();
  const router = useRouter();

  const perfilLink = vaga.responsavel ? `/perfil/${vaga.responsavel.id}` : null;
  const perfilLabel =
    vaga.responsavel?.tipo === "EMPRESA"
      ? "Ver perfil da empresa"
      : "Ver perfil do professor";
  const PerfilIcon =
    vaga.responsavel?.tipo === "EMPRESA" ? Building2 : UserCircle;

  const handleVoltar = () => {
    router.back();
  };

  if (!usuario) {
    return <p>Erro! Por favor tente novamente</p>;
  }

  const Back = () => (
    <button
      className="flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
      onClick={handleVoltar}
    >
      <ChevronLeft className="h-5 w-5" />
      <span className="hidden sm:inline">Voltar</span>
    </button>
  );

  const CandidatarSe = async (estudanteId: string, vagaId: string) => {
    try {
      const payload = {
        estudanteId: estudanteId,
        vagaId: vagaId,
      };
      showMessage.loading("Aguarde...");
      await Candidatar(payload);
      showMessage.success("Candidatura realizada");
    } catch (error) {
      showMessage.dismiss();
      console.error(error);
      showMessage.error("Erro ao se candidatar");
    }
  };

  return (
    <>
      <header className="flex flex-col gap-5 text-white p-2 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center gap-3">
            <Back />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold">{vaga.titulo}</h1>
            </div>
            {vaga.responsavel && perfilLink && (
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                <PerfilIcon className="h-5 w-5 text-blue-300" />
                <span className="font-medium text-slate-200">
                  {vaga.responsavel.nome}
                </span>
                <Link
                  href={perfilLink}
                  title={perfilLabel}
                  className="inline-flex items-center gap-1 text-blue-300 hover:text-blue-200"
                >
                  <span>{perfilLabel}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {vaga.tags.map((tag, index) => (
              <Categoria key={index} caracteristica={tag}></Categoria>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant={"oportune"}
            className="cursor-pointer duration-300 p-2 rounded-xl w-40"
            onClick={() => {
              CandidatarSe(usuario.id, id);
            }}
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
