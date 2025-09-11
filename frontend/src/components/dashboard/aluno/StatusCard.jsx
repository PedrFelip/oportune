const VagaStatus = ({ status }) => {
  const statusStyles = {
    ACEITA: 'bg-green-500/10 text-green-400',
    PENDENTE: 'bg-yellow-500/10 text-yellow-400',
    RECUSADA: 'bg-red-500/10 text-red-400',
  };

  const statusLabels = {
    ACEITA: 'Aprovado',
    PENDENTE: 'Pendente',
    RECUSADA: 'Rejeitado',
  };

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[status]}`}>
      {statusLabels[status] || status}
    </span>
  );
};

const StatusCard = ({ candidaturasRecentes }) => {
    if (!candidaturasRecentes || candidaturasRecentes.length === 0) {
        return (
            <div className="bg-slate-800 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-white">Minhas Candidaturas Recentes</h3>
                </div>
                <div className="text-slate-400 text-center py-8">
                    Nenhuma candidatura encontrada
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-800 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">Minhas Candidaturas Recentes</h3>
            <a href="#" className="text-sm font-semibold text-blue-500 hover:underline">Ver todas</a>
            </div>
            <div className="space-y-4">
                {candidaturasRecentes.map((app, index) => (
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