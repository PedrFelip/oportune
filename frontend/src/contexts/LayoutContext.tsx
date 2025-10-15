import { createContext, useState, useContext, ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface ILayoutContext {
  pageTitle: string;
  setPageTitle: (title: string) => void;
}

const LayoutContext = createContext<ILayoutContext | undefined>(undefined);

// Cria o Provedor, que vai envolver sua aplicação
export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const { usuario } = useAuth();
  const [pageTitle, setPageTitle] = useState(
    `Olá ${usuario ? usuario?.nome : "Usuário"}`
  );

  return (
    <LayoutContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
