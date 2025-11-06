import Link from "next/link";

interface vagasRecomendadasType {
  id: string;
  titulo: string;
  empresa: string;
}

type vagasRecomendadasProps = {
  vagasRecomendadas: vagasRecomendadasType[];
};

export function VagasRecomendadas({
  vagasRecomendadas,
}: vagasRecomendadasProps) {
  const vagas: vagasRecomendadasType[] = vagasRecomendadas || [];

  const embaralhar = (array: vagasRecomendadasType[]) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const vagasAleatorias = embaralhar(vagas).slice(0, 2);
  if (!vagasRecomendadas || vagasRecomendadas.length === 0) {
    return (
      <div className="p-6 rounded-lg">
        <h2 className="text-lg font-bold text-white text-center mb-6">
          Vagas Recomendadas
        </h2>
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-slate-700 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
              />
            </svg>
          </div>
          <p className="text-slate-400 text-lg font-medium mb-2">
            Nenhuma vaga disponível
          </p>
          <p className="text-slate-500 text-sm mb-4">
            Complete seu perfil para receber recomendações personalizadas
          </p>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Completar Perfil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg">
      <h2 className="text-lg font-bold text-white text-center">
        Vagas Recomendadas
      </h2>

      <div className="mt-4 space-y-4 p-4 rounded-lg">
        {vagasAleatorias.map((vaga) => (
          <div
            key={vaga.id}
            className="p-4 border bg-slate-800 border-slate-700 rounded-lg "
          >
            <h3 className="text-md font-semibold text-white">{vaga.titulo}</h3>
            <p className="text-sm text-slate-400">{vaga.empresa}</p>
            <button>
              <Link
                href={`/aluno/vagas/${vaga.id}`}
                className="text-sm font-semibold text-blue-500 hover:underline cursor-pointer"
              >
                Ver detalhes
              </Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
