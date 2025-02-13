import  { useContext } from "react";
import "./Hero.css";
import { AuthContext } from "../../../context/AuthContext";

const Hero = () => {
  // const { user } = 
  useContext(AuthContext);
  return (
    <>
      <div className="hero-section">
        {/* Aquí va tu contenido */}
      </div>
    </>
  );
};

export default Hero;
