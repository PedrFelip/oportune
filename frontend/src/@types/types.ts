// ========================================================================
// 1. Enums (Convertidos para Tipos de União de Strings)
// ========================================================================

export type StatusCandidatura = "PENDENTE" | "ACEITA" | "RECUSADA";
export type TipoVaga = "ESTAGIO" | "PESQUISA" | "EXTENSAO";
export type StatusVaga = "ATIVA" | "INATIVA" | "ENCERRADA";
export type UserType = "ESTUDANTE" | "PROFESSOR" | "EMPRESA";
export type Periodo = "MATUTINO" | "VESPERTINO" | "NOTURNO";


// ========================================================================
// 2. Interfaces dos Models
// ========================================================================

// Nota: Campos de data (DateTime) são tipados como `string` porque é assim
// que eles são serializados em JSON ao serem enviados pela API.

export interface Candidatura {
  id: string;
  vagaId: string;
  estudanteId: string;
  dataCandidatura: string; // ISO 8601 Date String
  status: StatusCandidatura;
  createdAt: string; // ISO 8601 Date String
  updatedAt: string; // ISO 8601 Date String

  // Relações (incluídas para dados aninhados)
  vaga: Vaga;
  estudante: Estudante;
}

export interface Vaga {
  id: string;
  empresaId: string | null;
  professorId: string | null;
  titulo: string;
  descricao: string;
  tipo: TipoVaga;
  requisitos: string[];
  prazoInscricao: string; // ISO 8601 Date String
  statusVaga: StatusVaga;
  cursosAlvo: string[];
  semestreMinimo: number | null;
  createdAt: string; // ISO 8601 Date String
  updatedAt: string; // ISO 8601 Date String

  // Relações
  empresa?: Empresa | null;
  professor?: Professor | null;
  candidaturas?: Candidatura[];
}

// ========================================================================
// 2.2 Interfaces dos usuários
// ========================================================================

export interface Estudante {
  id: string;
  userId: string;
  telefone: string | null;
  fotoPerfil: string | null;
  dataNascimento: string; // ISO 8601 Date String
  genero: string;
  faculdade: string | null;
  matricula: string;
  curso: string;
  semestre: number;
  periodo: Periodo;
  dataFormatura: string | null; // ISO 8601 Date String
  createdAt: string; // ISO 8601 Date String
  updatedAt: string; // ISO 8601 Date String

  // Relações
  user?: User;
  candidaturas?: Candidatura[];
}

export interface Professor {
  id: string;
  userId: string;
  telefone: string | null;
  fotoPerfil: string | null;
  dataNascimento: string; // ISO 8601 Date String
  genero: string;
  areasInteresse: string[];
  areaAtuacao: string;
  departamento: string;
  titulacao: string;
  lattes: string | null;
  createdAt: string; // ISO 8601 Date String
  updatedAt: string; // ISO 8601 Date String

  // Relações
  user?: User;
  vagas?: Vaga[];
}

export interface Empresa {
  id: string;
  userId: string;
  nomeFantasia: string;
  logo: string | null;
  cnpj: string;
  ramo: string;
  setor: string;
  descricao: string | null;
  endereco: string | null;
  telefone: string | null;
  emailContato: string | null;
  website: string | null;
  redesSociais: string[];
  createdAt: string; // ISO 8601 Date String
  updatedAt: string; // ISO 8601 Date String

  // Relações
  user?: User;
  vagas?: Vaga[];
}


// ========================================================================
// 3. Tipagem de Usuário com Discriminated Union
// ========================================================================

// Uma interface base com os campos que TODOS os usuários compartilham.
interface BaseUser {
  id: string;
  email: string;
  // A senha não é incluída, pois nunca deve ser enviada para o frontend.
  nome: string;
  emailVerificado: boolean;
  createdAt: string; // ISO 8601 Date String
  updatedAt: string; // ISO 8601 Date String
}

// Tipos específicos que combinam a base com o perfil correspondente.
// O campo `tipo` serve como "discriminante".
export interface UserEstudante extends BaseUser {
  tipo: "ESTUDANTE";
  estudante: Estudante;
  professor: null;
  empresa: null;
}

export interface UserProfessor extends BaseUser {
  tipo: "PROFESSOR";
  estudante: null;
  professor: Professor;
  empresa: null;
}

export interface UserEmpresa extends BaseUser {
  tipo: "EMPRESA";
  estudante: null;
  professor: null;
  empresa: Empresa;
}

// O tipo `User` final é uma união de todas as possibilidades.
export type User = UserEstudante | UserProfessor | UserEmpresa;