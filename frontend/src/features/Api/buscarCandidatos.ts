import { getAuthToken } from "@/_funcs/funcs";

export async function buscarCandidatos(id: string) {
  try {
    const token = await getAuthToken();
    const response = await fetch(`/api/vagas/${id}/candidatos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      redirect: "follow",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Erro na resposta:", response.status, errorData);
      throw new Error(`Erro ao buscar candidatos: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Erro ao buscar candidatos", err);
    throw err;
  }
}
