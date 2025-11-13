"use client";

import Image from "next/image";
import profCat from "@/assets/prof_cat.jpg";
import { Button } from "@/components/ui/button";
import {
  DownloadIcon,
  GraduationCapIcon,
  MailIcon,
  PhoneIcon,
  SquarePenIcon,
  Building2Icon,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { primeiraLetraMaiuscula } from "@/utils/validadores";
import { ProfileCard } from "./ProfileCard";
import { useRouter } from "next/navigation";
import { Estudante, User } from "@/models/user";
import { format } from "date-fns";

type perfilProps = {
  perfil?: User;
};

export function Perfil({ perfil }: perfilProps) {
  const { usuario } = useAuth();
  const { replace } = useRouter();

  const dados = perfil ?? usuario;
  const isExternal = !!perfil;

  if (!dados) return null;

  // Definição dos perfis específicos
  const estudante =
    dados.tipo === "ESTUDANTE" ? (dados.estudante as Estudante) : null;
  const professor = dados.tipo === "PROFESSOR" ? dados.professor : null;
  const empresa = dados.tipo === "EMPRESA" ? dados.empresa : null;

  return (
    <div className="flex flex-col gap-10">
      {/* ============================= HEADER ============================= */}
      <header>
        <section className="text-gray-200 rounded-2xl">
          <div className="flex gap-8 bg-[#263243] p-5 justify-between rounded-2xl">
            {/* Avatar + dados principais */}
            <div className="flex gap-10">
              <div>
                <Image
                  src={empresa?.logo || profCat}
                  width={80}
                  height={80}
                  alt="Foto de perfil"
                  className="rounded-full object-cover"
                />
              </div>
              <div className="text-white flex flex-col gap-0.5">
                <h2 className="text-2xl font-bold">{dados.nome}</h2>

                {/* Subtítulo dinâmico */}
                {dados.tipo === "ESTUDANTE" && (
                  <p className="text-blue-400 text-sm">
                    {primeiraLetraMaiuscula(
                      estudante?.curso?.split("_").join(" ") ?? ""
                    ) || "Curso não informado"}
                  </p>
                )}
                {dados.tipo === "PROFESSOR" && (
                  <div className="text-blue-400 text-sm">
                    <p>
                      <strong className="">Titulação:</strong>{" "}
                      {professor?.titulacao || "Professor(a)"}
                    </p>
                    <p>
                      <strong className="">Área de atuação:</strong>{" "}
                      {professor?.areaAtuacao}
                    </p>
                  </div>
                )}
                {dados.tipo === "EMPRESA" && (
                  <div className="text-blue-400 text-sm">
                    <p>
                      <strong className="">Empresa de:</strong>{" "}
                      {empresa?.ramo || "Professor(a)"}
                    </p>
                    <p>
                      <strong className="">Setor:</strong> {empresa?.setor}
                    </p>
                  </div>
                )}

                {/* Informações extras */}
                {dados.tipo === "ESTUDANTE" && (
                  <span className="mt-3 text-gray-400 font-semibold">
                    {estudante?.semestre
                      ? `${estudante.semestre}º Semestre - Período ${estudante.periodo}`
                      : "Semestre não informado"}
                  </span>
                )}
              </div>
            </div>

            {/* 🔹 botão só no perfil próprio */}
            {!isExternal && (
              <div className="flex items-center mr-6">
                <Button
                  variant="oportune"
                  onClick={() => replace("perfil/editar-perfil")}
                >
                  <SquarePenIcon />
                  Editar perfil
                </Button>
              </div>
            )}
          </div>
        </section>
      </header>

      {/* ============================= CONTEÚDO PRINCIPAL ============================= */}
      <div className="flex justify-between">
        {/* CARD DE CONTATO */}
        <div className="w-3/10">
          <ProfileCard>
            <h2 className="font-bold text-2xl border-b-2 border-b-gray-700 py-2">
              Contato e documentos
            </h2>
            <main className="space-y-3">
              <div className="flex gap-3">
                <MailIcon /> {dados.email}
              </div>
              {estudante?.telefone ||
              professor?.telefone ||
              empresa?.telefone ? (
                <div className="flex gap-3">
                  <PhoneIcon />{" "}
                  {estudante?.telefone ??
                    professor?.telefone ??
                    empresa?.telefone}
                </div>
              ) : (
                <div className="flex gap-3 text-gray-400">
                  <PhoneIcon /> Telefone não informado
                </div>
              )}
              {estudante && (
                <div className="flex gap-3">
                  <GraduationCapIcon />{" "}
                  {estudante.dataFormatura
                    ? format(new Date(estudante.dataFormatura), "dd/MM/yyyy")
                    : "Data de formatura não informada"}
                </div>
              )}
              {empresa && (
                <div className="flex gap-3">
                  <Building2Icon />{" "}
                  {empresa.endereco || "Endereço não informado"}
                </div>
              )}
            </main>
            {!isExternal && (
              <footer className="flex gap-5 mt-4">
                <Button className="flex" variant="oportune">
                  <DownloadIcon />
                  Currículo
                </Button>
                <Button className="flex" variant="oportune_blank">
                  Portfólio
                </Button>
              </footer>
            )}
          </ProfileCard>
        </div>

        {/* CARD DE HABILIDADES E EXPERIÊNCIAS */}
        <div className="coluna-final flex flex-col gap-5 w-3/5">
          {/* HABILIDADES */}
          {(estudante || professor) && (
            <ProfileCard>
              <h2 className="font-bold text-2xl border-b-2 border-b-gray-700 py-2">
                {estudante
                  ? "Habilidades"
                  : "Áreas de Interesse e Departamento"}
              </h2>
              <main className="flex flex-col gap-6">
                {estudante && (
                  <>
                    <div>
                      <h3 className="text-2xl font-bold mb-3 text-blue-500">
                        Técnicas
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {estudante.habilidadesTecnicas?.length
                          ? estudante.habilidadesTecnicas.map((hab, i) => (
                              <Badge key={i} variant="random">
                                {hab}
                              </Badge>
                            ))
                          : "Nenhuma habilidade técnica informada"}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-3 text-purple-500">
                        Comportamentais
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {estudante.habilidadesComportamentais?.length
                          ? estudante.habilidadesComportamentais.map(
                              (hab, i) => (
                                <Badge key={i} variant="random">
                                  {hab}
                                </Badge>
                              )
                            )
                          : "Nenhuma habilidade comportamental informada"}
                      </div>
                    </div>
                  </>
                )}

                {professor && (
                  <>
                    <div>
                      <h3 className="text-2xl font-bold mb-3 text-green-500">
                        Áreas de interesse
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {professor.areasInteresse?.length
                          ? professor.areasInteresse.map((area, i) => (
                              <Badge key={i} variant="random">
                                {area}
                              </Badge>
                            ))
                          : "Nenhuma área de interesse informada"}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-3 text-blue-400">
                        Departamento
                      </h3>
                      <p>{professor.departamento || "Não informado"}</p>
                    </div>
                  </>
                )}
              </main>
            </ProfileCard>
          )}

          {/* EXPERIÊNCIAS */}
          {/* {empresa ? (
            <ProfileCard>
              <h2 className="font-bold text-2xl border-b-2 border-b-gray-700 py-2">
                Vagas publicadas
              </h2>
              <main className="flex flex-col gap-3">
                {empresa.vagas?.length ? (
                  empresa.vagas.map((vaga) => (
                    <div
                      key={vaga.id}
                      className="p-3 border border-gray-700 rounded-lg"
                    >
                      <h3 className="text-lg font-semibold">{vaga.titulo}</h3>
                      <p className="text-gray-400 text-sm">
                        {vaga.tipo} - {vaga.curso}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">
                    Nenhuma vaga publicada por enquanto.
                  </p>
                )}
              </main>
            </ProfileCard>
          ) : (
            <ProfileCard>
              <h2 className="font-bold text-2xl border-b-2 border-b-gray-700 py-2">
                Experiências Profissionais
              </h2>
              <main className="flex flex-col gap-6">
                <Experiencia
                  titulo={"Desenvolvedor Front-end Jr."}
                  local={"TechCorp"}
                  periodo={"2024 - Atualmente"}
                />
              </main>
            </ProfileCard>
          )} */}
        </div>
      </div>
    </div>
  );
}
