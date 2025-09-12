import { useState, useEffect } from "react";
import PerfilCard from "../../components/dashboard/aluno/PerfilCard";
import StatusCard from "../../components/dashboard/aluno/StatusCard";
import VagasRecomendadas from "../../components/dashboard/aluno/VagasRecomendadas";
import Template from "../../components/dashboard/geral/Template";
import { useAuthGuard } from "../../hooks/useAuthGuard";
import { buscarDashboardAluno } from "../../api/api";

export default function Dashboard() {
  const { carregando } = useAuthGuard({
    redirectTo: "/login",
    requireRole: "ESTUDANTE",
  });
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Iniciando carregamento do dashboard...");
        const dados = await buscarDashboardAluno();
        console.log("Dados do dashboard carregados:", dados);
        setDashboardData(dados);
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
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  if (carregando || loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-red-400 text-lg">Erro: {error}</div>
      </div>
    );
  }

  return (
    <Template>
      <div className="grid grid-cols-3 gap-6">
        {/* Coluna Principal */}
        <div className="col-span-3 lg:col-span-2 space-y-6">
          <PerfilCard perfil={dashboardData?.perfil} />
          <StatusCard
            candidaturasRecentes={dashboardData?.candidaturasRecentes}
          />
        </div>
        {/* Coluna 'Lateral' */}
        <div className="col-span-3 lg:col-span-1">
          <VagasRecomendadas
            vagasRecomendadas={dashboardData?.vagasRecomendadas}
          />
        </div>
      </div>
    </Template>
  );
}
