'use client'

import Image from "next/image";
import Logo from "../../assets/logo_oportune.png"

// type HeaderProps = {
//   children: React.ReactNode;
// };

export function Header() {
  return (
    <header className="text-center mb-7">
      <div className="flex justify-center items-center gap-3 font-bold mb-4">
        <Image src={Logo} alt="Logo da empresa" width={60}/>
        <span className="text-2xl text-white">Oportune</span>
      </div>
      <h1 className="text-2xl font-bold text-white">Acesse sua conta</h1>
      <p className="text-sm text-slate-400 mt-1.5">
        Bem-vindo de volta! Insira seus dados.
      </p>
    </header>
  );
}
