import React, { useEffect, useState } from "react";
import { Progress } from "../ui/progress";

function getInitials(name: string) {
  if (!name) return "";
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase())
    .join("");
}

interface perfilAluno {
  nome: string;
  curso: string;
  semestre: string;
  porcentagem: number | string;
}

type perfilCardProps = {
  perfil: perfilAluno;
};

export function PerfilCard({ perfil }: perfilCardProps) {
  const [progress, setProgress] = useState(15);
  useEffect(() => {
    const timer = setTimeout(
      () => setProgress(Number(perfil.porcentagem)),
      700
    );
    return () => clearTimeout(timer);
  }, [perfil.porcentagem]);

  if (!perfil) {
    return (
      <div className="bg-slate-800 p-6 rounded-lg">
        <div className="text-slate-400">Carregando perfil...</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 p-6 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-blue-400 flex items-center justify-center text-slate-800 text-3xl font-bold border-4 border-slate-700">
          {getInitials(perfil.nome)}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{perfil.nome}</h2>
          <p className="text-slate-400">
            {perfil.curso} - {perfil.semestre}º Semestre
          </p>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-slate-400">Perfil Completo</span>
          <span className="text-sm font-semibold text-white">
            {perfil.porcentagem || 0}%
          </span>
        </div>
        <Progress value={progress} className="[&>div]:bg-blue-500"/>
      </div>
    </div>
  );
}
