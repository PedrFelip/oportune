export async function buscarPerfilPeloId(id: string) {
  try {
    const response = await fetch(`/api/geral/buscar-perfil-pelo-id/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      cache: "no-store",
    });

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
