"use client";

import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { buscarCandidatos } from "../Api/buscarCandidatos";
import { Badge } from "@/components/ui/badge";

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

  useEffect(() => {
    const response = async () => {
      const data = await buscarCandidatos(vagaId);
      setCandidatos(data);
    };
    response();
  }, [vagaId]);

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
                {candidatos.map((candidato, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-700/50 hover:bg-gray-700/40 transition-colors"
                  >
                    <td className="p-4 flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full bg-blue-400 flex-shrink-0 flex items-center justify-center font-bold`}
                      >
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
                        <button
                          className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-md transition-colors bg-gray-700 hover:bg-gray-600 text-white"
                          title="Ver Perfil"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          <span className="hidden md:inline">Perfil</span>
                        </button>

                        {/* Botões Condicionais */}
                        {candidato.status === "PENDENTE" && (
                          <>
                            <button
                              className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-md transition-colors bg-green-500/10 hover:bg-green-500/20 text-green-400"
                              title="Aprovar"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              <span className="hidden md:inline">Aprovar</span>
                            </button>
                            <button
                              className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-md transition-colors bg-red-500/10 hover:bg-red-500/20 text-red-400"
                              title="Rejeitar"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                              <span className="hidden md:inline">Rejeitar</span>
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
