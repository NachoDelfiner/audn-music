import React from "react";
import "../style/musicacontextual.css";
import { Link } from "react-router-dom";
import leftArrow from "../icons/Vector (1).png";
import { useState, useEffect } from "react";

const Musicacontextual = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="musica-contextual">
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Link to="/home">
          <img style={{ width: "20px" }} src={leftArrow} />
        </Link>
        <h3 className="title">Música Contextual</h3>
      </section>

      <form className="contextual-form" action="">
        <section
          className="formA"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label className="header-1">¿Cuál es la ocación?</label>
          <select name="actividad">
            <option disabled value="">
              Actividad
            </option>
            <option value="ejercicio">Ejercicio Físico</option>
            <option value="limpieza">Limpieza</option>
            <option value="celebracion">Celebración</option>
            <option value="dormir">Dormir</option>
            <option value="meditar">Meditar</option>
            <option value="social">Social</option>
            <option value="estudiar">Estudiar</option>
            <option value="relajacion">Relajación</option>
            <option value="viajando">Viajando</option>
          </select>
        </section>

        <section
          className="formB"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label className="header-2">¿Cómo te sientes?</label>
          <select  name="">
            <option disabled value="">
              Estado de Ánimo
            </option>
            <option value="feliz">Feliz</option>
            <option value="equilibrio">Equilibrio</option>
            <option value="triste">Triste</option>
          </select>
        </section>

        <section
          className="formC"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label className="header-3">¿Cómo está el clima?</label>
          <select   name="">
            <option disabled value="">
              Clima
            </option>
            <option value="soleado">Soleado</option>
            <option value="lluvioso">LLuvioso</option>
            <option value="frio">Frío</option>
          </select>
        </section>

        <section
          className="formD"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label className="header-3">Selecciona 3 géneros</label>
          <select name="generos">
            <option disabled value="">
              Género
            </option>
            <option value="rock">Rock</option>
            <option value="country">Cumbia</option>
            <option value="soul">Pop</option>
            <option value="jazz">Reggae</option>
            <option value="blues">Reguetón</option>
            <option value="hiphop">Electrónica</option>
            <option value="pop">Urbano Latino</option>
            <option value="reggae">Hip-Hop</option>
          </select>
        </section>
        <button>Crear lista</button>
      </form>
    </div>
  );
};

export default Musicacontextual;
