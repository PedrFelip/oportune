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
                <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-slate-700 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <p className="text-slate-400 text-lg font-medium mb-2">Nenhuma candidatura ainda</p>
                    <p className="text-slate-500 text-sm">
                        Candidate-se a vagas para acompanhar o status aqui
                    </p>
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Explorar Vagas
                    </button>
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