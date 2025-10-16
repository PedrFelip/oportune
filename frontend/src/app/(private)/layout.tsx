"use client";

import { showMessage } from "@/adapters/showMessage";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutProvider } from "@/contexts/LayoutContext";
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

  useEffect(() => {
    if (carregando) {
      showMessage.loading("Carregando, por favor aguarde...");
    } else {
      // Se não estiver mais carregando, fecha todos os toasts
      showMessage.dismiss();
    }

    return () => {
      showMessage.dismiss();
    };
  }, [carregando]);

  if (usuario) {
    return (
      <LayoutProvider>
        <Template>{children}</Template>
      </LayoutProvider>
    );
  }

  return null;
}
