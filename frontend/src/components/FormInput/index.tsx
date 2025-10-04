import React from "react";
import InputMask, { Props as InputMaskProps } from "react-input-mask";

type InputAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children'>;

type FormInputProps = {
  id: string;
  name: string;
  label: string;
  mask?: string;
} & InputAttributes;

export default function FormInput({
  id,
  name,
  label,
  mask,
  ...props
}: FormInputProps) {
  const propsComuns = {
    id: id,
    name: name,
    className:
      "w-full px-4 py-3 rounded-lg border border-white/10 bg-[rgba(196,211,230,0.02)] text-white text-base transition-all focus:outline-none focus:border-[#2474e4] focus:ring-2 focus:ring-[#2474e4]/30",
    ...props,
  };

  return (
    <div className="mb-3">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-[#c4d3e6]"
      >
        {label}
      </label>

      {mask ? (
        <InputMask mask={mask} {...propsComuns} />
      ) : (
        <input {...propsComuns} />
      )}
    </div>
  );
}