import { proxyRequest } from "@/lib/apiProxy";
import { NextRequest } from "next/server";

/**
 * Rota DELETE para remover uma candidatura do aluno.
 * Atua como um proxy seguro para o backend.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { candidaturaId: string } }
) {
  const { candidaturaId } = params;
  return proxyRequest(request, `/candidaturas/${candidaturaId}`, {
    method: "DELETE",
  });
}
