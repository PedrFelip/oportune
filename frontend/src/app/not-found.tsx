"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-[#0F172A]">
        <div className="w-1/3">
          <DotLottieReact src={"/404Error.lottie"} loop autoplay/>
        </div>
        <h1 className="text-white text-xl text-center">
          Desculpe, não conseguimos encontrar essa página :( <br />
          Tente voltar para a tela principal
        </h1>
        <Link
          className="mt-5 text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-xl"
          href={"/"}
        >
          Voltar para home
        </Link>
      </div>
    </>
  );
}
