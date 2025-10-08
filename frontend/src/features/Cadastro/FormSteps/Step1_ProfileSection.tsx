import React from "react";
import Link from "next/link";
import CardHeader from "../components/CardHeader";
import { ProfileType } from "../@types/type";
import { AuthHeader } from "@/components/AuthHeaderForm";

interface step1Props {
  onProfileSelect: (type: ProfileType) => void;
}

type Role = {
  type: ProfileType;
  title: string;
  description: string;
};

export function Step1_ProfileSection({ onProfileSelect }: step1Props) {
  const roles: Role[] = [
    {
      type: "ESTUDANTE",
      title: "Sou Aluno",
      description: "Procurando por estágios, projetos de pesquisa e extensão.",
    },
    {
      type: "EMPRESA",
      title: "Sou Empresa",
      description:
        "Buscando por talentos universitários para preencher as minhas vagas.",
    },
    {
      type: "PROFESSOR",
      title: "Sou Professor",
      description: "Querendo divulgar projetos e recrutar alunos.",
    },
  ];

  const handleClick = (type: ProfileType) => {
    onProfileSelect(type);
  };

  return (
    <div className="animate-fadeIn">
      <AuthHeader
        title="Junte-se ao Oportune"
        description="Selecione o tipo de perfil que melhor o descreve."
      />
      <main>
        {roles.map((role) => (
          <div
            key={role.type}
            onClick={() => handleClick(role.type)}
            className="bg-[rgba(196,211,230,0.02)] border border-white/5 rounded-xl p-4 mb-3 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-[rgba(196,211,230,0.04)] hover:border-[#40638c]"
          >
            <h3 className="text-white font-bold text-base">{role.title}</h3>
            <p className="text-[#c4d3e6] text-xs leading-relaxed">
              {role.description}
            </p>
          </div>
        ))}
      </main>
      <footer className="text-center mt-6 text-sm">
        <p className="text-[#c4d3e6]">
          Já tem uma conta?{" "}
          <Link
            href={"/login"}
            className="font-semibold text-[#639bec] hover:text-white hover:underline"
          >
            Faça login
          </Link>
        </p>
      </footer>
    </div>
  );
}
