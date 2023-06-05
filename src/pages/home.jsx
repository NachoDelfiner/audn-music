import React from "react";
import "../style/home.css";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import HistoryIcon from "@mui/icons-material/History";
import cupido from "../images/cupido.png";
import contextual from "../images/contextual.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import artistas from '../images/artistas.png'

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="home">
      <section className="home-menu">
        <section className="home-title-section">
          <h2>Música ya</h2>
          <section style={{ gap: "10px", display: "flex" }}>
            <NotificationsActiveIcon />
            <HistoryIcon />
          </section>
        </section>
        <section className="cupido-musical">


          <Link style={{textDecoration:'none'}} to='cupido' >
            <section
              style={{ textDecoration: "none" }}
              className="music-section uno"
            >
              <section
                className="a"
                style={{
                  backgroundImage: `url(${cupido})`,
                  backgroundSize: "cover",
                }}
              ></section>
              <section className="b">
                <h4>Cupido Musical</h4>
                <p>
                  Tus artistas favoritos nunca van a dejarte con el corazón
                  roto.
                </p>
              </section>
            </section>
          </Link>

          <Link style={{textDecoration:'none'}} to='contextual' >
            <section
              style={{ textDecoration: "none" }}
              className="music-section dos"
            >
              <section
                className="a"
                style={{
                  backgroundImage: `url(${contextual})`,
                  backgroundSize: "cover",
                }}
              ></section>
              <section className="b">
                <h4>Música Contextual</h4>
                <p>Creamos la playlist perfecta para cualquier situación.</p>
              </section>
            </section>
          </Link>

          <Link style={{textDecoration:'none'}} to='artistas' >
            <section
              style={{ textDecoration: "none" }}
              className="music-section uno"
            >
              <section
                className="a"
                style={{
                  backgroundImage: `url(${artistas})`,
                  backgroundSize: "cover",
                }}
              ></section>
              <section className="b">
                <h4>Artistas</h4>
                <p>Busca tus artistas preferidos en un instante</p>
              </section>
            </section>
          </Link>
        </section>
      </section>
    </div>
  );
};

export default Home;
