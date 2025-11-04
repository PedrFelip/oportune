import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export async function DELETE(
  request: NextRequest,
  { params }: { params: { candidaturaId: string } }
) {
  try {
    const { candidaturaId } = params;
    const token = request.headers.get("Authorization");

    if (!token) {
      return NextResponse.json(
        { error: "Token não encontrado" },
        { status: 401 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/candidaturas/${candidaturaId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error || "Erro ao remover candidatura" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Erro na API de remover candidatura:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
