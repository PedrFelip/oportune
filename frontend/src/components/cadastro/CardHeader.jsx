import React from "react";

export default function CardHeader({showLogo = false, title, subtitle}) {
  return (
    <header className="text-center mb-7">
      {showLogo && (
        <div className="flex justify-center items-center gap-3 font-bold mb-4">
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#2474e4] to-[#639bec] flex items-center justify-center shadow-lg font-extrabold text-white text-xl">
            O
          </div>
        </div>
      )}
      <h1 className="text-white text-2xl font-bold">{title}</h1>
      <p className="text-sm text-[#c4d3e6] mt-1.5">{subtitle}</p>
    </header>
  );
}
