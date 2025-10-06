export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="font-sans text-slate-300 bg-gradient-to-b from-[#0c1a2c] to-[#15223c] min-h-screen flex items-center justify-center p-5 relative">
      {children}
    </div>
  );
}


