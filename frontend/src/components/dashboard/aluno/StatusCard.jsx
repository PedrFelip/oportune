const VagaStatus = ({ status }) => {
  const statusStyles = {
    Aprovado: 'bg-green-500/10 text-green-400',
    Pendente: 'bg-yellow-500/10 text-yellow-400',
    Rejeitado: 'bg-red-500/10 text-red-400',
  };
  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

const StatusCard = () => {
    const candidaturas = [
        { titulo: 'Estágio: Desenvolvedor Front-end', empresa: 'Empresa X', status: 'Aprovado' },
        { titulo: 'Projeto de Extensão: App Social', empresa: 'Prof. Silva', status: 'Pendente' },
        { titulo: 'Estágio: Analista de Dados', empresa: 'Tech Solutions', status: 'Rejeitado' },
    ];

    return (
        <div className="bg-slate-800 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">Minhas Candidaturas Recentes</h3>
            <a href="#" className="text-sm font-semibold text-blue-500 hover:underline">Ver todas</a>
            </div>
            <div className="space-y-4">
                {candidaturas.map((app, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                        <div>
                            <p className="font-semibold text-white">{app.titulo}</p>
                            <p className="text-sm text-slate-400">{app.empresa}</p>
                        </div>
                        <VagaStatus status={app.status} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatusCard;