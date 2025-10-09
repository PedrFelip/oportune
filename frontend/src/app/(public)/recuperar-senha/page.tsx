import NotFound from "@/app/not-found";
import { RecuperarSenha } from "@/features/RecuperarSenha/RecuperarSenha";

export default function Page({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token;

  if (!token) {
    return <NotFound />;
  }

  return <RecuperarSenha token={token} />;
}
