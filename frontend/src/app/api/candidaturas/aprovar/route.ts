import { proxyRequest } from "@/lib/apiProxy";
import { NextRequest } from "next/server";

/**
 * Proxy para aprovar uma candidatura.
 * Rota local: POST /api/candidaturas/aprovar
 * Encaminha para o backend real.
 */
export async function POST(request: NextRequest) {
  return proxyRequest(request, "/candidaturas/aprovar", {
    authRequired: true,
  });
}
