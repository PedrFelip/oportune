import Logo from '../../../assets/logo_oportune.png';

const HomeIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const BriefcaseIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const FileTextIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" x2="8" y1="13" y2="13" />
    <line x1="16" x2="8" y1="17" y2="17" />
    <line x1="10" x2="8" y1="9" y2="9" />
  </svg>
);

const UserIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LogOutIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);

const SidebarAluno = () => (
  <aside style={{ gridArea: 'sidebar' }} className="bg-slate-800 text-slate-300 flex flex-col p-4 border-r border-slate-700">
    <div className="flex items-center gap-3 mb-8">
      <img className="w-10 bg-white h-10 rounded-lg flex items-center justify-center font-bold text-white text-lg" src={Logo} />
      <h1 className="text-xl font-bold text-white">Oportune +</h1> 
    </div>
    <nav className="flex flex-col gap-2 flex-grow">
      <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-600 text-white font-semibold">
        <HomeIcon className="w-5 h-5" />
        <span>Dashboard</span>
      </a>
      <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors">
        <BriefcaseIcon className="w-5 h-5" />
        <span>Oportunidades</span>
      </a>
      <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors">
        <FileTextIcon className="w-5 h-5" />
        <span>Minhas Candidaturas</span>
      </a>
      <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors">
        <UserIcon className="w-5 h-5" />
        <span>Meu Perfil</span>
      </a>
    </nav>
    <div>
      <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors">
        <LogOutIcon className="w-5 h-5" />
        <span>Sair</span>
      </a>
    </div>
  </aside>
);

export default SidebarAluno;