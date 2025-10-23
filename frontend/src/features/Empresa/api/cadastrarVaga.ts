import { getAuthToken, parseJsonSafe } from "@/_funcs/funcs";
import { vagaModel } from "@/models/oportunidadeModel";

export async function cadastrarVaga(data: vagaModel) {
  try {
    const token = await getAuthToken();
    if (!token) throw new Error("Token não encontrado");

    const reply = await fetch(`/api/empresa/cadastrar-vaga`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!reply.ok) {
      const errorData = await parseJsonSafe(reply);
      throw new Error(
        errorData?.error || `Erro na requisição: ${reply.status}`
      );
    }

    return await parseJsonSafe(reply);
  } catch (error) {
    console.error("Erro no frontend ao cadastrar vaga (empresa):", error);
    throw error;
  }
}
