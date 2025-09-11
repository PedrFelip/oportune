const VagaStatus = ({ status }) => {
  const statusStyles = {
    Estagio: 'bg-blue-500/10 text-blue-400',
    Remoto: 'bg-green-500/10 text-green-400',
    Pesquisa: 'bg-purple-500/10 text-purple-400',
  };
  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

export default function Oportunidade({ children }) {
  const candidaturas = [
        { titulo: 'Estágio: Desenvolvedor Front-end', empresa: 'Empresa X', status: 'Aprovado' },
        { titulo: 'Projeto de Extensão: App Social', empresa: 'Prof. Silva', status: 'Pendente' },
        { titulo: 'Estágio: Analista de Dados', empresa: 'Tech Solutions', status: 'Rejeitado' },
    ];
  return (
    <section>
      <h2>Estágio de Front End</h2>
    </section>
  );
}
