"use client";

import { useEffect, useState } from "react";
// import FilterBox from "../../components/dashboard/geral/FilterBox";
// import informacoes from "@/utils/informacoes.json"
import Oportunidade from "./Oportunidade";
import { showMessage } from "@/adapters/showMessage";
import { buscarVagas } from "../api/buscarVagas";
import { useLoading } from "@/contexts/LoadingContext";

export default function Vagas() {
  // const [filterData, setFilterData] = useState([]);
  const [vagas, setVagas] = useState([]);
  const { showLoading, hideLoading } = useLoading();

  const carregarVagas = async () => {
    showLoading();
    try {
      const vagasReq = await buscarVagas();

      if (vagasReq === null) {
        throw new Error("Falha na requisição");
      }
      showMessage.success("Vagas carregadas");
      setVagas(vagasReq);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    carregarVagas();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-col gap-8">
        {/* <div className="flex flex-1 justify-around bg-[#263243] p-5 gap-10 rounded-2xl "> */}
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
        {/* </div> */}
        <div className="overflow-y-auto flex flex-col gap-6">
          <Oportunidade vagas={vagas} />
        </div>
      </div>
    </>
  );
}
