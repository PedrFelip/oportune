import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

function getUserFromToken(token) {
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    // Backend signs token with: { sub, role }
    return {
      id: decoded?.sub ?? null,
      role: decoded?.role ?? null,
    };
  } catch (err) {
    console.error("Erro ao decodificar token:", err);
    return null;
  }
}

function mapRoleToTipo(role) {
  if (!role) return undefined;
  // Mantém compatível com o backend (ESTUDANTE | PROFESSOR | EMPRESA)
  return role;
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem("authToken") || localStorage.getItem("token");
      const storedUserRaw = localStorage.getItem("user");
      const tokenUser = getUserFromToken(token);

      let merged = null;
      if (storedUserRaw) {
        try {
          const storedUser = JSON.parse(storedUserRaw);
          merged = {
            ...storedUser,
            id: storedUser?.id ?? tokenUser?.id ?? null,
            // "tipo" é usado pelo app, garanta via role do token quando faltar
            tipo: storedUser?.tipo ?? mapRoleToTipo(tokenUser?.role),
          };
        } catch (e) {
          merged = tokenUser;
        }
      } else {
        merged = tokenUser;
      }

      if (merged) setUsuario(merged);
    } finally {
      setCarregando(false);
    }
  }, []);

  const login = (token, user) => {
    if (token) localStorage.setItem("authToken", token);
    if (user) localStorage.setItem("user", JSON.stringify(user));
    const tokenUser = getUserFromToken(token);
    const merged = user
      ? { ...user, id: user?.id ?? tokenUser?.id, tipo: user?.tipo ?? mapRoleToTipo(tokenUser?.role) }
      : tokenUser;
    setUsuario(merged ?? null);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // legacy
    setUsuario(null);
  };

  const value = useMemo(() => ({ usuario, carregando, login, logout }), [usuario, carregando]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
