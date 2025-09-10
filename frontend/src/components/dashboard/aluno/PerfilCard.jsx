const PerfilCard = () => (
  <div className="bg-slate-800 p-6 rounded-lg">
    <div className="flex items-center gap-4">
      <div className="w-20 h-20 rounded-full bg-blue-400 flex items-center justify-center text-slate-800 text-3xl font-bold border-4 border-slate-700">
        PF
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white">Pedro Felipe</h2>
        <p className="text-slate-400">Engenharia de Software - 5º Semestre</p>
      </div>
    </div>
    <div className="mt-6">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-slate-400">Perfil Completo</span>
        <span className="text-sm font-semibold text-white">75%</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
      </div>
    </div>
  </div>
);

export default PerfilCard;