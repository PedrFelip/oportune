import { proxyRequest } from "@/lib/apiProxy";
import { NextRequest } from "next/server";

/**
 * Rota POST para criar uma nova vaga.
 * Atua como um proxy autenticado para o backend.
 */
export async function PUT(request: NextRequest) {
  const body = await request.json();

  return proxyRequest(request, "/dashboard/perfil", {
    authRequired: true,
    method: "PUT",
    body: body,
  });
}
