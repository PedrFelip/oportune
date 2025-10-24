import { getAuthToken, parseJsonSafe } from "@/_funcs/funcs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function editarPerfil(dados: any) {
  const token = await getAuthToken();
  try {
    const reply = await fetch("/api/aluno/editar-perfil", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dados),
    });

    if (!reply.ok) {
      const text = await reply.text().catch(() => "");
      throw new Error(text || `Erro na requisição: ${reply.status}`);
    }

    return await parseJsonSafe(reply);
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao editar usuário, tente novamente");
  }
}
