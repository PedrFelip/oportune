const Vagas = [
  {
    id: 1,
    titulo: 'Estágio: Desenvolvedor Front-end',
    empresa: 'Empresa X'
  },
  {
    id: 2,
    titulo: 'Projeto de Extensão: App Social',
    empresa: 'Prof. Silva'
  }
]

const VagasRecomendadas = () => {
  return (
    <div className="p-6 rounded-lg">
      <h2 className="text-lg font-bold text-white text-center">Vagas Recomendadas</h2>

      <div className="mt-4 space-y-4 p-4 rounded-lg">
        {Vagas.map(vaga => (
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