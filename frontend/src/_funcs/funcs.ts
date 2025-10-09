export async function parseJsonSafe(reply: Response) {
  if (reply.status === 204) {
    return null;
  }

  const contentType = reply.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    // Tenta ler texto para depuração
    const text = await reply.text().catch(() => "");
    throw new Error(text || `Resposta inválida (${reply.status})`);
  }

  const jsonData = await reply.json();
  return jsonData;
}

export async function getAuthToken() {
  if (typeof window === "undefined") {
    return null;
  }
  const authToken = localStorage.getItem("authToken");
  const token = localStorage.getItem("token");

  const finalToken = authToken || token;

  if (finalToken) {
    // Verifica se o token tem formato JWT básico
    const parts = finalToken.split(".");
    if (parts.length !== 3) {
      console.warn("Token não parece ser um JWT válido");
    }
  }

  return finalToken;
}