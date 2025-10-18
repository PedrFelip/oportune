import { proxyRequest } from "@/lib/apiProxy";
import { NextRequest } from "next/server";

/**
 * Rota POST para solicitar a redefinição de senha.
 * Atua como um proxy público para o backend.
 */
export async function POST(request: NextRequest) {
  const body = await request.json();

  return proxyRequest(request, "/request-password-reset", {
    method: 'POST',
    body: body,
    authRequired: false,
  });
}