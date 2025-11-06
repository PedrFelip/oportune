import { getToken } from "@/adapters/getToken";
import { handleError } from "@/adapters/handleError";

interface PerfilProfessor {
  id: string;
  nome: string;
  email: string;
  departamento: string;
  telefone: string;
  fotoPerfil: string;
  lattes: string;
  areasInteresse: string[];
  percentualPerfilCompleto: number;
}

interface BuscarPerfilResponse {
  message: string;
  perfil: PerfilProfessor;
}

export async function buscarPerfilProfessor(): Promise<BuscarPerfilResponse> {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await fetch(
      `/api/professor/dashboard/buscar-perfil`,
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
      throw new Error(errorData.message || "Erro ao buscar perfil do professor");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
}
