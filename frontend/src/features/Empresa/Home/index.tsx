/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
// import { PerfilCard } from "@/components/PerfilCard"
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Uniceplac from "@/assets/Uniceplac.webp";
import { BriefcaseIcon, UserIcon } from "lucide-react";
import { useLayout } from "@/contexts/LayoutContext";
import { useAuth } from "@/contexts/AuthContext";
import { FormNewOportune } from "../FormVaga";
import { buscarVagasRecentes } from "@/features/Professor/api/buscarVagasRecentes";
import { showMessage } from "@/adapters/showMessage";
import { buscarVagasAtivas } from "../api/buscarVagasAtivas";
import { buscarPerfilPeloId } from "@/features/Api/buscarPerfilPeloID";
import { buscarCandidaturas } from "../api/buscarCandidaturas";
// import { buscarPerfilProfessor } from "../api/buscarPerfil";
// import { buscarAlunosOrientados } from "../api/buscarAlunos";

export function Dashboard() {
  const { carregando } = useAuthGuard({
    redirectTo: "/login",
    requireRole: "EMPRESA",
  });
  const { setPageTitle } = useLayout();
  const { usuario } = useAuth();

  const [perfil, setPerfil] = useState<any>({ porcentagem: 75 });
  const [totalVagas, setTotalVagas] = useState<number>(0);
  const [vagasRecentes, setVagasRecentes] = useState<any[]>([]);
  const [candidaturas, setCandidaturas] = useState<number>(0);
  // const [alunosOrientados, setAlunosOrientados] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  // const [loadingAlunos, setLoadingAlunos] = useState(true);
  // const [errorAlunos, setErrorAlunos] = useState<string | null>(null);

  useEffect(() => {
    if (carregando) return;

    if (usuario?.empresa) {
      setPerfil({ ...usuario.empresa, porcentagem: 75 });
    }
    // setAlunosOrientados(mockEmpresa.alunosOrientados);

    // 🔹 Caso fosse buscar da API:
    const carregarDados = async () => {
      try {
        showMessage.loading("Carregando dados...");
        setLoading(true);

        const respPerfil = await buscarPerfilPeloId(usuario?.id || "");
        console.log("respPerfil:", respPerfil);
        setPerfil(
          typeof respPerfil === "object" && respPerfil !== null
            ? respPerfil
            : {},
        );

        const respVagas = await buscarVagasRecentes();
        console.log("respVagas:", respVagas);
        setVagasRecentes(
          Array.isArray(respVagas)
            ? respVagas
            : Array.isArray((respVagas as any)?.data)
              ? (respVagas as any).data
              : [],
        );

        const totalResp = await buscarVagasAtivas();
        console.log("totalResp:", totalResp);
        setTotalVagas(
          typeof totalResp?.count === "number"
            ? totalResp.count
            : typeof totalResp === "number"
              ? totalResp
              : 0,
        );

        const candidaturasResp = await buscarCandidaturas();
        console.log("candidaturasResp:", candidaturasResp);
        setCandidaturas(
          typeof candidaturasResp?.count === "number"
            ? candidaturasResp.count
            : 0,
        );

        // const respAlunos = await buscarAlunosOrientados();
        // setAlunosOrientados(respAlunos.alunos);
        showMessage.dismiss();
        showMessage.success("Dados carregados com sucesso!");
      } catch (e) {
        console.error("Erro ao carregar dados:", e);
        showMessage.error("Erro ao carregar dados");
        // setErrorAlunos("Erro ao carregar alunos");
      } finally {
        setLoading(false);
        // setLoadingAlunos(false);
      }
    };

    carregarDados();
  }, [carregando, usuario?.empresa, usuario?.id]);

  useEffect(() => {
    if (usuario?.nome) {
      setPageTitle(`Olá ${usuario.nome}`);
    }
  }, [setPageTitle, usuario?.nome]);

  // if (carregando) showMessage.loading("Carregando...");

  if (!usuario || carregando) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        {/* 🔹 Coluna Principal */}
        <div className="col-span-3 lg:col-span-2 space-y-6">
          {/* Perfil */}
          {perfil && usuario?.empresa ? (
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="flex items-center gap-4 justify-between">
                <div className="container flex gap-2 items-center">
                  <div className="w-20 h-20 rounded-full bg-blue-400 flex items-center justify-center text-slate-800 text-3xl font-bold border-4 border-slate-700">
                    <Image
                      src={Uniceplac}
                      alt="Foto"
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {typeof usuario.empresa?.nomeFantasia === "string"
                        ? usuario.empresa.nomeFantasia
                        : typeof usuario.nome === "string"
                          ? usuario.nome
                          : "Empresa"}
                    </h2>
                    <p className="text-slate-400">
                      {typeof usuario.empresa?.ramo === "string"
                        ? usuario.empresa.ramo
                        : "Empresa parceira"}
                    </p>
                  </div>
                </div>
                {/* <Button variant={"oportune"}>Editar perfil</Button> */}
              </div>
              {/* <div className="mt-6">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-slate-400">
                    Perfil Completo
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {perfil.porcentagem}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${perfil.porcentagem}%` }}
                  ></div>
                </div>
              </div> */}
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
            {loading ? (
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
          <div className="bg-slate-800 p-6 rounded-lg flex flex-col gap-6">
            <h3 className="text-xl font-bold text-white mb-4 text-center">
              Relatório de vagas
            </h3>
            <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors flexc">
              <div className="card flex gap-3 items-center text-white">
                <BriefcaseIcon className="text-blue-500" />
                <h3 className="font-bold">Vagas ativas</h3>
              </div>
              <div className="font-bold text-xl text-white">
                {typeof totalVagas === "number" ? totalVagas : 0}
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
              <div className="card flex gap-3 items-center text-white">
                <UserIcon className="text-blue-500" />
                <h3 className="font-bold">Total de candidatos</h3>
              </div>
              <div className="font-bold text-xl text-white">
                {typeof candidaturas === "number" ? candidaturas : 0}
              </div>
            </div>
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
