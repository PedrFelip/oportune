import { proxyRequest } from "@/lib/apiProxy";
import { NextRequest } from "next/server";

/**
 * Rota POST para registrar uma nova candidatura.
 * Atua como um proxy seguro para o endpoint do backend.
 */
export async function POST(request: NextRequest) {
  const body = await request.json();

  return proxyRequest(request, "/candidatar", {
    method: "POST",
    body: body,
  });
}
