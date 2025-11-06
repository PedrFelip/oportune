"use client";

import { Button } from "@/components/ui/button";
import { CardStatusVaga } from "./CardStatusVaga";
import { useMemo, useState } from "react";
import { useCandidaturas } from "../hooks/useCandidaturas";

type StatusFilter = "todas" | "aceitas" | "pendentes" | "recusadas";

export function Candidaturas() {
  const { candidaturas, loading, error, refetch, removerCandidatura } =
    useCandidaturas();
  const [filtroStatus, setFiltroStatus] = useState<StatusFilter>("todas");

  const candidaturasFiltradas = useMemo(() => {
    if (filtroStatus === "todas") return candidaturas;

    const statusMap: Record<Exclude<StatusFilter, "todas">, string> = {
      aceitas: "ACEITA",
      pendentes: "PENDENTE",
      recusadas: "RECUSADA",
    };

    return candidaturas.filter(
      (c) =>
        c.status === statusMap[filtroStatus as Exclude<StatusFilter, "todas">],
    );
  }, [candidaturas, filtroStatus]);

  const handleFiltroClick = (status: StatusFilter) => {
    setFiltroStatus(status);
  };

  const contadores = useMemo(() => {
    return {
      todas: candidaturas.length,
      aceitas: candidaturas.filter((c) => c.status === "ACEITA").length,
      pendentes: candidaturas.filter((c) => c.status === "PENDENTE").length,
      recusadas: candidaturas.filter((c) => c.status === "RECUSADA").length,
    };
  }, [candidaturas]);

  if (error) {
    return (
      <div className="flex flex-col gap-4 text-white">
        <h2 className="text-3xl text-white font-bold">Minhas Candidaturas</h2>
        <div className="bg-red-500/20 border border-red-600 rounded-lg p-4 flex flex-col gap-4">
          <p className="text-red-400">{error}</p>
          <Button onClick={refetch} variant="outline" className="w-fit">
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 text-white">
      <header className="flex flex-col gap-4">
        <h2 className="text-3xl text-white font-bold">Minhas Candidaturas</h2>
        <div className="flex gap-8">
          <Button
            className={`border-l-4 border-[#7C3AED] bg-gray-400/10 cursor-pointer hover:bg-gray-700 ${
              filtroStatus === "todas" ? "bg-gray-700" : ""
            }`}
            onClick={() => handleFiltroClick("todas")}
          >
            Todas ({contadores.todas})
          </Button>
          <Button
            className={`border-l-4 border-green-500 bg-gray-400/10 cursor-pointer hover:bg-gray-700 ${
              filtroStatus === "aceitas" ? "bg-gray-700" : ""
            }`}
            onClick={() => handleFiltroClick("aceitas")}
          >
            Aceitas ({contadores.aceitas})
          </Button>
          <Button
            className={`border-l-4 border-yellow-500 bg-gray-400/10 cursor-pointer hover:bg-gray-700 ${
              filtroStatus === "pendentes" ? "bg-gray-700" : ""
            }`}
            onClick={() => handleFiltroClick("pendentes")}
          >
            Pendentes ({contadores.pendentes})
          </Button>
          <Button
            className={`border-l-4 border-red-500 bg-gray-400/10 cursor-pointer hover:bg-gray-700 ${
              filtroStatus === "recusadas" ? "bg-gray-700" : ""
            }`}
            onClick={() => handleFiltroClick("recusadas")}
          >
            Recusadas ({contadores.recusadas})
          </Button>
        </div>
      </header>
      <main className="flex flex-col items-center mt-10">
        {loading ? (
          <div className="text-center py-10">
            <p>Carregando candidaturas...</p>
          </div>
        ) : candidaturasFiltradas.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400">
              {filtroStatus === "todas"
                ? "Você ainda não possui candidaturas."
                : `Nenhuma candidatura ${filtroStatus}.`}
            </p>
          </div>
        ) : (
          <CardStatusVaga
            candidaturas={candidaturasFiltradas}
            onRemoverCandidatura={removerCandidatura}
          />
        )}
      </main>
    </div>
  );
}
