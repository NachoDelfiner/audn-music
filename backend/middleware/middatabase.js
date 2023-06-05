const knex = require("../config/knex");

exports.validateNameParams = (req, res, next) => {
  const name = req.params.name;
  knex("songs")
    .where({ name: name })
    .then((result) => {
      if (!result.length) {
        res.status(400).json({
          message: "No existe canción con ese nombre",
        });
      } else {
        next();
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
};

exports.validateIdParams = (req, res, next) => {
  const id = Number(req.params.id);
  knex("songs")
    .where({ id: id })
    .then((result) => {
      if (!result.length) {
        res.status(400).json({
          message: "No existe canción con ese id",
        });
      } else {
        next();
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
};

/*********************************************** */

exports.validateArtistNameParams = (req, res, next) => {
  const name = req.params.name;
  knex("artist")
    .where({ name: name })
    .then((result) => {
      if (!result.length) {
        res.status(400).json({
          message: "No existe artista con ese nombre",
        });
      } else {
        next();
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
};


exports.validateArtistIdParams = (req, res, next) => {
    const id = Number(req.params.id);
    knex("artist")
      .where({ id: id })
      .then((result) => {
        if (!result.length) {
          res.status(400).json({
            message: "No existe artista con ese id",
          });
        } else {
          next();
        }
      })
      .catch((error) => {
        res.status(400).json({
          error: error.message,
        });
      });
  };

  /************************************************* */


  exports.validateArtistIdParamsFilter = (req, res, next) => {
    const id_artist = Number(req.params.id_artist);
    knex("songs")
      .where({ id_artist: id_artist })
      .then((result) => {
        if (!result.length) {
          res.status(400).json({
            message: "No existe artista con ese id_artist",
          });
        } else {
          next();
        }
      })
      .catch((error) => {
        res.status(400).json({
          error: error.message,
        });
      });
  };

  exports.validateIdPlaylistParams = (req, res, next) => {
    const id_playlist = Number(req.params.id_playlist);
    knex("songs")
      .where({ id_playlist: id_playlist })
      .then((result) => {
        if (!result.length) {
          res.status(400).json({
            message: "No existe canción con ese id playlist",
          });
        } else {
          next();
        }
      })
      .catch((error) => {
        res.status(400).json({
          error: error.message,
        });
      });
  };