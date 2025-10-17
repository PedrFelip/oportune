export async function buscarVagaPeloId(id: string, token?: string) {
  try {
    if (!token) throw new Error("Token não encontrado");

    const response = await fetch(
      `${process.env.BACKEND_API_URL}/vagas/${id}`,
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
      throw new Error(`Erro ao buscar vaga: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Erro ao buscar vaga", err);
    throw err;
  }
}
