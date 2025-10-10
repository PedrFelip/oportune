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

export function Perfil() {
  const { usuario } = useAuth();

  if (!usuario) {
    return null;
  }

  return (
    <div className="flex flex-col gap-10">
      <header>
        <div className="flex flex-col gap-8">
          <div className="flex flex-1 justify-between bg-[#263243] p-5 gap-10 rounded-2xl ">
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
                <h2 className="text-2xl font-bold">{usuario.nome}</h2>
                <p className="text-blue-400 text-sm">
                  {usuario.estudante?.curso || "Engenharia de Software"}
                </p>
                <span className="mt-3 text-gray-400 font-semibold">
                  {usuario.estudante?.semestre || 5}º semestre - Periodo{" "}
                  {usuario.estudante?.periodo}
                </span>
              </div>
            </div>

            <div className="flex items-center mr-6">
              <Button>
                <SquarePenIcon />
                Editar perfil
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div className="flex justify-between">
        <section className="text-gray-200 w-4/9 rounded-2xl">
          <div className="flex flex-col gap-8 bg-[#263243] p-5">
            <h2 className="font-bold text-2xl border-b-2 border-b-gray-700 py-2">Contato e documentos</h2>
            <main>
              <div className="flex gap-3">
                <MailIcon /> {usuario.email}
              </div>
              <div className="flex gap-3">
                <PhoneIcon />{" "}
                {usuario.estudante?.telefone || "Telefone não informado"}
              </div>
              <div className="flex gap-3">
                <GraduationCapIcon />{" "}
                {usuario.estudante?.dataFormatura
                  ? usuario.estudante.dataFormatura
                  : "Data de formatura não informada"}
              </div>
            </main>
            <footer className="flex gap-5">
              <Button className="flex" variant={"oportune"}>
                {" "}
                <DownloadIcon />
                Curriculo
              </Button>
              <Button className="flex" variant={"oportune_blank"}>
                Portfólio
              </Button>
            </footer>
          </div>
        </section>
        <section className="text-gray-200 w-4/9 rounded-2xl">
          <div className="flex flex-col gap-8 bg-[#263243] p-5">
            <h2 className="font-bold text-2xl border-b-2 border-b-gray-700 py-2">Habilidades</h2>
            <main className="flex flex-col gap-6">
              <div className="tecnicas">
                <h2 className="text-2xl font-bold mb-3 text-blue-500">
                  Técnicas
                </h2>
                <div className="flex gap-2">
                  <Badge variant={"secondary"}>React</Badge>
                  <Badge variant={"secondary"}>Node.js</Badge>
                  <Badge variant={"secondary"}>Python</Badge>
                  <Badge variant={"secondary"}>SQL</Badge>
                  <Badge variant={"secondary"}>Docker</Badge>
                </div>
              </div>
              <div className="comportamentais">
                <h2 className="text-2xl font-bold mb-3 text-purple-500">
                  Comportamentais
                </h2>
                <div className="flex gap-2">
                  <Badge variant={"secondary"}>Comunicação</Badge>
                  <Badge variant={"secondary"}>Trabalho em equipe</Badge>
                  <Badge variant={"secondary"}>Resolução de problemas</Badge>
                </div>
              </div>
            </main>
          </div>
        </section>
      </div>
    </div>
  );
}
