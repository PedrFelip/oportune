import PerfilCard from "../../components/dashboard/aluno/PerfilCard";
import StatusCard from "../../components/dashboard/aluno/StatusCard";
import VagasRecomendadas from "../../components/dashboard/aluno/VagasRecomendadas";
import Template from "../../components/dashboard/geral/template";

export default function Dashboard() {
  return (
    <Template>
      <div className="grid grid-cols-3 gap-6">
        {/* Coluna Principal */}
        <div className="col-span-3 lg:col-span-2 space-y-6">
          <PerfilCard />
          <StatusCard />
        </div>
        {/* Coluna 'Lateral' */}
        <div className="col-span-3 lg:col-span-1">
          <VagasRecomendadas />
        </div>
      </div>
    </Template>
  );
}
