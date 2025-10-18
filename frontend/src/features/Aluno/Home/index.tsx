"use client";

import { useCallback, useEffect, useState } from "react";
import { perfilAluno, PerfilCard } from "@/features/Aluno/Home/PerfilCard";
import { StatusCard } from "@/components/StatusCard";
import { VagasRecomendadas } from "@/components/VagasRecomendadas";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { buscarPerfilAluno } from "../api/buscarPerfil";
import { buscarCandidaturasAluno } from "../api/buscarCandidaturas";
import { buscarVagasRecomendadasAluno } from "../api/buscarVagasRecomendadas";
import { useLoading } from "@/contexts/LoadingContext";
import { Vaga } from "@/@types/types";

export function Dashboard() {
  const { carregando } = useAuthGuard({
    redirectTo: "/login",
    requireRole: "ESTUDANTE",
  });

  console.log("Status do carregando:", carregando); // <-- Adicione aqui

  const { showLoading, hideLoading } = useLoading();

  const [perfil, setPerfil] = useState<perfilAluno | null>(null);
  const [candidaturas, setCandidaturas] = useState<[]>([]);
  const [vagasRecomendadas, setVagasRecomendadas] = useState<Vaga[]>([]);

  const [error, setError] = useState<string | null>(null);

  const carregarDados = useCallback(async () => {
    try {
      showLoading();
      setError(null);

      const [perfilResp, candidaturasResp, vagasResp] = await Promise.all([
        buscarPerfilAluno(),
        buscarCandidaturasAluno(),
        buscarVagasRecomendadasAluno(),
      ]);

      setPerfil(perfilResp?.perfil ?? null);
      setCandidaturas(candidaturasResp?.candidaturasRecentes ?? []);
      setVagasRecomendadas(vagasResp?.vagasRecomendadas ?? []);
    } catch (e) {
      console.error("Erro ao carregar dados:", e);
      setError("Erro ao carregar informações do painel.");
    } finally {
      hideLoading();
    }
  }, [showLoading, hideLoading]);

  useEffect(() => {
    if (!carregando) carregarDados();
  }, [carregando, carregarDados]);

  if (error) {
    return (
      <div className="p-6 bg-slate-800 border border-red-500/20 rounded-lg text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Coluna Principal */}
      <div className="col-span-3 lg:col-span-2 space-y-6">
        {perfil ? (
          <PerfilCard perfil={perfil} />
        ) : (
          <div className="bg-slate-800 p-6 rounded-lg text-slate-400">
            Nenhum dado de perfil encontrado
          </div>
        )}

        {candidaturas.length > 0 ? (
          <StatusCard candidaturasRecentes={candidaturas} />
        ) : (
          <div className="bg-slate-800 p-6 rounded-lg text-center text-slate-400">
            <h3 className="text-xl font-bold text-white mb-4">
              Candidaturas Recentes
            </h3>
            <p className="mb-1">Nenhuma candidatura ainda</p>
            <p className="text-sm text-slate-500">
              Candidate-se às vagas recomendadas para aparecerem aqui
            </p>
          </div>
        )}
      </div>

      {/* Coluna Lateral */}
      <div className="col-span-3 lg:col-span-1">
        {vagasRecomendadas.length > 0 ? (
          <VagasRecomendadas vagasRecomendadas={vagasRecomendadas} />
        ) : (
          <div className="bg-slate-800 p-6 rounded-lg text-center text-slate-400">
            <h3 className="text-xl font-bold text-white mb-4">
              Vagas Recomendadas
            </h3>
            <p className="mb-1">🔍 Nenhuma vaga encontrada</p>
            <p className="text-sm text-slate-500">
              Complete seu perfil para receber recomendações personalizadas
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
