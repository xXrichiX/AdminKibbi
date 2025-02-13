import { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./context/AuthContext";
import { getAdminId } from "./services/users/AdminService.js"; // Asumiendo que ya tienes este servicio

const App = () => {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          // Si hay token, obtenemos el adminId
          const adminId = getAdminId(); // Este servicio decodifica el token y obtiene el adminId
          
          // Si el adminId es válido, estamos autenticados
          setUser({ id: adminId });
          setIsAuthenticated(true);
        } catch (error) {
          // Si el token es inválido o ha expirado
          setUser(null);
          setIsAuthenticated(false);
          throw error;
        }
      } else {
        // Si no hay token, no estamos autenticados
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    checkAuth(); // Ejecutamos la comprobación de autenticación al iniciar

  }, [setIsAuthenticated, setUser]);

  return (
    <>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />

          {/* Rutas protegidas */}
          {/* Aquí se pueden agregar más rutas protegidas si es necesario */}
          {/* <Route path="/otp-verification/:email/:phone" element={<Verification />} /> */}
        </Routes>
        <ToastContainer theme="colored" />
      </Router>
    </>
  );
};

export default App;