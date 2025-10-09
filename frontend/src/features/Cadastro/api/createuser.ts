import { parseJsonSafe } from "@/_funcs/funcs";
import { CadastroFormData } from "@/lib/schemas";

export async function cadastrarUsuario(dados: CadastroFormData){
  try {
    const reply = await fetch("/api/auth/cadastro", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(dados)
    })

    if (!reply.ok) {
      const text = await reply.text().catch(() => "");
      throw new Error(text || `Erro na requisição: ${reply.status}`);
    }

    return await parseJsonSafe(reply)
  } catch (error){
    console.error(error)
    throw new Error("Erro ao cadastrar usuário, tente novamente")
  }
}