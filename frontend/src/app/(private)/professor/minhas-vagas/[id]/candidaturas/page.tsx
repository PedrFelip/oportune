import { CandidatosVaga } from "@/features/CandidatosVaga";

interface candidatoProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: candidatoProps) {
  const { id } = await params;
  console.log("ID do candidato:", id);

  return <CandidatosVaga vagaId={id} />;
}
