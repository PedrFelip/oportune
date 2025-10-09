import { useEffect, useState } from "react";
import { PerfilCard } from "@/components/PerfilCard";
import { StatusCard } from "@/components/StatusCard";
import { VagasRecomendadas } from "@/components/VagasRecomendadas";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { showMessage } from "@/adapters/showMessage";
// import { buscarPerfilAluno, buscarCandidaturasAluno, buscarVagasRecomendadasAluno } from "../../api/api";
import { buscarPerfilAluno } from "../api/buscarPerfil";
import { buscarCandidaturasAluno } from "../api/buscarCandidaturas";
import { buscarVagasRecomendadasAluno } from "../api/buscarVagasRecomendadas";

export function Dashboard() {
  const { carregando } = useAuthGuard({
    redirectTo: "/login",
    requireRole: "ESTUDANTE",
  });

  const [perfil, setPerfil] = useState(null);
  const [candidaturas, setCandidaturas] = useState([]);
  const [vagasRecomendadas, setVagasRecomendadas] = useState([]);

  const [loadingPerfil, setLoadingPerfil] = useState(true);
  const [loadingCandidaturas, setLoadingCandidaturas] = useState(true);
  const [loadingVagas, setLoadingVagas] = useState(true);

  const [errorPerfil, setErrorPerfil] = useState<string | null>(null);
  const [errorCandidaturas, setErrorCandidaturas] = useState<string | null>(null);
  const [errorVagas, setErrorVagas] = useState<string | null>(null);

  const recarregarPerfil = async () => {
    try {
      setLoadingPerfil(true);
      setErrorPerfil(null);
      const resp = await buscarPerfilAluno();
      setPerfil(resp.perfil); // Arrumar retorno da API
    } catch (e) {
      console.error("Erro ao carregar perfil:", e);
      setErrorPerfil("Erro ao carregar perfil");
    } finally {
      setLoadingPerfil(false);
    }
  };

  const recarregarCandidaturas = async () => {
    try {
      setLoadingCandidaturas(true);
      setErrorCandidaturas(null);
      const resp = await buscarCandidaturasAluno();
      setCandidaturas(resp?.candidaturasRecentes ?? []);
    } catch (e) {
      console.error("Erro ao carregar candidaturas:", e);
      setErrorCandidaturas("Erro ao carregar candidaturas");
    } finally {
      setLoadingCandidaturas(false);
    }
  };

  const recarregarVagas = async () => {
    try {
      setLoadingVagas(true);
      setErrorVagas(null);
      const resp = await buscarVagasRecomendadasAluno();
      setVagasRecomendadas(resp?.vagasRecomendadas ?? []);
    } catch (e) {
      console.error("Erro ao carregar vagas:", e);
      setErrorVagas("Erro ao carregar vagas");
    } finally {
      setLoadingVagas(false);
    }
  };

  // Carregar dados quando não estiver carregando (guard ok)
  useEffect(() => {
    if (carregando) return;
    recarregarPerfil();
    recarregarCandidaturas();
    recarregarVagas();
  }, [carregando]);

  if (carregando) {
    showMessage.loading("Carregando...");
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        {/* Coluna Principal */}
        <div className="col-span-3 lg:col-span-2 space-y-6">
          {/* Perfil */}
          {loadingPerfil ? (
            <div className="bg-slate-800 p-6 rounded-lg animate-pulse">
              <div className="text-slate-400">Carregando perfil...</div>
            </div>
          ) : errorPerfil ? (
            <div className="bg-slate-800 p-6 rounded-lg border border-red-500/20">
              <div className="text-red-400">Erro: {errorPerfil}</div>
            </div>
          ) : perfil ? (
            <PerfilCard perfil={perfil} />
          ) : (
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="text-slate-400">
                Nenhum dado de perfil encontrado
              </div>
            </div>
          )}

          {/* Candidaturas */}
          {loadingCandidaturas ? (
            <div className="bg-slate-800 p-6 rounded-lg animate-pulse">
              <div className="text-slate-400">Carregando candidaturas...</div>
            </div>
          ) : errorCandidaturas ? (
            <div className="bg-slate-800 p-6 rounded-lg border border-red-500/20">
              <div className="text-red-400">Erro: {errorCandidaturas}</div>
            </div>
          ) : candidaturas?.length > 0 ? (
            <StatusCard candidaturasRecentes={candidaturas} />
          ) : (
            <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">
                Candidaturas Recentes
              </h3>
              <div className="text-center py-8">
                <div className="text-slate-400 mb-2">
                  Nenhuma candidatura ainda
                </div>
                <div className="text-sm text-slate-500">
                  Candidate-se às vagas recomendadas para aparecerem aqui
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Coluna Lateral */}
        <div className="col-span-3 lg:col-span-1">
          {/* Vagas Recomendadas */}
          {loadingVagas ? (
            <div className="p-6 rounded-lg animate-pulse">
              <div className="text-slate-400">Carregando vagas...</div>
            </div>
          ) : errorVagas ? (
            <div className="p-6 rounded-lg border border-red-500/20">
              <div className="text-red-400">Erro: {errorVagas}</div>
            </div>
          ) : vagasRecomendadas?.length > 0 ? (
            <VagasRecomendadas vagasRecomendadas={vagasRecomendadas} />
          ) : (
            <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">
                Vagas Recomendadas
              </h3>
              <div className="text-center py-8">
                <div className="text-slate-400 mb-2">
                  🔍 Nenhuma vaga encontrada
                </div>
                <div className="text-sm text-slate-500">
                  Complete seu perfil para receber recomendações personalizadas
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
