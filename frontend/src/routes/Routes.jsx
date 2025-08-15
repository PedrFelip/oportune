import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";

const AppRoutes = () => {
    const redirectToHome = <Navigate to="/" />;

    return (
        <Router>
            <Routes>
                {/* Página principal */}
                <Route path="" element={<Home />} />

                {/* Paginas de login */}
                <Route path="/login" element={<Login />} />

                {/* Rota Genérica */}
                <Route path="*" element={redirectToHome} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
