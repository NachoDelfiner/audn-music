import React from "react";
import logo from "../icons/logo-large.png";
import "../style/start.css";
import { Link } from "react-router-dom";
import video from "../videos/Vídeo sin título.mp4";
import apple from '../images/apple-logo.png'
import google from '../images/google-logo.png'
import { useState, useEffect } from "react";


const Start = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div
      className="start"
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      <div className="video-container">
        <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            minHeight: "100vh",
            objectFit: "cover",
          }}
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <section className="start-form">
        <section className="title-section">
          <img
            style={{ width: "200px", filter: "invert(100%)" }}
            src={logo}
            alt="Logo"
          />
          <h4 style={{ color: "white" }}>Música a tu medida</h4>
        </section>
        <section className="buttons-section">
          <Link style={{ textDecoration: "none" }} to="register">
            <button
              style={{ textDecoration: "none" }}
              className="register-button"
            >
              Registrarse Gratis
            </button>
          </Link>
          <button style={{ textDecoration: "none" }} className="link-buttons">
            <img style={{width:'20px'}} src={google} />  Continuar con Google
          </button>
          <button style={{ textDecoration: "none" }} className="link-buttons">
           <img style={{width:'20px'}} src={apple} />  Continuar con Apple
          </button>
          <Link style={{ textDecoration: "none" }} to="login">
            <button
              style={{ textDecoration: "none", marginTop: "40px" }}
              className="iniciar-button"
            >
              Iniciar Sesión
            </button>
          </Link>
        </section>
      </section>
    </div>
  );
};

export default Start;
