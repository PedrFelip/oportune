async function parseJsonSafe(reply: Response) {
  if (reply.status === 204) {
    return null;
  }

  const contentType = reply.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    // Tenta ler texto para depuração
    const text = await reply.text().catch(() => "");
    throw new Error(text || `Resposta inválida (${reply.status})`);
  }

  const jsonData = await reply.json();
  return jsonData;
}

export async function logarUsuario(dados: { email: string; senha: string }) {
  try {
    const reply = await fetch(`http://localhost:3001/loguser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    if (!reply.ok) {
      const text = await reply.text().catch(() => "");
      throw new Error(text || `Erro na requisição: ${reply.status}`);
    }

    return await parseJsonSafe(reply); // { token, user }
  } catch (error) {
    console.error("Erro ao logar usuário:", error);
    throw error;
  }
}