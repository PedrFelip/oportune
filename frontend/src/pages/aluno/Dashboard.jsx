import { useEffect, useState } from "react";
import PerfilCard from "../../components/dashboard/aluno/PerfilCard";
import StatusCard from "../../components/dashboard/aluno/StatusCard";
import VagasRecomendadas from "../../components/dashboard/aluno/VagasRecomendadas";
import { useAuthGuard } from "../../hooks/useAuthGuard";
import { buscarPerfilAluno, buscarCandidaturasAluno, buscarVagasRecomendadasAluno } from "../../api/api";


export default function Dashboard() {
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

  const [errorPerfil, setErrorPerfil] = useState(null);
  const [errorCandidaturas, setErrorCandidaturas] = useState(null);
  const [errorVagas, setErrorVagas] = useState(null);

  const recarregarPerfil = async () => {
    try {
      setLoadingPerfil(true);
      setErrorPerfil(null);
      const resp = await buscarPerfilAluno();
      setPerfil(resp);
    } catch (e) {
      console.error('Erro ao carregar perfil:', e);
      setErrorPerfil(e?.message || "Erro ao carregar perfil");
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
      console.error('Erro ao carregar candidaturas:', e);
      setErrorCandidaturas(e?.message || "Erro ao carregar candidaturas");
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
      console.error('Erro ao carregar vagas:', e);
      setErrorVagas(e?.message || "Erro ao carregar vagas");
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

  // O bloco de 'carregando' principal não será exibido, pois 'carregando' é sempre falso.
  if (carregando) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Carregando...</div>
      </div>
    );
  }

  // Verificar quais dados estão sendo usados
  const perfilParaUsar = perfil?.perfil || null;
  const candidaturasParaUsar = candidaturas || [];
  const vagasParaUsar = vagasRecomendadas || [];

  // O JSX de renderização permanece o mesmo. Ele agora usará os dados estáticos.
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
          ) : perfilParaUsar ? (
            <PerfilCard perfil={perfilParaUsar} />
          ) : (
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="text-slate-400">Nenhum dado de perfil encontrado</div>
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
          ) : candidaturasParaUsar?.length > 0 ? (
            <StatusCard candidaturasRecentes={candidaturasParaUsar} />
          ) : (
            <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">Candidaturas Recentes</h3>
              <div className="text-center py-8">
                <div className="text-slate-400 mb-2">Nenhuma candidatura ainda</div>
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
          ) : vagasParaUsar?.length > 0 ? (
            <VagasRecomendadas vagasRecomendadas={vagasParaUsar} />
          ) : (
            <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">Vagas Recomendadas</h3>
              <div className="text-center py-8">
                <div className="text-slate-400 mb-2">🔍 Nenhuma vaga encontrada</div>
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