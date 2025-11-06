import { getToken } from "@/adapters/getToken";
import { handleError } from "@/adapters/handleError";

interface VagaRecente {
  id: string;
  titulo: string;
  dataLimite: Date;
  tipo: string;
  porcentagem: number;
}

export async function buscarVagasRecentes(): Promise<VagaRecente[]> {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await fetch(
      `/api/professor/dashboard/vagas-recentes`,
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
      throw new Error(errorData.message || "Erro ao buscar vagas recentes");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
}
