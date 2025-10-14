"use server"

import { cookies } from "next/headers";

export async function salveTokenCookie(token: string) {
  if (!token) new Error("Token não informado");

  (await cookies()).set("token", token, {
    httpOnly: true, // O cookie não pode ser acessado por JavaScript no cliente (essencial para segurança)
    secure: process.env.NODE_ENV === "production", // Enviar apenas em HTTPS em produção
    maxAge: 60 * 60 * 24 * 7, // Duração de 1 semana
    path: "/", // Disponível em todo o site
  });
}
