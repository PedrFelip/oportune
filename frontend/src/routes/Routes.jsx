import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import RegisterTest from "../pages/auth/RegisterTest";
import { FormProvider } from "../contexts/formContext";

const AppRoutes = () => {
  const redirectToHome = <Navigate to="/" />;

  return (
    <Router>
      <Routes>
        {/* Página principal */}
        <Route path="" element={<Home />} />

        {/* Paginas de login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registertext" element={
          <FormProvider>
            <RegisterTest />
          </FormProvider>
        } />

        {/* Rota Genérica */}
        <Route path="*" element={redirectToHome} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
