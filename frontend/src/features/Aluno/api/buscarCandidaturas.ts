import { getAuthToken, parseJsonSafe } from "@/_funcs/funcs";

export async function buscarCandidaturasAluno() {
  try {
    const token = await getAuthToken();
    if (!token) throw new Error("Token não encontrado");

    console.log("💻 Frontend chamando a rota da API do Next.js...");
    console.log(token)

    // Chamamos a nossa rota interna do Next.js, e não o backend diretamente.
    const reply = await fetch(`/api/aluno/dashboard/buscar-candidaturas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ Resposta da rota Next.js:", reply.status, reply.statusText);
    console.log(token)

    if (!reply.ok) {
      const errorData = await parseJsonSafe(reply);
      throw new Error(
        errorData?.error || `Erro na requisição: ${reply.status}`
      );
    }

    return await parseJsonSafe(reply);
  } catch (error) {
    console.error("💥 Erro no frontend ao buscar dashboard:", error);
    throw error;
  }
}
