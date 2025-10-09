import React from "react";
import Logo from "../../../assets/logo_oportune.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BriefcaseIcon,
  FileTextIcon,
  HomeIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: HomeIcon,
    path: "/aluno/dashboard", // Exemplo de rota
  },
  {
    id: "oportunidades",
    label: "Oportunidades",
    icon: BriefcaseIcon,
    path: "/aluno/vagas",
  },
  {
    id: "candidaturas",
    label: "Minhas Candidaturas",
    icon: FileTextIcon,
    path: "/aluno/candidaturas",
  },
  {
    id: "perfil",
    label: "Meu Perfil",
    icon: UserIcon,
    path: "/aluno/perfil",
  },
];

type SidebarProps = {
  className: string;
};

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const baseLinkClasses =
    "flex items-center gap-2 w-full px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r to-transparent hover:from-blue-700/80 hover:to-gray-800/20 relative text-white transition";
  // "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors";
  const selectedLinkClasses =
    "bg-gradient-to-r from-blue-800 text-white font-semibold";

  return (
    <aside
      className={`bg-slate-800 text-slate-300 flex flex-col p-4 border-r border-slate-700 ${className}`}
    >
      <div className="flex items-center gap-3 mb-8">
        <Image
          className="w-10 h-10 rounded-lg bg-white"
          src={Logo}
          alt="Logo Oportune"
        />
        <h1 className="text-xl font-bold text-white">Oportune +</h1>
      </div>

      <nav className="flex flex-col gap-2 flex-grow">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isSelected = pathname.startsWith(item.path);

          return (
            <Link
              key={item.id}
              href={item.path}
              className={`${baseLinkClasses} ${
                isSelected ? selectedLinkClasses : ""
              }`}
              aria-current={isSelected ? "page" : undefined}
            >
              <IconComponent className="w-5 h-5" />
              <span>{item.label}</span>
              {isSelected ? (
                <span
                  className="absolute right-0 top-0 h-full w-1 rounded-r-lg
                bg-gradient-to-r from-blue-300 to-blue-500 shadow-lg"
                ></span>
              ) : (
                ""
              )}
            </Link>
          );
        })}
      </nav>

      <div>
        <Link
          onClick={logout}
          href={"/"}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors"
        >
          <LogOutIcon className="w-5 h-5" />
          <span>Sair</span>
        </Link>
      </div>
    </aside>
  );
}
