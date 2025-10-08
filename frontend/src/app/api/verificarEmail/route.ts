import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  // Aqui você chama o backend real
  const backend = await fetch("http://localhost:3001/request-password-reset", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await backend.json();
  return NextResponse.json(data);
}
