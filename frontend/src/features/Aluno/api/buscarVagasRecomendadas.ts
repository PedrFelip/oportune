import { getAuthToken, parseJsonSafe } from "@/_funcs/funcs";

export async function buscarVagasRecomendadasAluno() {
  try {
    const token = await getAuthToken();
    if (!token) throw new Error("Token não encontrado");

    console.log("💻 Frontend chamando a rota da API do Next.js...");

    // Chamamos a nossa rota interna do Next.js, e não o backend diretamente.
    const reply = await fetch(`/api/aluno/dashboard/vagas-recomendadas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Enviamos o token para a nossa API Next.js
      },
    });

    console.log("✅ Resposta da rota Next.js:", reply.status, reply.statusText);

    if (!reply.ok) {
      const errorData = await parseJsonSafe(reply);
      // O erro agora pode vir estruturado da nossa API Next.js
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
