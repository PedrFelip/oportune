import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import { User, UserType } from "@/@types/types";

export type AuthContextType = {
  usuario: User | null;
  carregando: boolean;
  login: (token: string, userData?: Partial<User>) => void;
  logout: () => void;
  token: string;
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

type JwtPayload = {
  sub: string;
  role: UserType;
};

function getUserFromToken(token: string | null): User | null {
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return {
      id: decoded.sub,
      tipo: decoded.role,
    } as User;
  } catch (err) {
    console.error("Token inválido ou expirado:", err);
    return null;
  }
}

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [tokenUser, setTokenUser] = useState("");

  useEffect(() => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) setTokenUser(token);

      if (token) {
        const userFromToken = getUserFromToken(token);
        const profileDataRaw = localStorage.getItem("userProfile");
        const profileData = profileDataRaw ? JSON.parse(profileDataRaw) : {};

        if (userFromToken) {
          setUsuario({ ...userFromToken, ...profileData });
        }
      }
    } finally {
      setCarregando(false);
    }
  }, []);

  const login = (token: string, userData?: Partial<User>) => {
    const userFromToken = getUserFromToken(token);

    if (userFromToken) {
      localStorage.setItem("authToken", token);

      const finalUser: User = { ...userData, ...userFromToken } as User;
      setUsuario(finalUser);

      localStorage.setItem(
        "userProfile",
        JSON.stringify({
          nome: finalUser.nome,
          email: finalUser.email,
        })
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userProfile");
    setUsuario(null);
  };

  const value = useMemo(
    () => ({ usuario, carregando, login, logout, token: tokenUser }),
    [usuario, carregando, tokenUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
