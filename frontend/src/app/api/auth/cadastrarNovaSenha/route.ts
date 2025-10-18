import { proxyRequest } from "@/lib/apiProxy";
import { NextRequest } from "next/server";

/**
 * Rota POST para redefinir a senha do usuário.
 * Atua como um proxy público para o backend.
 */
export async function POST(request: NextRequest) {
  const body = await request.json();

  return proxyRequest(request, "/reset-password", {
    method: 'POST',
    body: body,
    authRequired: false, // Informa ao helper que não é preciso ter token
  });
}