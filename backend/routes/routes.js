const express = require("express");
require("dotenv").config();
const routes = express.Router();

/* valdiar nombre con express-validator */
const {
  validatorSongNameName,
  validatorSongNameId,
  validatorArtistNameName,
  validatorArtistNameId,
  filtersongid,
  validatorSongNameIdPlaylist,
} = require("../middleware/midvalidator");
/* Runners */
const {
  runValidateName,
  runValidateId,
  runValidateNameArtist,
  runValidateIdArtist,
  runValidateIdArtistFilter,
  runValidateIdPLaylistFilter,
} = require("../middleware/runners");
/* Validación previa a controller (middatabase) */
const {
  validateNameParams,
  validateIdParams,
  validateArtistNameParams,
  validateArtistIdParams,
  validateArtistIdParamsFilter,
  validateIdPlaylistParams,
} = require("../middleware/middatabase");
/* Controllers final */
const {
  getmusics,
  getartists,
  getusers,
  getplaylist,
  registroUsuario,
  loginUsuario,
  getSongName,
  getSongId,
  getArtistName,
  getArtistId,
  getArtistIdSong,
  getSongIdPlaylist,
} = require("../controllers/controller");

/* Obtener todos los datos básicos de las tablas */
routes.get("/songs", getmusics);
routes.get("/artists", getartists);
routes.get("/user", getusers);
routes.get("/playlist", getplaylist);

/* Registrarse e ingresar */
routes.post("/registro", registroUsuario);
routes.post("/login", loginUsuario);

/* Obtener cancion por params (name, id) */
routes.get(
  "/songname/:name",
  validatorSongNameName,
  runValidateName,
  validateNameParams,
  getSongName
);

routes.get(
  "/songid/:id",
  validatorSongNameId,
  runValidateId,
  validateIdParams,
  getSongId
);

/* Obtener Artista por params (name, id) */

routes.get(
  "/artistname/:name",
  validatorArtistNameName,
  runValidateNameArtist,
  validateArtistNameParams,
  getArtistName
);

routes.get(
  "/artistid/:id",
  validatorArtistNameId,
  runValidateIdArtist,
  validateArtistIdParams,
  getArtistId
);

/**********************/

routes.get(
  "/cancionporartista/:id_artist",
  filtersongid,
  runValidateIdArtistFilter,
  validateArtistIdParamsFilter,
  getArtistIdSong
);

/*********** obtener canción por id de playlist  ***********/

routes.get(
  "/songsidplaylist/:id_playlist",
  validatorSongNameIdPlaylist,
  runValidateIdPLaylistFilter,
  validateIdPlaylistParams,
  getSongIdPlaylist
);

module.exports = routes;
