import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const dados = await req.json();

  const reply = await fetch(`http://localhost:3001/createuser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  const data = await reply.json();
  return NextResponse.json(data);
}
