import React from 'react';

// Componente para exibir o "badge" de status de forma consistente
const VagaStatus = ({ status }) => {
  // Objeto de configuração para mapear status a estilos e rótulos.
  // Isso centraliza a lógica e facilita a adição de novos status.
  const statusConfig = {
    'APROVADO': {
      label: 'Aprovado',
      style: 'bg-green-500/10 text-green-400',
    },
    'ENTREVISTA AGENDADA': {
        label: 'Entrevista',
        style: 'bg-blue-500/10 text-blue-400',
    },
    'PENDENTE': {
      label: 'Em análise',
      style: 'bg-yellow-500/10 text-yellow-400',
    },
    'EM ANÁLISE': { // Alias para PENDENTE
        label: 'Em análise',
        style: 'bg-yellow-500/10 text-yellow-400',
    },
    'RECUSADA': {
      label: 'Rejeitado',
      style: 'bg-red-500/10 text-red-400',
    },
    'REJEITADO': { // Alias para RECUSADA
        label: 'Rejeitado',
        style: 'bg-red-500/10 text-red-400',
      },
  };

  // Normaliza o status para maiúsculas para garantir a correspondência da chave.
  const normalizedStatus = status ? String(status).toUpperCase() : '';
  
  // Define um fallback caso o status não seja encontrado na configuração.
  const defaultConfig = { 
    label: status, 
    style: 'bg-slate-600/10 text-slate-300' 
  };
  
  // Seleciona a configuração correta ou usa o fallback.
  const config = statusConfig[normalizedStatus] || defaultConfig;

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${config.style}`}>
      {config.label}
    </span>
  );
};

// Componente principal do Card
const StatusCard = ({ candidaturasRecentes }) => {
  // Estado de "Nenhuma candidatura"
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
            Candidate-se a vagas para acompanhar o status aqui.
          </p>
          <button className="mt-6 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Explorar Vagas
          </button>
        </div>
      </div>
    );
  }

  // Estado com a lista de candidaturas
  return (
    <div className="bg-slate-800 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">Minhas Candidaturas Recentes</h3>
        <a href="#" className="text-sm font-semibold text-blue-500 hover:underline">
          Ver todas
        </a>
      </div>
      <div className="space-y-3">
        {/* Usando app.id como chave (melhor prática do que o index) */}
        {candidaturasRecentes.map((app) => (
          <div key={app.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
            <div>
              {/* Corrigido para corresponder aos nomes das propriedades do mock data */}
              <p className="font-semibold text-white">{app.tituloVaga}</p>
              <p className="text-sm text-slate-400">{app.nomeEmpresa}</p>
            </div>
            <VagaStatus status={app.status} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusCard;
