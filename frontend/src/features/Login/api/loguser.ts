import { parseJsonSafe } from "@/_funcs/funcs";

// Função client-side para logar usuário
export async function logarUsuario(dados: { email: string; senha: string }) {
  try {
    const reply = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    if (!reply.ok) {
      const text = await reply.text().catch(() => "");
      throw new Error(text || `Erro na requisição: ${reply.status}`);
    }

    // Retorna { token, user } do backend
    return await parseJsonSafe(reply);
  } catch (error) {
    console.error("Erro ao logar usuário:", error);
    throw new Error("Erro ao logar usuário, tente novamente");
  }
}
