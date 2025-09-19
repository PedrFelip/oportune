import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Cadastro from "../pages/auth/cadastro";
import Confirmacao from "../pages/auth/confirmacao";
import Dashboard from "../pages/aluno/Dashboard";
import Vagas from "../pages/aluno/Vagas";
import Template from "../components/dashboard/geral/Template.jsx";
import { Vaga } from "@/pages/aluno/Vaga.jsx";
import { NotFound } from "@/pages/NotFound/index.jsx";

function ProtectedRoute({ children, requireRole }) {
  const { usuario, carregando } = useAuth();
  if (carregando) {
    return null; // pode exibir um spinner se desejar
  }
  if (!usuario) {
    return <Navigate to="/login" />;
  }
  if (requireRole && usuario?.tipo !== requireRole) {
    return <Navigate to="/" />;
  }
  return children;
}

const AppRoutes = () => {
  return (
    <>
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
              <Template>
                <Dashboard />
              </Template>
            </ProtectedRoute>
          }
        />
        <Route
          path="/aluno/vagas"
          element={
            <ProtectedRoute requireRole="ESTUDANTE">
              <Template title={"Oportunidades"}>
                <Vagas />
              </Template>
            </ProtectedRoute>
          }
        />
        <Route path="/aluno/vagas/:id" element={<Vaga />} />
        {/* Rota Genérica */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
