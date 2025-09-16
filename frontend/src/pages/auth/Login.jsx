import React, { useState } from "react";
import Logo from "../../assets/logo_oportune.png";
import { Link, useNavigate } from "react-router-dom";
import { logarUsuario } from "../../api/api";

const LogoIcon = () => (
  <img src={Logo} className="max-w-20" alt="Logo da Oportune" />
);

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await logarUsuario({ email, senha: password });
      const { token, user } = data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("token", token); // legacy compat
      localStorage.setItem("user", JSON.stringify(user));

      if (user.emailVerificado === false) {
        navigate("/confirmacao");
        return;
      }

      switch (user.tipo) {
        case "ESTUDANTE":
          navigate("/aluno/dashboard");
          break;
        case "PROFESSOR":
          navigate("/professor/dashboard");
          break;
        case "EMPRESA":
          navigate("/empresa/dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      setError(err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="font-sans text-slate-300 bg-gradient-to-b from-[#0c1a2c] to-[#15223c] min-h-screen flex items-center justify-center p-5 relative">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-lg p-8">
          <header className="text-center mb-7">
            <div className="flex justify-center items-center gap-3 font-bold mb-4">
              <LogoIcon />
              <span className="text-2xl text-white">Oportune</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Acesse sua conta</h1>
            <p className="text-sm text-slate-400 mt-1.5">
              Bem-vindo de volta! Insira seus dados.
            </p>
          </header>

          <main>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-slate-400"
                >
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white text-base placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Digite seu email"
                  required
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-slate-400"
                >
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white text-base placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Digite sua senha"
                  required
                />
              </div>

              <div className="flex justify-end items-center text-xs mb-5 -mt-2">
                <Link
                  href="#"
                  className="text-blue-400 hover:text-white hover:underline transition-colors duration-300"
                >
                  Esqueci minha senha
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#2474e4] to-[#639bec] text-white font-semibold py-3.5 rounded-lg border-none cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-[1.02] hover:shadow-[0_8px_20px_rgba(36,116,228,0.2)] disabled:opacity-50"
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>
              {error && (
                <p className="text-red-400 text-sm mt-3 text-center">{error}</p>
              )}
            </form>
          </main>

          {/* Card Footer Section */}
          <footer className="text-center mt-6 text-sm">
            <p>
              Não tem uma conta?{" "}
              <Link
                to={"/cadastro"}
                className="font-semibold text-blue-400 hover:text-white hover:underline transition-colors duration-300"
              >
                Crie uma agora
              </Link>
            </p>
          </footer>
        </div>
      </div>

      {/* Page Footer */}
      <footer className="absolute bottom-5 text-center text-xs text-slate-600 w-full">
        © Oportune — 2025 |{" "}
        <Link
          to={"/"}
          className="text-slate-600 hover:text-slate-400 hover:underline transition-colors duration-300"
        >
          Voltar para o início
        </Link>
      </footer>
    </div>
  );
}
