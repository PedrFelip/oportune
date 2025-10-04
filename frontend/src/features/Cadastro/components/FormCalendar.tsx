"use client";

import React from "react";
import { Controller } from "react-hook-form";
import { format, isValid } from "date-fns";
import { ptBR } from "date-fns/locale"; // Bônus: Para formatar a data em português
import { Calendar } from "@/components/ui/calendar";
import { Control, Path } from "react-hook-form";
import { CadastroFormData } from "@/lib/schemas"; // Ajuste o caminho

interface FormDateProps {
  control: Control<CadastroFormData>;
  name: Path<CadastroFormData>;
  label?: string;
  placeholder?: string;
}

export function FormCalendar({
  control,
  name,
  label,
  placeholder,
}: FormDateProps) {
  return (
    <div className="mb-3">
      {label && (
        <label className="block mb-2 text-sm font-medium text-[#c4d3e6]">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          const dateValue =
            field.value &&
            typeof field.value === "string" &&
            isValid(new Date(field.value))
              ? new Date(field.value)
              : undefined;

          return (
            <div>
              <Calendar
                mode="single"
                selected={dateValue}
                onSelect={(date) => {
                  const dateString = date
                    ? format(date, "yyyy-MM-dd")
                    : undefined;
                  field.onChange(dateString);
                }}
                className="rounded-md border border-white/10 shadow-sm w-full"
                locale={ptBR}
                fromYear={1950}
                toYear={new Date().getFullYear() - 16}
              />
              <div className="text-xs text-[#c4d3e6] mt-1">
                {dateValue
                  ? format(dateValue, "dd 'de' MMMM 'de' yyyy", {
                      locale: ptBR,
                    })
                  : placeholder || "Selecione uma data"}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
