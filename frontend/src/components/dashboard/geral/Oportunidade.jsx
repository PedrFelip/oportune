const CaracteristicasVaga = ({ caracteristica }) => {
  const statusStyles = {
    Estagio: "bg-blue-500/10 text-blue-400",
    Remoto: "bg-green-500/10 text-green-400",
    Pesquisa: "bg-purple-500/10 text-purple-400",
  };
  return (
    <span
      className={`px-3 py-2 text-xs font-semibold rounded-full ${statusStyles[caracteristica]}`}
    >
      {caracteristica}
    </span>
  );
};

export default function Oportunidade() {

  const candidaturas = [
    {
      titulo: "Estágio: Desenvolvedor Front-end",
      empresa: "Empresa X",
      categorias: ["Estagio", "Remoto"],
      descricao: "Procuramos um candidato que tenha interesse em aprender REACT, que esteja disposto a solucionar problemas e contribuir com a equipe de desenvolvimento. Oportunidade única de aprender com os melhores desenvolvedores do mercado",
      curso: "Engenharia de Software",
      semestre: "A partir do 4º"
    },
    {
      titulo: "Projeto de pesquisa com Inteligência Artificial (IA)",
      empresa: "Prof. Silva",
      categorias: ["Pesquisa"],
      descricao: "Oportunidade para alunos interessados em machine learning e processamento em linguagem natural. Necessário conhecimento prévio em Python.",
      curso: "Ciência da Computação",
      semestre: "A partir do 6º"
    },
    {
      titulo: "Estágio: Analista de Dados",
      empresa: "Tech Solutions",
      categorias: ["Remoto"],
      descricao: "Esta oportunidade vaga oferece grande visibilidade e potencial de crescimento, com participação ativa em decisões técnicas e evolução do produto. Ter conhecimento prévio em Java e MySQL.",
      curso: "Qualquer curso de T.I.",
      semestre: "A partir do 3º"
    },
  ];

  return (
    <>
      {candidaturas.map((vaga, index) => (
        <section key={index} className={"flex flex-1 bg-[#263243] p-5 gap-10 rounded-xl"}>
          <header className="flex flex-1 justify-between text-2xl text-white font-bold">
              <div className="flex">
                <h2 className="mr-8">{vaga.titulo}</h2>
                <div className="flex items-center gap-6">
                  {vaga.categorias.map((categoria, index) => (
                    <CaracteristicasVaga key={index} caracteristica={categoria} />
                  ))}
                </div>
              </div>
              <button className="text-sm bg[#263243] cursor-pointer">
                Ver detalhes
              </button>
          </header>
        </section>
      ))}
    </>
  );
}
