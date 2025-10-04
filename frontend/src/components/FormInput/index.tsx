import React from "react";
import { useMask } from "@react-input/mask";

type InputAttributes = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "children"
>;

type FormInputProps = {
  id: string;
  name: string;
  label: string;
  mask?: string;
  error?: string;
} & InputAttributes;

export default function FormInput({
  id,
  label,
  mask,
  ...props
}: FormInputProps) {

  const inputRef = useMask({
    mask: mask || "", // Passe a máscara para o hook
    replacement: { _: /\d/ },
    showMask: true,
  });

  return (
    <div className="mb-3">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-[#c4d3e6]"
      >
        {label}
      </label>

      <input
        id={id}
        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[rgba(196,211,230,0.02)] text-white text-base transition-all focus:outline-none focus:border-[#2474e4] focus:ring-2 focus:ring-[#2474e4]/30"
        ref={inputRef}
        {...props}
      />
    </div>
  );
}
