import { InfoVaga } from "@/components/dashboard/aluno/InfoVaga";
import { Categoria } from "@/components/dashboard/geral/Categoria";
import Template from "@/components/dashboard/geral/Template";
import { ChevronLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const infos = {
  titulo: "Estágio em Desenvolvimento Front End",
  tags: ["Estagio", "Remoto"],
  empresa: "Tech Solutions",
  descricao:
    "Procuramos um estudante apaixonado por React para se juntar à nossa equipe. Irá trabalhar em projetos inovadores e aprender com os melhores profissionais do mercado, contribuindo para o desenvolvimento de aplicações modernas e responsivas para os nossos clientes.",
  responsabilidades: [
    "Desenvolver e manter componentes de interface com React.js",
    "Colaborar com designers UI/UX para implementar desgins fiéis ao protótipo.",
    "Participar em revisões de código e partilhar conhecimentos com a equipe.",
    "Otimizar aplicações para máxima velocidade e escalabilidade ",
  ],
  requisitos: [
    "Conhecimentos em HTML, CSS e JS",
    "Experiência básica em React.js",
  ],
  curso: ["Engenharia de Software", "ADS"],
  semestre: "4",
  bolsa: "1200",
  prazoInscricao: "30/09/2025",
  sobre:
    "A Tech Solutions Inc. é lider em inovação digital, focada em criar soluções de software de ponta para o mercado global",
};

export function Vaga() {
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate(-1);
  };

  const back = (
    <button
      className="flex items-center gap-4 cursor-pointer"
      onClick={handleVoltar}
    >
      {<ChevronLeft />} Voltar
    </button>
  );

  return (
    <Template title={back}>
      <header className="flex items-center justify-between gap-3 text-white p-2">
        <div className="flex w-full gap-4">
          <h2 className="text-2xl font-bold">{infos.titulo}</h2>
          <div className="flex gap-5">
            {infos.tags.map((tag, index) => (
              <Categoria
                key={index}
                caracteristica={tag}
              >
                {tag}
              </Categoria>
            ))}
          </div>
        </div>
        <div className="flex">
          <button className="bg-blue-500 hover:bg-blue-700 cursor-pointer duration-300 p-2 rounded-xl w-48">
            Candidatar-se
          </button>
        </div>
      </header>
      <main className="flex justify-between m-2 text-white">
        <section className="flex flex-col gap-6 w-65/100 bg-[#1E293B] p-6">
          <InfoVaga
            titulo={"Descrição da vaga"}
            descricao={infos.descricao}
          />
          <InfoVaga
            titulo={"Responsabilidades"}
            descricao={infos.responsabilidades}
            tipo={"lista"}
          />
          <InfoVaga
            titulo={"Requisitos"}
            descricao={infos.requisitos}
            tipo={"lista"}
          />
        </section>
        <section className="flex flex-col gap-5 w-3/10 bg-[#1E293B] p-6">
          <InfoVaga
            titulo={"Curso Requisitado"}
            descricao={infos.curso}
            tipo="lista"
          />
          <InfoVaga
            titulo={"Semestre Mínimo"}
            descricao={`A partir do ${infos.semestre}°`}
          />
          <InfoVaga
            titulo={"Bolsa Auxilio"}
            descricao={infos.bolsa}
          />
          <InfoVaga
            titulo={"Prazo de inscrição"}
            descricao={infos.prazoInscricao}
          />
          <InfoVaga
            titulo={"Sobre a empresa"}
            descricao={infos.sobre}
          />
        </section>
      </main>
    </Template>
  );
}
