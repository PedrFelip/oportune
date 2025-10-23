import { Perfil } from "@/features/Aluno/Perfil";
import { buscarPerfilPeloId } from "@/features/Api/buscarPerfilPeloID";

interface perfilProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: perfilProps) {
  const { id } = await params;
  console.log("ID do perfil:", id);

  const perfil = await buscarPerfilPeloId(id);

  return <Perfil perfil={perfil} />;
}
