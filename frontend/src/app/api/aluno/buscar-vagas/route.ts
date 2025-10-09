import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    // No lado do servidor, pegamos o token do header da requisição que o frontend fez.
    const authorizationHeader = request.headers.get("Authorization");

    if (!authorizationHeader) {
      return NextResponse.json(
        { error: "Token de autorização não fornecido" },
        { status: 401 }
      );
    }

    console.log("📡 Rota da API Next.js recebendo a chamada...");

    const backendUrl = `${process.env.BACKEND_API_URL}/vagas`;

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationHeader,
      },
    });

    console.log("☁️ Resposta do backend real:", response.status, response.statusText);

    // Se o backend real retornar um erro, repassamos o erro para o frontend.
    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json(
        { error: "Erro ao buscar dados do backend", details: errorData },
        { status: response.status }
      );
    }

    // Se tudo deu certo, pegamos o JSON da resposta e o retornamos para o frontend.
    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("💥 Erro inesperado na rota da API Next.js:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}