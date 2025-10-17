export interface vagaModel {
  titulo: string;
  descricao: string;
  requisitos: string[];
  tipo: "Extensão" | "Pesquisa" | "Estágio";
  prazoInscricao: string;
  cursosAlvo: string[];
  semestreMinimo: string | number;
  numeroVagas?: string | number; // Corrigido de numerosVaga para numeroVagas
  professorId?: string;
  empresaId?: string;
}
