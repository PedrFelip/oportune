import { proxyRequest } from "@/lib/apiProxy";
import { NextRequest } from "next/server";

/**
 * Rota GET para buscar a lista de vagas.
 * Atua como um proxy seguro para o endpoint correspondente no backend.
 */
export async function GET(request: NextRequest) {
  return proxyRequest(request, "/vagas/responsavel", {
    authRequired: true,
    method: "GET",
  });
}
