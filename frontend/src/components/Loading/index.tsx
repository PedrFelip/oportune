"use client";

import { useLoading } from "@/contexts/LoadingContext";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Dialog, DialogContent } from "../ui/dialog";

export function GlobalLoading() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <Dialog>
      <DialogContent>
        <DotLottieReact src="/LoadingAnimation.lottie" loop autoplay />
      </DialogContent>
    </Dialog>
  );
}
