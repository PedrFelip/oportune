"use client";

import { useEffect, useState } from "react";
import { buscarCandidaturasAluno } from "../api/buscarCandidaturas";

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
    } catch (err: any) {
      console.error("Erro completo:", err);
      
      let errorMessage = "Erro ao carregar candidaturas";
      
      if (err.message?.includes("Token não encontrado")) {
        errorMessage = "Você precisa estar autenticado para ver suas candidaturas";
      } else if (err.message) {
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

  return {
    candidaturas,
    loading,
    error,
    refetch: fetchCandidaturas,
  };
}
