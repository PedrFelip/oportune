import { getAuthToken } from "@/_funcs/funcs";

export async function encerrarVaga(id: string) {
  try {
    const token = await getAuthToken();

    const response = await fetch(`/api/vagas/${id}/encerrar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const msg = await response.text();
      throw new Error(msg || `Erro ${response.status}`);
    }

    return await response.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("❌ Erro em encerrarVaga:", error);
    throw new Error(error.message || "Erro ao encerrar vaga");
  }
}
