"use client";

import Image from "next/image";
import Logo from "../../assets/logo_oportune.png";

type HeaderProps = {
  title: string;
  description?: string;
};

export function AuthHeader({ title, description }: HeaderProps) {
  return (
    <header className="text-center mb-7">
      <div className="flex justify-center items-center gap-3 font-bold mb-4">
        <div className="bg-white rounded-2xl">
          <Image src={Logo} alt="Logo da empresa" width={50} />
        </div>
        <span className="text-2xl text-white">Oportune</span>
      </div>
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      <p className="text-sm text-slate-400 mt-1.5">{description}</p>
    </header>
  );
}
