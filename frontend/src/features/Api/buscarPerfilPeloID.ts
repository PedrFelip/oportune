export async function buscarPerfilPeloId(id: string) {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const response = await fetch(
    `${base}/api/geral/buscar-perfil-pelo-id/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) throw new Error("Erro ao buscar");

  return response.json();
}
