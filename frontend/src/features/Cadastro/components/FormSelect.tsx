import React from "react";
import { Controller, Control, Path } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CadastroFormData } from "@/lib/schemas";

type Option<T> = {
  value: T;
  label: string;
};

interface FormSelectProps {
  control: Control<CadastroFormData>;
  name: Path<CadastroFormData>;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Option<any>[];
  label?: string;
  placeholder?: string;
}

export function FormSelect({
  control,
  name,
  options,
  label,
  placeholder,
}: FormSelectProps) {
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render={({ field, fieldState: { error } }) => (
          <>
            <Select
              onValueChange={field.onChange}
              value={field.value ? String(field.value) : ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem key={String(opt.value)} value={String(opt.value)}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}
      />
    </div>
  );
}