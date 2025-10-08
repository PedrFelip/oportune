import NotFound from "@/app/not-found";
import { RecuperarSenha } from "@/features/RecuperarSenha/RecuperarSenha";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return <NotFound />;
  }

  return <RecuperarSenha token={token} />;
}
