import { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Start from "./pages/start";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Perfil from "./pages/perfil";
import Buscar from "./pages/buscar";
import Notfound from "./pages/notfound";
import Cupido from "./pages/cupido";
import Musicacontextual from "./pages/musicacontextual";
import Layout from "./components/layout";
import MusicPlayerSlider from "./pages/reproductor.jsx";
import Artistas from "./pages/artistas";
import Artistdetail from "./pages/artistdetail";
import MusicPlayerSliderArtist from "./pages/reproductorartist";

function App() {
  const [logeado, setlogeado] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("token");
    if (session) {
      setlogeado(true);
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route
          path="login"
          element={<Login logeado={logeado} setlogeado={setlogeado} />}
        />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          {logeado ? (
            <>
              <Route path="home" element={<Home />} />
              <Route path="home/cupido" element={<Cupido />} />
              <Route path="home/contextual" element={<Musicacontextual />} />
              <Route path="home/artistas" element={<Artistas />} />
              <Route path="/home/artistas/:name" element={<Artistdetail />} />
              <Route path="buscar" element={<Buscar />} />
              <Route
                path="perfil"
                element={<Perfil logeado={logeado} setlogeado={setlogeado} />}
              />
              <Route path="/buscar/:id" element={<MusicPlayerSlider />} />
              <Route
                path="/home/artistas/:name/:idmusic"
                element={<MusicPlayerSliderArtist />}
              />
            </>
          ) : (
            <Route to="/login" />
          )}
        </Route>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
