import { getAuthToken, parseJsonSafe } from "@/_funcs/funcs";

// Função para buscar os dados atuais do perfil do usuário logado
export async function buscarPerfilAtual() {
  try {
    const token = await getAuthToken();
    const reply = await fetch("/api/aluno/perfil", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!reply.ok) {
      const text = await reply.text().catch(() => "");
      throw new Error(text || `Erro na requisição: ${reply.status}`);
    }

    return await parseJsonSafe(reply);
  } catch (error) {
    console.error("Erro ao buscar perfil atual:", error);
    throw new Error("Erro ao buscar perfil atual, tente novamente");
  }
}
