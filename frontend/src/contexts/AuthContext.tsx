// src/contexts/AuthContext.tsx

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { User } from "@/@types/types"; // Supondo que você tenha seus tipos definidos aqui
import { api, setAuthHeader } from "@/lib/api"; // Importando a configuração da API

/**
 * @type AuthContextType
 * Define o formato dos dados que o nosso contexto de autenticação vai fornecer.
 * - usuario: O objeto do usuário logado ou nulo.
 * - token: O token JWT do usuário.
 * - carregando: Um booleano que indica se a verificação inicial de autenticação ainda está em andamento.
 * - login: Função para autenticar o usuário.
 * - logout: Função para deslogar o usuário.
 */
export type AuthContextType = {
  usuario: User | null;
  carregando: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
};

/**
 * @const AuthContext
 * Cria o Contexto React. Ele será o "túnel" por onde os dados de autenticação
 * viajarão pela árvore de componentes.
 */
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

/**
 * @function useAuth
 * Hook customizado para simplificar o uso do nosso contexto.
 * Em vez de usar `useContext(AuthContext)` em todo componente, usamos apenas `useAuth()`.
 * Ele também garante que o hook só seja usado dentro de um AuthProvider.
 */
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

/**
 * @function AuthProvider
 * O componente Provedor. É ele quem "abraça" a aplicação (ou partes dela)
 * e detém toda a lógica e estado de autenticação, disponibilizando-os
 * para qualquer componente filho através do hook `useAuth`.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [carregando, setCarregando] = useState(true);

  // useEffect agora apenas lê dados locais. É rápido e não faz chamada de API.
  useEffect(() => {
    const carregarDadosLocais = () => {
      const token = localStorage.getItem("authToken");
      const usuarioSalvo = localStorage.getItem("userData");

      if (token && usuarioSalvo) {
        // Define o header da API para futuras requisições
        setAuthHeader(token);
        // Define o usuário com os dados que salvamos durante o login
        setUsuario(JSON.parse(usuarioSalvo));
      }
      // Termina o carregamento. Agora o app está pronto para renderizar.
      setCarregando(false);
    };

    carregarDadosLocais();
  }, []);

  const login = useCallback(async (email: string, senha: string) => {
    try {
      // 1. Chama a rota de login
      const response = await api.post("/api/loguser", { email, senha });

      // 2. Extrai o token E os dados do usuário da resposta
      const { token, ...user } = response.data; // Adapte para o formato da sua resposta

      if (token && user) {
        // 3. Salva ambos no localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem("userData", JSON.stringify(user));

        // 4. Atualiza os estados e o header da API
        setAuthHeader(token);
        setUsuario(user);
      } else {
        // Lança um erro se a resposta da API não veio como esperado
        throw new Error("Resposta do login inválida.");
      }
    } catch (error) {
      console.error("Falha no login:", error);
      // Garante que se o login falhar, tudo seja limpo.
      logout();
      // Propaga o erro para a UI poder mostrar uma mensagem.
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setAuthHeader(null);
    setUsuario(null);
  }, []);

  const value = useMemo(
    () => ({
      usuario,
      carregando,
      login,
      logout,
    }),
    [usuario, carregando, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
