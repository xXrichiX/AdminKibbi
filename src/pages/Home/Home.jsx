import { useContext } from "react";
import Hero from "../../components/ui/hero/Hero";
import Instructor from "../../components/ui/Instructor/Instructor";
import Technologies from "../../components/ui/Technologies/Technologies";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";
import { Navigate,} from "react-router-dom";
import Footer from "../../layout/Footer/Footer";
import { AuthContext } from "../../context/AuthContext";


const Home = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(AuthContext);

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
