import { parseJsonSafe } from "@/_funcs/funcs";

export async function confirmarEmail(token: string) {
  try {
    const reply = await fetch("/api/confirmar-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    if (!reply.ok) {
      const errorData = await reply.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.error || "Erro ao confirmar email");
    }

    return await parseJsonSafe(reply);
  } catch (error) {
    console.error("Erro ao confirmar email:", error);
    throw error;
  }
}
