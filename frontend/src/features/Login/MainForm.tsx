"use client";

import { showMessage } from "@/adapters/showMessage";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

type MainFormProps = {
  onSubmit: (data: { email: string; senha: string }) => Promise<void>;
  loading: boolean;
  error: string | null;
};

export function MainForm({ onSubmit, loading, error }: MainFormProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      onSubmit({email, senha})
    } catch {
      showMessage.error(error || "Erro ao realizar login")
    }
  }

  return (
    <main onSubmit={handleSubmit}>
      <form>
        <div className="mb-4">
          <FormInput
            type="email"
            label="Email"
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
          <FormInput
            type="password"
            label="Senha"
            id="password"
            name="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white text-base placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Digite sua senha"
            required
          />
        </div>

        <div className="flex justify-end items-center text-xs mb-5 -mt-2">
          <Link
            href="/recuperar-senha"
            className="text-blue-400 hover:text-white hover:underline transition-colors duration-300"
          >
            Esqueci minha senha
          </Link>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#2474e4] to-[#639bec] text-white font-semibold py-3.5 rounded-lg border-none cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-[1.02] hover:shadow-[0_8px_20px_rgba(36,116,228,0.2)] disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </main>
    
  );
}
