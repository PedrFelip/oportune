export interface vagaModel {
  titulo: string;
  descricao: string;
  requisitos: string[];
  tipo: "Extensão" | "Cientifico" | "Estágio";
  prazoInscricao: string;
  cursosAlvo: string[];
  semestreMinimo: string | number;
  numerosVaga: string | number;
  professorId?: string;
  empresaId?: string;
}
