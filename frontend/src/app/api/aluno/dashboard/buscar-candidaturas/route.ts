import { proxyRequest } from "@/lib/apiProxy";
import { NextRequest } from "next/server";

/**
 * Rota GET para buscar as candidaturas do dashboard.
 * Atua como um proxy seguro para o backend.
 */
export async function GET(request: NextRequest) {
  return proxyRequest(request, "/dashboard/candidaturas");
}