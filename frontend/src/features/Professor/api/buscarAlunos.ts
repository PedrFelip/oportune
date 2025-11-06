import { getToken } from "@/adapters/getToken";
import { handleError } from "@/adapters/handleError";

interface Aluno {
  id: string;
  nome: string;
  email: string;
  curso: string;
  semestre: number;
  habilidadesTecnicas: string[];
  fotoPerfil: string;
}

interface BuscarAlunosResponse {
  message: string;
  alunos: Aluno[];
}

export async function buscarAlunosOrientados(): Promise<BuscarAlunosResponse> {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await fetch(
      `/api/professor/dashboard/alunos`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao buscar alunos");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
}
