import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Recebe todos os dados do formulário
    const body = await req.json();

    const backendUrl = process.env.BACKEND_API_URL;
    if (!backendUrl) {
      console.error("Variável de ambiente BACKEND_API_URL não está configurada.");
      throw new Error("Configuração do servidor incompleta.");
    }

    // Envia todos os dados para o backend - a validação completa é feita lá
    const backendResponse = await fetch(`${backendUrl}/createuser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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