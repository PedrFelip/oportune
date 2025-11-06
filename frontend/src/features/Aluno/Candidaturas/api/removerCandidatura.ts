import { getAuthToken, parseJsonSafe } from "@/_funcs/funcs";

export async function removerCandidatura(candidaturaId: string) {
  try {
    const token = await getAuthToken();
    if (!token) throw new Error("Token não encontrado");

    const reply = await fetch(`/api/aluno/candidaturas/${candidaturaId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!reply.ok) {
      const errorData = await parseJsonSafe(reply);
      throw new Error(
        errorData?.error || `Erro ao remover candidatura: ${reply.status}`
      );
    }

    return await parseJsonSafe(reply);
  } catch (error) {
    console.error("💥 Erro no frontend ao remover candidatura:", error);
    throw error;
  }
}
