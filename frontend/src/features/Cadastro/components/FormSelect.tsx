import React from "react";
import { Controller, Control, Path, FieldValues } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option<T> = {
  value: T;
  label: string;
};

interface FormSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Option<any>[];
  label?: string;
  placeholder?: string;
}

export function FormSelect<T extends FieldValues>({
  control,
  name,
  options,
  label,
  placeholder,
}: FormSelectProps<T>) {
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
              <SelectTrigger className="w-full border border-white/10 bg-[rgba(196,211,230,0.02)] focus:outline-none focus:border-[#2474e4] focus:ring-2 focus:ring-[#2474e4]/30">
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
