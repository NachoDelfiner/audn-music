import React from "react";
import "../style/buscar.css";
import getallSongs from "../services/getallsongs";
import { useState, useEffect } from "react";
import musics from "../data/musicas";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

const Buscar = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [loading, setLoading] = useState(true);
  const [keyword, setkeyword] = useState("");
  const [songs, setsongs] = useState([]);
  const [allsongs, setallsongs] = useState([]);
  const [valuetop, setvaluetop] = useState("");

  useEffect(() => {
    setLoading(true);
    getallSongs()
      .then((response) => {
        if (response.status === 200) {
          const musics = response.data.musics;
          setsongs(musics);
          setallsongs(musics);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const search = (e) => {
    const value = e.target.value.toLowerCase().trim();
    setkeyword(value);
    if (value === "") {
      setsongs(allsongs);
      setvaluetop("Todas las músicas");
    } else {
      const filtered = allsongs.filter((x) => {
        return x.name.toLowerCase().includes(value);
      });
      setsongs(filtered);
      setvaluetop("Filtrado");
    }
  };

  const filtertop = () => {
    const filter = songs.filter((x) => {
      return x.id <= 10;
    });
    setsongs(filter);
    setvaluetop("Top 10");
  };

  const filterAll = () => {
    setsongs(allsongs);
    setvaluetop("Todas las músicas");
  };

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "red",
    },
    "& .MuiRating-iconHover": {
      color: "red",
    },
  });

  const getmusicid = (id) => {
    const musica = musics.find((x) => x.id === id);
    return musica ? musica.image : "";
  };

  return (
    <div className="buscarBody">
      <h2>Buscador</h2>
      <section className="search-section">
        <input value={keyword} onChange={search} placeholder="Busca ahora" />
      </section>
      <section className="music-list">
        <section
          style={{
            display: "flex",
            gap: "5px",
            justifyContent: "center",
            width: "100%",
            padding: "10px",
            alignItems: "center",
          }}
        >
          <button className="button-filter" onClick={filtertop}>
            Mostrar Top 10
          </button>
          <button className="button-filter" onClick={filterAll}>
            Mostrar todas
          </button>
        </section>
        <h4>{valuetop || "Todas las músicas"}</h4>
        <section className="musics">
          {loading ? (
            Array.from({ length: 100 }).map((x, i) => (
              <section className="music-box" key={i}>
                <Skeleton variant="rectangular" width={140} height={140} />
                <Skeleton width="60%" />
                <Skeleton width="40%" />
              </section>
            ))
          ) : songs.length > 0 ? (
            songs.map((x, i) => (
              <section className="music-box" key={i}>
                <Link to={`/buscar/${x.id}`}>
                  <img
                    style={{ width: "140px", cursor: "pointer" }}
                    src={getmusicid(x.id)}
                    alt={x.name}
                  />
                </Link>
                <StyledRating
                  name="customized-color"
                  defaultValue={0}
                  getLabelText={() => "1 Heart"}
                  max={1}
                  icon={<FavoriteIcon fontSize="inherit" />}
                  emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                />
                <p className="song-name">{x.name}</p>
                <p className="artist-name">{x.artist}</p>
              </section>
            ))
          ) : (
            <section
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Alert
                severity="warning"
                variant="filled"
              >
                <AlertTitle>No hay resultados</AlertTitle>
              </Alert>
            </section>
          )}
        </section>
      </section>
    </div>
  );
};

export default Buscar;
