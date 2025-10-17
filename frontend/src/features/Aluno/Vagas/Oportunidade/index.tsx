import { Vaga } from "@/@types/types";
import { Categoria } from "@/components/Categoria";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type OportunidadeProps = {
  vagas: Vaga[];
};

export default function Oportunidade({ vagas }: OportunidadeProps) {
  return (
    <>
      {vagas.map((vaga) => (
        <section
          key={vaga.id}
          className={"flex flex-1 flex-col bg-[#263243] p-5 gap-4 rounded-xl"}
        >
          <header className="flex flex-1 justify-between text-2xl text-white font-bold">
            <div className="flex">
              <h2 className="mr-8">{vaga.titulo}</h2>
              <div className="flex items-center gap-6">
                {vaga.categorias.map((categoria, index) => (
                  <Categoria key={index} caracteristica={categoria} />
                ))}
              </div>
            </div>
            <Link href={`/aluno/vagas/${vaga.id}`}>
              <Button
                variant={"oportune"}
                className="text-sm bg[#263243] backdrop-blur-sm cursor-pointer"
              >
                Ver detalhes
              </Button>
            </Link>
          </header>
          <main className="text-[#79889D] w-9/10">
            <div className="text-md text-white font-bold">{vaga.empresa}</div>
            <p>{vaga.descricao}</p>
          </main>
          <footer className="flex gap-8 text-[#79889D]">
            <span>
              <strong className="text-white">Curso:</strong> {vaga.curso}
            </span>
            <span>
              <strong className="text-white">Semestre:</strong> {vaga.semestre}
            </span>
          </footer>
        </section>
      ))}
    </>
  );
}
