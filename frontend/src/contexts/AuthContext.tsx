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
  token: string | null;
  carregando: boolean;
  login: (token: string) => Promise<void>;
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
  const [token, setToken] = useState<string | null>(null);
  // `carregando` começa como `true` para bloquear a renderização de rotas protegidas
  // até que a validação do token seja concluída.
  const [carregando, setCarregando] = useState(true);

  // Este useEffect roda apenas uma vez, quando o app é carregado pela primeira vez.
  // Sua única responsabilidade é verificar se existe um token válido no localStorage.
  useEffect(() => {
    const validarTokenNaInicializacao = async () => {
      const tokenSalvo = localStorage.getItem("authToken");

      if (tokenSalvo) {
        try {
          // Define o token no cabeçalho da API para a chamada de validação
          setAuthHeader(tokenSalvo);
          // Chama o backend para verificar se o token é realmente válido
          const response = await api.get("/auth/me"); // ou um endpoint similar

          // Se a chamada for bem-sucedida, atualiza os estados
          setUsuario(response.data);
          setToken(tokenSalvo);
        } catch (error) {
          // Se o token for inválido (expirado, etc.), limpa tudo
          console.error(
            "Sessão inválida ou expirada. Realize o login novamente.",
            error
          );
          localStorage.removeItem("authToken");
          setAuthHeader(null);
        }
      }
      // Garante que o estado de `carregando` seja `false` ao final de todas as verificações
      setCarregando(false);
    };

    validarTokenNaInicializacao();
  }, []); // A dependência vazia `[]` garante que isso rode apenas uma vez.

  // Envolvemos `login` e `logout` em `useCallback` para garantir que suas referências
  // sejam estáveis, evitando re-renderizações desnecessárias em componentes filhos.
  const login = useCallback(async (novoToken: string) => {
    try {
      localStorage.setItem("authToken", novoToken);
      setAuthHeader(novoToken);
      const response = await api.get("/auth/me");
      setUsuario(response.data);
      setToken(novoToken);
    } catch (error) {
      console.error("Falha ao realizar login:", error);
      // Se ocorrer um erro ao buscar os dados do usuário, desfaz o login.
      logout();
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    setAuthHeader(null);
    setUsuario(null);
    setToken(null);
  }, []);

  // `useMemo` otimiza a performance, garantindo que o objeto `value` só seja
  // recriado se um de seus valores realmente mudar.
  const value = useMemo(
    () => ({
      usuario,
      token,
      carregando,
      login,
      logout,
    }),
    [usuario, token, carregando, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
