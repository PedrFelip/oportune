import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { setAuthHeader } from "@/lib/api";
import { User } from "@/models/user";

export type AuthContextType = {
  usuario: User | null;
  carregando: boolean;
  // A função login agora aceita o token e os dados do utilizador.
  login: (token: string, user: User) => void;
  logout: () => void;
  atualizarUsuario: (user: User) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [carregando, setCarregando] = useState(true);

  // Restaura a sessão a partir do localStorage ao carregar a aplicação.
  useEffect(() => {
    const carregarDadosLocais = () => {
      try {
        const token = localStorage.getItem("authToken");
        const usuarioSalvo = localStorage.getItem("userData");

        if (token && usuarioSalvo) {
          setAuthHeader(token);
          setUsuario(JSON.parse(usuarioSalvo));
        }
      } finally {
        setCarregando(false);
      }
    };
    carregarDadosLocais();
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setAuthHeader(null);
    setUsuario(null);
  }, []);

  // Esta é a função corrigida que alinha com a sua página de Login.
  const login = useCallback((token: string, user: User) => {
    if (token && user) {
      // 1. Salva os dados recebidos no localStorage.
      localStorage.setItem("authToken", token);
      localStorage.setItem("userData", JSON.stringify(user));

      // 2. Atualiza o header do axios e o estado global.
      setAuthHeader(token);
      setUsuario(user);
    } else {
      console.error("Tentativa de login com token ou utilizador inválido.");
      logout();
    }
  }, [logout]);

  // Função para atualizar apenas os dados do usuário (sem token)
  const atualizarUsuario = useCallback((user: User) => {
    localStorage.setItem("userData", JSON.stringify(user));
    setUsuario(user);
    console.log("Usuário atualizado no contexto:", user);
  }, []);

  const value = useMemo(
    () => ({
      usuario,
      carregando,
      login,
      logout,
      atualizarUsuario,
    }),
    [usuario, carregando, login, logout, atualizarUsuario]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

