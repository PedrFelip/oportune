import { buscarVagaPeloId } from "@/features/Aluno/api/buscaVagaPeloId";
import { Vaga } from "@/features/Aluno/VagaUnica";
import { cookies } from "next/headers";

interface vagaProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: vagaProps) {
  const { id } = await params;

  const cookieStore = cookies();

  const token = (await cookieStore).get("token");
  console.log(token);

  if (!token) return <div className="text-white">Vaga não encontrada</div>;

  const response = await buscarVagaPeloId(id, token.value);

  const vaga = await response.json();

  return <Vaga vaga={vaga} />;
}
