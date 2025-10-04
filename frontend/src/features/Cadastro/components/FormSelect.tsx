import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formDataState } from "../@types/type";

export type Option<T> = {
  value: T;
  label: string;
};

interface FormSelectProps<K extends keyof formDataState> {
  name: K;
  value: formDataState[K];
  options: Option<formDataState[K]>[];
  onChange: (name: K, selectedOption: formDataState[K]) => void;
  label?: string;
  placeholder?: string;
}

export function FormSelect<K extends keyof formDataState>({
  name,
  value,
  options,
  onChange,
  label,
  placeholder,
}: FormSelectProps<K>) {
  return (
    <div className="mb-3">
      {label && (
        <label className="block mb-2 text-sm font-medium text-[#c4d3e6]">
          {label}
        </label>
      )}
      <Select
        value={(value as string) || ""}
        onValueChange={(val) => onChange(name, val as formDataState[K])}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem
              key={String(opt.value)}
              value={(opt.value as string) || ""}
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
