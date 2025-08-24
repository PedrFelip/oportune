import React from "react";

export default function Forminput({id, name, label, type = "text", placeholder, required = true}) {
  return (
    <div className="mb-3">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-[#c4d3e6]"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[rgba(196,211,230,0.02)] text-white text-base transition-all focus:outline-none focus:border-[#2474e4] focus:ring-2 focus:ring-[#2474e4]/30"
        required={required}
        style={{
          WebkitAppearance: "none"
        }}
      />
    </div>
  );
}
