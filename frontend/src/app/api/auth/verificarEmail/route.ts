import { NextResponse } from "next/server";

interface RequestBody {
  email: string;
}

export async function POST(req: Request) {
  try {
    const { email }: RequestBody = await req.json();

    if (!email) {
      return NextResponse.json({ error: "O campo 'email' é obrigatório" }, { status: 400 });
    }
    
    const backendUrl = process.env.BACKEND_API_URL;
    if (!backendUrl) {
        throw new Error("Variável de ambiente BACKEND_API_URL não definida");
    }

    const backendResponse = await fetch(`${backendUrl}/request-password-reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text().catch(() => "Erro ao ler resposta do backend.");
      return NextResponse.json(
        { error: errorText || `Erro na comunicação com o serviço: ${backendResponse.status}` },
        { status: backendResponse.status }
      );
    }

    const data = await backendResponse.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("Erro no endpoint POST /sua-rota:", {
        message: error instanceof Error ? error.message : "Erro desconhecido",
        stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: "Erro interno ao processar sua requisição." },
      { status: 500 }
    );
  }
}