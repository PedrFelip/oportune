import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export function useAuthGuard(options = { redirectTo: '/login', requireRole: null }) {
  const { usuario, carregando } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (carregando) return;
    if (!usuario) {
      navigate(options.redirectTo || '/login');
      return;
    }
    if (options.requireRole && usuario?.tipo !== options.requireRole) {
      navigate('/');
    }
  }, [usuario, carregando, navigate, options.redirectTo, options.requireRole]);

  return { usuario, carregando };
}
