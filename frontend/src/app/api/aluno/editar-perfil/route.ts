import { proxyRequest } from "@/lib/apiProxy";
import { NextRequest } from "next/server";

/**
 * Rota GET para buscar o perfil do dashboard.
 * Atua como um proxy seguro para o backend.
 */
export async function PUT(request: NextRequest) {
  return proxyRequest(request, "/dashboard/perfil");
}