"use client";

import { showMessage } from "@/adapters/showMessage";
import { useAuth } from "@/contexts/AuthContext";
import { Template } from "@/Template";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { usuario, carregando } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // A verificação só acontece após o estado de carregamento inicial terminar.
    if (!carregando && !usuario) {
      // Se não estiver carregando e não houver usuário, redireciona.
      router.push("/login");
    }
  }, [usuario, carregando, router]);

  if (carregando) {
    showMessage.loading("Carregando a tela, por favor aguarde!");
  }

  showMessage.dismiss()

  if (usuario) {
    return <Template title={`Olá ${usuario.nome}`}>{children}</Template>;
  }

  return null;
}