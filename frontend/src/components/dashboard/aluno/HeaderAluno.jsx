const SearchIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const HeaderAluno = ({ user }) => {

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <header style={{ gridArea: 'header' }} className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
      <div className="relative w-full max-w-md">
        <h1 className="text-2xl font-bold text-white">Bem-Vindo, {user?.name || 'Usuário'}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative w-full max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por vagas"
            className="w-full bg-slate-700 border-none rounded-lg pl-10 pr-4 py-2 text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-slate-800 font-bold">
          {getInitials(user?.name || '')}
        </div>
      </div>
    </header>
  );
};

export default HeaderAluno;