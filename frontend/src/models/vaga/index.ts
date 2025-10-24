import { Candidatura } from "../candidatura";
import { TipoVaga } from "../enums";

export interface Vaga {
  id: string;
  titulo: string;
  descricao: string;
  tipo: TipoVaga;
  categorias: string[];
  prazoInscricao: string;
  curso: string;
  semestre: string;

  empresa: string;
  candidaturas?: Candidatura[];
}

export type VagaEdit = Omit<Vaga, "id" | "empresa" | "candidaturas">;
