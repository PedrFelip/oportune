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

    return await reply.json();
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    throw error;
  }
}
export async function confirmarEmail(token: string) {
  try {
    const reply = await fetch("http://localhost:3001/confirm-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    if (!reply.ok) {
      const errorData = await reply.json();
      throw new Error(
        errorData.message || `Erro na requisição: ${reply.status}`,
      );
    }

    return await reply.json();
  } catch (error) {
    console.error("Erro ao confirmar e-mail:", error);
    throw error;
  }
}
