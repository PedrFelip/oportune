export async function buscarVagaPeloId(id: string, token?: string) {
  try {
    if (!token) throw new Error("Token não encontrado");

    const response = await fetch(
      `${process.env.BACKEND_API_URL}/geral/buscar-perfil-pelo-id/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Erro na resposta:", response.status, errorData);
      throw new Error(`Erro ao buscar perfil: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Erro ao buscar perfil", err);
    throw err;
  }
}
