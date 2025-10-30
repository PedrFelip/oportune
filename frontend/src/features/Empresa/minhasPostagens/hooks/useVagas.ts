import { useState, useEffect } from "react";
import { Vaga } from "@/models/vaga";
import { buscarVagaPorUser } from "@/features/Api/buscarVagaPorUser";

export function useVagas() {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchVagas() {
    try {
      setLoading(true);
      const data = await buscarVagaPorUser(); // essa função já deve retornar o JSON

      if (!data) throw new Error("Erro ao buscar vagas");

      // verifica se veio um array ou o objeto com 'vagas'
      const listaVagas = Array.isArray(data) ? data : data.vagas || [];

      setVagas(listaVagas);
      setError(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("❌ Erro em useVagas:", err);
      setError(err.message || "Erro desconhecido");
      setVagas([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVagas();
  }, []);

  return { vagas, loading, error, refetch: fetchVagas };
}
