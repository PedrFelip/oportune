import axios from "axios";

export const api = axios.create({
  baseURL: process.env.BACKEND_API_URL,
});

export const setAuthHeader = (token: string | null) => {
  if (token) {
    // Se um token for fornecido, define o cabeçalho padrão para todas as chamadas futuras.
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Se o token for nulo (logout), remove o cabeçalho.
    delete api.defaults.headers.common["Authorization"];
  }
};
