import { NextResponse } from "next/server";

interface LoginBody {
  email: string;
  senha: string;
}

export async function POST(req: Request) {
  try {
    const { email, senha }: LoginBody = await req.json();

    if (!email || !senha) {
      return NextResponse.json(
        { error: "Os campos 'email' e 'senha' são obrigatórios." },
        { status: 400 }
      );
    }

    const backendUrl = process.env.BACKEND_API_URL;
    if (!backendUrl) {
      console.error("Variável de ambiente BACKEND_API_URL não está configurada.");
      throw new Error("Configuração do servidor incorreta.");
    }

    const backendReply = await fetch(`${backendUrl}/loguser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    if (!backendReply.ok) {
      const errorBody = await backendReply.json().catch(() => ({ 
        message: "Credenciais inválidas ou erro no serviço de login." 
      }));
      
      return NextResponse.json(errorBody, { status: backendReply.status });
    }

    const data = await backendReply.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("Erro no endpoint /loguser:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}