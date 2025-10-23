import { StatusCandidatura } from "../enums";
import { Estudante } from "../user";
import { Vaga } from "../vaga";

export interface Candidatura {
  id: string;
  vagaId: string;
  estudanteId: string;
  dataCandidatura: string;
  status: StatusCandidatura;
  createdAt: string;
  updatedAt: string;

  vaga: Vaga;
  estudante: Estudante;
}