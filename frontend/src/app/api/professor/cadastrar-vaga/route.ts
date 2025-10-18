import { proxyRequest } from "@/lib/apiProxy";
import { NextRequest } from "next/server";

/**
 * Rota POST para criar uma nova vaga.
 * Atua como um proxy autenticado para o backend.
 */
export async function POST(request: NextRequest) {
  const body = await request.json();

  return proxyRequest(request, "/vagas", {
    method: "POST",
    body: body,
  });
}
