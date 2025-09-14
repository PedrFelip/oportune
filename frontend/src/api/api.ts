export async function cadastrarUsuario(dados: any) {
  try {
    const reply = await fetch("http://localhost:3001/createuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    if (!reply.ok) {
      throw new Error(`Erro na requisição: ${reply.status}`);
    }

    return await reply.json();
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    throw error;
  }
}
export async function confirmarEmail(token: string) {
  try {
    const reply = await fetch("http://localhost:3001/confirm-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    if (!reply.ok) {
      const errorData = await reply.json();
      throw new Error(
        errorData.message || `Erro na requisição: ${reply.status}`,
      );
    }

    return await reply.json();
  } catch (error) {
    console.error("Erro ao confirmar e-mail:", error);
    throw error;
  }
}

// Login de usuário
export async function logarUsuario(dados: { email: string; senha: string }) {
  try {
    const reply = await fetch("http://localhost:3001/loguser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    if (!reply.ok) {
      const errorData = await reply.json().catch(() => ({}));
      throw new Error(errorData.message || `Erro na requisição: ${reply.status}`);
    }

    return await reply.json(); // { token, user }
  } catch (error) {
    console.error("Erro ao logar usuário:", error);
    throw error;
  }
}

// Buscar dados do dashboard do aluno (completo)
export async function buscarDashboardAluno() {
  try {
    const token = localStorage.getItem("authToken");
    
    if (!token) {
      throw new Error("Token não encontrado");
    }

    const reply = await fetch("http://localhost:3001/dashboard", {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!reply.ok) {
      const errorData = await reply.json().catch(() => ({}));
      throw new Error(errorData.message || `Erro na requisição: ${reply.status}`);
    }

    return await reply.json();
  } catch (error) {
    console.error("Erro ao buscar dashboard:", error);
    throw error;
  }
}

// Buscar apenas dados do perfil (carregamento inicial)
export async function buscarPerfilAluno() {
  try {
    const token = localStorage.getItem("authToken");
    
    if (!token) {
      throw new Error("Token não encontrado");
    }

    const reply = await fetch("http://localhost:3001/dashboard/perfil", {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!reply.ok) {
      const errorData = await reply.json().catch(() => ({}));
      throw new Error(errorData.message || `Erro na requisição: ${reply.status}`);
    }

    return await reply.json();
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    throw error;
  }
}

// Buscar apenas candidaturas (carregamento assíncrono)
export async function buscarCandidaturasAluno() {
  try {
    const token = localStorage.getItem("authToken");
    
    if (!token) {
      throw new Error("Token não encontrado");
    }

    const reply = await fetch("http://localhost:3001/dashboard/candidaturas", {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!reply.ok) {
      const errorData = await reply.json().catch(() => ({}));
      throw new Error(errorData.message || `Erro na requisição: ${reply.status}`);
    }

    return await reply.json();
  } catch (error) {
    console.error("Erro ao buscar candidaturas:", error);
    throw error;
  }
}

// Buscar apenas vagas recomendadas (carregamento assíncrono)
export async function buscarVagasRecomendadasAluno() {
  try {
    const token = localStorage.getItem("authToken");
    
    if (!token) {
      throw new Error("Token não encontrado");
    }

    const reply = await fetch("http://localhost:3001/dashboard/vagas-recomendadas", {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!reply.ok) {
      const errorData = await reply.json().catch(() => ({}));
      throw new Error(errorData.message || `Erro na requisição: ${reply.status}`);
    }

    return await reply.json();
  } catch (error) {
    console.error("Erro ao buscar vagas recomendadas:", error);
    throw error;
  }
}
