import { parseJsonSafe } from "../_funcs/funcs";
import { CadastroFormData } from "@/lib/schemas";

export async function cadastrarUsuario(dados: CadastroFormData) {
  try {
    const reply = await fetch(`http://localhost:3001/createuser`, {
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
    console.error("Erro ao cadastrar usuário:", error);
    throw error;
  }
}