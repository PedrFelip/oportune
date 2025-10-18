import { proxyRequest } from "@/lib/apiProxy";
import { NextRequest } from "next/server";

/**
 * Rota POST para criar um novo usuário.
 * Atua como um proxy público para o backend.
 */
export async function POST(request: NextRequest) {
  const body = await request.json();

  return proxyRequest(request, "/createuser", {
    method: 'POST',
    body: body,
    authRequired: false,
  });
}