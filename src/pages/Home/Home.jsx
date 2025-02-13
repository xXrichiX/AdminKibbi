import React, { useContext } from "react";
import Hero from "../components/ui/Hero/Hero";
import Instructor from "../components/ui/Instructor";
import Technologies from "../components/ui/Technologies";
import "../styles/Home.css";
import { toast } from "react-toastify";
import axios from "axios";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../layout/Footer/Footer";

const Home = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  const logout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setUser(null);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.error(err);
      });
  };

  if (!isAuthenticated) {
    return <Navigate to={"/auth"} />;
  }

  return (
    <>
      <section className="home">
        <Hero />
        <Instructor />
        <Technologies />
        <Footer />
        <button onClick={logout}>Cerrar sesión</button>
      </section>
    </>
  );
};

export default Home;
