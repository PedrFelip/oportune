import { NextResponse } from "next/server";

interface CreateUserBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const { name, email, password }: CreateUserBody = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Os campos 'name', 'email' e 'password' são obrigatórios." },
        { status: 400 }
      );
    }

    const backendUrl = process.env.BACKEND_API_URL;
    if (!backendUrl) {
      console.error("Variável de ambiente BACKEND_API_URL não está configurada.");
      throw new Error("Configuração do servidor incompleta.");
    }

    const backendResponse = await fetch(`${backendUrl}/createuser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!backendResponse.ok) {
      const errorBody = await backendResponse.json().catch(() => ({ 
        error: "Ocorreu um erro no serviço de criação de usuário." 
      }));
      
      return NextResponse.json(errorBody, { status: backendResponse.status });
    }

    const data = await backendResponse.json();
    return NextResponse.json(data, { status: 201 });

  } catch (error) {
    console.error("Erro no endpoint /createuser:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}