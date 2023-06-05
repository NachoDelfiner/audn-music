import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import "../style/reproductor.css";
import { useParams } from "react-router-dom";
import getMusic from "../services/getsonng";
import { useState, useEffect } from "react";
import musics from "../data/musicas";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const WallPaper = styled("div")({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  overflow: "hidden",
  background: "",
  transition: "",
  "&:before": {
    content: '""',
    width: "140%",
    height: "140%",
    position: "absolute",
    top: "-40%",
    right: "-50%",
    background: "",
  },
  "&:after": {
    content: '""',
    width: "140%",
    height: "140%",
    position: "absolute",
    bottom: "-50%",
    left: "-30%",
    background: "",
    transform: "",
  },
});



const Widget = styled("div")(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: "100%",
  margin: "auto",
  position: "relative",
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.4)"
      : "rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)",
}));

const CoverImage = styled("div")({
  width: 100,
  height: 100,
  objectFit: "cover",
  overflow: "hidden",
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: "rgba(0,0,0,0.08)",
  "& > img": {
    width: "100%",
  },
});

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function MusicPlayerSlider() {
  const theme = useTheme();
  const duration = 200;
  const [position, setPosition] = React.useState(32);
  const [paused, setPaused] = React.useState(false);
  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }
  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";
  const lightIconColor =
    theme.palette.mode === "white"
      ? "rgba(255,255,255,0.4)"
      : "rgba(0,0,0,0.4)";

  const [music, setmusic] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getMusic(id)
      .then((response) => {
        if (response.status === 200) {
          setmusic(response.data.song);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const musicImg = (id) => {
    const imagen = musics.find((x) => x.id === id);
    return imagen ? imagen.image : "";
  };

  const nextSong = () => {
    getMusic(music.id + 1).then((response) => {
      if (music.id < 40) {
        setmusic(response.data.song);
        navigate(`/buscar/${response.data.song.id}`);
      }
    });
  };

  const prevSong = () => {
    getMusic(music.id - 1).then((response) => {
      if (music.id > 1) {
        setmusic(response.data.song);
        navigate(`/buscar/${response.data.song.id}`);
      }
    });
  };

  return (
    <Box className="reproductor">
      <h4 style={{ textAlign: "center", color: "white" }}>
        Búsquedas recientes
      </h4>
      {music ? (
        <Widget
          className="reproductor-box"
          sx={{
            background:
              "linear-gradient(68deg, rgba(196,196,194,1) 0%, rgba(255,255,255,1) 100%)",
            borderRadius: "0px 20px",
            width: "300px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CoverImage>
              <img
                className="image-song"
                alt={music.name}
                src={musicImg(music.id)}
              />
            </CoverImage>
            <Box sx={{ ml: 1.5, minWidth: 0 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={500}
              >
                {music.artist}
              </Typography>

              <Typography noWrap letterSpacing={-0.15}>
                {music.name}
              </Typography>
            </Box>
          </Box>
          <Slider
            aria-label="time-indicator"
            size="small"
            value={position}
            min={0}
            step={1}
            max={duration}
            onChange={(_, value) => setPosition(value)}
            sx={{
              color:
                theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
              height: 4,
              "& .MuiSlider-thumb": {
                width: 8,
                height: 8,
                transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                "&:before": {
                  boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: `0px 0px 0px 8px ${
                    theme.palette.mode === "dark"
                      ? "rgb(255 255 255 / 16%)"
                      : "rgb(0 0 0 / 16%)"
                  }`,
                },
                "&.Mui-active": {
                  width: 20,
                  height: 20,
                },
              },
              "& .MuiSlider-rail": {
                opacity: 0.28,
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: -2,
            }}
          >
            <TinyText>{formatDuration(position)}</TinyText>
            <TinyText>-{formatDuration(duration - position)}</TinyText>
          </Box>
          <Box
            className="play-section"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: -1,
            }}
          >
            <IconButton
              onClick={prevSong}
              disabled={music.id === 1}
              aria-label="previous song"
            >
              <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
            </IconButton>

            <IconButton
              aria-label={paused ? "play" : "pause"}
              onClick={() => setPaused(!paused)}
            >
              {paused ? (
                <PlayArrowRounded
                  sx={{ fontSize: "2rem" }}
                  htmlColor={mainIconColor}
                />
              ) : (
                <PauseRounded
                  sx={{ fontSize: "2rem" }}
                  htmlColor={mainIconColor}
                />
              )}
            </IconButton>

            <IconButton
              onClick={nextSong}
              disabled={music.id === 40}
              aria-label="next song"
            >
              <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
            </IconButton>
          </Box>
          <Stack
            className="volume-section"
            spacing={2}
            direction="row"
            sx={{ mb: 1, px: 1 }}
            alignItems="center"
          >
            <VolumeDownRounded htmlColor={lightIconColor} />
            <Slider
              aria-label="Volume"
              defaultValue={30}
              sx={{
                color:
                  theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
                "& .MuiSlider-track": {
                  border: "none",
                },
                "& .MuiSlider-thumb": {
                  width: 10,
                  height: 10,
                  backgroundColor: "#fff",
                  "&:before": {
                    boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                  },
                  "&:hover, &.Mui-focusVisible, &.Mui-active": {
                    boxShadow: "none",
                  },
                },
              }}
            />
            <VolumeUpRounded htmlColor={lightIconColor} />
          </Stack>
        </Widget>
      ) : (
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            width: "100%",
            heigth: "100%",
            minHeight: "100vh",
            paddingTop: "10px",
          }}
        >
          <CircularProgress color="success" />
        </section>
      )}
      <WallPaper />
    </Box>
  );
}
