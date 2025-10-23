type experienciaProps = {
  titulo: string;
  local: string;
  periodo: string;
};

export function Experiencia({ titulo, local, periodo }: experienciaProps) {
  return (
    <div className="flex gap-2">
      <div className=" bg-blue-400 p-0.5" />
      <div className="flex flex-col">
        <h4 className="font-semibold">{titulo}</h4>
        <p className="text-gray-400">{local}</p>
        <p className="text-gray-400">{periodo}</p>
      </div>
    </div>
  );
}
