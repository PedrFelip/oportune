import { proxyRequest } from "@/lib/apiProxy";
import { NextRequest } from "next/server";

// Proxy autenticado para operações sobre uma vaga específica
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  return proxyRequest(request, `/vagas/${params.id}`, {
    authRequired: true,
    method: "PUT",
    body,
  });
}
