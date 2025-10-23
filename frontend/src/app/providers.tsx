"use client";

import { GlobalLoading } from "@/components/Loading";
import { MessagesContainer } from "@/components/MessageContainer";
import { AuthProvider } from "@/contexts/AuthContext";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <LoadingProvider>
        <MessagesContainer>{children}</MessagesContainer>
        <GlobalLoading />
      </LoadingProvider>
    </AuthProvider>
  );
}
