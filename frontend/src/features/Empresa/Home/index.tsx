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
// import { showMessage } from "@/adapters/showMessage";
// import { buscarPerfilProfessor } from "../api/buscarPerfil";
// import { buscarAlunosOrientados } from "../api/buscarAlunos";

// 🔹 Mock de dados da empresa
const mockEmpresa = {
  nome: "Joãozinho Cibita",
  departamento: "Engenharia de Software",
  email: "catarina.souza@universidade.edu.br",
  telefone: "(11) 98877-6655",
  dataAdmissao: "2020-03-10",
  alunosOrientados: [
    {
      id: 1,
      nome: "Gabriel Almeida",
      curso: "Ciência da Computação",
      semestre: 6,
    },
    {
      id: 2,
      nome: "Laura Martins",
      curso: "Engenharia de Software",
      semestre: 8,
    },
  ],
};

export function Dashboard() {
  const { carregando } = useAuthGuard({
    redirectTo: "/login",
    requireRole: "EMPRESA",
  });
  const { setPageTitle } = useLayout();
  const { usuario } = useAuth();

  const [perfil, setPerfil] = useState<any>(null);
  const [alunosOrientados, setAlunosOrientados] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // const [loadingPerfil, setLoadingPerfil] = useState(true);
  // const [loadingAlunos, setLoadingAlunos] = useState(true);
  // const [errorPerfil, setErrorPerfil] = useState<string | null>(null);
  // const [errorAlunos, setErrorAlunos] = useState<string | null>(null);

  useEffect(() => {
    if (carregando) return;

    if (usuario?.empresa) {
      setPerfil({ ...usuario.empresa, porcentagem: 75 });
    } else {
      setPerfil(mockEmpresa);
    }
    setAlunosOrientados(mockEmpresa.alunosOrientados);

    // 🔹 Caso fosse buscar da API:
    /*
    const carregarDados = async () => {
      try {
        setLoadingPerfil(true);
        const respPerfil = await buscarPerfilProfessor();
        setPerfil(respPerfil.perfil);

        setLoadingAlunos(true);
        const respAlunos = await buscarAlunosOrientados();
        setAlunosOrientados(respAlunos.alunos);
      } catch (e) {
        console.error("Erro ao carregar dados:", e);
        setErrorPerfil("Erro ao carregar perfil");
        setErrorAlunos("Erro ao carregar alunos");
      } finally {
        setLoadingPerfil(false);
        setLoadingAlunos(false);
      }
    };

    carregarDados();
    */
  }, [carregando, usuario?.empresa]);

  useEffect(() => {
    if (usuario?.nome) {
      setPageTitle(`Olá ${usuario.nome}`);
    }
  }, [setPageTitle, usuario?.nome]);

  // if (carregando) showMessage.loading("Carregando...");

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
                  <Image src={Uniceplac} alt="Foto" className="rounded-full" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {usuario.empresa?.nomeFantasia || usuario.nome}
                  </h2>
                  <p className="text-slate-400">
                    {usuario.empresa?.ramo || "Empresa parceira"}
                  </p>
                </div>
              </div>
              <Button variant={"oportune"}>Editar perfil</Button>
            </div>
            <div className="mt-6">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-slate-400">Perfil Completo</span>
                <span className="text-sm font-semibold text-white">
                  {perfil.porcentagem || 75}%
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${75}%` }}
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
              Minhas Candidaturas Recentes
            </h3>
            <a
              href="#"
              className="text-sm font-semibold text-blue-500 hover:underline"
            >
              Ver todas
            </a>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
              <div>
                <div className="w-full flex flex-1 items-center gap-2">
                  <div className="font-semibold text-white text-xl">
                    Estagio de Suporte de TI
                  </div>
                  <Badge className="px-3 py-2 text-xs font-semibold rounded-full whitespace-nowrap bg-green-500/10 text-green-400">
                    Estágio
                  </Badge>
                </div>
                <p className="text-sm text-slate-400">
                  Inscrições expiram em 10 dias
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Badge className="px-3 py-2 w-full text-xs font-semibold rounded-full whitespace-nowrap bg-green-500/10 text-green-400">
                  20 candidatos
                </Badge>
                <Button variant={"oportune"}>Ver detalhes</Button>
              </div>
            </div>
          </div>
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
            <div className="font-bold text-xl text-white">2</div>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
            <div className="card flex gap-3 items-center text-white">
              <UserIcon className="text-blue-500" />
              <h3 className="font-bold">Total de candidatos</h3>
            </div>
            <div className="font-bold text-xl text-white">69</div>
          </div>
        </div>
      </div>
      </div>
      <FormNewOportune isOpen={isFormOpen} setIsOpen={setIsFormOpen} />
    </>
  );
}
