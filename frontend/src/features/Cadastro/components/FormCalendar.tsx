/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { Controller, Field, FieldValues } from "react-hook-form";
import { format, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

// Importações dos componentes de UI
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Control, Path } from "react-hook-form";
import { CadastroFormData } from "@/lib/schemas";
import { cn } from "@/lib/utils";

interface FormCalendarProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
}

export function FormCalendar<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: FormCalendarProps<T>) {
  const [open, setOpen] = useState(false);

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
              ? new Date(`${field.value}T00:00:00`)
              : undefined;

          return (
            <div>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal px-4 py-6 text-base", // Aumentei o py para 6 para corresponder ao seu py-3.5
                      "border border-white/10 bg-[rgba(196,211,230,0.02)] text-white",
                      "hover:bg-[rgba(196,211,230,0.04)] hover:text-white", // Efeito hover
                      "focus:border-[#2474e4] focus:ring-2 focus:ring-[#2474e4]/30",
                      !dateValue && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateValue ? (
                      format(dateValue, "PPP", { locale: ptBR }) // 'PPP' é um formato amigável, ex: "4 de out. de 2025"
                    ) : (
                      <span>{placeholder || "Selecione uma data"}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateValue}
                    onSelect={(date) => {
                      const dateString = date
                        ? format(date, "yyyy-MM-dd")
                        : undefined;
                      field.onChange(dateString);
                      setOpen(false);
                    }}
                    locale={ptBR}
                    fromYear={1950}
                    toYear={new Date().getFullYear() - 16}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
            </div>
          );
        }}
      />
    </div>
  );
}
