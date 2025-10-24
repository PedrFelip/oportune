import { getAuthToken } from "@/_funcs/funcs";

export async function buscarVagaPorUser() {
  try {
    const token = await getAuthToken();
    const response = await fetch(`/api/vagas/buscar-vaga-por-usuario`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
