import { proxyRequest } from "@/lib/apiProxy";
import { NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  const params = await context.params;
  return proxyRequest(request, `/vagas/${params.id}/encerrar`, {
    authRequired: true,
    method: "PATCH",
  });
}
