import { NextResponse } from "next/server";

interface ConfirmarEmailBody {
  token: string;
}

export async function POST(req: Request) {
  try {
    const { token }: ConfirmarEmailBody = await req.json();

    if (!token) {
      return NextResponse.json(
        { error: "Token não fornecido" },
        { status: 400 }
      );
    }

    const backendUrl = process.env.BACKEND_API_URL;
    if (!backendUrl) {
      console.error("Variável de ambiente BACKEND_API_URL não está configurada.");
      throw new Error("Configuração do servidor incompleta.");
    }

    const backendResponse = await fetch(`${backendUrl}/confirm-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    if (!backendResponse.ok) {
      const errorBody = await backendResponse.json().catch(() => ({ 
        error: "Erro ao confirmar email" 
      }));
      
      return NextResponse.json(errorBody, { status: backendResponse.status });
    }

    const data = await backendResponse.json();
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("Erro no endpoint /confirmar-email:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
