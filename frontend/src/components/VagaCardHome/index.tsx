
type VagaCardHomeProps = {
  title: string,
  description: string
}

export function VagaCardHome({title, description}: VagaCardHomeProps) {
  return (
    <div className="bg-slate-700/50 p-4 rounded-lg hover:bg-slate-700/70 text-primary-foreground transition-colors cursor-pointer">
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-sm text-gray-400">
        {description}
      </p>
    </div>
  );
}
