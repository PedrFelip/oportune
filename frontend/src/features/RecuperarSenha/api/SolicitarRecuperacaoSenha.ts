import { parseJsonSafe } from "@/_funcs/funcs";

export async function solicitarRecuperacaoSenha(email: string) {
  try {
    const reply = await fetch("/api/auth/verificarEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!reply.ok) {
      const text = await reply.text().catch(() => "");
      throw new Error(text || `Erro na requisição: ${reply.status}`);
    }

    return await parseJsonSafe(reply);
  } catch (error) {
    console.error("Erro ao solicitar recuperação", error);
    const err = "Erro ao socilitar recuperação";
    throw new Error(err);
  }
}
