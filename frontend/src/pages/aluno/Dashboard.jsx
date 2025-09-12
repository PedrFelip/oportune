import { useState, useEffect } from "react";
import PerfilCard from "../../components/dashboard/aluno/PerfilCard";
import StatusCard from "../../components/dashboard/aluno/StatusCard";
import VagasRecomendadas from "../../components/dashboard/aluno/VagasRecomendadas";
import Template from "../../components/dashboard/geral/Template";
import { useAuthGuard } from "../../hooks/useAuthGuard";
import { buscarPerfilAluno, buscarCandidaturasAluno, buscarVagasRecomendadasAluno } from "../../api/api";

export default function Dashboard() {
  const { carregando } = useAuthGuard({
    redirectTo: "/login",
    requireRole: "ESTUDANTE",
  });

  // Estados separados para cada seção
  const [perfil, setPerfil] = useState(null);
  const [candidaturas, setCandidaturas] = useState(null);
  const [vagasRecomendadas, setVagasRecomendadas] = useState(null);

  // Estados de carregamento separados
  const [loadingPerfil, setLoadingPerfil] = useState(true);
  const [loadingCandidaturas, setLoadingCandidaturas] = useState(true);
  const [loadingVagas, setLoadingVagas] = useState(true);

  // Estados de erro separados
  const [errorPerfil, setErrorPerfil] = useState(null);
  const [errorCandidaturas, setErrorCandidaturas] = useState(null);
  const [errorVagas, setErrorVagas] = useState(null);

  // Funções para recarregar seções específicas
  const recarregarPerfil = async () => {
    try {
      setLoadingPerfil(true);
      setErrorPerfil(null);
      const dados = await buscarPerfilAluno();
      setPerfil(dados.perfil);
    } catch (err) {
      setErrorPerfil(err.message);
      console.error("Erro ao recarregar perfil:", err);
    } finally {
      setLoadingPerfil(false);
    }
  };

  const recarregarCandidaturas = async () => {
    try {
      setLoadingCandidaturas(true);
      setErrorCandidaturas(null);
      const dados = await buscarCandidaturasAluno();
      setCandidaturas(dados.candidaturasRecentes);
    } catch (err) {
      setErrorCandidaturas(err.message);
      console.error("Erro ao recarregar candidaturas:", err);
    } finally {
      setLoadingCandidaturas(false);
    }
  };

  const recarregarVagas = async () => {
    try {
      setLoadingVagas(true);
      setErrorVagas(null);
      const dados = await buscarVagasRecomendadasAluno();
      setVagasRecomendadas(dados.vagasRecomendadas);
    } catch (err) {
      setErrorVagas(err.message);
      console.error("Erro ao recarregar vagas:", err);
    } finally {
      setLoadingVagas(false);
    }
  };

  // Carregamento do perfil (independente e imediato)
  useEffect(() => {
    const carregarPerfil = async () => {
      try {
        setLoadingPerfil(true);
        setErrorPerfil(null);
        const dados = await buscarPerfilAluno();
        setPerfil(dados.perfil);
      } catch (err) {
        setErrorPerfil(err.message);
        console.error("Erro ao carregar perfil:", err);
      } finally {
        setLoadingPerfil(false);
      }
    };

    if (!carregando) {
      carregarPerfil();
    }
  }, [carregando]);

  // Carregamento das candidaturas (independente com delay de 500ms)
  useEffect(() => {
    const carregarCandidaturas = async () => {
      try {
        setLoadingCandidaturas(true);
        setErrorCandidaturas(null);
        const dados = await buscarCandidaturasAluno();
        setCandidaturas(dados.candidaturasRecentes);
      } catch (err) {
        setErrorCandidaturas(err.message);
        console.error("Erro ao carregar candidaturas:", err);
      } finally {
        setLoadingCandidaturas(false);
      }
    };

    if (!carregando) {
      // Delay para evitar sobrecarga
      const timeout = setTimeout(carregarCandidaturas, 500);
      return () => clearTimeout(timeout);
    }
  }, [carregando]);

  // Carregamento das vagas (independente com delay de 1000ms)
  useEffect(() => {
    const carregarVagas = async () => {
      try {
        setLoadingVagas(true);
        setErrorVagas(null);
        const dados = await buscarVagasRecomendadasAluno();
        setVagasRecomendadas(dados.vagasRecomendadas);
      } catch (err) {
        setErrorVagas(err.message);
        console.error("Erro ao carregar vagas recomendadas:", err);
      } finally {
        setLoadingVagas(false);
      }
    };

    if (!carregando) {
      // Delay maior para as vagas (query mais pesada)
      const timeout = setTimeout(carregarVagas, 1000);
      return () => clearTimeout(timeout);
    }
  }, [carregando]);
      } catch (err) {
        setErrorCandidaturas(err.message);
        console.error("Erro ao carregar candidaturas:", err);
      } finally {
        setLoadingCandidaturas(false);
      }
    };

    // Carregamento das vagas recomendadas (carrega por último)
    const carregarVagas = async () => {
      try {
        setLoadingVagas(true);
        const dados = await buscarVagasRecomendadasAluno();
        setVagasRecomendadas(dados.vagasRecomendadas);
      } catch (err) {
        setErrorVagas(err.message);
        console.error("Erro ao carregar vagas recomendadas:", err);
      } finally {
        setLoadingVagas(false);
      }
    };

    if (!carregando) {
      // Carregamento sequencial: perfil primeiro, depois candidaturas e vagas em paralelo
      carregarPerfil().then(() => {
        // Após carregar o perfil, carrega o resto em paralelo
        Promise.all([carregarCandidaturas(), carregarVagas()]);
      });
    }
  }, [carregando]);

  if (carregando) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <Template>
      <div className="grid grid-cols-3 gap-6">
        {/* Coluna Principal */}
        <div className="col-span-3 lg:col-span-2 space-y-6">
          {/* Perfil - carrega primeiro */}
          {loadingPerfil ? (
            <div className="bg-slate-800 p-6 rounded-lg animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-slate-700 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-700 rounded w-32"></div>
                  <div className="h-3 bg-slate-700 rounded w-24"></div>
                </div>
              </div>
              <div className="mt-4 text-slate-400 text-center">Carregando perfil...</div>
            </div>
          ) : errorPerfil ? (
            <div className="bg-slate-800 p-6 rounded-lg border border-red-500/20">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-500/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-red-400 font-semibold mb-2">Erro ao carregar perfil</p>
                <p className="text-slate-400 text-sm mb-4">{errorPerfil}</p>
                <button 
                  onClick={recarregarPerfil} 
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Tentar Novamente
                </button>
              </div>
            </div>
          ) : (
            <PerfilCard perfil={perfil} />
          )}

          {/* Candidaturas - carrega independente com delay */}
          {loadingCandidaturas ? (
            <div className="bg-slate-800 p-6 rounded-lg animate-pulse">
              <div className="flex justify-between items-center mb-4">
                <div className="h-5 bg-slate-700 rounded w-48"></div>
                <div className="h-4 bg-slate-700 rounded w-20"></div>
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="p-3 bg-slate-700 rounded">
                    <div className="h-4 bg-slate-600 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-slate-600 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-slate-400 text-center">Carregando candidaturas...</div>
            </div>
          ) : errorCandidaturas ? (
            <div className="bg-slate-800 p-6 rounded-lg border border-red-500/20">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-500/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-red-400 font-semibold mb-2">Erro ao carregar candidaturas</p>
                <p className="text-slate-400 text-sm mb-4">{errorCandidaturas}</p>
                <button 
                  onClick={recarregarCandidaturas} 
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Recarregar
                </button>
              </div>
            </div>
          ) : (
            <StatusCard candidaturasRecentes={candidaturas} />
          )}
        </div>

        {/* Coluna Lateral */}
        <div className="col-span-3 lg:col-span-1">
          {/* Vagas Recomendadas - carrega independente por último */}
          {loadingVagas ? (
            <div className="p-6 rounded-lg animate-pulse">
              <div className="h-5 bg-slate-700 rounded w-40 mx-auto mb-4"></div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="p-4 bg-slate-800 border border-slate-700 rounded-lg">
                    <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-slate-700 rounded w-1/2 mb-3"></div>
                    <div className="h-3 bg-slate-700 rounded w-20"></div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-slate-400 text-center">Carregando vagas recomendadas...</div>
            </div>
          ) : errorVagas ? (
            <div className="p-6 rounded-lg border border-red-500/20">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-500/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-red-400 font-semibold mb-2">Erro ao carregar vagas</p>
                <p className="text-slate-400 text-sm mb-4">{errorVagas}</p>
                <button 
                  onClick={recarregarVagas} 
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Tentar Novamente
                </button>
              </div>
            </div>
          ) : (
            <VagasRecomendadas vagasRecomendadas={vagasRecomendadas} />
          )}
        </div>
      </div>
    </Template>
  );
}
