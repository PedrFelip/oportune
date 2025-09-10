import Sidebar from '../../components/dashboard/aluno/Sidebar';
import HeaderAluno from '../../components/dashboard/aluno/HeaderAluno';

export default function Dashboard() {
  return (
    <>
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
      </div>
      <main style={{ gridArea: 'main' }} className="p-6 text-slate-300">
        <h2 className="text-2xl font-bold mb-4">Bem-vindo ao Dashboard do Aluno</h2>
        <p>Aqui você pode gerenciar suas candidaturas, ver oportunidades e atualizar seu perfil.</p>
      </main>
    </>
  );
}