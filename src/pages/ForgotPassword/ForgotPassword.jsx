import React, { useContext, useState } from "react";
import "../styles/ForgotPassword.css";
import { Context } from "../../main";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const { isAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");

  // Maneja el envío del correo para restablecer la contraseña
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:4000/api/v1/user/password/forgot",
        { email },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message); // Muestra mensaje de éxito
      })
      .catch((error) => {
        toast.error(error.response.data.message); // Muestra mensaje de error
      });
  };

  return (
    <>
      <div className="forgot-password-page">
        <div className="forgot-password-container">
          <h2>¿Olvidaste tu contraseña?</h2>
          <p>Ingresa tu dirección de correo electrónico para recibir un token de restablecimiento de contraseña.</p>
          <form
            onSubmit={handleForgotPassword}
            className="forgot-password-form"
          >
            <input
              type="email"
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="forgot-input"
            />
            <button type="submit" className="forgot-btn">
              Enviar enlace de restablecimiento
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
