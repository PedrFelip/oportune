import { Badge } from "@/components/ui/badge";
import React from "react";

export const Categoria = ({ caracteristica }) => {
  const statusStyles = {
    Estagio: "bg-blue-500/10 text-blue-400",
    Remoto: "bg-green-500/10 text-green-400",
    Pesquisa: "bg-purple-500/10 text-purple-400",
  };
  return (
    <Badge
      className={`px-3 py-2 text-xs font-semibold rounded-full ${statusStyles[caracteristica]}`}
    >
      {caracteristica}
    </Badge>
  );
};