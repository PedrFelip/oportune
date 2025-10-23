import { buscarPerfilAluno } from "@/features/Aluno/api/buscarPerfil";
import { Perfil } from "@/features/Aluno/Perfil";
import { cookies } from "next/headers";

interface vagaProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: vagaProps) {
  const { id } = await params;

  const cookieStore = cookies();

  const token = (await cookieStore).get("token");

  if (!token) return <div className="text-white">Vaga não encontrada</div>;

  const perfil = await buscarPerfilAluno();

  return <Perfil perfil={perfil} id={id} />;
}
