const knex = require("../config/knex");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getmusics = async (req, res) => {
  try {
    const resultado = await knex.select("*").from("songs");
    res.status(200).json({
      musics: resultado,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.getartists = async (req, res) => {
  try {
    const resultado = await knex.select("*").from("artist");
    res.status(200).json({
      artists: resultado,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.getusers = async (req, res) => {
  try {
    const resultado = await knex.select("*").from("user");
    res.status(200).json({
      users: resultado,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.getplaylist = async (req, res) => {
  try {
    const resultado = await knex.select("*").from("playlist");
    res.status(200).json({
      playlists: resultado,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

/******************************/

/* Registro funciona */
exports.registroUsuario = async (req, res) => {
  const { id_usuario, name, email_uni, password } = req.body;
  const userExists = await knex("user").where({ email_uni: email_uni }).first();
  if (userExists) {
    return res
      .status(400)
      .json({ error: "Ya existe un usuario registrado con el mismo correo o pin" });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordEncrypt = await bcrypt.hash(password, salt);
  try {
    const resultado = await knex("user").insert({
      id_usuario: id_usuario,
      name: name,
      email_uni: email_uni,
      password: passwordEncrypt,
    });
    res.status(200).json({ message: "Se ha registrado el usuario" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Ha ocurrido un error al registrar el usuario" });
  }
};

/* Logearse funciona */
exports.loginUsuario = async (req, res) => {
  const { email_uni, password } = req.body;
  knex("user")
    .where({ email_uni: email_uni })
    .then(async (resultado) => {
      if (!resultado.length) {
        res.status(404).json({
          error: "El usuario con ese email no se encuentra registrado",
        });
        return;
      }
      const validatePassword = await bcrypt.compare(
        password,
        resultado[0].password
      );
      if (!validatePassword) {
        res.status(400).json({
          error: "Email y/o contraseña inválido",
        });
        return;
      }

      const token = jwt.sign(
        {
          email_uni: resultado[0].email_uni,
          password: resultado[0].password,
        },
        process.env.TOKEN_SECRET || "clave"
      );
      res.status(200).json({
        message: "El usuario se ha logeado correctamente",
        token: token,
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

/* Obtener canción por nombre e id */

exports.getSongName = async (req, res) => {
  try {
    const result = await knex.select("*").from("songs");
    const name = req.params.name;
    const nameArtist = result.find((x) => {
      return x.name === name;
    });
    res.status(200).json({
      song: nameArtist,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.getSongId = async (req, res) => {
  try {
    const result = await knex.select("*").from("songs");
    const id = Number(req.params.id);
    const idartist = result.find((x) => {
      return x.id === id;
    });
    res.status(200).json({
      song: idartist,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

/***************************************************** */
exports.getArtistName = async (req, res) => {
  try {
    const result = await knex.select("*").from("artist");
    const name = req.params.name;
    const nameArtist = result.find((x) => {
      return x.name === name;
    });
    res.status(200).json({
      artist: nameArtist,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.getArtistId = async (req, res) => {
  try {
    const result = await knex.select("*").from("artist");
    const id = Number(req.params.id);
    const idartist = result.find((x) => {
      return x.id === id;
    });
    res.status(200).json({
      artist: idartist,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

/**************************************** */

exports.getArtistIdSong = async (req, res) => {
  try {
    const result = await knex.select("*").from("songs");
    const id_artist = Number(req.params.id_artist);
    const idartists = result.filter((x) => {
      return x.id_artist === id_artist;
    });
    res.status(200).json({
      songs: idartists,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};


exports.getSongIdPlaylist = async (req, res) => {
  try {
    const result = await knex.select("*").from("songs");
    const id_playlist = Number(req.params.id_playlist);
    const id = result.filter((x) => {
      return x.id_playlist === id_playlist;
    });
    res.status(200).json({
      song: id,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
