import { proxyRequest } from "@/lib/apiProxy";
import { NextRequest } from "next/server";

/**
 * Rota POST para autenticar um usuário.
 * Atua como um proxy público para o backend.
 */
export async function POST(request: NextRequest) {
  const body = await request.json();

  return proxyRequest(request, "/loguser", {
    method: 'POST',
    body: body,
    authRequired: false,
  });
}