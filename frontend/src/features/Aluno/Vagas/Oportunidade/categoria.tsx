import { Badge } from "@/components/ui/badge";

// ✅ PASSO 1: Defina uma paleta de cores usando classes do Tailwind.
const colorPalette = [
  "bg-blue-500/10 text-blue-400",
  "bg-green-500/10 text-green-400",
  "bg-purple-500/10 text-purple-400",
  "bg-yellow-500/10 text-yellow-400",
  "bg-pink-500/10 text-pink-400",
  "bg-orange-500/10 text-orange-400",
  "bg-cyan-500/10 text-cyan-400",
];

/**
 * ✅ PASSO 2: Crie uma função que converte uma string em uma cor da paleta.
 * Ela gera um "hash" numérico a partir do texto e usa o módulo (%)
 * para garantir que o resultado seja sempre um índice válido da nossa paleta.
 * @param str A string de entrada (ex: "ESTAGIO")
 * @returns Uma classe de cor da `colorPalette` (ex: "bg-blue-500/10 text-blue-400")
 */
const stringToColorClass = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash % colorPalette.length);
  return colorPalette[index];
};

type CategoriaProps = {
  caracteristica: string;
};

export const Categoria = ({ caracteristica }: CategoriaProps) => {
  const colorClass = stringToColorClass(caracteristica);

  return (
    <Badge
      className={`px-3 py-2 text-xs font-semibold rounded-full whitespace-nowrap ${colorClass}`}
    >
      {caracteristica.charAt(0).toUpperCase() + caracteristica.slice(1).toLowerCase()}
    </Badge>
  );
};