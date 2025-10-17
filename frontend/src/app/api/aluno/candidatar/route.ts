import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const authorizationHeader = request.headers.get("Authorization");
    if (!authorizationHeader) {
      return NextResponse.json(
        { error: "Token de autorização não fornecido" },
        { status: 401 }
      );
    }

    const body = await request.json();

    console.log("📡 Rota da API Next.js recebendo chamada POST...");

    const backendUrl = `${process.env.BACKEND_API_URL}/candidatar`;

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationHeader,
      },
      body: JSON.stringify(body),
    });

    console.log("☁️ Resposta do backend real:", response.status, response.statusText);

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json(
        { error: "Erro ao comunicar com o backend", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });

  } catch (error) {
    console.error("💥 Erro inesperado na rota da API Next.js:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}