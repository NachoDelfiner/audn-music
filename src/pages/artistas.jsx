import React from "react";
import "../style/artistas.css";
import getArtist from "../services/getartist";
import { useState, useEffect } from "react";
import artists from "../data/artistas";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";


const Artistas = () => {
  const [artistas, setartistas] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setloading(true);
    getArtist()
      .then((response) => {
        if (response.status === 200) {
          setartistas(response.data.artists);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setloading(false);
      });
  }, []);

  const getImg = (id) => {
    const art = artists.find((x) => x.id === id);
    return art ? art.image : "";
  };

  return (
    <div className="artistas-div">
      <h2>Artistas</h2>
      <section className="artist-list">
        {loading
          ? Array.from({ length: 100 }).map((x, i) => (
              <section className="artist-box" key={i}>
                <Skeleton variant="rectangular" width={100} height={100} />
                <Skeleton width="60%" />
                <Skeleton width="40%" />
              </section>
            ))
          : artistas.map((x, i) => (
              <section className="artist-box" key={i}>
                <Link to={`/home/artistas/${x.name}`}>
                  <img className="artist-imagen" src={getImg(x.id)} />
                </Link>
                <p className="artist-name">{x.name}</p>
              </section>
            ))}
      </section>
    </div>
  );
};

export default Artistas;
