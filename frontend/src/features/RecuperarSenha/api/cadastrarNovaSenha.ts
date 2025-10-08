import { parseJsonSafe } from "@/_funcs/funcs";

export async function cadastrarNovaSenha(dados: {
  token: string;
  novaSenha: string;
  novaSenhaConfirmada: string;
}) {
  try {
    const reply = await fetch("/api/cadastrarNovaSenha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    if (!reply.ok) {
      const text = await reply.text().catch(() => "");
      throw new Error(text || `Erro na requisição: ${reply.status}`);
    }

    return await parseJsonSafe(reply);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
