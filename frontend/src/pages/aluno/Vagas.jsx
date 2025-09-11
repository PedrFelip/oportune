import Template from "../../components/dashboard/geral/template";
import FilterBox from "../../components/dashboard/geral/FilterBox";
import informacoes from "../../utils/informacoes.json";
import { useState } from "react";
import Oportunidade from "../../components/dashboard/geral/Oportunidade";

export default function Vagas() {
  // eslint-disable-next-line no-unused-vars
  const [filterData, setFilterData] = useState([]);

  // Criar o formulário dos filtros

  return (
    <Template title={"Oportunidade"}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-1 justify-around bg-[#263243] p-5 gap-10">
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
        <Oportunidade>
        
        </Oportunidade>
      </div>
    </Template>
  );
}
