import { NextResponse } from "next/server";

interface RequestBody {
  token: string;
  novaSenha: string;
  novaSenhaConfirmada: string
}

export async function POST(req: Request) {
  try {
    const { token, novaSenha, novaSenhaConfirmada }: RequestBody = await req.json();

    if (!token || !novaSenha || !novaSenhaConfirmada) {
      return NextResponse.json(
        { error: "Os campos 'token' e 'senha' são obrigatórios" },
        { status: 400 }
      );
    }

    const backendUrl = process.env.BACKEND_API_URL;
    if (!backendUrl) {
      throw new Error("Variável de ambiente BACKEND_API_URL não definida");
    }
    
    const backendResponse = await fetch(`${backendUrl}/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, novaSenha, novaSenhaConfirmada }),
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({ error: "Resposta inválida do serviço de autenticação." }));
      return NextResponse.json(errorData, { status: backendResponse.status });
    }

    const data = await backendResponse.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("Erro no endpoint de reset de senha:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar sua requisição." },
      { status: 500 }
    );
  }
}