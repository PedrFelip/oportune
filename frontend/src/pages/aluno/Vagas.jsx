import Template from "../../components/dashboard/geral/template";
import FilterBox from "../../components/dashboard/geral/FilterBox";
import informacoes from "../../utils/informacoes.json";
import { useState } from "react";

export default function Vagas() {
  // eslint-disable-next-line no-unused-vars
  const [filterData, setFilterData] = useState([]);

  return (
    <Template title={"Oportunidade"}>
      <div className="flex flex-1 justify-around bg-[#263243] p-3 ">
        <FilterBox
          id={"tipos"}
          name={"tipos"}
          filtro={"Tipos de vagas"}
          options={informacoes.tipos} // Definir os tipos
        />
        <FilterBox
          id={"curso"}
          name={"curso"}
          filtro={"Curso"}
          options={informacoes.cursos}
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
      <section>
        
      </section>
    </Template>
  );
}
