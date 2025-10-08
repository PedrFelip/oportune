import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="font-sans text-slate-300 bg-gradient-to-b from-[#0c1a2c] to-[#15223c] min-h-screen flex items-center justify-center p-5 relative">
      <div className="w-full max-w-md">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/5 backdrop-blur-xl">
          {children}
        </div>
      </div>
      {/* Page Footer */}
      <footer className="absolute bottom-5 text-center text-xs text-slate-600 w-full">
        © Oportune — 2025 |{" "}
        <Link
          href={"/"}
          className="text-slate-600 hover:text-slate-400 hover:underline transition-colors duration-300"
        >
          Voltar para o início
        </Link>
      </footer>
    </div>
  );
}
