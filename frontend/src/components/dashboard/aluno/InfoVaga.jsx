import React from "react";

export function InfoVaga({titulo, descricao}) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-semibold">{titulo}</h3>
      <p className="font-sans text-justify">{descricao}</p>
    </div>
  );
}
