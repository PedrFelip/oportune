"use client";

import { useLoading } from "@/contexts/LoadingContext";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

export function GlobalLoading() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <Dialog open={isLoading} onOpenChange={() => {}}>
      <DialogContent className="flex items-center justify-center bg-transparent border-none shadow-none">
        <DialogTitle />
        <DotLottieReact src="/LoadingAnimation.lottie" loop autoplay />
      </DialogContent>
    </Dialog>
  );
}
