import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
// import Register from "../pages/auth/Register";
import Cadastro from "../pages/auth/cadastro";
import Confirmacao from "../pages/auth/confirmacao";
import Dashboard from "../pages/aluno/Dashboard";
import Vagas from "../pages/aluno/Vagas";
import { useAuth } from "../contexts/AuthContext.jsx";

function ProtectedRoute({ children, requireRole }) {
  const { usuario, carregando } = useAuth();
  if (carregando) return null; // pode exibir um spinner se desejar
  if (!usuario) return <Navigate to="/login" />;
  if (requireRole && usuario?.tipo !== requireRole) return <Navigate to="/" />;
  return children;
}

const AppRoutes = () => {
  const redirectToHome = <Navigate to="/" />;

  return (
    <Router>
      <Routes>
        {/* Página principal */}
        <Route path="" element={<Home />} />

        {/* Paginas de login */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/confirmacao" element={<Confirmacao />} />

        {/* Rotas protegidas do aluno */}
        <Route
          path="/aluno/dashboard"
          element={
            <ProtectedRoute requireRole="ESTUDANTE">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/aluno/vagas"
          element={
            <ProtectedRoute requireRole="ESTUDANTE">
              <Vagas />
            </ProtectedRoute>
          }
        />

        {/* Rota Genérica */}
        <Route path="*" element={redirectToHome} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
