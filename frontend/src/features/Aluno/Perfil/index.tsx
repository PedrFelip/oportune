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
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { primeiraLetraMaiuscula } from "@/utils/validadores";
import { Experiencia } from "./Experiencia";
import { ProfileCard } from "./ProfileCard";
import { useRouter } from "next/navigation";
import { User } from "@/models/user";

type perfilProps = {
  perfil?: User;
};

export function Perfil({ perfil }: perfilProps) {
  const { usuario } = useAuth();
  const { replace } = useRouter();

  const dados = perfil ?? usuario;
  const isExternal = !!perfil;

  if (!dados) {
    return null;
  }

  return (
    <div className="flex flex-col gap-10">
      <header>
        <section className="text-gray-200 rounded-2xl">
          <div className="flex gap-8 bg-[#263243] p-5 justify-between rounded-2xl">
            <div className="flex gap-10">
              <div>
                <Image
                  src={profCat}
                  width={80}
                  height={80}
                  alt="Foto de perfil"
                  className="rounded-full"
                />
              </div>
              <div className="text-white flex flex-col gap-0.5">
                <h2 className="text-2xl font-bold">{dados.nome}</h2>
                <p className="text-blue-400 text-sm">
                  {primeiraLetraMaiuscula(
                    dados.estudante?.curso
                      ? dados.estudante.curso.split("_").join(" ")
                      : ""
                  ) || "Erro ao carregar o curso"}
                </p>
                <span className="mt-3 text-gray-400 font-semibold">
                  {dados.estudante?.semestre}º Semestre - Periodo{" "}
                  {dados.estudante?.periodo}
                </span>
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
      <div className="flex justify-between">
        <ProfileCard>
          <h2 className="font-bold text-2xl border-b-2 border-b-gray-700 py-2">
            Contato e documentos
          </h2>
          <main>
            <div className="flex gap-3">
              <MailIcon /> {dados.email}
            </div>
            <div className="flex gap-3">
              <PhoneIcon />{" "}
              {dados.estudante?.telefone || "Telefone não informado"}
            </div>
            <div className="flex gap-3">
              <GraduationCapIcon />{" "}
              {dados.estudante?.dataFormatura
                ? dados.estudante?.dataFormatura
                : "Data de formatura não informada"}
            </div>
          </main>
          {!isExternal && (
            <footer className="flex gap-5">
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
        <div className="coluna-final flex flex-col gap-5 w-3/5">
          <ProfileCard>
            <h2 className="font-bold text-2xl border-b-2 border-b-gray-700 py-2">
              Habilidades
            </h2>
            <main className="flex flex-col gap-6">
              <div className="tecnicas">
                <h2 className="text-2xl font-bold mb-3 text-blue-500">
                  Técnicas
                </h2>
                <div className="flex flex-wrap gap-2">
                  {" "}
                  {/* Badges */}
                  <Badge variant={"random"}>React</Badge>
                  <Badge variant={"random"}>Node.js</Badge>
                  <Badge variant={"random"}>Python</Badge>
                  <Badge variant={"random"}>SQL</Badge>
                  <Badge variant={"random"}>Docker</Badge>
                  <Badge variant={"random"}>React</Badge>
                  <Badge variant={"random"}>Node.js</Badge>
                  <Badge variant={"random"}>Python</Badge>
                  <Badge variant={"random"}>SQL</Badge>
                  <Badge variant={"random"}>Docker</Badge>
                  <Badge variant={"random"}>React</Badge>
                  <Badge variant={"random"}>Node.js</Badge>
                  <Badge variant={"random"}>Python</Badge>
                  <Badge variant={"random"}>SQL</Badge>
                  <Badge variant={"random"}>Docker</Badge>
                </div>
              </div>
              <div className="comportamentais">
                <h2 className="text-2xl font-bold mb-3 text-purple-500">
                  Comportamentais
                </h2>
                <div className="flex flex-wrap gap-2">
                  {" "}
                  {/* Badges */}
                  <Badge variant={"random"}>Comunicação</Badge>
                  <Badge variant={"random"}>Trabalho em equipe</Badge>
                  <Badge variant={"random"}>Resolução de problemas</Badge>
                </div>
              </div>
            </main>
          </ProfileCard>
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
        </div>
      </div>
    </div>
  );
}
