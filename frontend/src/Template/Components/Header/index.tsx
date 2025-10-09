import { useAuth } from "../../../contexts/AuthContext";
import { useState, useEffect, MouseEventHandler } from "react";
import { buscarPerfilAluno } from "@/features/Aluno/api/buscarPerfil";
import { InputModal } from "@/components/InputModal";

type headerProps = {
  title: string
  onMenuClick: MouseEventHandler<HTMLButtonElement>
}

export function Header({ title, onMenuClick }: headerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { usuario } = useAuth();
  const [nomeUsuario, setNomeUsuario] = useState("");

  useEffect(() => {
    if (!usuario) return
    const obterNomeUsuario = async () => {
      // contexto de autenticação
      let nome = usuario?.nome

      if (nome) {
        setNomeUsuario(nome);
        return;
      }

      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          nome = parsedUser?.nome || parsedUser?.name;
          if (nome) {
            setNomeUsuario(nome);
            return;
          }
        }
      } catch (e) {
        console.log("Erro ao parsear dados do usuário:", e);
      }

      // tentar obter dos dados do perfil no localStorage como fallback
      try {
        const perfilData = localStorage.getItem("perfilData");
        if (perfilData) {
          const parsedPerfil = JSON.parse(perfilData);
          nome = parsedPerfil?.perfil?.nome || parsedPerfil?.nome;
          if (nome) {
            setNomeUsuario(nome);
            return;
          }
        }
      } catch (e) {
        console.log("Erro ao parsear dados do perfil:", e);
      }

      // 4. Como último recurso, buscar do backend (apenas se estiver logado)
      try {
        const token =
          localStorage.getItem("authToken") || localStorage.getItem("token");
        if (token && !nome) {
          const perfilResponse = await buscarPerfilAluno();
          if (perfilResponse?.perfil?.nome) {
            setNomeUsuario(perfilResponse.perfil.nome);
            // Salvar para uso futuro
            localStorage.setItem("perfilData", JSON.stringify(perfilResponse));
          }
        }
      } catch (e) {
        console.log("Erro ao buscar perfil para nome:", e);
        setNomeUsuario("Usuário"); // Fallback final
      }
    };

    obterNomeUsuario();
  }, [usuario]);

  const getInitials = (name: string) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <header className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
      <div className="relative w-full flex max-w-md gap-3">
        <button
          onClick={onMenuClick}
          className="text-white mr-4 lg:hidden"
          aria-label="Abrir menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-white">
          {title ? title : `Olá, ${nomeUsuario || "Usuário"}`}
        </h1>
      </div>
      <div className="flex items-center gap-10 justify-around">
        <div className="relative w-full max-w-md">
          <InputModal open={isModalOpen} onOpenChange={setIsModalOpen} />
        </div>

        <div className="w-10 h-10 rounded-full bg-blue-400 flex p-4 items-center justify-center text-slate-800 font-bold">
          {getInitials(nomeUsuario)}
        </div>
      </div>
    </header>
  );
}