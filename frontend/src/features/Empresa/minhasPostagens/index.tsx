"use client";

import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { useVagas } from "./hooks/useVagas";
import { CardPostagemVaga } from "./components/CardPostagemVaga";
import { FormNewOportune } from "../FormVaga";
import { encerrarVaga } from "@/features/Api/encerrarVaga";
import { showMessage } from "@/adapters/showMessage";
import { useLoading } from "@/contexts/LoadingContext";

type StatusFilter = "todas" | "ativas" | "encerradas";

export function PostagensVagas() {
  const { vagas, loading, error, refetch } = useVagas(); // Hook semelhante ao de candidaturas
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState<StatusFilter>("todas");
  const { showLoading, hideLoading } = useLoading();

  const vagasFiltradas = useMemo(() => {
    if (filtroStatus === "todas") return vagas;

    if (filtroStatus === "ativas")
      return vagas.filter((v) => (v.status ?? "ATIVA") === "ATIVA");

    if (filtroStatus === "encerradas")
      return vagas.filter((v) => (v.status ?? "ATIVA") === "ENCERRADA");

    return vagas;
  }, [vagas, filtroStatus]);

  const handleFiltroClick = (status: StatusFilter) => {
    setFiltroStatus(status);
  };

  const contadores = useMemo(() => {
    return {
      todas: vagas.length,
      ativas: vagas.filter((v) => (v.status ?? "ATIVA") === "ATIVA").length,
      encerradas: vagas.filter((v) => (v.status ?? "ATIVA") === "ENCERRADA").length,
    };
  }, [vagas]);

  const handleEncerrar = async (vagaId: string) => {
    const confirmar = window.confirm("Tem certeza que deseja encerrar esta vaga?");
    if (!confirmar) return;

    showLoading();
    try {
      await encerrarVaga(vagaId);
      showMessage.success("Vaga encerrada com sucesso!");
      await refetch();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showMessage.error(err.message || "Erro ao encerrar vaga");
    } finally {
      hideLoading();
    }
  };

  if (error) {
    return (
      <div className="flex flex-col gap-4 text-white">
        <h2 className="text-3xl font-bold">Minhas Vagas</h2>
        <div className="bg-red-500/20 border border-red-600 rounded-lg p-4 flex flex-col gap-4">
          <p className="text-red-400">{error}</p>
          <Button onClick={refetch} variant="ghost_red" className="w-fit">
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 text-white">
      <header className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Minhas Vagas</h2>
          <FormNewOportune isOpen={isFormOpen} setIsOpen={setIsFormOpen} typeButton="standard" />
        </div>

        <div className="flex gap-8 flex-wrap">
          <Button
            className={`border-l-4 border-[#7C3AED] bg-gray-400/10 hover:bg-gray-700 ${
              filtroStatus === "todas" ? "bg-gray-700" : ""
            }`}
            onClick={() => handleFiltroClick("todas")}
          >
            Todas ({contadores.todas})
          </Button>
          <Button
            className={`border-l-4 border-green-500 bg-gray-400/10 hover:bg-gray-700 ${
              filtroStatus === "ativas" ? "bg-gray-700" : ""
            }`}
            onClick={() => handleFiltroClick("ativas")}
          >
            Ativas ({contadores.ativas})
          </Button>
          <Button
            className={`border-l-4 border-red-500 bg-gray-400/10 hover:bg-gray-700 ${
              filtroStatus === "encerradas" ? "bg-gray-700" : ""
            }`}
            onClick={() => handleFiltroClick("encerradas")}
          >
            Encerradas ({contadores.encerradas})
          </Button>
        </div>
      </header>

      <main className="flex flex-col items-center mt-10">
        {loading ? (
          <div className="text-center py-10">
            <p>Carregando vagas...</p>
          </div>
        ) : vagasFiltradas.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400">
              {filtroStatus === "todas"
                ? "Nenhuma vaga criada ainda."
                : `Nenhuma vaga ${filtroStatus}.`}
            </p>
          </div>
        ) : (
          <CardPostagemVaga vagas={vagasFiltradas} onEncerrar={handleEncerrar} />
        )}
      </main>
    </div>
  );
}
