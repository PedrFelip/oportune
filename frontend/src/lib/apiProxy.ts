// src/lib/apiProxy.ts

import { NextRequest, NextResponse } from "next/server";

interface ProxyOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
}

/**
 * Esta função atua como um proxy entre o frontend e o backend real.
 * Ela pega uma requisição do Next.js, repassa para o backend e retorna a resposta.
 */
export async function proxyRequest(
  request: NextRequest,
  backendPath: string, // Ex: "/vagas/123"
  options: ProxyOptions = {}
) {
  const { method = "GET", body = null } = options;

  try {
    const authorizationHeader = request.headers.get("Authorization");
    if (!authorizationHeader) {
      return NextResponse.json(
        { error: "Token de autorização não fornecido" },
        { status: 401 }
      );
    }

    const backendUrl = `${process.env.BACKEND_API_URL}${backendPath}`;

    const response = await fetch(backendUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationHeader,
      },
      // Só adiciona o body se ele existir (para POST, PUT, etc.)
      body: body ? JSON.stringify(body) : null,
    });

    // Pega a resposta do backend (seja JSON ou texto de erro)
    const responseText = await response.text();
    // Tenta parsear como JSON, mas não quebra se for só texto
    const data = responseText ? JSON.parse(responseText) : null;

    // Retorna a resposta do backend para o frontend, com o mesmo status code
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error(`💥 Erro no proxy para ${backendPath}:`, error);
    return NextResponse.json(
      { error: "Erro interno no servidor proxy" },
      { status: 500 }
    );
  }
}
