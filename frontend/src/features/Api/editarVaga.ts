import { getAuthToken } from "@/_funcs/funcs";
import { VagaEdit } from "@/models/vaga";

export async function editarVaga(id: string, dados: VagaEdit) {
  try {
    const token = await getAuthToken();
    // Mapear para o formato esperado pelo backend
    const payload: Record<string, unknown> = {};
    if (dados.titulo) payload.titulo = dados.titulo;
    if (dados.descricao) payload.descricao = dados.descricao;
    if (dados.tipo) {
      // Converter rótulo para formato aceito pelo schema
      const map: Record<string, string> = {
        "Estágio": "Estágio",
        "Pesquisa": "Pesquisa",
        "Extensão": "Extensão",
        ESTAGIO: "Estágio",
        PESQUISA: "Pesquisa",
        EXTENSAO: "Extensão",
      };
      payload.tipo = map[dados.tipo as string] || "Estágio";
    }
    if (Array.isArray(dados.categorias) && dados.categorias.length > 0) {
      payload.requisitos = dados.categorias;
    }
    if (dados.curso) payload.cursosAlvo = [dados.curso];
    if (dados.semestre) payload.semestreMinimo = parseInt(dados.semestre);
    if (dados.prazoInscricao) payload.prazoInscricao = dados.prazoInscricao; // yyyy-MM-dd

    const res = await fetch(`/api/vagas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
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
