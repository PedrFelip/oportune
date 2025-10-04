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