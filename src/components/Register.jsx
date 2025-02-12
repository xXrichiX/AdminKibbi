import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const { isAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    data.phone = `+92${data.phone}`; // Asegúrate de ajustar el código del país según sea necesario
    await axios
      .post("http://localhost:4000/api/v1/user/register", data, { // Cambia esta URL para conectar con tu backend
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        toast.success(res.data.message); // Mensaje de éxito
        navigateTo(`/otp-verification/${data.email}/${data.phone}`); // Redirigir a la verificación de OTP
      })
      .catch((error) => {
        toast.error(error.response.data.message); // Mensaje de error
      });
  };

  return (
    <>
      <div>
        <form
          className="auth-form"
          onSubmit={handleSubmit((data) => handleRegister(data))}
        >
          <h2>Registrarse</h2> {/* Título en español */}
          
          <input
            type="text"
            placeholder="Nombre" // Texto en español
            required
            {...register("name")}
          />
          <input
            type="email"
            placeholder="Correo electrónico" // Texto en español
            required
            {...register("email")}
          />
          <div>
            <span>+92</span>
            <input
              type="number"
              placeholder="Teléfono" // Texto en español
              required
              {...register("phone")}
            />
          </div>
          <input
            type="password"
            placeholder="Contraseña" // Texto en español
            required
            {...register("password")}
          />
          
          <div className="verification-method">
            <p>Seleccionar método de verificación</p> {/* Texto en español */}
            <div className="wrapper">
              <label>
                <input
                  type="radio"
                  name="verificationMethod"
                  value={"email"}
                  {...register("verificationMethod")}
                  required
                />
                Correo electrónico {/* Texto en español */}
              </label>
              <label>
                <input
                  type="radio"
                  name="verificationMethod"
                  value={"phone"}
                  {...register("verificationMethod")}
                  required
                />
                Teléfono {/* Texto en español */}
              </label>
            </div>
          </div>
          <button type="submit">Registrarse</button> {/* Botón en español */}
        </form>
      </div>
    </>
  );
};

export default Register;
