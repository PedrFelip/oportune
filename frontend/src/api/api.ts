// Função para obter token
function getAuthToken() {
  const authToken = localStorage.getItem("authToken");
  const token = localStorage.getItem("token");
  
  const finalToken = authToken || token;
  
  if (finalToken) {
    // Verifica se o token tem formato JWT básico
    const parts = finalToken.split('.');
    if (parts.length !== 3) {
      console.warn("Token não parece ser um JWT válido");
    }
  }
  
  return finalToken;
}

async function parseJsonSafe(reply: Response) {
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

export async function cadastrarUsuario(dados: any) {
  try {
  const reply = await fetch(`http://localhost:3001/createuser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    if (!reply.ok) {
      const text = await reply.text().catch(() => "");
      throw new Error(text || `Erro na requisição: ${reply.status}`);
    }

    return await parseJsonSafe(reply);
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    throw error;
  }
}
export async function confirmarEmail(token: string) {
  try {
  const reply = await fetch(`http://localhost:3001/confirm-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    if (!reply.ok) {
      const text = await reply.text().catch(() => "");
      throw new Error(text || `Erro na requisição: ${reply.status}`);
    }

    return await parseJsonSafe(reply);
  } catch (error) {
    console.error("Erro ao confirmar e-mail:", error);
    throw error;
  }
}

// Login de usuário
export async function logarUsuario(dados: { email: string; senha: string }) {
  try {
  const reply = await fetch(`http://localhost:3001/loguser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    if (!reply.ok) {
      const text = await reply.text().catch(() => "");
      throw new Error(text || `Erro na requisição: ${reply.status}`);
    }

    return await parseJsonSafe(reply); // { token, user }
  } catch (error) {
    console.error("Erro ao logar usuário:", error);
    throw error;
  }
}

// Buscar dados do dashboard do aluno (completo)
export async function buscarDashboardAluno() {
  try {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error("Token não encontrado");
    }

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };

    console.log("📡 Fazendo requisição para dashboard");
    console.log("📋 Headers que serão enviados:", {
      "Content-Type": headers["Content-Type"],
      "Authorization": headers["Authorization"] ? `Bearer ${token.substring(0, 20)}...` : "ausente"
    });

    const reply = await fetch(`http://localhost:3001/dashboard`, {
      method: "GET",
      headers,
    });

    console.log("📡 Resposta dashboard:", reply.status, reply.statusText);
    if (!reply.ok) {
      const text = await reply.text().catch(() => "");
      console.log("❌ Resposta de erro:", text);
      throw new Error(text || `Erro na requisição: ${reply.status}`);
    }

    return await parseJsonSafe(reply);
  } catch (error) {
    console.error("💥 Erro ao buscar dashboard:", error);
    throw error;
  }
}

// Buscar apenas dados do perfil (carregamento inicial)
export async function buscarPerfilAluno() {
  try {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error("Token não encontrado");
    }

    const reply = await fetch(`http://localhost:3001/dashboard/perfil`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    
    if (!reply.ok) {
      const text = await reply.text().catch(() => "");
      throw new Error(text || `Erro na requisição: ${reply.status}`);
    }

    const result = await parseJsonSafe(reply);
    return result;
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    throw error;
  }
}

// Buscar apenas candidaturas (carregamento assíncrono)
export async function buscarCandidaturasAluno() {
  try {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error("Token não encontrado");
    }

    const reply = await fetch(`http://localhost:3001/dashboard/candidaturas`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    
    if (!reply.ok) {
      const text = await reply.text().catch(() => "");
      throw new Error(text || `Erro na requisição: ${reply.status}`);
    }

    const result = await parseJsonSafe(reply);
    return result;
  } catch (error) {
    console.error("Erro ao buscar candidaturas:", error);
    throw error;
  }
}

// Buscar apenas vagas recomendadas (carregamento assíncrono)
export async function buscarVagasRecomendadasAluno() {
  try {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error("Token não encontrado");
    }

    const reply = await fetch(`http://localhost:3001/dashboard/vagas-recomendadas`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    
    if (!reply.ok) {
      const text = await reply.text().catch(() => "");
      throw new Error(text || `Erro na requisição: ${reply.status}`);
    }

    const result = await parseJsonSafe(reply);
    return result;
  } catch (error) {
    console.error("Erro ao buscar vagas recomendadas:", error);
    throw error;
  }
}
