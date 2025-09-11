const VagasRecomendadas = ({ vagasRecomendadas }) => {
  if (!vagasRecomendadas || vagasRecomendadas.length === 0) {
    return (
      <div className="p-6 rounded-lg">
        <h2 className="text-lg font-bold text-white text-center">Vagas Recomendadas</h2>
        <div className="mt-4 p-4 rounded-lg">
          <div className="text-slate-400 text-center py-8">
            Nenhuma vaga recomendada encontrada
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg">
      <h2 className="text-lg font-bold text-white text-center">Vagas Recomendadas</h2>

      <div className="mt-4 space-y-4 p-4 rounded-lg">
        {vagasRecomendadas.map(vaga => (
          <div key={vaga.id} className="p-4 border bg-slate-800 border-slate-700 rounded-lg ">
            <h3 className="text-md font-semibold text-white">{vaga.titulo}</h3>
            <p className="text-sm text-slate-400">{vaga.empresa}</p>
            <button>
              <span className="text-sm font-semibold text-blue-500 hover:underline">Ver detalhes</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VagasRecomendadas;