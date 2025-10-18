import { NextRequest, NextResponse } from "next/server";

interface ProxyOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  authRequired?: boolean; // Nova opção!
}

/**
 * Atua como um proxy entre o frontend e o backend real,
 * com suporte para rotas públicas e autenticadas.
 */
export async function proxyRequest(
  request: NextRequest,
  backendPath: string,
  options: ProxyOptions = {}
) {
  const { method = 'GET', body = null, authRequired = true } = options;
  const headers: HeadersInit = { "Content-Type": "application/json" };

  try {
    if (authRequired) {
      const authorizationHeader = request.headers.get("Authorization");
      if (!authorizationHeader) {
        return NextResponse.json(
          { error: "Token de autorização não fornecido" },
          { status: 401 }
        );
      }
      headers['Authorization'] = authorizationHeader;
    }

    const backendUrl = `${process.env.BACKEND_API_URL}${backendPath}`;
    
    const response = await fetch(backendUrl, {
      method: method,
      headers: headers,
      body: body ? JSON.stringify(body) : null,
    });

    const responseText = await response.text();
    const data = responseText ? JSON.parse(responseText) : null; 

    return NextResponse.json(data, { status: response.status });

  } catch (error) {
    console.error(`💥 Erro no proxy para ${backendPath}:`, error);
    return NextResponse.json(
      { error: "Erro interno no servidor proxy" },
      { status: 500 }
    );
  }
}