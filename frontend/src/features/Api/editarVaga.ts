import { getAuthToken } from "@/_funcs/funcs";
import { VagaEdit } from "@/models/vaga";

export async function editarVaga(id: string, dados: VagaEdit) {
  try {
    const token = await getAuthToken();
    const res = await fetch(`/api/vagas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...dados, id }),
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || `Erro ${res.status}`);
    }

    return await res.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("❌ Erro em editarVaga:", err);
    throw new Error(err.message || "Erro ao editar vaga");
  }
}
