import { useEffect, useState } from "react";
import FilterBox from "../../components/dashboard/geral/FilterBox";
import informacoes from "../../utils/informacoes.json";
import Oportunidade from "../../components/dashboard/geral/Oportunidade";
import { buscarVagas } from "@/api/api";
import Swal from "sweetalert2";

export default function Vagas() {
  // eslint-disable-next-line no-unused-vars
  const [filterData, setFilterData] = useState([]);
  const [vagas, setVagas] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);

  const carregarVagas = async () => {
    Swal.fire({
      title: "Enviando os dados...",
      text: "Aguarde um momento, por favor!",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const vagasReq = await buscarVagas();
      setVagas(vagasReq);
    } finally {
      Swal.close();
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarVagas();
    console.log(vagas)
  }, [vagas]);

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-1 justify-around bg-[#263243] p-5 gap-10 rounded-2xl ">
          <FilterBox
            id={"tipos"}
            name={"tipos"}
            filtro={"Tipos de vagas"}
            options={informacoes.tipos} // Definir os tipos
            placeholder={"Todas"}
          />
          <FilterBox
            id={"curso"}
            name={"curso"}
            filtro={"Curso"}
            options={informacoes.cursos.slice(1)} // O slice serve pra remover o primeiro indice inutil
            placeholder={"Curso"}
          />
          <FilterBox
            id={"semestre"}
            name={"semestre"}
            filtro={"Semestre"}
            options={informacoes.semestre} // Definir os semestres
          />
          <FilterBox
            id={"tipos"}
            name={"tipos"}
            filtro={"Modalidade"}
            options={informacoes.modalidade}
          />
        </div>
        <div className="overflow-y-auto flex flex-col gap-6">
          <Oportunidade vagas={vagas} />
        </div>
      </div>
    </>
  );
}
