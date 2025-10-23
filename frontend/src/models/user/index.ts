import { Candidatura } from "../candidatura";
import { Genero, Periodo, UserType } from "../enums";
import { Vaga } from "../vaga";

export interface Estudante {
  id: string;
  userId: string;
  telefone: string | null;
  fotoPerfil: string | null;
  dataNascimento: string;
  genero: Genero;
  faculdade: string | null;
  matricula: string;
  curso: string;
  semestre: number;
  periodo: Periodo;
  dataFormatura: string | null;
  createdAt: string;
  updatedAt: string;

  // 🟩 Adicionados conforme JSON real
  areasInteresse: string[];
  habilidadesComportamentais: string[];
  habilidadesTecnicas: string[];

  // Relações
  user?: User;
  candidaturas?: Candidatura[];
}

export interface Professor {
  id: string;
  userId: string;
  telefone: string | null;
  fotoPerfil: string | null;
  dataNascimento: string;
  genero: Genero;
  areasInteresse: string[];
  areaAtuacao: string;
  departamento: string;
  titulacao: string;
  lattes: string | null;
  createdAt: string;
  updatedAt: string;

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
  createdAt: string;
  updatedAt: string;

  user?: User;
  vagas?: Vaga[];
}

// ========================================================================
// 3. Tipagem de Usuário
// ========================================================================

interface BaseUser {
  id: string;
  nome: string;
  email: string;
  tipo: UserType;
  createdAt?: string;
  updatedAt?: string;
}

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

export type User = UserEstudante | UserProfessor | UserEmpresa;