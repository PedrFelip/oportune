"use client";

import { useEffect, useState } from "react";
// import FilterBox from "../../components/dashboard/geral/FilterBox";
// import informacoes from "@/utils/informacoes.json"
import Oportunidade from "./Oportunidade";

export default function Vagas() {
  // const [filterData, setFilterData] = useState([]);
  const [vagas, setVagas] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);

  const carregarVagas = async () => {
    showMessage.loading("Carregando vagas");
    setLoading(true);
    try {
      const vagasReq = await buscarVagas();

      if (vagasReq === null) {
        throw new Error("Falha na requisição");
      }
      showMessage.dismiss();
      showMessage.success("Vagas carregadas");
      setVagas(vagasReq);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    carregarVagas();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-1 justify-around bg-[#263243] p-5 gap-10 rounded-2xl ">
          {/* <FilterBox
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
            options={informacoes.cursos["max"]} // Definir os semestres
          />
          <FilterBox
            id={"tipos"}
            name={"tipos"}
            filtro={"Modalidade"}
            options={informacoes.modalidade}
          /> */}
        </div>
        <div className="overflow-y-auto flex flex-col gap-6">
          <Oportunidade vagas={vagas} />
        </div>
      </div>
    </>
  );
}
import { showMessage } from "@/adapters/showMessage";
import { buscarVagas } from "../api/buscarVagas";
