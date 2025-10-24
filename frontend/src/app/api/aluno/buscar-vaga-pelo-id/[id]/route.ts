import { proxyRequest } from "@/lib/apiProxy";
import { NextRequest } from "next/server";

/**
 * Rota GET para buscar uma vaga específica.
 * Ela atua como um proxy seguro para o backend real.
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  const params = await context.params;
  return proxyRequest(request, `/vagas/${params.id}`, { authRequired: false });
}