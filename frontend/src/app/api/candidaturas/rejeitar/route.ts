import { proxyRequest } from "@/lib/apiProxy";
import { NextRequest } from "next/server";

/**
 * Proxy para aprovar uma candidatura.
 * Rota local: POST /api/candidaturas/rejeitar
 * Encaminha para o backend real.
 */
export async function POST(request: NextRequest) {
  const body = await request.json();
  return proxyRequest(request, "/candidaturas/rejeitar", {
    authRequired: true,
    body: body,
    method: "POST",
  });
}
