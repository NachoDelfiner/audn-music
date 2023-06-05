import React, { useEffect, useState } from "react";
import "../style/perfil.css";
import setting from "../icons/setting.png";
import perfil from "../icons/icons8-avatar-67.png";
import { useNavigate } from "react-router-dom";

const Perfil = ({ logeado, setlogeado }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const [email, setemail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");
    setemail(email);
  }, []);

  const exit = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setlogeado(false);
    navigate("/");
  };

  return (
    <div className="profileBody">
      <button onClick={exit} className="exit-button">
        Salir
      </button>
      <img style={{ borderRadius: "50%", width: "80px" }} src={perfil} />
      <h4>{email}</h4>
      <section className="playlist-section">
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{fontSize:'14px'}} >Playlists</p>
          <button className="crearplaylist-button">Crear playlist</button>
        </section>
        
      </section>
    </div>
  );
};

export default Perfil;
