export async function cadastrarUsuario(dados: any) {
  try {
    const reply = await fetch("http://localhost:3001/createuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    if (!reply.ok) {
      throw new Error(`Erro na requisição: ${reply.status}`);
    }

    return reply.json();
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    throw error;
  }
}
