"use client";

import { MessagesContainer } from "@/components/MessageContainer";
import { AuthProvider } from "@/contexts/AuthContext"; // Ajuste o caminho
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <MessagesContainer>{children}</MessagesContainer>
    </AuthProvider>
  );
}
