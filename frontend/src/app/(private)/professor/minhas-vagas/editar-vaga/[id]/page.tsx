// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { useVaga } from "@/features/vagas/hooks/useVaga";
// import { EditarVagaForm } from "@/features/vagas/components/EditarVagaForm";
// import { editarVaga } from "@/features/vagas/api/editarVaga";
// import { useLoading } from "@/contexts/LoadingContext";
// import { showMessage } from "@/adapters/showMessage";

// export default function EditarVagaPage() {
//   const { id } = useParams();
//   const { vaga, loading, error } = useVaga(id as string);
//   const router = useRouter();
//   const { showLoading, hideLoading } = useLoading();

//   async function handleSubmit(data: any) {
//     showLoading();
//     try {
//       await editarVaga(id as string, data);
//       showMessage.success("Vaga atualizada com sucesso!");
//       router.push("/vagas"); // redireciona pra lista
//     } catch (err: any) {
//       showMessage.error(err.message || "Erro ao atualizar vaga");
//     } finally {
//       hideLoading();
//     }
//   }

//   if (loading) return <p className="text-white">Carregando...</p>;
//   if (error) return <p className="text-red-400">{error}</p>;

//   return (
//     <EditarVagaForm
//       vaga={vaga!}
//       onSubmit={handleSubmit}
//       onCancel={() => router.back()}
//     />
//   );
// }
