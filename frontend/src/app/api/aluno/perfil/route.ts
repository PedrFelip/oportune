import { proxyRequest } from "@/lib/apiProxy";
import { NextRequest } from "next/server";

/**
 * Rota GET para buscar os dados atuais do perfil do usuário.
 * Atua como um proxy seguro para o backend.
 */
export async function GET(request: NextRequest) {
  return proxyRequest(request, "/dashboard/perfil", {
    method: "GET",
    authRequired: true,
  });
}
