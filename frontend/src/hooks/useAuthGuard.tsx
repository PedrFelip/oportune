import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext.jsx';

export function useAuthGuard(options = { redirectTo: '/login', requireRole: "" }) {
  const { usuario, carregando } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (carregando) return;
    if (!usuario) {
      router.replace(options.redirectTo || '/login');
      return;
    }
    if (options.requireRole && usuario?.tipo !== options.requireRole) {
      router.replace('/');
    }
  }, [usuario, carregando, router, options.redirectTo, options.requireRole]);

  return { usuario, carregando };
}