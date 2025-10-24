import { proxyRequest } from "@/lib/apiProxy";
import { NextRequest } from "next/server";

/**
 * Rota PUT para editar uma vaga existente.
 * Atua como um proxy autenticado para o backend.
 */
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const body = await request.json();

  return proxyRequest(request, `/vagas/${id}`, {
    authRequired: true,
    method: "PUT",
    body: body,
  });
}
