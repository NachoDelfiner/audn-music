const { param, body } = require("express-validator");

/******************************************* */
exports.validatorSongNameName = [
  param("name")
    .not()
    .isEmpty()
    .withMessage("name required")
    .isString()
    .withMessage("incorrect name format"),
];

exports.validatorSongNameId = [
  param("id")
    .not()
    .isEmpty()
    .withMessage("id required")
    .isNumeric()
    .withMessage("incorrect id format"),
];
/************************************************** */

exports.validatorArtistNameName = [
  param("name")
    .not()
    .isEmpty()
    .withMessage("name required")
    .isString()
    .withMessage("incorrect name format"),
];

exports.validatorArtistNameId = [
  param("id")
    .not()
    .isEmpty()
    .withMessage("id required")
    .isNumeric()
    .withMessage("incorrect id format"),
];

/********************************************* */

exports.filtersongid = [
  param("id_artist")
    .not()
    .isEmpty()
    .withMessage("id_artist required")
    .isNumeric()
    .withMessage("incorrect id_artist format"),
];

exports.validatorSongNameIdPlaylist = [
  param("id_playlist")
    .not()
    .isEmpty()
    .withMessage("id required")
    .isNumeric()
    .withMessage("incorrect id format"),
];