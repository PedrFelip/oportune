"use client";

import { useEffect, useState } from "react";
import { buscarCandidaturasAluno } from "../api/buscarCandidaturas";
import { removerCandidatura as removerCandidaturaApi } from "../api/removerCandidatura";

export interface CandidaturaResponse {
  id: string;
  status: "PENDENTE" | "ACEITA" | "RECUSADA";
  dataCandidatura: string;
  vaga: {
    id: string;
    titulo: string;
    tipo: "ESTAGIO" | "PESQUISA" | "EXTENSAO";
  };
  responsavel: {
    idResponsavel: string;
    nome: string;
    tipo: "EMPRESA" | "PROFESSOR";
  };
}

export function useCandidaturas() {
  const [candidaturas, setCandidaturas] = useState<CandidaturaResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidaturas = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Buscando candidaturas...");
      const data = await buscarCandidaturasAluno();
      console.log("Candidaturas recebidas:", data);

      setCandidaturas(data);
    } catch (err: unknown) {
      console.error("Erro completo:", err);

      let errorMessage = "Erro ao carregar candidaturas";

      if (
        err instanceof Error &&
        err.message?.includes("Token não encontrado")
      ) {
        errorMessage =
          "Você precisa estar autenticado para ver suas candidaturas";
      } else if (err instanceof Error && err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidaturas();
  }, []);

  const removerCandidatura = async (candidaturaId: string) => {
    try {
      setLoading(true);
      await removerCandidaturaApi(candidaturaId);

      // Atualiza a lista removendo a candidatura localmente
      setCandidaturas((prev) => prev.filter((c) => c.id !== candidaturaId));

      return { success: true };
    } catch (err: unknown) {
      console.error("Erro ao remover candidatura:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao remover candidatura";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    candidaturas,
    loading,
    error,
    refetch: fetchCandidaturas,
    removerCandidatura,
  };
}
