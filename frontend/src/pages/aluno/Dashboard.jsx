import Sidebar from '../../components/dashboard/aluno/Sidebar';
import HeaderAluno from '../../components/dashboard/aluno/HeaderAluno';
import PerfilCard from '../../components/dashboard/aluno/PerfilCard';
import StatusCard from '../../components/dashboard/aluno/StatusCard';
import VagasRecomendadas from '../../components/dashboard/aluno/VagasRecomendadas';


export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-900 grid" style={{
        gridTemplateAreas: `
          "sidebar header"
          "sidebar main"
        `,
        gridTemplateColumns: '260px 1fr',
        gridTemplateRows: 'auto 1fr',
      }}>
      <Sidebar />
      <HeaderAluno />
      <main style={{ gridArea: 'main' }} className="p-6 overflow-auto">
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
      </main>
    </div>
  );
}