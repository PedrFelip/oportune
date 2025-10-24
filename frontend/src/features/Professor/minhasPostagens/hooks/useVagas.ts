import { useState, useEffect } from "react";
import { Vaga } from "@/models/vaga";

export function useVagas() {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchVagas() {
    try {
      setLoading(true);
      const res = await fetch("/api/vagas/minhas");
      if (!res.ok) throw new Error("Erro ao buscar vagas");
      const data = await res.json();
      setVagas(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVagas();
  }, []);

  return { vagas, loading, error, refetch: fetchVagas };
}
