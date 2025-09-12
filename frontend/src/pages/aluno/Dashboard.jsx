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
        console.error("Erro ao carregar dashboard:", err);
        if (err.message.includes('404')) {
          setError("Perfil de estudante não encontrado. Complete seu cadastro.");
        } else if (err.message.includes('401')) {
          setError("Sessão expirada. Faça login novamente.");
        } else if (err.message.includes('504')) {
          setError("Servidor demorou para responder. Tente novamente.");
        } else {
          setError(err.message || "Erro ao carregar dados do dashboard");
        }
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
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="text-slate-400">Carregando perfil...</div>
            </div>
          ) : errorPerfil ? (
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="text-red-400">Erro ao carregar perfil: {errorPerfil}</div>
            </div>
          ) : (
            <PerfilCard perfil={perfil} />
          )}

          {/* Candidaturas - carrega depois do perfil */}
          {loadingCandidaturas ? (
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="text-slate-400">Carregando candidaturas...</div>
            </div>
          ) : errorCandidaturas ? (
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="text-red-400">Erro ao carregar candidaturas: {errorCandidaturas}</div>
            </div>
          ) : (
            <StatusCard candidaturasRecentes={candidaturas} />
          )}
        </div>

        {/* Coluna Lateral */}
        <div className="col-span-3 lg:col-span-1">
          {/* Vagas Recomendadas - carrega por último */}
          {loadingVagas ? (
            <div className="p-6 rounded-lg">
              <div className="text-slate-400">Carregando vagas recomendadas...</div>
            </div>
          ) : errorVagas ? (
            <div className="p-6 rounded-lg">
              <div className="text-red-400">Erro ao carregar vagas: {errorVagas}</div>
            </div>
          ) : (
            <VagasRecomendadas vagasRecomendadas={vagasRecomendadas} />
          )}
        </div>
      </div>
    </Template>
  );
}
