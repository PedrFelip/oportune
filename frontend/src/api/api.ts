export async function cadastrarUsuario(dados) {
  const reply = await fetch("http://localhost:3001/createuser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  return reply.json();
}
