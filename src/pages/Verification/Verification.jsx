import { useContext, useState } from "react";
import "../styles/Verification.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../../main";

const Verificacion = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleVerification = async (e) => {
    e.preventDefault();
    const data = { email, phone };

    await axios
      .post("http://localhost:4000/api/v1/user/verify", data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(true);
        setUser(res.data.user);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setIsAuthenticated(false);
        setUser(null);
      });
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="verification-page">
        <div className="verification-container">
          <h1>Verificación de Cuenta</h1>
          <p>Introduce tu correo electrónico y teléfono para verificar tu cuenta.</p>
          <form onSubmit={handleVerification} className="verification-form">
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="verification-input"
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="verification-input"
            />
            <button type="submit" className="verify-button">
              Verificar Cuenta
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Verificacion;
