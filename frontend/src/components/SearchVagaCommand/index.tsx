// "use client";

// import * as React from "react";
// import { Search, Briefcase } from "lucide-react";
// import {
//   CommandDialog,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import { Button } from "@/components/ui/button";
// import { Vaga } from "@/models/vaga";
// import { buscarVagas } from "@/features/Aluno/api/buscarVagas";
// import Link from "next/link";
// import { useAuth } from "@/contexts/AuthContext";

// export function SearchVagaCommand() {
//   const [open, setOpen] = React.useState(false);
//   const [searchValue, setSearchValue] = React.useState("");
//   const [vagas, setVagas] = React.useState<Vaga[]>([]);

//   const { usuario } = useAuth();

//   React.useEffect(() => {
//     const down = (e: KeyboardEvent) => {
//       if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
//         e.preventDefault();
//         setOpen((prev) => !prev);
//       }
//     };
//     document.addEventListener("keydown", down);
//     return () => document.removeEventListener("keydown", down);
//   }, []);

//   const carregarVagas = async () => {
//     try {
//       const vagasReq = await buscarVagas();
//       if (vagasReq === null) {
//         throw new Error("Falha na requisição");
//       }
//       // Extrai o array de vagas da resposta
//       const vagasArray = Array.isArray(vagasReq) ? vagasReq : vagasReq.dados || [];
//       setVagas(vagasArray);
//     } catch (error) {
//       console.error("Erro ao carregar vagas:", error);
//     }
//   };

//   React.useEffect(() => {
//     carregarVagas();
//   }, []);

//   // const handleSearch = () => {
//   //   console.log("Buscando vaga:", searchValue);
//   //   // 🔍 Lógica de busca aqui
//   //   setOpen(false);
//   // };

//   if (usuario?.tipo !== "ESTUDANTE") {
//     return null;
//   }

//   return (
//     <>
//       <Button
//         variant="outline"
//         className="cursor-pointer bg-blue-400 border-blue-400 hover:bg-blue-600 transition-colors duration-300"
//         onClick={() => setOpen(true)}
//       >
//         <Search className="mr-2 h-4 w-4" />
//         Buscar Vaga
//       </Button>

//       <CommandDialog
//         open={open}
//         onOpenChange={setOpen}
//         className="bg-[#263243] border border-white/10 rounded-lg shadow-lg"
//       >
//         <CommandInput
//           placeholder="Digite o nome da vaga..."
//           value={searchValue}
//           onValueChange={setSearchValue}
//           className="text-black placeholder:text-black/90 border-none focus:ring-0"
//         />
//         <CommandList className="max-h-64 overflow-y-auto">
//           <CommandEmpty className="text-gray-400 py-4 text-center">
//             Nenhum resultado encontrado.
//           </CommandEmpty>

//           <CommandGroup
//             heading="Vagas recentes"
//             className="text-[#c4d3e6] font-medium bg-slate-800"
//           >
//             {vagas.slice(0, 5).map((vaga) => (
//               <CommandItem
//                 key={vaga.id}
//                 className="text-white hover:bg-[#2474e4]/20 cursor-pointer px-4 py-2 rounded-md transition-colors"
//                 onSelect={() => {
//                   setSearchValue(vaga.titulo);
//                   setOpen(false);
//                 }}
//               >
//                 <Briefcase className="mr-2 h-4 w-4 text-[#2474e4]" />
//                 <span>
//                   <Link href={`/aluno/vagas/${vaga.id}`}>{vaga.titulo}</Link>
//                 </span>
//               </CommandItem>
//             ))}
//           </CommandGroup>
//         </CommandList>
//       </CommandDialog>
//     </>
//   );
// }
