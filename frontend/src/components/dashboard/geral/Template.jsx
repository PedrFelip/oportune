import SidebarAluno from "./Sidebar";
import HeaderAluno from "./Header";
import { useState } from "react";

export default function Template({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="relative min-h-screen bg-slate-900 lg:flex">
      {/* A sidebar agora tem classes condicionais:
        - 'fixed' e 'inset-y-0' para sobrepor em telas pequenas.
        - 'transform' e 'transition' para a animação de deslize.
        - '-translate-x-full' esconde ela para fora da tela por padrão.
        - 'translate-x-0' (acionado pelo estado) mostra ela.
        - 'lg:relative', 'lg:translate-x-0' a torna estática em telas grandes.
      */}
      <SidebarAluno
        className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0`}
      />

      {/* Overlay para escurecer o conteúdo quando a sidebar estiver aberta em mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <div className="flex flex-col flex-1">
        <HeaderAluno title={title} onMenuClick={toggleSidebar}/>
        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
