import React from "react";

export default function FormSelect({
  id,
  name,
  label,
  required = true,
  options,
}) {
  return (
    <div className="mb-3">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-[#c4d3e6]"
      >
        {label}
      </label>
      <select
        name={name}
        id={id}
        required={required}
        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[rgba(196,211,230,0.02)] text-white text-base transition-all focus:outline-none focus:border-[#2474e4] focus:ring-2 focus:ring-[#2474e4]/30"
      >
        {options &&
          options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-[rgba(196,211,230,0.02)] text-white text-base transition-all focus:outline-none focus:border-[#2474e4] focus:ring-2 focus:ring-[#2474e4]/30"
            >
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
}
