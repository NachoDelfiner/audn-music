import React, { useState, useEffect, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import "../style/cupido.css";
import like from "../icons/like.png";
import reload from "../icons/btn-rewind.png";
import pass from "../icons/pass.png";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Link } from "react-router-dom";
import leftArrow from "../icons/Vector (1).png";

const db = [
  {
    id: 1,
    src: "/public/borisbrejcha.jpg",
    alt: "Image 2",
    name: "Boris Brejcha",
  },
  {
    id: 2,
    src: "/public/badbunny.jpg",
    alt: "Image 1",
    name: "Bad Bunny",
  },
  {
    id: 3,
    src: "/public/bobmarley.jpg",
    alt: "Image 2",
    name: "Bod Marley",
  },
  {
    id: 4,
    src: "/public/bzrp.jpg",
    alt: "Image 2",
    name: "Bzrp",
  },
  {
    id: 5,
    src: "/public/Joris_Voorn.jpg",
    alt: "Image 2",
    name: "Joris Voorn",
  },
  {
    id: 6,
    src: "/public/lavela.jpg",
    alt: "Image 2",
    name: "La Vela",
  },
  {
    id: 7,
    src: "/public/ntvg.jpg",
    alt: "Image 2",
    name: "NTVG",
  },
  {
    id: 8,
    src: "/public/shakira.jpg",
    alt: "Image 2",
    name: "Shakira",
  },
  {
    id: 9,
    src: "/public/thelaplanta.jpg",
    alt: "Image 2",
    name: "The la Planta",
  },
  {
    id: 10,
    src: "/public/snoopdogg.jpg",
    alt: "Image 2",
    name: "Snoop Dogg",
  },
];

function Advanced() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);
  const [show, setshow] = useState(true);
  const [valuelike, setvaluelike] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    if (idx <= 0 && lastDirection !== "right") {
      setshow(false);
      setvaluelike('')
    }
  };

  const swipe = async () => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe("left");
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
    setshow(true);
  };

  return (
    <div className="cupido">
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />
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
        <h3 className="title">Cupido Musical</h3>
      </section>
      <div className="cardContainer artist">
        {show ? (
          db.map((character, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              style={{ backgroundImage: "url(" + character.src + ")" }}
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name, index)}
              onCardLeftScreen={() => outOfFrame(character.name, index)}
            >
              <div
                style={{ backgroundImage: "url(" + character.src + ")" }}
                className="card"
              ></div>
              <h3>{character.name}</h3>
            </TinderCard>
          ))
        ) : (
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <p style={{ fontWeight: "bold" }}>
              No quedan mas artistas,vuelve al inicio o ...{" "}
            </p>
            <Link style={{ textDecoration: "none" }} to="/home/contextual">
              <button
                style={{ textDecoration: "none" }}
                className="crear-button"
              >
                Crea tu Lista
              </button>
            </Link>
            <p style={{ fontWeight: "bold" }}>
              Tus artistas favoritos te esperan
            </p>
            <AvatarGroup total={10}>
              <Avatar src="/public/badbunny.jpg" />
              <Avatar src="/public/bobmarley.jpg" />
              <Avatar src="/public/borisbrejcha.jpg" />
              <Avatar src="/public/Joris_Voorn.jpg" />
              <Avatar src="/public/lavela.jpg" />
              <Avatar src="/public/ntvg.jpg" />
              <Avatar src="/public/shakira.jpg" />
              <Avatar src="/public/snoopdogg.jpg" />
              <Avatar src="/public/thelaplanta.jpg" />
            </AvatarGroup>
          </section>
        )}
      </div>
    { show ? ( <div className="buttons">
        <img
          style={{ cursor: "pointer", height: "70px" }}
          onClick={() => {
            swipe("left");
            setvaluelike("Pass !");
          }}
          src={pass}
        />
        <img
          style={{ cursor: "pointer", height: "70px" }}
          onClick={() => {
            goBack();
            setvaluelike("");
          }}
          src={reload}
        />
        <img
          style={{ cursor: "pointer", height: "70px" }}
          onClick={() => {
            swipe("right");
            setvaluelike("Like !");
          }}
          src={like}
        />
      </div>) : (<p></p>)}
      {lastDirection ? (
        <h2>{valuelike}</h2>
      ) : (
        <h2 className="infoText">Desliza!</h2>
      )}
    </div>
  );
}

export default Advanced;
