"use client";

import React from "react";
import { CheckIcon } from "lucide-react";
import { StepProps } from "../@types/type";
import { Button } from "@/components/ui/button";

export function Step6_Final({ onBack }: StepProps) {
  return (
    <div className="animate-fadeIn text-center">
      <div className="w-16 h-16 mx-auto text-[#639bec]">
        <CheckIcon />
      </div>
      <h2 className="text-white text-xl font-bold mt-4 mb-2">
        Tudo pronto!
      </h2>
      <p className="text-[#c4d3e6] text-sm mb-6">
        Revise suas informações e clique em finalizar para criar sua conta.
      </p>
      
      <div className="flex flex-col gap-3">
        <Button type="submit" variant="oportune" size="lg">
          Finalizar e Criar Conta
        </Button>

        <Button type="button" onClick={onBack} variant="oportune_blank">
          Voltar e Revisar
        </Button>
      </div>
    </div>
  );
}