import { getAuthToken } from "@/_funcs/funcs";

interface CandidaturaPayload {
  candidaturaId: string;
  estudanteId: string;
}

export async function aprovarCandidatura(payload: CandidaturaPayload) {
  try {
    const token = await getAuthToken();

    const response = await fetch("/api/candidaturas/aprovar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error("❌ Erro na aprovação:", response.status, error);
      throw new Error(`Erro ao aprovar: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("🚨 Erro ao aprovar candidatura:", err);
    throw err;
  }
}

export async function rejeitarCandidatura(payload: CandidaturaPayload) {
  try {
    const token = await getAuthToken();

    const response = await fetch("/api/candidaturas/rejeitar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error("❌ Erro na rejeição:", response.status, error);
      throw new Error(`Erro ao rejeitar: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("🚨 Erro ao rejeitar candidatura:", err);
    throw err;
  }
}
