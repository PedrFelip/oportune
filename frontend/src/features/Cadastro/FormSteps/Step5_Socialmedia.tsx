/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import CardHeader from "../components/CardHeader";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { StepProps } from "../@types/type";

export function Step5_Socialmedia({
  onNext,
  onBack,
  register,
  errors,
}: StepProps) {
  return (
    <div className="animate-fadeIn">
      <CardHeader
        title="Contatos e Redes Sociais"
        subtitle="Como podemos encontrar sua empresa?"
      />
      <main>
        <FormInput
          id="emailContato"
          label="Email de contato da empresa"
          placeholder="contato@suaempresa.com"
          type="email"
          {...register("emailContato")}
          error={(errors as any).emailContato?.message}
          required={false}
        />
        <FormInput
          id="telefone"
          label="Telefone da empresa (Opcional)"
          type="tel"
          mask={"(99) 99999-9999"}
          {...register("telefone")}
          error={(errors as any).telefone?.message}
          required={false}
        />
        <FormInput
          id="website"
          label="Site da empresa"
          placeholder="https://suaempresa.com"
          type="url"
          {...register("website")}
          error={(errors as any).website?.message}
        />

        <div className="flex flex-col gap-3 mt-4">
          <Button
            type="button"
            onClick={onNext}
            variant="oportune"
            className="w-full font-semibold transition-all hover:opacity-90 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#2474e4]/20 mt-2"
          >
            Continuar
          </Button>
          <Button
            type="button"
            onClick={onBack}
            variant="oportune_blank"
            className="w-full font-semibold transition-all hover:opacity-90 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#2474e4]/20 mt-2"
          >
            Voltar
          </Button>
        </div>
      </main>
    </div>
  );
}
