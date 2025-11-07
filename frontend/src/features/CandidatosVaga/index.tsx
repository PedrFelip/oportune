"use client";

import { Button } from "@/components/ui/button";
import { Check, Eye, MoveLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { buscarCandidatos } from "../Api/buscarCandidatos";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { aprovarCandidatura, rejeitarCandidatura } from "../Api/candidaturas"; // 👈 importa suas novas funções
import { showMessage } from "@/adapters/showMessage";

type Candidato = {
  id: string;
  status: "PENDENTE" | "APROVADO" | "REJEITADO";
  dataCandidatura: string;
  estudante: {
    id: string;
    nome: string;
    curso: string;
    semestre: number;
    matricula: string;
  };
};

export function CandidatosVaga({ vagaId }: { vagaId: string }) {
  const { back } = useRouter();
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // 🔹 Buscar candidatos ao carregar
  useEffect(() => {
    const response = async () => {
      const data = await buscarCandidatos(vagaId);
      setCandidatos(data);
    };
    response();
  }, [vagaId]);

  // 🔹 Função para aprovar candidato
  async function handleAprovar(candidaturaId: string, estudanteId: string) {
    try {
      setLoadingId(candidaturaId);
      await aprovarCandidatura({ candidaturaId, estudanteId });

      setCandidatos((prev) =>
        prev.map((c) =>
          c.id === candidaturaId ? { ...c, status: "APROVADO" } : c
        )
      );

      showMessage.success("✅ Candidato aprovado com sucesso!");
    } catch (err) {
      console.error(err);
      showMessage.error("❌ Erro ao aprovar candidato.");
    } finally {
      setLoadingId(null);
    }
  }

  // 🔹 Função para rejeitar candidato
  async function handleRejeitar(candidaturaId: string, estudanteId: string) {
    try {
      setLoadingId(candidaturaId);
      await rejeitarCandidatura({ candidaturaId, estudanteId });

      setCandidatos((prev) =>
        prev.map((c) =>
          c.id === candidaturaId ? { ...c, status: "REJEITADO" } : c
        )
      );

      showMessage.success("🚫 Candidato rejeitado com sucesso!");
    } catch (err) {
      console.error(err);
      showMessage.error("❌ Erro ao rejeitar candidato.");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen font-inter">
      <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <Button variant={"ghost_red"} onClick={() => back()}>
            <MoveLeft />
            Voltar para Minhas Vagas
          </Button>
        </div>

        <div className="bg-gray-800 p-6 sm:p-8 rounded-2xl">
          <h2 className="text-3xl font-bold text-white mb-2">
            Candidatos da Vaga
          </h2>
          <p className="text-blue-400 font-semibold text-lg mb-8">
            Estágio: Desenvolvedor Front-end
          </p>

          {/* Tabela de Candidatos */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="p-4 font-semibold">Candidato</th>
                  <th className="p-4 font-semibold hidden md:table-cell">
                    Curso
                  </th>
                  <th className="p-4 font-semibold hidden lg:table-cell">
                    Semestre
                  </th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Ações</th>
                </tr>
              </thead>

              <tbody id="candidatos-tbody">
                {candidatos.map((candidato) => (
                  <tr
                    key={candidato.id}
                    className="border-b border-gray-700/50 hover:bg-gray-700/40 transition-colors"
                  >
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-400 flex-shrink-0 flex items-center justify-center font-bold">
                        {candidato.estudante.nome
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                      <span className="font-medium text-white">
                        {candidato.estudante.nome}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400 hidden md:table-cell">
                      {candidato.estudante.curso}
                    </td>
                    <td className="p-4 text-gray-400 hidden lg:table-cell">
                      {candidato.estudante.semestre}
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={
                          candidato.status === "APROVADO"
                            ? "green"
                            : candidato.status === "REJEITADO"
                            ? "red"
                            : "yellow"
                        }
                      >
                        {candidato.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end items-center gap-2">
                        {/* Botão Perfil */}
                        <Link
                          href={`/vagas/${vagaId}`}
                          className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-md transition-colors bg-gray-700 hover:bg-gray-600 text-white cursor-pointer"
                          title="Ver Perfil"
                        >
                          <Eye size={16} />
                          <span className="hidden md:inline">Perfil</span>
                        </Link>

                        {/* Botões Condicionais */}
                        {candidato.status === "PENDENTE" && (
                          <>
                            <button
                              className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-md transition-colors bg-green-500/10 hover:bg-green-500/20 text-green-400 disabled:opacity-50 cursor-pointer"
                              title="Aprovar"
                              disabled={loadingId === candidato.id}
                              onClick={() =>
                                handleAprovar(
                                  candidato.id,
                                  candidato.estudante.id
                                )
                              }
                            >
                              {loadingId === candidato.id ? (
                                <span className="text-xs">Aprovando...</span>
                              ) : (
                                <>
                                  <Check size={16} />
                                  <span className="hidden md:inline">
                                    Aprovar
                                  </span>
                                </>
                              )}
                            </button>

                            <button
                              className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-md transition-colors bg-red-500/10 hover:bg-red-500/20 text-red-400 disabled:opacity-50 cursor-pointer"
                              title="Rejeitar"
                              disabled={loadingId === candidato.id}
                              onClick={() =>
                                handleRejeitar(
                                  candidato.id,
                                  candidato.estudante.id
                                )
                              }
                            >
                              {loadingId === candidato.id ? (
                                <span className="text-xs">Rejeitando...</span>
                              ) : (
                                <>
                                  <X size={16} />
                                  <span className="hidden md:inline">
                                    Rejeitar
                                  </span>
                                </>
                              )}
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
