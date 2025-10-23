import React, { useEffect, useState } from "react";
import Logo from "../../../assets/logo_oportune.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BriefcaseIcon,
  FileTextIcon,
  HomeIcon,
  LogOutIcon,
  LucideProps,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useLayout } from "@/contexts/LayoutContext";

// Tipagem permanece a mesma
type NavItem = {
  id: string;
  label: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  path: string;
};

// 1. ESTRUTURA BASE: Evita repetição de código.
const baseNavItems = [
  { id: "dashboard", label: "Dashboard", icon: HomeIcon, path: "/dashboard" },
  {
    id: "oportunidades",
    label: "Oportunidades",
    icon: BriefcaseIcon,
    path: "/vagas",
  },
  {
    id: "candidaturas",
    label: "Minhas Candidaturas",
    icon: FileTextIcon,
    path: "/candidaturas",
  },
  { id: "perfil", label: "Meu Perfil", icon: UserIcon, path: "/perfil" },
];

const rolePathMap: { [key: string]: string } = {
  ESTUDANTE: "/aluno",
  PROFESSOR: "/professor",
  EMPRESA: "/empresa",
};

type SidebarProps = {
  className: string;
};

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { logout, usuario } = useAuth();
  // 2. ESTADO INICIAL: Começar com um array vazio é mais seguro para o .map()
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  const { setPageTitle } = useLayout();

  useEffect(() => {
    if (usuario?.tipo && rolePathMap[usuario.tipo]) {
      const userPrefix = rolePathMap[usuario.tipo];
      const userNavItems = baseNavItems.map((item) => ({
        ...item,
        path: `${userPrefix}${item.path}`,
      }));
      setNavItems(userNavItems);
    }
  }, [usuario?.tipo]);

  useEffect(() => { // UsEffect para atualizar o título da página do template
    if (!pathname || navItems.length === 0) return;

    // Procura o item do menu que corresponde à rota atual
    const currentItem = navItems.find((item) => pathname.startsWith(item.path));

    if (currentItem) {
      if (currentItem.id === "dashboard") {
        setPageTitle(`Bem vindo ${usuario?.nome}!`);
      } else {
        setPageTitle(currentItem.label);
      }
    } else {
      setPageTitle("Oportune+"); // fallback caso não encontre
    }
  }, [pathname, navItems, setPageTitle, usuario?.nome]);

  const baseLinkClasses =
    "flex items-center gap-2 w-full px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r to-transparent hover:from-blue-700/80 hover:to-gray-800/20 relative text-white transition";
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
        {/* O .map() agora é mais seguro, pois o estado inicial é um array vazio */}
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
              {isSelected && ( // Renderização condicional mais limpa
                <span
                  className="absolute right-0 top-0 h-full w-1 rounded-r-lg
                  bg-gradient-to-r from-blue-300 to-blue-500 shadow-lg"
                ></span>
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
