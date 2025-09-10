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
