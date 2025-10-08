import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const dados = await req.json();

  const backend = await fetch("http://localhost:3001/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  const data = await backend.json();
  return NextResponse.json(data);
}
