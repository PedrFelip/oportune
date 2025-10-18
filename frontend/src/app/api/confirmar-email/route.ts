import { proxyRequest } from "@/lib/apiProxy";
import { NextRequest } from "next/server";

/**
 * Rota POST para confirmar o e-mail de um usuário.
 * Atua como um proxy público para o backend.
 */
export async function POST(request: NextRequest) {
  const body = await request.json();

  return proxyRequest(request, "/confirm-email", {
    method: 'POST',
    body: body,
    authRequired: false,
  });
}