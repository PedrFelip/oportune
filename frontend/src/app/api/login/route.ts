import { NextResponse } from "next/server";

interface LoginBody {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const { email, password }: LoginBody = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Os campos 'email' e 'password' são obrigatórios." },
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
      body: JSON.stringify({ email, password }),
    });

    if (!backendReply.ok) {
      const errorBody = await backendReply.json().catch(() => ({ 
        error: "Credenciais inválidas ou erro no serviço de login." 
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