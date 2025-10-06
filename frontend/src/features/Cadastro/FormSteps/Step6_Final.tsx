"use client";

import React from "react";
import { CheckIcon } from "lucide-react";
import { StepProps } from "../@types/type";
import { Button } from "@/components/ui/button";

export function Step6_Final({ onBack }: StepProps) {
  return (
    <div className="animate-fadeIn text-center">
      <div className="w-16 h-16 mx-auto text-[#639bec]">
        <CheckIcon size={64}/>
      </div>
      <h2 className="text-white text-xl font-bold mt-4 mb-2">
        Tudo pronto!
      </h2>
      <p className="text-[#c4d3e6] text-sm mb-6">
        Revise suas informações e clique em finalizar para criar sua conta.
      </p>
      
      <div className="flex flex-col gap-3">
        <Button type="submit" variant="oportune" size="lg" className="w-full font-semibold transition-all hover:opacity-90 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#2474e4]/20 mt-2">
          Finalizar e Criar Conta
        </Button>

        <Button type="button" onClick={onBack} variant="oportune_blank" className="w-full font-semibold transition-all hover:opacity-90 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#2474e4]/20 mt-2">
          Voltar e Revisar
        </Button>
      </div>
    </div>
  );
}