import { Categoria } from "./Categoria";

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
        <section key={index} className={"flex flex-1 flex-col bg-[#263243] p-5 gap-4 rounded-xl"}>
          <header className="flex flex-1 justify-between text-2xl text-white font-bold">
              <div className="flex">
                <h2 className="mr-8">{vaga.titulo}</h2>
                <div className="flex items-center gap-6">
                  {vaga.categorias.map((categoria, index) => (
                    <Categoria key={index} caracteristica={categoria} />
                  ))}
                </div>
              </div>
              <button className="text-sm bg[#263243] backdrop-blur-sm cursor-pointer">
                Ver detalhes
              </button>
          </header>
          <main className="text-[#79889D] w-9/10">
            <div>{vaga.empresa}</div>
            <p>
              {vaga.descricao}
            </p>
          </main>
          <footer className="flex gap-8 text-[#79889D]">
            <span><strong className="text-white">Curso:</strong> {vaga.curso}</span>
            <span><strong className="text-white">Semestre:</strong> {vaga.semestre}</span>
          </footer>
        </section>
      ))}
    </>
  );
}
