import { getAuthToken, parseJsonSafe } from "@/_funcs/funcs";

export async function buscarCandidaturas() {
  try {
    const token = await getAuthToken();
    if (!token) throw new Error("Token não encontrado");

    const reply = await fetch(`/api/empresa/total-candidaturas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!reply.ok) {
      const errorData = await parseJsonSafe(reply);
      throw new Error(
        errorData?.error || `Erro na requisição: ${reply.status}`
      );
    }

    return await parseJsonSafe(reply);
  } catch (error) {
    console.error("Erro no frontend ao buscar candidaturas (empresa):", error);
    throw error;
  }
}
