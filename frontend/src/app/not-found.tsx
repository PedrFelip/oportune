import React from "react";
import Logo from "../assets/logo_oportune.png";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-[#0F172A]">
        <Image src={Logo} width={200} alt="" />
        <h1 className="text-white text-xl text-center">
          Desculpe, não conseguimos encontrar essa página :( <br />
          Tente voltar para a tela principal
        </h1>
        <div className="mt-5 text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-xl">
          <Link className="p-2" href={"/"}>Voltar para home</Link>
        </div>
      </div>
    </>
  );
}