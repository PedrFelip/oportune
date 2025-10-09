import { Badge } from "@/components/ui/badge";

type categoriaProps = {
  caracteristica: "ESTAGIO" | "REMOTO" | "PESQUISA"
}

export const Categoria = ({ caracteristica }: categoriaProps) => {
  const statusStyles = {
    ESTAGIO: "bg-blue-500/10 text-blue-400",
    REMOTO: "bg-green-500/10 text-green-400",
    PESQUISA: "bg-purple-500/10 text-purple-400",
  };
  return (
    <Badge
      className={`px-3 py-2 text-xs font-semibold rounded-full ${statusStyles[caracteristica]}`}
    >
      {caracteristica}
    </Badge>
  );
};