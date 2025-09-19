import React from "react";

export function InfoVaga({ titulo, descricao, tipo = "texto" }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-semibold">{titulo}</h3>
      {tipo === "lista" ? (
        <ol className="ml-5 [&_li]:pl-2 [&_li]:marker:content-['*_'] [&_li]:marker:text-sky-600">
          {descricao.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ol>
      ) : (
        <p className="font-sans text-justify">{descricao}</p>
      )}
    </div>
  );
}
