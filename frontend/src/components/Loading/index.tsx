"use client";

import { useLoading } from "@/contexts/LoadingContext";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

export function GlobalLoading() {
  const { isLoading } = useLoading();

  return (
    <Dialog open={isLoading} onOpenChange={() => {}}>
      <DialogContent
        className="flex items-center justify-center 
    bg-transparent border-none shadow-none 
    outline-none focus-visible:outline-none focus-visible:ring-0 
    [&>button]:hidden"
      >
        <DialogTitle />
        <DotLottieReact src="/LoadingAnimation.lottie" loop autoplay />
      </DialogContent>
    </Dialog>
  );
}
