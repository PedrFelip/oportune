/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import ProfessorFt from "@/assets/prof_cat.jpg";
import { FormNewOportune } from "../FormVaga";
import { useLayout } from "@/contexts/LayoutContext";
import { useAuth } from "@/contexts/AuthContext";
import { showMessage } from "@/adapters/showMessage";
import { buscarPerfilProfessor } from "../api/buscarPerfil";
import { buscarAlunosOrientados } from "../api/buscarAlunos";
import { buscarVagasRecentes } from "../api/buscarVagasRecentes";

export function Dashboard() {
  const { carregando } = useAuthGuard({
    redirectTo: "/login",
    requireRole: "PROFESSOR",
  });

  const { setPageTitle } = useLayout();
  const { usuario } = useAuth();

  const [perfil, setPerfil] = useState<any>(null);
  const [alunosOrientados, setAlunosOrientados] = useState<any[]>([]);
  const [vagasRecentes, setVagasRecentes] = useState<any[]>([]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [loadingPerfil, setLoadingPerfil] = useState(true);
  const [loadingAlunos, setLoadingAlunos] = useState(true);
  const [loadingVagas, setLoadingVagas] = useState(true);

  useEffect(() => {
    if (carregando) return;

    const carregarDados = async () => {
      try {
        setLoadingPerfil(true);
        const respPerfil = await buscarPerfilProfessor();
        setPerfil(respPerfil.perfil);

        setLoadingAlunos(true);
        const respAlunos = await buscarAlunosOrientados();
        setAlunosOrientados(respAlunos.alunos);

        setLoadingVagas(true);
        const respVagas = await buscarVagasRecentes();
        setVagasRecentes(respVagas);
      } catch (e) {
        console.error("Erro ao carregar dados:", e);
        showMessage.error("Erro ao carregar dados do dashboard");
      } finally {
        setLoadingPerfil(false);
        setLoadingAlunos(false);
        setLoadingVagas(false);
      }
    };

    carregarDados();
  }, [carregando]);

  useEffect(() => {
    setPageTitle(`Olá ${usuario?.nome || "Professor"}`);
  }, [setPageTitle, usuario?.nome]);

  if (carregando || loadingPerfil) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  if (!usuario) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        {/* 🔹 Coluna Principal */}
        <div className="col-span-3 lg:col-span-2 space-y-6">
          {/* Perfil */}
          {perfil ? (
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="flex items-center gap-4 justify-between">
                <div className="container flex gap-2 items-center">
                  <div className="w-20 h-20 rounded-full bg-blue-400 flex items-center justify-center text-slate-800 text-3xl font-bold border-4 border-slate-700">
                    {perfil.fotoPerfil ? (
                      <Image
                        src={perfil.fotoPerfil}
                        alt="Foto"
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                    ) : (
                      <Image
                        src={ProfessorFt}
                        alt="Foto"
                        className="rounded-full"
                      />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {perfil.nome}
                    </h2>
                    <p className="text-slate-400">
                      Professor de {perfil.departamento || "N/A"}
                    </p>
                  </div>
                </div>
                <Button variant={"oportune"}>Editar perfil</Button>
              </div>
              <div className="mt-6">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-slate-400">
                    Perfil Completo
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {perfil.percentualPerfilCompleto || 0}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${perfil.percentualPerfilCompleto || 0}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-800 p-6 rounded-lg text-slate-400">
              Nenhum dado de perfil encontrado
            </div>
          )}

          <div className="bg-slate-800 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">
                Minhas Vagas Recentes
              </h3>
              <a
                href="/professor/minhas-vagas"
                className="text-sm font-semibold text-blue-500 hover:underline"
              >
                Ver todas
              </a>
            </div>
            {loadingVagas ? (
              <div className="text-slate-400">Carregando vagas...</div>
            ) : vagasRecentes.length > 0 ? (
              <div className="space-y-3">
                {vagasRecentes.map((vaga) => (
                  <div
                    key={vaga.id}
                    className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    {vaga.status !== "REJEITADA" ? (
                      <>
                        <div>
                          <p className="font-semibold text-white">
                            {vaga.titulo}
                          </p>
                          <p className="text-sm text-slate-400">
                            Inscrições expiram em{" "}
                            {new Date(vaga.dataLimite).toLocaleDateString(
                              "pt-BR"
                            )}
                          </p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <Badge
                            className={`px-3 py-2 w-4/5 text-xs font-semibold rounded-full whitespace-nowrap ${
                              vaga.porcentagem >= 75
                                ? "bg-green-500/10 text-green-400"
                                : vaga.porcentagem >= 50
                                  ? "bg-yellow-500/10 text-yellow-400"
                                  : "bg-red-500/10 text-red-400"
                            }`}
                          >
                            {vaga.porcentagem.toFixed(0)}%
                          </Badge>
                          <Button variant={"oportune"}>Ver detalhes</Button>
                        </div>
                      </>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-400">
                Nenhuma vaga recente encontrada
              </div>
            )}
          </div>
        </div>

        {/* 🔹 Coluna Lateral — Alunos Orientados */}
        <div className="col-span-3 lg:col-span-1">
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4 text-center">
              Alunos para ficar de olho
            </h3>
            {loadingAlunos ? (
              <div className="text-slate-400">Carregando alunos...</div>
            ) : alunosOrientados.length > 0 ? (
              <ul className="space-y-3">
                {alunosOrientados.map((aluno) => (
                  <li
                    key={aluno.id}
                    className="border border-slate-700 rounded-lg p-3 text-slate-300 hover:bg-slate-700/40 transition"
                  >
                    <p className="font-semibold text-white">{aluno.nome}</p>
                    <p className="text-sm text-slate-400">
                      {aluno.curso} — {aluno.semestre}º semestre
                    </p>
                    <div className="flex gap-2">
                      {aluno.habilidadesTecnicas
                        ?.slice(0, 3)
                        .map((habilidade: string, idx: number) => (
                          <Badge
                            key={idx}
                            className="px-3 py-2 justify-around flex-1 mt-3 text-xs font-semibold rounded-full whitespace-nowrap bg-blue-500/10 text-blue-400"
                          >
                            {habilidade}
                          </Badge>
                        ))}
                    </div>
                    <Button variant={"oportune_blank"} className="w-full mt-4">
                      Ver detalhes
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-slate-400">
                Nenhum aluno sugerido no momento
              </div>
            )}
          </div>
        </div>
      </div>
      <FormNewOportune
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        typeButton="floating"
      />
    </>
  );
}
