import React from "react";
import CardHeader from "../components/CardHeader"; 
import FormInput from "@/components/FormInput";
import { FormSelect } from "../components/FormSelect";
import dados from "@/utils/informacoes.json";
import { StepProps } from "../@types/type";
import { Button } from "@/components/ui/button";
import { FormCalendar } from "../components/FormCalendar";

export function Step3_AditionalInfo({
  onNext,
  onBack,
  register,
  control,
  errors
}: StepProps) {

  return (
    <div className="animate-fadeIn">
      <CardHeader
        title="Informações adicionais"
        subtitle="Fale mais sobre você."
      />
      <main>
          <FormCalendar
            control={control}
            name="dataNascimento"
            label="Data de Nascimento"
            placeholder="Qual sua data de nascimento"
          />
          <FormSelect
            control={control}
            name="genero"
            label="Gênero"
            options={dados.genero}
          />
          <FormInput
            id="telefone"
            label="Número de telefone"
            placeholder="Digite seu número de telefone"
            type="tel"
            mask={"(__) _____-____"}
            {...register("telefone")}
            error={errors.telefone?.message}
          />
          <Button
            type="button"
            onClick={onNext}
            variant={"oportune"}
          >
            Continuar
          </Button>
          <Button
            type="button"
            onClick={onBack}
            variant={"oportune_blank"}
          >
            Voltar
          </Button>
      </main>
    </div>
  );
}
