// app/api/loguser/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const dados = await req.json();

  const backendReply = await fetch("http://localhost:3001/loguser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  const data = await backendReply.json();
  return NextResponse.json(data);
}
