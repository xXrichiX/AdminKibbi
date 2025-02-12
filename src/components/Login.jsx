import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { setIsAuthenticated, setUser } = useContext(Context);
  const navigateTo = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  // Función de inicio de sesión
  const handleLogin = async (data) => {
    await axios
      .post("http://localhost:4000/api/v1/user/login", data, { // Aquí puedes cambiar la URL para que apunte al backend que se desee
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success(res.data.message); // Mensaje de éxito
        setIsAuthenticated(true);
        setUser(res.data.user);
        navigateTo("/"); // Redirigir a la página principal
      })
      .catch((error) => {
        toast.error(error.response.data.message); // Mensaje de error
      });
  };

  return (
    <>
      <form
        className="auth-form"
        onSubmit={handleSubmit((data) => handleLogin(data))}
      >
        <h2>Iniciar sesión</h2> {/* Título en español */}
        
        <input
          type="email"
          placeholder="Correo electrónico" // Texto en español
          required
          {...register("email")}
        />
        <input
          type="password"
          placeholder="Contraseña" // Texto en español
          required
          {...register("password")}
        />
        
        <p className="forgot-password">
          <Link to={"/password/forgot"}>¿Olvidaste tu contraseña?</Link> {/* Enlace en español */}
        </p>
        
        <button type="submit">Iniciar sesión</button> {/* Botón en español */}
      </form>
    </>
  );
};

export default Login;
