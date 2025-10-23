import { Sidebar } from "./Components/Sidebar";
import { Header } from "./Components/Header";
import { useState } from "react";
import { useLayout } from "@/contexts/LayoutContext";

type templateProps = {
  children: React.ReactNode;
};

export function Template({ children }: templateProps) {
  const { pageTitle } = useLayout();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="relative min-h-screen bg-slate-900 lg:flex">
      {/* Sidebar */}
      <Sidebar
        className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static`}
      />

      {/* Overlay no mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Conteúdo principal */}
      <div className="flex flex-col flex-1">
        <Header title={pageTitle} onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
