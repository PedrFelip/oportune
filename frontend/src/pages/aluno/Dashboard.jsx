/* eslint-disable no-unused-vars */
// React e Componentes (mantidos)
import { useState } from "react";
import PerfilCard from "../../components/dashboard/aluno/PerfilCard";
import StatusCard from "../../components/dashboard/aluno/StatusCard";
import VagasRecomendadas from "../../components/dashboard/aluno/VagasRecomendadas";
import Template from "../../components/dashboard/geral/Template";

// --- PARTES DINÂMICAS COMENTADAS ---
// import { useAuthGuard } from "../../hooks/useAuthGuard";
// import { buscarPerfilAluno, buscarCandidaturasAluno, buscarVagasRecomendadasAluno } from "../../api/api";
// ------------------------------------

// +++ DADOS ESTÁTICOS DE EXEMPLO (MOCK) +++
const mockPerfil = {
  nome: "Giovanni ",
  fotoUrl: "https://i.pravatar.cc/150?img=25", // Imagem de placeholder
  curso: "Análise e Desenvolvimento de Sistemas",
  semestre: "4º Semestre",
  universidade: "UNICEPLAC",
};

const mockCandidaturas = [
  { id: 1, tituloVaga: "Desenvolvedor(a) Front-end Jr", nomeEmpresa: "TechCorp", status: "Em análise" },
  { id: 2, tituloVaga: "Estágio em UX/UI Design", nomeEmpresa: "Creative Solutions", status: "Aprovado" },
  { id: 3, tituloVaga: "Analista de Dados Estagiário", nomeEmpresa: "DataInsights", status: "Entrevista Agendada" },
  { id: 4, tituloVaga: "Desenvolvedor(a) Mobile (React Native)", nomeEmpresa: "AppFactory", status: "Rejeitado" },
];

const mockVagasRecomendadas = [
  { id: 1, titulo: "Estágio em Back-end (Node.js)", empresa: "ServerSide Ltda", localidade: "Remoto", modalidade: "Híbrido" },
  { id: 2, titulo: "Desenvolvedor(a) de Software", empresa: "InovaSoft", localidade: "São Paulo, SP", modalidade: "Presencial" },
  { id: 3, titulo: "Estágio em Qualidade de Software (QA)", empresa: "QualityFirst", localidade: "Remoto", modalidade: "Remoto" },
];
// +++++++++++++++++++++++++++++++++++++++++

export default function Dashboard() {
  // --- useAuthGuard COMENTADO ---
  // const { carregando } = useAuthGuard({
  //   redirectTo: "/login",
  //   requireRole: "ESTUDANTE",
  // });
  // Para a apresentação estática, definimos 'carregando' como falso.
  const carregando = false;
  // ------------------------------

  // --- ESTADOS INICIALIZADOS COM DADOS ESTÁTICOS ---
  const [perfil, setPerfil] = useState(mockPerfil);
  const [candidaturas, setCandidaturas] = useState(mockCandidaturas);
  const [vagasRecomendadas, setVagasRecomendadas] = useState(mockVagasRecomendadas);

  // Estados de carregamento definidos como 'false'
  const [loadingPerfil, setLoadingPerfil] = useState(false);
  const [loadingCandidaturas, setLoadingCandidaturas] = useState(false);
  const [loadingVagas, setLoadingVagas] = useState(false);

  // Estados de erro definidos como 'null'
  const [errorPerfil, setErrorPerfil] = useState(null);
  const [errorCandidaturas, setErrorCandidaturas] = useState(null);
  const [errorVagas, setErrorVagas] = useState(null);
  // ----------------------------------------------------

  /*
  // --- TODA A LÓGICA DE BUSCA DE DADOS E RECARREGAMENTO FOI COMENTADA ---

  // Funções para recarregar seções específicas
  const recarregarPerfil = async () => {
    // ... lógica original comentada
  };

  const recarregarCandidaturas = async () => {
    // ... lógica original comentada
  };

  const recarregarVagas = async () => {
    // ... lógica original comentada
  };

  // Hooks useEffect para carregar dados foram comentados
  useEffect(() => {
    // ... lógica original comentada
  }, [carregando]);

  useEffect(() => {
    // ... lógica original comentada
  }, [carregando]);
  
  useEffect(() => {
    // ... lógica original comentada
  }, [carregando]);
  
  */ // Fim do bloco de lógica comentada

  // O bloco de 'carregando' principal não será exibido, pois 'carregando' é sempre falso.
  if (carregando) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Carregando...</div>
      </div>
    );
  }

  // O JSX de renderização permanece o mesmo. Ele agora usará os dados estáticos.
  return (
    <Template>
      <div className="grid grid-cols-3 gap-6">
        {/* Coluna Principal */}
        <div className="col-span-3 lg:col-span-2 space-y-6">
          {/* Perfil */}
          {loadingPerfil ? (
            <div className="bg-slate-800 p-6 rounded-lg animate-pulse">{/* Skeleton Loader */}</div>
          ) : errorPerfil ? (
            <div className="bg-slate-800 p-6 rounded-lg border border-red-500/20">{/* Error State */}</div>
          ) : (
            <PerfilCard perfil={perfil} />
          )}

          {/* Candidaturas */}
          {loadingCandidaturas ? (
            <div className="bg-slate-800 p-6 rounded-lg animate-pulse">{/* Skeleton Loader */}</div>
          ) : errorCandidaturas ? (
            <div className="bg-slate-800 p-6 rounded-lg border border-red-500/20">{/* Error State */}</div>
          ) : (
            <StatusCard candidaturasRecentes={candidaturas} />
          )}
        </div>

        {/* Coluna Lateral */}
        <div className="col-span-3 lg:col-span-1">
          {/* Vagas Recomendadas */}
          {loadingVagas ? (
            <div className="p-6 rounded-lg animate-pulse">{/* Skeleton Loader */}</div>
          ) : errorVagas ? (
            <div className="p-6 rounded-lg border border-red-500/20">{/* Error State */}</div>
          ) : (
            <VagasRecomendadas vagasRecomendadas={vagasRecomendadas} />
          )}
        </div>
      </div>
    </Template>
  );
}