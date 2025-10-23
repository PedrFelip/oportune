import { Badge } from "@/components/ui/badge";

type CategoriaProps = {
  caracteristica: string;
};

export const Categoria = ({ caracteristica }: CategoriaProps) => {
  return (
    <Badge
      variant={"random"}
      className={`px-3 py-2 text-xs font-semibold rounded-full whitespace-nowrap`}
    >
      {caracteristica.charAt(0).toUpperCase() +
        caracteristica.slice(1).toLowerCase()}
    </Badge>
  );
};
