import { proxyRequest } from "@/lib/apiProxy";
import { NextRequest } from "next/server";

/**
 * Rota GET para buscar uma vaga específica.
 * Ela atua como um proxy seguro para o backend real.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return proxyRequest(request, `/vagas/${params.id}`);
}