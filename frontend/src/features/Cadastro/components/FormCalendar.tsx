"use client";

import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface FormDateProps {
  label?: string;
  name: string;
  value?: Date;
  onChange: (name: string, date: Date | undefined) => void;
  placeholder?: string;
}

export function FormDate({ label, name, value, onChange, placeholder }: FormDateProps) {
  return (
    <div className="mb-3">
      {label && (
        <label className="block mb-2 text-sm font-medium text-[#c4d3e6]">
          {label}
        </label>
      )}
      <Calendar
        mode="single"
        selected={value}
        onSelect={(date) => onChange(name, date)}
        className="rounded-md border border-white/10 shadow-sm w-full"
        captionLayout="dropdown"
      />
      <div className="text-xs text-[#c4d3e6] mt-1">
        {value ? format(value, "dd/MM/yyyy") : placeholder || "Selecione uma data"}
      </div>
    </div>
  );
}
