import { proxyRequest } from "@/lib/apiProxy";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  return proxyRequest(request, "/vagas", {
    method: "POST",
    body: body,
    authRequired: true,
  });
}
