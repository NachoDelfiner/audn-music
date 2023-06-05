import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getArtistDetail from "../services/getdetartis";
import CircularProgress from "@mui/material/CircularProgress";
import "../style/artistdetail.css";
import artists from "../data/artistas";
import { Link } from "react-router-dom";
import leftArrow from "../icons/Vector (1).png";
import getSongsbyArtistId from "../services/getsongidartist";
import musics from "../data/musicas";
import Skeleton from "@mui/material/Skeleton";
import puntos from "../icons/puntos.png";
import audenlogo from "../icons/a.png";
import verified from "../icons/verified.png";
import share from "../icons/share.png";
import time from "../icons/reload.png";
import play from "../icons/Vector (3).png";
import copy from "../icons/copy.png";

const Artistdetail = () => {
  const { name } = useParams();
  const [artista, setartista] = useState(null);
  const [allsongs, setallsongs] = useState([]);
  const [id, setid] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getArtistDetail(name)
      .then((response) => {
        if (response.status === 200) {
          setartista(response.data.artist);
          setid(response.data.artist.id);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, [name]);

  useEffect(() => {
    setloading(true);
    if (id) {
      getSongsbyArtistId(id)
        .then((response) => {
          if (response.status === 200) {
            setallsongs(response.data.songs);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setloading(false);
        });
    }
  }, [id]);

  const getImgDetail = (id) => {
    const img = artists.find((x) => x.id === id);
    return img ? img.image : "";
  };

  const getImgSong = (id) => {
    const imagen = musics.find((x) => x.id === id);
    return imagen ? imagen.image : "";
  };

  return (
    <div className="artist-detail">
      {artista ? (
        <section className="detail-box-artist">
          <section
            style={{
              display: "flex",
              gap: "5px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/home/artistas">
              <img style={{ width: "15px", padding: "10px" , filter:'invert(100%)' }} src={leftArrow} />
            </Link>
            <p style={{ fontWeight: "bold" }}>ir atrás</p>
          </section>
          <img className="avatar-artist" src={getImgDetail(artista.id)} />
          <h4>{artista.name}</h4>
          <section
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <section style={{ gap: "5px", display: "flex" }}>
              <img style={{ width: "15px", height: "15px", filter:'invert(100%)' }} src={audenlogo} />
              <img style={{ width: "15px", height: "15px",  }} src={verified} />
              <img style={{ width: "15px", height: "15px", filter:'invert(100%)' }} src={share} />
            </section>
            <section style={{display:'flex', gap:'5px', justifyContent:'center', alignItems:'center'}} >
              <p>minutes</p>
              <img style={{ width: "15px",height:'15px' ,filter:'invert(100%)' }} src={time} />
            </section>
          </section>
          <section
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <section
              style={{
                gap: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img style={{ width: "14px", height: "19px", filter:'invert(100%)' }} src={copy} />
              <p style={{ fontWeight: "bold" }}>Crear copia</p>
            </section>
            <section>
              <p></p>
              <img style={{ width: "35px", cursor: "pointer" }} src={play} />
            </section>
          </section>
        </section>
      ) : (
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            paddingTop: "50px",
            width: "100%",
            heigth: "100%",
            minHeight: "100vh",
          }}
        >
          <CircularProgress color="success" />
        </section>
      )}
      <div className="musics-artist">
        {!loading
          ? allsongs.map((x, i) => (
              <section className="div-music" key={i}>
                <Link to={`/home/artistas/${name}/${x.id}`}>
                  <img src={getImgSong(x.id)} />
                </Link>
                <section
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    paddingLeft: "10px",
                    width: "100%",
                  }}
                >
                  <p>{x.name}</p>
                  <p style={{ fontSize: "9px" }}>
                    {x.artist}
                  </p>
                </section>
                <section
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img style={{ width: "3px", filter:'invert(100%)' }} src={puntos} />
                </section>
              </section>
            ))
          : Array.from({ length: 100 }).map((x, i) => (
              <section className="music-artist-song" key={i}>
                <Skeleton variant="rectangular" width={100} height={100} />
                <Skeleton width="40%" />
              </section>
            ))}
      </div>
    </div>
  );
};

export default Artistdetail;
