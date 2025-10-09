import NotFound from "@/app/not-found";
import { ConfirmarEmail } from "@/features/ConfirmarEmail/ConfirmarEmail";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  const token = params.token;

  if (!token) {
    return <NotFound />;
  }

  return <ConfirmarEmail token={token} />;
}
