import SidebarAluno from "./Sidebar";
import HeaderAluno from "./Header";
import "./responsivo.css"

export default function Template({ children, title }) {
  
  return (
    <div
      className="min-h-screen bg-slate-900 flex"
    >
      <SidebarAluno id="sidebar"/>
      <div className="flex flex-col flex-1">
        <HeaderAluno title={title} />
        <main className="p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
